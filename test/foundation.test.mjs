import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('foundation uses static Astro output and Tailwind', async () => {
  const [config, stylesheet, page] = await Promise.all([
    readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(config, /output:\s*['"]static['"]/);
  assert.match(config, /tailwindcss\(\)/);
  assert.match(stylesheet, /@import\s+["']tailwindcss["']/);
  assert.match(page, /<html lang="pt-BR">/);
});

