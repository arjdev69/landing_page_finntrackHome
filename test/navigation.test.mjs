import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';
import test from 'node:test';

test('header exposes the approved navigation contract with configured app links', async () => {
  const [navigation, header, layout, page, benefits, howItWorks, audience] = await Promise.all([
    readFile(new URL('../src/config/navigation.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/layout/Header.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/layouts/MarketingLayout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/Benefits.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/HowItWorks.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/Audience.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(navigation, /href: '#recursos', label: 'Recursos'/);
  assert.match(navigation, /href: '#como-funciona', label: 'Como funciona'/);
  assert.match(navigation, /href: '#para-quem', label: 'Para quem'/);
  assert.match(navigation, /signupLabel: 'Criar conta'/);
  assert.doesNotMatch(navigation, /gratuit/i);
  assert.match(header, /aria-label="Navegação principal"/);
  assert.match(header, /href={loginUrl}/);
  assert.match(header, /href={signupUrl}/);
  assert.match(layout, /Pular para o conteúdo/);
  assert.match(layout, /href="#main-content"/);
  assert.match(page, /<main[^>]*id="main-content"[^>]*tabindex="-1"/);

  assert.match(page, /id="main-content"/);
  assert.match(page, /<Audience\s*\/>/);
  assert.match(audience, /id="para-quem"/);
  assert.match(benefits, /id="recursos"/);
  assert.match(howItWorks, /id="como-funciona"/);
});

test('mobile navigation is progressively enhanced and keyboard-dismissible', async () => {
  const mobileNavigation = await readFile(
    new URL('../src/components/layout/MobileNavigation.astro', import.meta.url),
    'utf8',
  );

  assert.match(mobileNavigation, /<details/);
  assert.match(mobileNavigation, /<summary/);
  assert.match(mobileNavigation, /aria-label="Navegação móvel"/);
  assert.match(mobileNavigation, /event\.key !== 'Escape'/);
  assert.match(mobileNavigation, /navigation\.open = false/);
  assert.match(mobileNavigation, /summary\?\.focus\(\)/);
  assert.match(mobileNavigation, /min-h-11/);
  assert.doesNotMatch(mobileNavigation, /React|client:/);
});
