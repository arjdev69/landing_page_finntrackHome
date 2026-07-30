import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

import {
  audienceContent,
  faqItems,
  finalCtaContent,
  footerContent,
} from '../src/config/home-content.ts';

test('WEB-005 content matches the approved audience, FAQ, CTA and support decisions', () => {
  assert.equal(audienceContent.profiles.length, 3);
  assert.match(audienceContent.limitation, /carteiras pequenas/);
  assert.match(audienceContent.limitation, /Não é um sistema operacional completo/);

  assert.equal(faqItems.length, 6);
  assert.equal(new Set(faqItems.map(({ id }) => id)).size, faqItems.length);
  assert.match(
    faqItems.find(({ id }) => id === 'varios-imoveis')?.answer ?? '',
    /até três imóveis/,
  );
  assert.match(
    faqItems.find(({ id }) => id === 'protecao-dados')?.answer ?? '',
    /Nenhum sistema elimina todos os riscos/,
  );

  assert.equal(finalCtaContent.title, 'Descubra quais imóveis realmente dão resultado.');
  assert.equal(footerContent.supportEmail, 'jobslens.ia@gmail.com');
  assert.doesNotMatch(
    JSON.stringify({ audienceContent, faqItems, finalCtaContent, footerContent }),
    /grátis|gratuit|beta|preço|rentabilidade/i,
  );
});

test('WEB-005 sections render semantically in initial HTML and use configured links', async () => {
  const [page, audience, faq, finalCta, footer, layout, instrumentation] = await Promise.all([
    readFile(new URL('../src/components/pages/HomePage.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/Audience.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/Faq.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/FinalCta.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/layout/Footer.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/layouts/MarketingLayout.astro', import.meta.url), 'utf8'),
    readFile(
      new URL('../src/components/layout/AnalyticsInstrumentation.astro', import.meta.url),
      'utf8',
    ),
  ]);

  assert.match(page, /<Audience/);
  assert.match(page, /<Faq/);
  assert.match(page, /<FinalCta/);
  assert.match(audience, /getHomeAnchor\(locale, 'audience'\)/);
  assert.match(audience, /tabindex="-1"/);
  assert.match(faq, /<details/);
  assert.match(faq, /<summary/);
  assert.match(faq, /data-faq-id={item\.id}/);
  assert.match(instrumentation, /details\[data-faq-id\]/);
  assert.match(finalCta, /href={publicConfig\.appSignupUrl}/);
  assert.match(finalCta, /data-destination-type="signup"/);
  assert.match(finalCta, /data-cta-location="footer"/);
  assert.match(layout, /<Footer/);
  assert.match(layout, /loginUrl={publicConfig\.appLoginUrl}/);
  assert.match(footer, /href={loginUrl}/);
  assert.match(footer, /getLocalizedRoute\('privacy', locale\)/);
  assert.match(footer, /getLocalizedRoute\('terms', locale\)/);
  assert.match(footer, /mailto:/);
  assert.match(footer, /new Date\(\)\.getUTCFullYear\(\)/);
  assert.doesNotMatch(`${audience}${faq}${finalCta}${footer}`, /client:|<script/);
});
