import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { URL } from 'node:url';
import test from 'node:test';

import {
  assetApprovals,
  assetInventory,
  dashboardPreview,
  dashboardPreviewEnUS,
} from '../src/config/product-assets.ts';

const assetUrl = new URL('../src/assets/product/dashboard-final-pt-br.png', import.meta.url);

test('WEB-004 uses a governed product capture with synthetic data', async () => {
  const [asset, metadata] = await Promise.all([readFile(assetUrl), stat(assetUrl)]);

  assert.ok(metadata.size > 0, 'product screenshot must not be empty');
  assert.equal(asset.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(dashboardPreview.sourceRepository, 'FinntrackHome');
  assert.equal(dashboardPreview.sourceScreen, 'src/features/dashboard/DashboardScreen.tsx');
  assert.equal(dashboardPreview.capturedAt, '2026-07-21');
  assert.equal(dashboardPreview.dataClassification, 'synthetic-demo');
  assert.equal(dashboardPreview.approvalStatus, 'final-approved');
  assert.equal(assetInventory.length, 7);
  assert.equal(assetApprovals.product, 'approved-by-product-2026-07-21');
  assert.doesNotMatch(dashboardPreview.altText, /alex|demo@|ocean drive|business st/i);
  assert.equal(dashboardPreviewEnUS.approvalStatus, 'final-approved');
  assert.equal(dashboardPreviewEnUS.capturedPeriod, 'June 2026');
  assert.doesNotMatch(dashboardPreviewEnUS.altText, /alex|demo@|ocean drive|business st/i);
});

test('ProductPreview reserves dimensions and delegates responsive formats to Astro', async () => {
  const [component, page] = await Promise.all([
    readFile(new URL('../src/components/sections/ProductPreview.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/pages/HomePage.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(component, /getHomeAnchor\(locale, 'demo'\)/);
  assert.match(component, /tabindex="-1"/);
  assert.match(component, /<Image/);
  assert.match(component, /alt={content\.dashboardAltText}/);
  assert.match(component, /widths={\[640, 960, 1440\]}/);
  assert.match(component, /sizes="\(max-width: 767px\)/);
  assert.match(component, /format="webp"/);
  assert.match(component, /loading="lazy"/);
  assert.match(component, /<figcaption/);
  assert.match(page, /<ProductPreview/);
  assert.doesNotMatch(component, /<script|client:/);
});
