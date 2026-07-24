import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

import { createPageAnalytics } from '../src/lib/analytics/page.ts';

function createRecordingClient({ throwOn } = {}) {
  const calls = [];

  return {
    calls,
    client: {
      page(event, properties) {
        calls.push({ event, properties });
        if (throwOn === event) throw new Error('provider unavailable');
      },
      track(event, properties) {
        calls.push({ event, properties });
        if (throwOn === event) throw new Error('provider unavailable');
      },
    },
  };
}

test('emits one landing view with classified, allowlisted properties only', () => {
  const recorder = createRecordingClient();
  const analytics = createPageAnalytics(recorder.client, {
    url: new URL(
      'https://finntrack.example/?utm_source=google&utm_medium=cpc&utm_campaign=im%C3%B3veis&email=person%40example.com',
    ),
    referrer: 'https://partner.example/article?person=private',
    viewportWidth: 1024,
  });

  analytics.viewLanding();
  analytics.viewLanding();

  assert.deepEqual(recorder.calls, [
    {
      event: 'landing_view',
      properties: {
        page_path: '/',
        referrer_group: 'paid',
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'imóveis',
        device_group: 'desktop',
      },
    },
  ]);
  assert.doesNotMatch(JSON.stringify(recorder.calls), /person|email|referrer_url/i);
});

test('does not emit landing view outside the home route', () => {
  const recorder = createRecordingClient();
  const analytics = createPageAnalytics(recorder.client, {
    url: new URL('https://finntrack.example/404'),
    referrer: '',
    viewportWidth: 390,
  });

  analytics.viewLanding();

  assert.deepEqual(recorder.calls, []);
});

test('emits CTA and outbound intents synchronously in order without arbitrary query data', () => {
  const recorder = createRecordingClient();
  const analytics = createPageAnalytics(recorder.client, {
    url: new URL('https://finntrack.example/?utm_source=social&token=secret'),
    referrer: '',
    viewportWidth: 390,
  });

  analytics.clickAppLink({ destinationType: 'signup', ctaLocation: 'header' });

  assert.deepEqual(recorder.calls, [
    {
      event: 'signup_cta_click',
      properties: {
        cta_location: 'header',
        page_path: '/',
        utm_source: 'social',
        device_group: 'mobile',
      },
    },
    {
      event: 'outbound_to_app',
      properties: {
        destination_type: 'signup',
        cta_location: 'header',
        page_path: '/',
        utm_source: 'social',
      },
    },
  ]);
  assert.doesNotMatch(JSON.stringify(recorder.calls), /token|secret/);
});

test('deduplicates product preview and emits stable secondary and FAQ intents', () => {
  const recorder = createRecordingClient();
  const analytics = createPageAnalytics(recorder.client, {
    url: new URL('https://finntrack.example/'),
    referrer: '',
    viewportWidth: 800,
  });

  analytics.viewProductPreview();
  analytics.viewProductPreview();
  analytics.clickSecondary('middle');
  analytics.openFaq('faq-seguranca');
  analytics.openFaq('');

  assert.deepEqual(
    recorder.calls.map(({ event }) => event),
    ['product_preview_view', 'secondary_cta_click', 'faq_open'],
  );
  assert.equal(recorder.calls[2].properties.faq_id, 'faq-seguranca');
});

test('contains provider failures so navigation and later events remain available', () => {
  const recorder = createRecordingClient({ throwOn: 'signup_cta_click' });
  const analytics = createPageAnalytics(recorder.client, {
    url: new URL('https://finntrack.example/'),
    referrer: '',
    viewportWidth: 390,
  });

  assert.doesNotThrow(() =>
    analytics.clickAppLink({ destinationType: 'signup', ctaLocation: 'header' }),
  );
  assert.deepEqual(
    recorder.calls.map(({ event }) => event),
    ['signup_cta_click', 'outbound_to_app'],
  );
});

test('wires analytics progressively without intercepting clicks or loading a provider', async () => {
  const [instrumentation, layout, productPreview] = await Promise.all([
    readFile(
      new URL('../src/components/layout/AnalyticsInstrumentation.astro', import.meta.url),
      'utf8',
    ),
    readFile(new URL('../src/layouts/MarketingLayout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/ProductPreview.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(layout, /<AnalyticsInstrumentation\s*\/>/);
  assert.match(productPreview, /data-product-preview/);
  assert.match(instrumentation, /a\[data-app-link\]/);
  assert.match(instrumentation, /intersectionRatio >= 0\.5/);
  assert.match(instrumentation, /1_000/);
  assert.doesNotMatch(
    instrumentation,
    /preventDefault|await .*track|cookie|localStorage|sessionStorage/,
  );
  assert.doesNotMatch(instrumentation, /gtag|segment|mixpanel|posthog|analyticsId/i);
});
