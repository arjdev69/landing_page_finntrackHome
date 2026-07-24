import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

import { chromium } from '@playwright/test';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(projectRoot, 'dist');
const artifactDirectory = path.join(projectRoot, 'artifacts', 'lighthouse');
const rawDirectory = path.join(artifactDirectory, 'raw');
const baselineOnly = process.argv.includes('--baseline');
const host = '127.0.0.1';
const port = 4323;
const auditUrl = `http://${host}:${port}/`;
const runsPerProfile = 3;

const publicEnvironment = {
  PUBLIC_ENVIRONMENT: 'preview',
  PUBLIC_SITE_URL: auditUrl.slice(0, -1),
  PUBLIC_APP_URL: 'https://app.finntrack-home.com.br',
  PUBLIC_APP_SIGNUP_URL: 'https://app.finntrack-home.com.br/cadastro',
  PUBLIC_APP_LOGIN_URL: 'https://app.finntrack-home.com.br/entrar',
};

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function runCommand(command, args, environment) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: environment,
      stdio: 'inherit',
      windowsHide: true,
    });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

function startStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const requestedPath = decodeURIComponent(new URL(request.url ?? '/', auditUrl).pathname);
      const relativePath = requestedPath === '/' ? 'index.html' : requestedPath.replace(/^\/+/, '');
      const resolvedPath = path.resolve(distDirectory, relativePath);
      if (!resolvedPath.startsWith(`${distDirectory}${path.sep}`)) throw new Error('Invalid path');

      const fileStat = await stat(resolvedPath);
      if (!fileStat.isFile()) throw new Error('Not a file');
      const body = await readFile(resolvedPath);
      response.writeHead(200, {
        'Content-Length': body.byteLength,
        'Content-Type': contentTypes.get(path.extname(resolvedPath)) ?? 'application/octet-stream',
      });
      response.end(body);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    }
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => resolve(server));
  });
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}

function extractMetrics(lhr) {
  const resources = lhr.audits['resource-summary'].details.items;
  const resource = (type) => resources.find((item) => item.resourceType === type);
  return {
    accessibilityScore: Math.round(lhr.categories.accessibility.score * 100),
    bestPracticesScore: Math.round(lhr.categories['best-practices'].score * 100),
    cls: lhr.audits['cumulative-layout-shift'].numericValue,
    fcpMs: lhr.audits['first-contentful-paint'].numericValue,
    imageBytes: resource('image')?.transferSize ?? 0,
    lcpMs: lhr.audits['largest-contentful-paint'].numericValue,
    performanceScore: Math.round(lhr.categories.performance.score * 100),
    requestCount: resources.reduce((total, item) => total + item.requestCount, 0),
    scriptBytes: resource('script')?.transferSize ?? 0,
    seoScore: Math.round(lhr.categories.seo.score * 100),
    stylesheetBytes: resource('stylesheet')?.transferSize ?? 0,
    tbtMs: lhr.audits['total-blocking-time'].numericValue,
    totalBytes: lhr.audits['total-byte-weight'].numericValue,
  };
}

function summarizeProfile(profileRuns) {
  const keys = Object.keys(profileRuns[0]);
  return Object.fromEntries(keys.map((key) => [key, median(profileRuns.map((run) => run[key]))]));
}

function closeChrome(chrome) {
  try {
    chrome.kill();
  } catch (error) {
    if (error?.code !== 'EPERM') throw error;
  }
}

async function resolveChromePath() {
  const candidates = [
    process.env['ProgramFiles(x86)']
      ? path.join(
          process.env['ProgramFiles(x86)'],
          'Microsoft',
          'Edge',
          'Application',
          'msedge.exe',
        )
      : undefined,
    process.env.ProgramFiles
      ? path.join(process.env.ProgramFiles, 'Google', 'Chrome', 'Application', 'chrome.exe')
      : undefined,
    chromium.executablePath(),
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next local Chromium-compatible executable.
    }
  }
  throw new Error('No Chromium-compatible executable was found for Lighthouse.');
}

async function assertBudget(summary) {
  const { performanceBudget } = await import('./performance-budget.mjs');
  const failures = [];

  for (const [profile, metrics] of Object.entries(summary.profiles)) {
    const budget = performanceBudget[profile];
    for (const [metric, limit] of Object.entries(budget.minimums)) {
      if (metrics[metric] < limit)
        failures.push(`${profile}.${metric}: ${metrics[metric]} < ${limit}`);
    }
    for (const [metric, limit] of Object.entries(budget.maximums)) {
      if (metrics[metric] > limit)
        failures.push(`${profile}.${metric}: ${metrics[metric]} > ${limit}`);
    }
  }

  if (failures.length > 0) throw new Error(`Performance budget failed:\n${failures.join('\n')}`);
}

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Run this audit through npm so npm_execpath is available.');

await mkdir(rawDirectory, { recursive: true });
await runCommand(process.execPath, [npmCli, 'run', 'build'], {
  ...process.env,
  ...publicEnvironment,
});

const server = await startStaticServer();
const chromePath = await resolveChromePath();

try {
  const profiles = {};
  let lighthouseVersion;
  for (const profile of ['mobile', 'desktop']) {
    const profileRuns = [];
    for (let run = 1; run <= runsPerProfile; run += 1) {
      const chrome = await launch({
        chromePath,
        chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage'],
      });
      try {
        const result = await lighthouse(auditUrl, {
          logLevel: 'error',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          output: 'json',
          port: chrome.port,
          ...(profile === 'desktop' ? { preset: 'desktop' } : {}),
        });
        if (!result)
          throw new Error(`Lighthouse did not return a result for ${profile} run ${run}.`);
        lighthouseVersion ??= result.lhr.lighthouseVersion;
        await writeFile(path.join(rawDirectory, `${profile}-${run}.json`), result.report, 'utf8');
        profileRuns.push(extractMetrics(result.lhr));
      } finally {
        closeChrome(chrome);
      }
    }
    profiles[profile] = { median: summarizeProfile(profileRuns), runs: profileRuns };
  }

  const summary = {
    auditedAt: new Date().toISOString(),
    lighthouseVersion,
    profiles: Object.fromEntries(
      Object.entries(profiles).map(([profile, value]) => [profile, value.median]),
    ),
    runs: Object.fromEntries(
      Object.entries(profiles).map(([profile, value]) => [profile, value.runs]),
    ),
    runsPerProfile,
    url: auditUrl,
  };

  await writeFile(
    path.join(artifactDirectory, baselineOnly ? 'baseline-summary.json' : 'summary.json'),
    `${JSON.stringify(summary, null, 2)}\n`,
    'utf8',
  );
  if (!baselineOnly) await assertBudget(summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
