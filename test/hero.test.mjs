import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

import { heroContent } from '../src/config/home-content.ts';

test('WEB-002 hero content matches the approved neutral conversion copy', () => {
  assert.deepEqual(heroContent, {
    eyebrow: 'Controle financeiro para proprietários',
    title: 'Saiba quais imóveis realmente dão lucro.',
    description:
      'Organize receitas, despesas e contas vencidas. Veja o resultado mensal de cada imóvel em um só lugar.',
    secondaryCtaLabel: 'Ver como funciona',
  });
  assert.doesNotMatch(JSON.stringify(heroContent), /grátis|gratuit|beta|para sempre/i);
});

test('Hero exposes configured, resilient CTAs and a governed responsive product capture', async () => {
  const [hero, page] = await Promise.all([
    readFile(new URL('../src/components/sections/Hero.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /<Hero\s*\/>/);
  assert.doesNotMatch(page, /A estrutura da landing/);
  assert.match(hero, /level={1}/);
  assert.match(hero, /href={publicConfig\.appSignupUrl}/);
  assert.match(hero, /data-app-link/);
  assert.match(hero, /data-destination-type="signup"/);
  assert.match(hero, /data-cta-location="hero"/);
  assert.match(hero, /href="#demonstracao"/);
  assert.match(hero, /data-secondary-cta/);
  assert.match(hero, /data-asset-role="final-dashboard-preview"/);
  assert.match(hero, /data-asset-status={dashboardPreview\.approvalStatus}/);
  assert.match(hero, /widths={\[480, 720, 960\]}/);
  assert.match(hero, /loading="eager"/);
  assert.match(hero, /fetchpriority="high"/);
  assert.match(hero, /alt={dashboardPreview\.altText}/);
  assert.doesNotMatch(hero, /client:|<script/);
});
