import type { DeviceGroup, ReferrerGroup } from './contract.ts';

export const ANALYTICS_CLASSIFICATION_VERSION = '2026-07-15.v1';

export const PAID_UTM_MEDIA = ['cpc', 'ppc', 'paid', 'paid_social', 'display'] as const;

export const SOCIAL_UTM_SOURCES = [
  'facebook',
  'instagram',
  'linkedin',
  'tiktok',
  'twitter',
  'x',
  'youtube',
] as const;

export const SOCIAL_REFERRER_HOSTS = [
  'facebook.com',
  'instagram.com',
  'linkedin.com',
  'tiktok.com',
  't.co',
  'twitter.com',
  'x.com',
  'youtube.com',
] as const;

export const SEARCH_REFERRER_HOSTS = [
  'bing.com',
  'duckduckgo.com',
  'google.com',
  'search.brave.com',
  'yahoo.com',
] as const;

export interface ReferrerSignals {
  readonly currentHostname: string;
  readonly referrer?: string;
  readonly utmMedium?: string;
  readonly utmSource?: string;
}

function normalize(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? '';
}

function matchesHost(hostname: string, allowedHost: string): boolean {
  return hostname === allowedHost || hostname.endsWith(`.${allowedHost}`);
}

function belongsToHostAllowlist(hostname: string, allowlist: readonly string[]): boolean {
  return allowlist.some((allowedHost) => matchesHost(hostname, allowedHost));
}

function readHttpHostname(value: string): string | undefined {
  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.hostname.toLowerCase()
      : undefined;
  } catch {
    return undefined;
  }
}

export function classifyDeviceGroup(viewportWidth: number): DeviceGroup {
  const width = Number.isFinite(viewportWidth) ? Math.max(0, viewportWidth) : 0;

  if (width >= 1024) {
    return 'desktop';
  }

  if (width >= 768) {
    return 'tablet';
  }

  return 'mobile';
}

export function classifyReferrerGroup(signals: ReferrerSignals): ReferrerGroup {
  const utmMedium = normalize(signals.utmMedium);
  const utmSource = normalize(signals.utmSource);

  if (PAID_UTM_MEDIA.some((medium) => medium === utmMedium)) {
    return 'paid';
  }

  const referrerValue = signals.referrer?.trim() ?? '';
  const referrerHostname = referrerValue ? readHttpHostname(referrerValue) : undefined;

  if (
    SOCIAL_UTM_SOURCES.some((source) => source === utmSource) ||
    (referrerHostname !== undefined &&
      belongsToHostAllowlist(referrerHostname, SOCIAL_REFERRER_HOSTS))
  ) {
    return 'social';
  }

  if (
    referrerHostname !== undefined &&
    belongsToHostAllowlist(referrerHostname, SEARCH_REFERRER_HOSTS)
  ) {
    return 'organic';
  }

  const currentHostname = normalize(signals.currentHostname);

  if (
    referrerHostname !== undefined &&
    currentHostname.length > 0 &&
    referrerHostname !== currentHostname
  ) {
    return 'referral';
  }

  if (referrerValue.length === 0 && utmSource.length === 0 && utmMedium.length === 0) {
    return 'direct';
  }

  return 'unknown';
}
