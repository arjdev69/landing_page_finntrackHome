import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

test('the document root can reflow below 320px without a fixed minimum width', async () => {
  const globalStyles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  const htmlRule =
    globalStyles.match(/html\s*\{(?<declarations>[^}]*)\}/)?.groups?.declarations ?? '';

  assert.doesNotMatch(htmlRule, /min-width/);
  assert.match(globalStyles, /overflow-wrap:\s*break-word/);
});
