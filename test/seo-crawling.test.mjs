import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

import { renderRobotsTxt, renderSitemapXml, SITEMAP_PATHS } from '../src/lib/seo/crawling.ts';

test('production robots allows crawling and points to the canonical sitemap', () => {
  assert.equal(
    renderRobotsTxt('https://www.finntrack-home.com.br', 'production'),
    'User-agent: *\nAllow: /\nSitemap: https://www.finntrack-home.com.br/sitemap.xml\n',
  );
});

test('preview robots blocks every crawler without advertising a sitemap', () => {
  assert.equal(renderRobotsTxt('http://localhost:4321', 'preview'), 'User-agent: *\nDisallow: /\n');
});

test('production sitemap contains only canonical indexable 200 routes', () => {
  const sitemap = renderSitemapXml('https://www.finntrack-home.com.br', 'production');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  assert.deepEqual(SITEMAP_PATHS, ['/']);
  assert.deepEqual(locations, ['https://www.finntrack-home.com.br/']);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 1);
  assert.doesNotMatch(locations.join('\n'), /entrar|404|privacidade|termos|\?/);
});

test('preview sitemap is valid and empty because preview has no indexable routes', () => {
  const sitemap = renderSitemapXml('http://localhost:4321', 'preview');

  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.doesNotMatch(sitemap, /<url>/);
});

test('Astro endpoints are prerendered and use the centralized environment contract', async () => {
  const [robotsEndpoint, sitemapEndpoint] = await Promise.all([
    readFile(new URL('../src/pages/robots.txt.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/sitemap.xml.ts', import.meta.url), 'utf8'),
  ]);

  for (const endpoint of [robotsEndpoint, sitemapEndpoint]) {
    assert.match(endpoint, /export const prerender = true/);
    assert.match(endpoint, /getRuntimeSiteConfig\(url\)/);
  }
  assert.match(robotsEndpoint, /text\/plain; charset=utf-8/);
  assert.match(sitemapEndpoint, /application\/xml; charset=utf-8/);
});
