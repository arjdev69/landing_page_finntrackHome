import assert from 'node:assert/strict';
import test from 'node:test';
import minimatch from 'minimatch';
import {
  buildContentSecurityPolicy,
  buildSecurityHeaders,
  extractInlineScriptHashes,
} from '../scripts/security-headers.mjs';
import {
  canonicalProductionOrigin,
  createCanonicalRedirects,
  createVercelConfig,
  deployedInlineScriptHashesByEnvironment,
  legacyProductionHosts,
  resolveVercelEnvironment,
} from '../vercel.mjs';

function readConfiguredHeaders(environment) {
  const config = createVercelConfig(environment);
  assert.equal(config.headers.length, 1);
  assert.equal(config.headers[0].source, '/(.*)');
  return Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key, value]));
}

test('gera hashes CSP determinísticos apenas para scripts inline', () => {
  const html = '<script type="module">console.log("ok")</script><script src="/app.js"></script>';
  const hashes = extractInlineScriptHashes(html);

  assert.equal(hashes.length, 1);
  assert.match(hashes[0], /^'sha256-[A-Za-z0-9+/]+=*'$/);
  assert.deepEqual(hashes, extractInlineScriptHashes(html));
});

test('CSP de produção bloqueia superfícies não usadas e dispensa unsafe-inline', () => {
  const policy = buildContentSecurityPolicy({
    environment: 'production',
    inlineScriptHashes: ["'sha256-example='"],
  });

  assert.match(policy, /default-src 'self'/);
  assert.match(policy, /script-src 'self' 'sha256-example='/);
  assert.match(policy, /script-src-attr 'none'/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /upgrade-insecure-requests/);
  assert.doesNotMatch(policy, /unsafe-inline|unsafe-eval/);
});

test('CSP inclui todos os scripts inline do analytics sem liberar origem externa', () => {
  const productionHashes = deployedInlineScriptHashesByEnvironment.production;
  assert.equal(deployedInlineScriptHashesByEnvironment.preview.length, 1);
  assert.equal(productionHashes.length, 3);

  const policy = buildContentSecurityPolicy({
    environment: 'production',
    inlineScriptHashes: productionHashes,
  });

  for (const hash of productionHashes) {
    assert.match(policy, new RegExp(hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(policy, /connect-src 'self'/);
  assert.match(policy, /script-src 'self'/);
  assert.doesNotMatch(policy, /vercel\.com|vercel-scripts\.com|unsafe-inline/);
});

test('headers separam preview HTTP da política HTTPS de produção', () => {
  const html = '<html></html>';
  const preview = buildSecurityHeaders({ environment: 'preview', html }).headers;
  const production = buildSecurityHeaders({ environment: 'production', html }).headers;

  assert.equal(preview['X-Robots-Tag'], 'noindex, nofollow');
  assert.equal(preview['Strict-Transport-Security'], undefined);
  assert.equal(production['X-Robots-Tag'], undefined);
  assert.equal(production['Strict-Transport-Security'], 'max-age=31536000');
  assert.equal(production['Referrer-Policy'], 'strict-origin-when-cross-origin');
  assert.equal(production['X-Content-Type-Options'], 'nosniff');
  assert.equal(production['X-Frame-Options'], 'DENY');
  assert.match(production['Permissions-Policy'], /camera=\(\)/);
});

test('rejeita ambiente não documentado', () => {
  assert.throws(
    () => buildSecurityHeaders({ environment: 'staging', html: '' }),
    /Ambiente de headers inválido/,
  );
});

test('mapeia o contrato portátil para todos os caminhos da Vercel', () => {
  for (const environment of ['preview', 'production']) {
    const expected = buildSecurityHeaders({
      environment,
      inlineScriptHashes: deployedInlineScriptHashesByEnvironment[environment],
    }).headers;

    assert.deepEqual(readConfiguredHeaders(environment), expected);
  }
});

test('trata somente o ambiente production da Vercel como produção', () => {
  assert.equal(resolveVercelEnvironment('production'), 'production');
  assert.equal(resolveVercelEnvironment('preview'), 'preview');
  assert.equal(resolveVercelEnvironment('development'), 'preview');
  assert.equal(resolveVercelEnvironment(undefined), 'preview');
});

test('redireciona hosts antigos somente em produção para a origem canônica', () => {
  assert.deepEqual(createCanonicalRedirects('preview'), []);

  const redirects = createCanonicalRedirects('production');
  assert.equal(redirects.length, legacyProductionHosts.length);

  for (const [index, host] of legacyProductionHosts.entries()) {
    assert.deepEqual(redirects[index], {
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: `${canonicalProductionOrigin}/:path*`,
      permanent: true,
    });
  }
});

test('mantém a API legada sobre o minimatch corrigido para os gates de lint', () => {
  assert.equal(minimatch('src/pages/index.astro', '**/*.astro'), true);
  assert.equal(typeof minimatch.Minimatch, 'function');
  assert.equal(new minimatch.Minimatch('**/*.astro').match('src/pages/index.astro'), true);
});
