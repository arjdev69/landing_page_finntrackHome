import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

const pageUrl = new URL('../src/pages/404.astro', import.meta.url);
const siteConfigUrl = new URL('../src/config/site.ts', import.meta.url);

test('ERR-001 defines an accessible recovery page without landing analytics', async () => {
  const page = await readFile(pageUrl, 'utf8');

  assert.match(page, /<main id="main-content" tabindex="-1">/);
  assert.match(page, /<h1[\s\S]*\{notFoundSeo\.heading\}[\s\S]*<\/h1>/);
  assert.match(page, /<ButtonLink href="\/"[^>]*>Voltar à página inicial<\/ButtonLink>/);
  assert.doesNotMatch(page, /MarketingLayout|AnalyticsInstrumentation|landing_view/);
});

test('ERR-001 keeps the 404 out of search results', async () => {
  const siteConfig = await readFile(siteConfigUrl, 'utf8');

  assert.match(siteConfig, /export const notFoundSeo = Object\.freeze\(/);
  assert.match(siteConfig, /canonicalPath: '\/404'/);
  assert.match(siteConfig, /robots: 'noindex,nofollow'/);
});
