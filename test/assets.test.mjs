import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';

import sharp from 'sharp';

import {
  assetApprovals,
  assetInventory,
  enUSAssetApprovals,
} from '../src/config/product-assets.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const forbiddenIdentity =
  /alex|johnson|demo@|ocean drive|business st|downtown office|sunset apartment/i;

test('AST-001 inventory contains every DEC-009 deliverable with valid hashes and dimensions', async () => {
  const purposes = new Set(assetInventory.map((asset) => asset.purpose));

  for (const required of [
    'Logo horizontal principal',
    'Marca compacta',
    'Favicon PNG',
    'Ícone Apple touch',
    'Card social',
    'Demonstração do dashboard no Hero e ProductPreview',
    'en-US dashboard demonstration in Hero and ProductPreview',
  ]) {
    assert.ok(purposes.has(required), `missing inventory purpose: ${required}`);
  }

  for (const asset of assetInventory) {
    const contents = await readFile(`${root}${asset.path}`);
    const hash = createHash('sha256').update(contents).digest('hex');
    const metadata = await sharp(contents).metadata();

    assert.equal(hash, asset.sha256, `${asset.path} hash differs from inventory`);
    assert.equal(`${metadata.width}x${metadata.height}`, asset.dimensions);
    assert.doesNotMatch(`${asset.origin} ${asset.productReference}`, forbiddenIdentity);
    assert.ok(
      asset.approvals === assetApprovals || asset.approvals === enUSAssetApprovals,
      `${asset.path} must reference a registered approval set`,
    );
  }
});

test('I18N-008 en-US screenshot is localized, synthetic and stripped of embedded metadata', async () => {
  const screenshot = assetInventory.find((asset) =>
    asset.path.endsWith('dashboard-final-en-us.png'),
  );
  const ptBRScreenshot = assetInventory.find((asset) =>
    asset.path.endsWith('dashboard-final-pt-br.png'),
  );
  assert.ok(screenshot);
  assert.ok(ptBRScreenshot);

  const contents = await readFile(`${root}${screenshot.path}`);
  const metadata = await sharp(contents).metadata();

  assert.equal(metadata.format, 'png');
  assert.equal(`${metadata.width}x${metadata.height}`, '1160x716');
  assert.equal(screenshot.dataClassification, 'synthetic-demo-no-identifiers');
  assert.equal(screenshot.locale, 'en-US');
  assert.equal(screenshot.currency, 'BRL');
  assert.notEqual(screenshot.sha256, ptBRScreenshot.sha256);
  assert.equal(metadata.exif, undefined);
  assert.equal(metadata.iptc, undefined);
  assert.equal(metadata.xmp, undefined);
  assert.doesNotMatch(contents.toString('latin1'), forbiddenIdentity);
});

test('AST-001 screenshot is PNG, synthetic, pt-BR and stripped of embedded metadata', async () => {
  const screenshot = assetInventory.find((asset) =>
    asset.path.endsWith('dashboard-final-pt-br.png'),
  );
  assert.ok(screenshot);

  const contents = await readFile(`${root}${screenshot.path}`);
  const metadata = await sharp(contents).metadata();

  assert.equal(metadata.format, 'png');
  assert.equal(screenshot.dataClassification, 'synthetic-demo-no-identifiers');
  assert.equal(metadata.exif, undefined);
  assert.equal(metadata.iptc, undefined);
  assert.equal(metadata.xmp, undefined);
  assert.doesNotMatch(contents.toString('latin1'), forbiddenIdentity);
  await assert.rejects(access(`${root}src/assets/product/dashboard-demo-jun-2026.jpg`));
});

test('AST-001 records every DEC-009 approval after Product visual review', () => {
  assert.equal(assetApprovals.designBrand, 'approved-2026-07-21');
  assert.equal(assetApprovals.technical, 'approved-2026-07-21');
  assert.equal(assetApprovals.privacy, 'approved-independent-review-2026-07-21');
  assert.equal(assetApprovals.product, 'approved-by-product-2026-07-21');
  assert.equal(enUSAssetApprovals.designBrand, 'approved-by-project-owner-2026-07-30');
  assert.equal(enUSAssetApprovals.technical, 'validated-2026-07-31');
  assert.equal(enUSAssetApprovals.privacy, 'approved-by-project-owner-2026-07-30');
  assert.equal(enUSAssetApprovals.product, 'approved-by-project-owner-2026-07-30');
});
