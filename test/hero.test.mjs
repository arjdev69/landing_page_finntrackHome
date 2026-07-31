import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

import { heroContent } from '../src/config/home-content.ts';

test('WEB-002 hero content matches the approved neutral conversion copy', () => {
  assert.equal(heroContent.eyebrow, 'Controle financeiro para proprietários');
  assert.equal(heroContent.title, 'Saiba quais imóveis realmente dão lucro.');
  assert.equal(
    heroContent.description,
    'Organize receitas, despesas e contas vencidas. Veja o resultado mensal de cada imóvel em um só lugar.',
  );
  assert.equal(heroContent.secondaryCtaLabel, 'Ver como funciona');
  assert.doesNotMatch(JSON.stringify(heroContent), /grátis|gratuit|beta|para sempre/i);
});

test('Hero exposes configured, resilient CTAs and a governed responsive product capture', async () => {
  const [hero, page] = await Promise.all([
    readFile(new URL('../src/components/sections/Hero.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/pages/HomePage.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /<Hero/);
  assert.doesNotMatch(page, /A estrutura da landing/);
  assert.match(hero, /level={1}/);
  assert.match(hero, /href={publicConfig\.appSignupUrl}/);
  assert.match(hero, /data-app-link/);
  assert.match(hero, /data-destination-type="signup"/);
  assert.match(hero, /data-cta-location="hero"/);
  assert.match(hero, /getHomeAnchorHref\(locale, 'demo'\)/);
  assert.match(hero, /data-secondary-cta/);
  assert.match(hero, /'final-dashboard-preview'/);
  assert.match(hero, /data-asset-status={asset\.approvalStatus}/);
  assert.match(hero, /widths={\[480, 720, 960\]}/);
  assert.match(hero, /loading="eager"/);
  assert.match(hero, /fetchpriority="high"/);
  assert.match(hero, /alt={content\.dashboardAltText}/);
  assert.doesNotMatch(hero, /client:|<script/);
});
