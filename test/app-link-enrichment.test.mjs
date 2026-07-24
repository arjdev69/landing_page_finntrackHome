import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

import { enrichAppLinks } from '../src/lib/navigation/enrich-app-links.ts';

test('enriches every app link with allowed UTMs and preserves configured parameters', () => {
  const source = new URL(
    'https://site.example/?utm_source=google&utm_medium=paid%20social&utm_campaign=im%C3%B3veis&email=person%40example.com&redirect=https%3A%2F%2Fevil.example%2F#private',
  );
  const links = [
    { href: 'https://app.example/cadastro?mode=signup' },
    { href: 'https://app.example/entrar?mode=signin&utm_source=partner' },
  ];

  enrichAppLinks(source, links);

  const signup = new URL(links[0].href);
  assert.equal(signup.searchParams.get('mode'), 'signup');
  assert.equal(signup.searchParams.get('utm_source'), 'google');
  assert.equal(signup.searchParams.get('utm_medium'), 'paid social');
  assert.equal(signup.searchParams.get('utm_campaign'), 'imóveis');
  assert.equal(signup.searchParams.has('email'), false);
  assert.equal(signup.searchParams.has('redirect'), false);
  assert.equal(signup.hash, '');

  const login = new URL(links[1].href);
  assert.equal(login.searchParams.get('mode'), 'signin');
  assert.equal(login.searchParams.get('utm_source'), 'partner');
  assert.equal(login.searchParams.get('utm_medium'), 'paid social');
});

test('a malformed link does not block valid CTAs or alter their fallback without UTMs', () => {
  const malformed = { href: 'not a URL' };
  const valid = { href: 'https://app.example/cadastro?mode=signup' };

  enrichAppLinks(new URL('https://site.example/?unknown=value'), [malformed, valid]);

  assert.equal(malformed.href, 'not a URL');
  assert.equal(valid.href, 'https://app.example/cadastro?mode=signup');
});

test('the layout progressively enhances only explicitly marked app anchors', async () => {
  const [enhancer, header, mobileNavigation, layout] = await Promise.all([
    readFile(new URL('../src/components/layout/AppLinkEnhancer.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/layout/Header.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/layout/MobileNavigation.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/layouts/MarketingLayout.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(enhancer, /a\[data-app-link\]/);
  assert.match(enhancer, /enrichAppLinks\(new URL\(window\.location\.href\), appLinks\)/);
  assert.match(enhancer, /try\s*{/);
  assert.match(enhancer, /catch\s*{/);
  assert.equal((header.match(/data-app-link/g) ?? []).length, 2);
  assert.equal((mobileNavigation.match(/data-app-link/g) ?? []).length, 2);
  assert.match(header, /data-destination-type="login"/);
  assert.match(header, /data-destination-type="signup"/);
  assert.match(header, /data-cta-location="header"/);
  assert.match(layout, /<AppLinkEnhancer\s*\/>/);
  assert.doesNotMatch(enhancer, /localStorage|sessionStorage|document\.cookie|preventDefault/);
});
