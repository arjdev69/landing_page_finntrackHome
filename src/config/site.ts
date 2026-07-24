import { PUBLIC_ENVIRONMENT, PUBLIC_SITE_URL } from 'astro:env/server';

import type { PageSeoDefinition, PublicEnvironment } from '@lib/seo/metadata';

export const siteConfig = Object.freeze({
  name: 'FinnTrack Home',
  language: 'pt-BR',
  openGraphLocale: 'pt_BR',
  faviconPath: '/favicon.png',
  appleTouchIconPath: '/apple-touch-icon.png',
  socialImageAlt: 'FinnTrack Home — controle financeiro para proprietários de imóveis.',
});

export const homeSeo = Object.freeze({
  title: 'Controle Financeiro de Imóveis e Aluguéis | FinnTrack Home',
  description:
    'Organize receitas, despesas e contas vencidas dos seus imóveis. Acompanhe o resultado mensal de cada propriedade com o FinnTrack Home.',
  canonicalPath: '/',
  imagePath: '/social-card.png',
  heading: 'Saiba quais imóveis realmente dão lucro.',
  type: 'website',
}) satisfies PageSeoDefinition;

export function getRuntimeSiteConfig(fallbackUrl: URL): Readonly<{
  environment: PublicEnvironment;
  origin: string;
}> {
  const configuredOrigin = PUBLIC_SITE_URL ? new URL(PUBLIC_SITE_URL).origin : fallbackUrl.origin;

  return Object.freeze({
    environment: PUBLIC_ENVIRONMENT ?? 'preview',
    origin: configuredOrigin,
  });
}
