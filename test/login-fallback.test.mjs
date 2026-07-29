import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

const pageUrl = new URL('../src/pages/entrar.astro', import.meta.url);
const siteConfigUrl = new URL('../src/config/site.ts', import.meta.url);
const crawlingUrl = new URL('../src/lib/seo/crawling.ts', import.meta.url);

test('INT-001 provides a functional login fallback with allowlisted progressive enhancement', async () => {
  const page = await readFile(pageUrl, 'utf8');

  assert.match(page, /href=\{publicConfig\.appLoginUrl\}/);
  assert.match(page, /data-app-link/);
  assert.match(page, /<AppLinkEnhancer\s*\/>/);
  assert.match(page, /O link continua funcionando mesmo quando o JavaScript está desativado/);
  assert.doesNotMatch(
    page,
    /Astro\.redirect|Astro\.url\.searchParams|get\(['"](?:destination|redirect)['"]\)|redirect=/,
  );
  assert.doesNotMatch(page, /AnalyticsInstrumentation|landing_view/);
  assert.doesNotMatch(page, /https:\/\/finntrackhome\.app/);
});

test('INT-001 keeps the fallback route out of search results and the sitemap', async () => {
  const [siteConfig, crawling] = await Promise.all([
    readFile(siteConfigUrl, 'utf8'),
    readFile(crawlingUrl, 'utf8'),
  ]);

  assert.match(siteConfig, /export const loginFallbackSeo = Object\.freeze\(/);
  assert.match(siteConfig, /canonicalPath: '\/entrar'/);
  assert.match(siteConfig, /robots: 'noindex,nofollow'/);
  assert.doesNotMatch(crawling, /SITEMAP_PATHS\s*=\s*\[[^\]]*entrar/s);
});
