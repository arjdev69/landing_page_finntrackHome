import type { PublicEnvironment } from './metadata.ts';

export const SITEMAP_PATHS = ['/'] as const;

function resolveCanonicalUrl(siteOrigin: string, path: `/${string}`): string {
  const origin = new URL(siteOrigin);
  const resolved = new URL(path, origin);

  if (resolved.origin !== origin.origin) {
    throw new Error('[seo] URL do sitemap deve permanecer na origem configurada');
  }

  resolved.search = '';
  resolved.hash = '';
  return resolved.href;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function renderRobotsTxt(siteOrigin: string, environment: PublicEnvironment): string {
  if (environment === 'preview') {
    return 'User-agent: *\nDisallow: /\n';
  }

  const sitemapUrl = resolveCanonicalUrl(siteOrigin, '/sitemap.xml');
  return `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`;
}

export function renderSitemapXml(
  siteOrigin: string,
  environment: PublicEnvironment,
  paths: readonly `/${string}`[] = SITEMAP_PATHS,
): string {
  const urls =
    environment === 'production'
      ? paths.map(
          (path) => `  <url><loc>${escapeXml(resolveCanonicalUrl(siteOrigin, path))}</loc></url>`,
        )
      : [];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}
