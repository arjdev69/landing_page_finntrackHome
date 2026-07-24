import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';

import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const mark = `${root}src/assets/brand/finntrack-home-mark.svg`;
const socialSource = `${root}src/assets/brand/social-card-source.svg`;

await mkdir(`${root}public/brand`, { recursive: true });

await sharp(mark)
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(`${root}public/apple-touch-icon.png`);
await sharp(mark).resize(64, 64).png({ compressionLevel: 9 }).toFile(`${root}public/favicon.png`);
await sharp(socialSource)
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(`${root}public/social-card.png`);

await copyFile(mark, `${root}public/brand/finntrack-home-mark.svg`);
await copyFile(
  `${root}src/assets/brand/finntrack-home-logo.svg`,
  `${root}public/brand/finntrack-home-logo.svg`,
);
