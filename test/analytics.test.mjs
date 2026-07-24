import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ANALYTICS_CLASSIFICATION_VERSION,
  classifyDeviceGroup,
  classifyReferrerGroup,
  PAID_UTM_MEDIA,
  SEARCH_REFERRER_HOSTS,
  SOCIAL_REFERRER_HOSTS,
} from '../src/lib/analytics/classification.ts';
import {
  ANALYTICS_EVENTS,
  ANALYTICS_PROPERTY_KEYS,
  CTA_LOCATIONS,
  DESTINATION_TYPES,
  DEVICE_GROUPS,
  REFERRER_GROUPS,
} from '../src/lib/analytics/contract.ts';
import { NoopAnalytics } from '../src/lib/analytics/noop.ts';

test('classifies device groups at the documented viewport boundaries', () => {
  assert.equal(classifyDeviceGroup(0), 'mobile');
  assert.equal(classifyDeviceGroup(767), 'mobile');
  assert.equal(classifyDeviceGroup(768), 'tablet');
  assert.equal(classifyDeviceGroup(1023), 'tablet');
  assert.equal(classifyDeviceGroup(1024), 'desktop');
  assert.equal(classifyDeviceGroup(Number.NaN), 'mobile');
});

test('classifies referrers using the documented precedence', () => {
  const currentHostname = 'finntrack.example';

  assert.equal(
    classifyReferrerGroup({
      currentHostname,
      referrer: 'https://www.google.com/search?q=finntrack',
      utmMedium: ' CPC ',
      utmSource: 'facebook',
    }),
    'paid',
  );
  assert.equal(classifyReferrerGroup({ currentHostname, utmSource: 'Instagram' }), 'social');
  assert.equal(
    classifyReferrerGroup({
      currentHostname,
      referrer: 'https://m.facebook.com/post/123?private=value',
    }),
    'social',
  );
  assert.equal(
    classifyReferrerGroup({
      currentHostname,
      referrer: 'https://www.google.com/search?q=finntrack',
    }),
    'organic',
  );
  assert.equal(
    classifyReferrerGroup({
      currentHostname,
      referrer: 'https://partner.example/article',
    }),
    'referral',
  );
  assert.equal(classifyReferrerGroup({ currentHostname }), 'direct');
});

test('returns unknown when attribution signals are invalid or insufficient', () => {
  assert.equal(
    classifyReferrerGroup({ currentHostname: 'finntrack.example', referrer: 'not a URL' }),
    'unknown',
  );
  assert.equal(
    classifyReferrerGroup({
      currentHostname: 'finntrack.example',
      referrer: 'https://finntrack.example/internal',
    }),
    'unknown',
  );
  assert.equal(
    classifyReferrerGroup({ currentHostname: 'finntrack.example', utmSource: 'newsletter' }),
    'unknown',
  );
});

test('exports versioned allowlists and the complete event enumerations', () => {
  assert.equal(ANALYTICS_CLASSIFICATION_VERSION, '2026-07-15.v1');
  assert.deepEqual(PAID_UTM_MEDIA, ['cpc', 'ppc', 'paid', 'paid_social', 'display']);
  assert.ok(SOCIAL_REFERRER_HOSTS.includes('instagram.com'));
  assert.ok(SEARCH_REFERRER_HOSTS.includes('google.com'));
  assert.deepEqual(CTA_LOCATIONS, ['header', 'hero', 'middle', 'footer']);
  assert.deepEqual(DESTINATION_TYPES, ['signup', 'login']);
  assert.deepEqual(DEVICE_GROUPS, ['mobile', 'tablet', 'desktop']);
  assert.deepEqual(REFERRER_GROUPS, ['direct', 'organic', 'social', 'referral', 'paid', 'unknown']);
  assert.deepEqual(ANALYTICS_EVENTS, [
    'landing_view',
    'signup_cta_click',
    'login_click',
    'secondary_cta_click',
    'product_preview_view',
    'faq_open',
    'outbound_to_app',
  ]);
  assert.deepEqual(ANALYTICS_PROPERTY_KEYS.faq_open, ['faq_id', 'page_path']);
  assert.deepEqual(ANALYTICS_PROPERTY_KEYS.outbound_to_app, [
    'destination_type',
    'cta_location',
    'page_path',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ]);
  assert.equal(
    Object.values(ANALYTICS_PROPERTY_KEYS)
      .flat()
      .some((key) => ['email', 'name', 'address', 'referrer_url'].includes(key)),
    false,
  );
});

test('NoopAnalytics accepts every event intent without side effects or failures', () => {
  const analytics = new NoopAnalytics();

  assert.equal(
    analytics.page('landing_view', {
      page_path: '/',
      referrer_group: 'direct',
      device_group: 'desktop',
    }),
    undefined,
  );
  assert.equal(
    analytics.track('signup_cta_click', {
      cta_location: 'header',
      page_path: '/',
      device_group: 'mobile',
      utm_source: 'campaign',
    }),
    undefined,
  );
  assert.equal(
    analytics.track('outbound_to_app', {
      destination_type: 'signup',
      cta_location: 'header',
      page_path: '/',
    }),
    undefined,
  );
});
