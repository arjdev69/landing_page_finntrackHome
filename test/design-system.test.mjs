import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';
import test from 'node:test';

function channelToLinear(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => channelToLinear(Number.parseInt(channel, 16)));

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(first, second) {
  const [lighter, darker] = [luminance(first), luminance(second)].sort(
    (left, right) => right - left,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

function readToken(stylesheet, name) {
  const match = stylesheet.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'));
  assert.ok(match, `Expected --${name} in global tokens`);
  return match[1];
}

test('design tokens preserve approved seeds and accessible semantic combinations', async () => {
  const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.equal(readToken(stylesheet, 'color-brand-600'), '#16a34a');
  assert.equal(readToken(stylesheet, 'color-success'), '#22c55e');
  assert.equal(readToken(stylesheet, 'color-danger'), '#dc2626');
  assert.equal(readToken(stylesheet, 'color-warning'), '#f59e0b');
  assert.ok(
    contrast(readToken(stylesheet, 'color-foreground'), '#f8fafc') >= 4.5,
    'foreground text must meet WCAG AA on the page background',
  );
  assert.ok(
    contrast(readToken(stylesheet, 'color-muted'), '#f8fafc') >= 4.5,
    'secondary text must meet WCAG AA on the page background',
  );
  assert.ok(
    contrast(readToken(stylesheet, 'color-action'), '#ffffff') >= 4.5,
    'primary controls must meet WCAG AA with white text',
  );
  assert.ok(
    contrast(readToken(stylesheet, 'color-focus'), '#ffffff') >= 3,
    'focus indicators must have at least 3:1 contrast on white',
  );
});

test('global styles self-host Inter and cover focus and reduced motion', async () => {
  const stylesheet = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.match(stylesheet, /inter-latin-wght-normal\.woff2/);
  assert.match(stylesheet, /font-display:\s*swap/);
  assert.match(stylesheet, /:focus-visible\s*{/);
  assert.match(stylesheet, /outline:\s*3px solid var\(--color-focus\)/);
  assert.match(stylesheet, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('Astro UI primitives keep mobile-first sizing and semantic tokens', async () => {
  const [buttonLink, container, sectionHeading] = await Promise.all([
    readFile(new URL('../src/components/ui/ButtonLink.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ui/Container.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ui/SectionHeading.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(buttonLink, /min-h-11/);
  assert.match(buttonLink, /bg-action text-white hover:bg-action-hover/);
  assert.match(buttonLink, /border-border-strong/);
  assert.match(container, /px-4 sm:px-6 lg:px-8/);
  assert.match(sectionHeading, /const HeadingTag = `h\$\{level\}`/);
  assert.match(sectionHeading, /text-muted/);
});
