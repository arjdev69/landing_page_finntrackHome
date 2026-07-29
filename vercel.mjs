import { buildSecurityHeaders } from './scripts/security-headers.mjs';
import process from 'node:process';

export const deployedInlineScriptHashes = Object.freeze([
  "'sha256-jWlN9+s4G20ZYqw/3UBkaUQax4jPSe3vO3U6GB2Vz/A='",
]);

export const canonicalProductionOrigin = 'https://finntrackhomepage.app';

export const legacyProductionHosts = Object.freeze([
  'finntrack-home-landing.vercel.app',
  'www.finntrackhomepage.app',
]);

export function resolveVercelEnvironment(value) {
  return value === 'production' ? 'production' : 'preview';
}

export function createCanonicalRedirects(environment) {
  if (environment !== 'production') {
    return [];
  }

  return legacyProductionHosts.map((host) => ({
    source: '/:path*',
    has: [{ type: 'host', value: host }],
    destination: `${canonicalProductionOrigin}/:path*`,
    permanent: true,
  }));
}

export function createVercelConfig(environment) {
  const { headers } = buildSecurityHeaders({
    environment,
    inlineScriptHashes: deployedInlineScriptHashes,
  });

  return {
    redirects: createCanonicalRedirects(environment),
    headers: [
      {
        source: '/(.*)',
        headers: Object.entries(headers).map(([key, value]) => ({ key, value })),
      },
    ],
  };
}

export const config = createVercelConfig(resolveVercelEnvironment(process.env.VERCEL_ENV));
