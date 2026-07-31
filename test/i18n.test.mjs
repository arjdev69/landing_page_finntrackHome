import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

import { enUSHomeContent } from '../src/i18n/content/en-US.ts';
import { ptBRHomeContent } from '../src/i18n/content/pt-BR.ts';
import { defaultLocale, localeConfig, supportedLocales } from '../src/i18n/locales.ts';
import { getHomeAnchor, getLocalizedRoute } from '../src/i18n/routes.ts';

test('I18N-003 defines approved, typed locale catalogs and stable routes', async () => {
  const [catalogIndex, contentType, assets, astroConfig] = await Promise.all([
    readFile(new URL('../src/i18n/content/index.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/i18n/content/types.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/i18n/assets.ts', import.meta.url), 'utf8'),
    readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8'),
  ]);

  assert.deepEqual(supportedLocales, ['pt-BR', 'en-US']);
  assert.equal(defaultLocale, 'pt-BR');
  assert.equal(localeConfig['pt-BR'].path, '/');
  assert.equal(localeConfig['en-US'].path, '/en/');
  assert.equal(getLocalizedRoute('home', 'pt-BR'), '/');
  assert.equal(getLocalizedRoute('home', 'en-US'), '/en/');
  assert.equal(getHomeAnchor('pt-BR', 'features'), 'recursos');
  assert.equal(getHomeAnchor('en-US', 'features'), 'features');
  assert.equal(ptBRHomeContent.governance.status, 'approved');
  assert.equal(enUSHomeContent.governance.status, 'approved');
  assert.equal(enUSHomeContent.seo.robots, 'noindex,nofollow');
  assert.equal('imagePath' in enUSHomeContent.seo, false);
  assert.match(catalogIndex, /satisfies Record<Locale, HomeContent>/);
  assert.match(contentType, /interface HomeContent/);
  assert.match(assets, /'en-US': Object\.freeze\(\{\s+image: null,\s+approvalStatus: 'pending'/s);
  assert.match(astroConfig, /defaultLocale:\s*'pt-BR'/);
  assert.match(astroConfig, /prefixDefaultLocale:\s*false/);
  assert.match(astroConfig, /redirectToDefaultLocale:\s*false/);
});

test('I18N-003 exposes an accessible no-JavaScript locale selector in both routes', async () => {
  const [selector, homePage, ptPage, enPage] = await Promise.all([
    readFile(new URL('../src/components/layout/LocaleSwitcher.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/pages/HomePage.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/en/index.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(selector, /role="group"/);
  assert.match(selector, /aria-label={shell\.languageSelectorLabel}/);
  assert.match(selector, /aria-current={isCurrent \? 'page' : undefined}/);
  assert.match(selector, /href={target\.path}/);
  assert.match(selector, /hreflang={targetLocale}/);
  assert.match(selector, /data-locale-flag="pt-BR"/);
  assert.match(selector, /data-locale-flag="en-US"/);
  assert.equal((selector.match(/aria-hidden="true"/g) ?? []).length, 2);
  assert.match(selector, /<span>{target\.visualLabel}<\/span>/);
  assert.doesNotMatch(selector, /<script|localStorage|sessionStorage|document\.cookie|navigator/);
  assert.match(homePage, /getHomeContent\(locale\)/);
  assert.match(homePage, /homeAssetByLocale\[locale\]/);
  assert.match(ptPage, /<HomePage locale="pt-BR" \/>/);
  assert.match(enPage, /<HomePage locale="en-US" \/>/);
});
