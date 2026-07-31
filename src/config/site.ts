import { PUBLIC_ENVIRONMENT, PUBLIC_SITE_URL } from 'astro:env/server';
import process from 'node:process';

import { resolveDeploymentEnvironment } from '@config/deployment-environment';
import { ptBRHomeContent } from '@i18n/content/pt-BR';
import { defaultLocale, localeConfig } from '@i18n/locales';
import type { PageSeoDefinition, PublicEnvironment } from '@lib/seo/metadata';

export const siteConfig = Object.freeze({
  name: 'FinnTrack Home',
  language: defaultLocale,
  openGraphLocale: localeConfig[defaultLocale].openGraphLocale,
  faviconPath: '/favicon.png',
  appleTouchIconPath: '/apple-touch-icon.png',
  socialImageAlt: ptBRHomeContent.seo.socialImageAlt,
  googleSiteVerifications: Object.freeze([
    '4QKruYz5C39n-OzQwi5ZszK4DshkoBMnxpea5t_qkbY',
    'YPatDH2g5pRgsAYJEMmQrEDriF1TlSkVV_nFH32ur_E',
  ]),
});

export const homeSeo = ptBRHomeContent.seo satisfies PageSeoDefinition;

export const privacySeo = Object.freeze({
  title: 'Política de Privacidade | FinnTrack Home',
  description:
    'Entenda quais dados o FinnTrack Home utiliza, para quais finalidades e como solicitar acesso, correção ou exclusão.',
  canonicalPath: '/privacidade',
  heading: 'Política de Privacidade',
  robots: 'noindex,follow',
  type: 'article',
}) satisfies PageSeoDefinition;

export const termsSeo = Object.freeze({
  title: 'Termos de Uso | FinnTrack Home',
  description:
    'Conheça as condições de uso do FinnTrack Home durante a fase gratuita de validação do produto.',
  canonicalPath: '/termos',
  heading: 'Termos de Uso',
  robots: 'noindex,follow',
  type: 'article',
}) satisfies PageSeoDefinition;

export const loginFallbackSeo = Object.freeze({
  title: 'Entrar | FinnTrack Home',
  description: 'Acesse sua conta do FinnTrack Home pelo endereço oficial do aplicativo.',
  canonicalPath: '/entrar',
  heading: 'Entrar no FinnTrack Home',
  robots: 'noindex,nofollow',
  type: 'website',
}) satisfies PageSeoDefinition;

export const notFoundSeo = Object.freeze({
  title: 'Página não encontrada | FinnTrack Home',
  description: 'A página solicitada não foi encontrada. Volte à página inicial do FinnTrack Home.',
  canonicalPath: '/404',
  heading: 'Página não encontrada',
  robots: 'noindex,nofollow',
  type: 'website',
}) satisfies PageSeoDefinition;

export function getRuntimeSiteConfig(fallbackUrl: URL): Readonly<{
  environment: PublicEnvironment;
  origin: string;
}> {
  const configuredOrigin = PUBLIC_SITE_URL ? new URL(PUBLIC_SITE_URL).origin : fallbackUrl.origin;

  return Object.freeze({
    environment: resolveDeploymentEnvironment(
      PUBLIC_ENVIRONMENT ?? 'preview',
      process.env.VERCEL_ENV,
    ),
    origin: configuredOrigin,
  });
}
