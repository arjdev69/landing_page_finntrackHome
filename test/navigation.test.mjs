import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';
import test from 'node:test';

test('header exposes the approved navigation contract with configured app links', async () => {
  const [navigation, routes, header, layout, page, benefits, howItWorks, audience] =
    await Promise.all([
      readFile(new URL('../src/config/navigation.ts', import.meta.url), 'utf8'),
      readFile(new URL('../src/i18n/routes.ts', import.meta.url), 'utf8'),
      readFile(new URL('../src/components/layout/Header.astro', import.meta.url), 'utf8'),
      readFile(new URL('../src/layouts/MarketingLayout.astro', import.meta.url), 'utf8'),
      readFile(new URL('../src/components/pages/HomePage.astro', import.meta.url), 'utf8'),
      readFile(new URL('../src/components/sections/Benefits.astro', import.meta.url), 'utf8'),
      readFile(new URL('../src/components/sections/HowItWorks.astro', import.meta.url), 'utf8'),
      readFile(new URL('../src/components/sections/Audience.astro', import.meta.url), 'utf8'),
    ]);

  assert.match(navigation, /getHomeAnchorHref\('pt-BR', item\.anchor\)/);
  assert.match(routes, /features: 'recursos'/);
  assert.match(routes, /howItWorks: 'como-funciona'/);
  assert.match(routes, /audience: 'para-quem'/);
  assert.match(navigation, /ptBRHomeContent\.header\.signupLabel/);
  assert.doesNotMatch(navigation, /gratuit/i);
  assert.match(header, /aria-label={shell\.primaryNavigationLabel}/);
  assert.match(header, /href={loginUrl}/);
  assert.match(header, /href={signupUrl}/);
  assert.match(layout, /content\.shell\.skipLink/);
  assert.match(layout, /href="#main-content"/);
  assert.match(page, /<main[^>]*id="main-content"[^>]*tabindex="-1"/);

  assert.match(page, /id="main-content"/);
  assert.match(page, /<Audience/);
  assert.match(audience, /getHomeAnchor\(locale, 'audience'\)/);
  assert.match(benefits, /getHomeAnchor\(locale, 'features'\)/);
  assert.match(howItWorks, /getHomeAnchor\(locale, 'howItWorks'\)/);
});

test('mobile navigation is progressively enhanced and keyboard-dismissible', async () => {
  const mobileNavigation = await readFile(
    new URL('../src/components/layout/MobileNavigation.astro', import.meta.url),
    'utf8',
  );

  assert.match(mobileNavigation, /<details/);
  assert.match(mobileNavigation, /<summary/);
  assert.match(mobileNavigation, /aria-label={shell\.mobileNavigationLabel}/);
  assert.match(mobileNavigation, /event\.key !== 'Escape'/);
  assert.match(mobileNavigation, /navigation\.open = false/);
  assert.match(mobileNavigation, /summary\?\.focus\(\)/);
  assert.match(mobileNavigation, /min-h-11/);
  assert.doesNotMatch(mobileNavigation, /React|client:/);
});
