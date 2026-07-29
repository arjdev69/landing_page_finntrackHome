import type { BeforeSendEvent } from '@vercel/analytics';

export function sanitizeVercelAnalyticsEvent(
  event: BeforeSendEvent,
  expectedOrigin: string,
): BeforeSendEvent | null {
  if (event.type !== 'pageview') return null;

  try {
    const url = new URL(event.url);
    if (url.origin !== expectedOrigin || url.pathname !== '/') return null;

    url.search = '';
    url.hash = '';

    return {
      type: 'pageview',
      url: url.toString(),
    };
  } catch {
    return null;
  }
}
