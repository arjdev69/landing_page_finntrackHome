import { buildSecurityHeaders } from './scripts/security-headers.mjs';
import process from 'node:process';

export const deployedInlineScriptHashesByEnvironment = Object.freeze({
  preview: Object.freeze(["'sha256-jWlN9+s4G20ZYqw/3UBkaUQax4jPSe3vO3U6GB2Vz/A='"]),
  production: Object.freeze([
    "'sha256-jWlN9+s4G20ZYqw/3UBkaUQax4jPSe3vO3U6GB2Vz/A='",
    "'sha256-o38oXzO4c2iT5Ighpvg1bDI3xAdM0Dn5yw4sye/KDRk='",
    "'sha256-wZlHltCI/ldNuz6xFm6wcXr1I3s06BNO0f0GnYPv6b8='",
    // A Vercel injeta a configuração pública do projeto no loader durante o deploy.
    "'sha256-nz++TAZBF7tYnemSr5ep4eVk8RrqHm2oawBe3M1AGOM='",
  ]),
});

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
    inlineScriptHashes: deployedInlineScriptHashesByEnvironment[environment],
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
