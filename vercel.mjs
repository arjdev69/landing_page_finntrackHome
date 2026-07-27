import { buildSecurityHeaders } from './scripts/security-headers.mjs';
import process from 'node:process';

export const deployedInlineScriptHashes = Object.freeze([
  "'sha256-jWlN9+s4G20ZYqw/3UBkaUQax4jPSe3vO3U6GB2Vz/A='",
]);

export function resolveVercelEnvironment(value) {
  return value === 'production' ? 'production' : 'preview';
}

export function createVercelConfig(environment) {
  const { headers } = buildSecurityHeaders({
    environment,
    inlineScriptHashes: deployedInlineScriptHashes,
  });

  return {
    headers: [
      {
        source: '/(.*)',
        headers: Object.entries(headers).map(([key, value]) => ({ key, value })),
      },
    ],
  };
}

export const config = createVercelConfig(resolveVercelEnvironment(process.env.VERCEL_ENV));
