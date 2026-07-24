import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

test('foundation uses static Astro output, Tailwind and configured aliases', async () => {
  const [config, stylesheet, page, layout, tsconfig, packageJson] = await Promise.all([
    readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/layouts/MarketingLayout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../tsconfig.json', import.meta.url), 'utf8'),
    readFile(new URL('../package.json', import.meta.url), 'utf8'),
  ]);

  assert.match(config, /output:\s*['"]static['"]/);
  assert.match(config, /tailwindcss\(\)/);
  assert.match(stylesheet, /@import\s+["']tailwindcss["']/);
  assert.match(layout, /<html lang={siteConfig\.language}>/);
  assert.match(layout, /import\s+["']@styles\/global\.css["']/);
  assert.match(page, /MarketingLayout/);

  const parsedTsconfig = JSON.parse(tsconfig);
  assert.equal(parsedTsconfig.compilerOptions.baseUrl, '.');
  assert.deepEqual(parsedTsconfig.compilerOptions.paths['@/*'], ['src/*']);
  assert.deepEqual(parsedTsconfig.compilerOptions.paths['@styles/*'], ['src/styles/*']);

  const parsedPackage = JSON.parse(packageJson);
  assert.equal(parsedPackage.scripts.lint, 'eslint . --max-warnings=0');
  assert.equal(
    parsedPackage.scripts['format:check'],
    'prettier --check "src/**/*.{astro,ts,css}" "scripts/**/*.mjs" "test/**/*.mjs" "*.{js,mjs,json}"',
  );
});
