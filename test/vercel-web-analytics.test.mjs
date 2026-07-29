import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

import { sanitizeVercelAnalyticsEvent } from '../src/lib/analytics/vercel.ts';

test('sanitiza pageview da home e descarta dados fora do escopo Hobby', () => {
  assert.deepEqual(
    sanitizeVercelAnalyticsEvent(
      {
        type: 'pageview',
        url: 'https://finntrackhomepage.app/?utm_source=test&email=user%40example.com#private',
      },
      'https://finntrackhomepage.app',
    ),
    {
      type: 'pageview',
      url: 'https://finntrackhomepage.app/',
    },
  );

  assert.equal(
    sanitizeVercelAnalyticsEvent(
      { type: 'event', url: 'https://finntrackhomepage.app/' },
      'https://finntrackhomepage.app',
    ),
    null,
  );
  assert.equal(
    sanitizeVercelAnalyticsEvent(
      { type: 'pageview', url: 'https://external.example/' },
      'https://finntrackhomepage.app',
    ),
    null,
  );
  assert.equal(
    sanitizeVercelAnalyticsEvent(
      { type: 'pageview', url: 'https://finntrackhomepage.app/privacidade' },
      'https://finntrackhomepage.app',
    ),
    null,
  );
  assert.equal(
    sanitizeVercelAnalyticsEvent(
      { type: 'pageview', url: 'invalid-url' },
      'https://finntrackhomepage.app',
    ),
    null,
  );
});

test('integra o pacote oficial somente no layout de produção da home', async () => {
  const [component, layout, packageJson] = await Promise.all([
    readFile(new URL('../src/components/layout/VercelWebAnalytics.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/layouts/MarketingLayout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../package.json', import.meta.url), 'utf8'),
  ]);

  assert.match(component, /@vercel\/analytics\/astro/);
  assert.match(component, /window\.webAnalyticsBeforeSend/);
  assert.match(component, /sanitizeVercelAnalyticsEvent/);
  assert.match(component, /<Analytics mode="production"\s*\/>/);
  assert.match(layout, /runtimeConfig\.environment === 'production'/);
  assert.match(layout, /enableVercelWebAnalytics && <VercelWebAnalytics\s*\/>/);
  assert.match(packageJson, /"@vercel\/analytics": "\^2\.0\.1"/);
});
