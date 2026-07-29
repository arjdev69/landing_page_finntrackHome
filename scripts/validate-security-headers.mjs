import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import console from 'node:console';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { chromium } from '@playwright/test';
import { createVercelConfig, deployedInlineScriptHashesByEnvironment } from '../vercel.mjs';
import { buildSecurityHeaders, extractInlineScriptHashes } from './security-headers.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const artifactDirectory = path.join(root, 'artifacts', 'security');

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

async function runBuild() {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) throw new Error('Execute a validação por npm para disponibilizar npm_execpath.');

  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [npmCli, 'run', 'build'], {
      cwd: root,
      env: {
        ...process.env,
        PUBLIC_APP_LOGIN_URL: 'https://app.finntrack-home.com.br/entrar',
        PUBLIC_APP_SIGNUP_URL: 'https://app.finntrack-home.com.br/cadastro',
        PUBLIC_APP_URL: 'https://app.finntrack-home.com.br',
        PUBLIC_ENVIRONMENT: 'preview',
        PUBLIC_SITE_URL: 'https://preview.finntrack.com.br',
      },
      stdio: 'inherit',
      windowsHide: true,
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`Build falhou com código ${code}`)),
    );
  });
}

function safeFilePath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  const requested = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  const resolved = path.resolve(dist, `.${requested}`);
  return resolved.startsWith(`${dist}${path.sep}`) ? resolved : null;
}

async function startServer(headers) {
  const server = http.createServer(async (request, response) => {
    try {
      const filePath = safeFilePath(request.url ?? '/');
      if (!filePath) {
        response.writeHead(400).end('Bad request');
        return;
      }

      await stat(filePath);
      const body = await readFile(filePath);
      for (const [name, value] of Object.entries(headers)) response.setHeader(name, value);
      response.setHeader(
        'Content-Type',
        contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream',
      );
      response.writeHead(200).end(body);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert(address && typeof address === 'object');
  return { server, url: `http://127.0.0.1:${address.port}` };
}

function readConfiguredHeaders(environment) {
  const config = createVercelConfig(environment);
  assert.equal(config.headers.length, 1);
  assert.equal(config.headers[0].source, '/(.*)');
  return Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key, value]));
}

await runBuild();

const html = await readFile(path.join(dist, 'index.html'), 'utf8');
const generatedInlineScriptHashes = extractInlineScriptHashes(html);
assert.deepEqual(
  generatedInlineScriptHashes,
  deployedInlineScriptHashesByEnvironment.preview,
  'O hash CSP de preview publicado diverge dos scripts inline do build',
);

const previewHeaders = readConfiguredHeaders('preview');
const productionHeaders = readConfiguredHeaders('production');
const preview = buildSecurityHeaders({
  environment: 'preview',
  inlineScriptHashes: generatedInlineScriptHashes,
});
const production = buildSecurityHeaders({
  environment: 'production',
  inlineScriptHashes: deployedInlineScriptHashesByEnvironment.production,
});

assert.deepEqual(previewHeaders, preview.headers, 'Mapeamento Vercel de preview divergente');
assert.deepEqual(productionHeaders, production.headers, 'Mapeamento Vercel de produção divergente');

assert(preview.inlineScriptHashes.length > 0, 'O script inline do build precisa de hash CSP');
assert(!production.headers['Content-Security-Policy'].includes("'unsafe-inline'"));
assert(!production.headers['Content-Security-Policy'].includes("'unsafe-eval'"));
assert.match(production.headers['Content-Security-Policy'], /frame-ancestors 'none'/);
assert.match(production.headers['Content-Security-Policy'], /upgrade-insecure-requests/);
assert.equal(production.headers['Strict-Transport-Security'], 'max-age=31536000');
assert.equal(production.headers['Strict-Transport-Security'].includes('includeSubDomains'), false);
assert.equal(preview.headers['Strict-Transport-Security'], undefined);
assert.equal(preview.headers['X-Robots-Tag'], 'noindex, nofollow');

await mkdir(artifactDirectory, { recursive: true });
await writeFile(
  path.join(artifactDirectory, 'security-headers.json'),
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      inlineScriptHashes: {
        preview: preview.inlineScriptHashes,
        production: production.inlineScriptHashes,
      },
      preview: preview.headers,
      production: production.headers,
    },
    null,
    2,
  )}\n`,
);

const { server, url } = await startServer(previewHeaders);
let browser;

try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 360, height: 800 } });
  const runtimeErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  await page.addInitScript(() => {
    globalThis.__cspViolations = [];
    globalThis.addEventListener('securitypolicyviolation', (event) => {
      globalThis.__cspViolations.push({
        blockedUri: event.blockedURI,
        directive: event.effectiveDirective,
      });
    });
  });

  const response = await page.goto(`${url}/?utm_source=qa&utm_medium=security`, {
    waitUntil: 'networkidle',
  });
  assert(response, 'A página deve responder');
  for (const [name, value] of Object.entries(preview.headers)) {
    assert.equal(response.headers()[name.toLowerCase()], value, `Header divergente: ${name}`);
  }
  assert.equal(response.headers()['set-cookie'], undefined, 'A landing não deve criar cookie');

  const mobileNavigation = page.locator('[data-mobile-navigation]');
  const menuTrigger = mobileNavigation.locator('summary');
  await menuTrigger.focus();
  await page.keyboard.press('Enter');
  assert.equal(await mobileNavigation.getAttribute('open'), '');
  await page.keyboard.press('Escape');
  assert.equal(await mobileNavigation.getAttribute('open'), null);

  const faq = page.locator('[data-faq-id]').first();
  await faq.locator('summary').click();
  assert.equal(await faq.getAttribute('open'), '');
  assert.match(
    await page
      .locator('a[data-app-link][data-destination-type="signup"]')
      .first()
      .getAttribute('href'),
    /utm_source=qa/,
  );

  const violations = await page.evaluate(() => globalThis.__cspViolations);
  assert.deepEqual(violations, [], `Violações CSP: ${JSON.stringify(violations)}`);
  assert.deepEqual(runtimeErrors, [], `Erros de runtime: ${runtimeErrors.join(' | ')}`);
} finally {
  await browser?.close();
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}

console.log('Headers de preview e produção validados; CSP executada sem violações no Chromium.');
