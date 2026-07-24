export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type UTMKey = (typeof UTM_KEYS)[number];
export type AllowedUtms = Partial<Record<UTMKey, string>>;

export function readAllowedUtms(url: URL): AllowedUtms {
  const utms: AllowedUtms = {};

  for (const key of UTM_KEYS) {
    const value = url.searchParams.getAll(key).find((candidate) => candidate.length > 0);

    if (value !== undefined) {
      utms[key] = value;
    }
  }

  return utms;
}

export function appendUtms(destination: URL, utms: AllowedUtms): URL {
  const enrichedDestination = new URL(destination.href);

  for (const key of UTM_KEYS) {
    const value = utms[key];

    if (
      typeof value !== 'string' ||
      value.length === 0 ||
      enrichedDestination.searchParams.has(key)
    ) {
      continue;
    }

    enrichedDestination.searchParams.append(key, value);
  }

  return enrichedDestination;
}
