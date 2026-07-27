import { createHash } from 'node:crypto';

const productionOnlyDirectives = ['upgrade-insecure-requests'];

export function extractInlineScriptHashes(html) {
  const hashes = [];
  const inlineScriptPattern = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(inlineScriptPattern)) {
    const digest = createHash('sha256').update(match[1], 'utf8').digest('base64');
    hashes.push(`'sha256-${digest}'`);
  }

  return [...new Set(hashes)].sort();
}

export function buildContentSecurityPolicy({ environment, inlineScriptHashes = [] }) {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "manifest-src 'self'",
    "media-src 'none'",
    "object-src 'none'",
    `script-src 'self'${inlineScriptHashes.length ? ` ${inlineScriptHashes.join(' ')}` : ''}`,
    "script-src-attr 'none'",
    "style-src 'self'",
    "worker-src 'none'",
  ];

  if (environment === 'production') {
    directives.push(...productionOnlyDirectives);
  }

  return directives.join('; ');
}

export function buildSecurityHeaders({ environment, html = '', inlineScriptHashes }) {
  if (!new Set(['preview', 'production']).has(environment)) {
    throw new Error(`Ambiente de headers inválido: ${environment}`);
  }

  const resolvedInlineScriptHashes = inlineScriptHashes ?? extractInlineScriptHashes(html);
  const headers = {
    'Content-Security-Policy': buildContentSecurityPolicy({
      environment,
      inlineScriptHashes: resolvedInlineScriptHashes,
    }),
    'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };

  if (environment === 'production') {
    // includeSubDomains e preload dependem da definição final de domínio (DEC-010).
    headers['Strict-Transport-Security'] = 'max-age=31536000';
  } else {
    headers['X-Robots-Tag'] = 'noindex, nofollow';
  }

  return { headers, inlineScriptHashes: resolvedInlineScriptHashes };
}
