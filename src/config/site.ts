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
    environment: PUBLIC_ENVIRONMENT ?? 'preview',
    origin: configuredOrigin,
  });
}
