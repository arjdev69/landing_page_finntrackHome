import assert from 'node:assert/strict';
import test from 'node:test';
import { URL } from 'node:url';

import { appendUtms, readAllowedUtms, UTM_KEYS } from '../src/lib/navigation/utm.ts';

test('reads only the approved non-empty UTM parameters', () => {
  const source = new URL(
    'https://site.example/?utm_source=google&utm_medium=cpc&utm_campaign=lan%C3%A7amento&utm_content=&utm_term=im%C3%B3veis&email=person%40example.com&redirect=https%3A%2F%2Fevil.example%2F#private-fragment',
  );

  assert.deepEqual(readAllowedUtms(source), {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'lançamento',
    utm_term: 'imóveis',
  });
  assert.deepEqual(UTM_KEYS, [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ]);
});

test('uses URL encoding while preserving destination parameters and fragment', () => {
  const destination = new URL(
    'https://app.example/cadastro?mode=signup&utm_source=partner#account',
  );
  const originalHref = destination.href;

  const enriched = appendUtms(destination, {
    utm_source: 'google',
    utm_medium: 'social paid',
    utm_campaign: 'imóveis & aluguéis',
  });

  assert.equal(destination.href, originalHref, 'the configured destination must not be mutated');
  assert.equal(enriched.searchParams.get('mode'), 'signup');
  assert.equal(enriched.searchParams.get('utm_source'), 'partner');
  assert.equal(enriched.searchParams.get('utm_medium'), 'social paid');
  assert.equal(enriched.searchParams.get('utm_campaign'), 'imóveis & aluguéis');
  assert.match(enriched.href, /utm_medium=social\+paid/);
  assert.match(enriched.href, /utm_campaign=im%C3%B3veis\+%26\+alugu%C3%A9is/);
  assert.equal(enriched.hash, '#account');
});

test('ignores empty and unexpected runtime keys without changing the fallback link', () => {
  const destination = new URL('https://app.example/entrar?mode=signin');
  const unsafeInput = {
    utm_source: '',
    utm_medium: null,
    redirect: 'https://evil.example/',
    token: 'secret',
  };

  const enriched = appendUtms(destination, unsafeInput);

  assert.equal(enriched.href, destination.href);
  assert.equal(enriched.searchParams.has('redirect'), false);
  assert.equal(enriched.searchParams.has('token'), false);
  assert.notEqual(enriched, destination, 'the safe fallback is returned as an independent URL');
});

test('keeps the first non-empty value when a campaign key is repeated', () => {
  const source = new URL(
    'https://site.example/?utm_source=&utm_source=first&utm_source=second&utm_campaign=campaign',
  );

  assert.deepEqual(readAllowedUtms(source), {
    utm_source: 'first',
    utm_campaign: 'campaign',
  });
});
