import type { Locale } from './locales';

export type LocalizedRouteName = 'home' | 'login' | 'privacy' | 'terms';
export type HomeAnchor = 'features' | 'howItWorks' | 'audience' | 'demo';

export const localizedRoutes = Object.freeze({
  home: Object.freeze({ 'pt-BR': '/', 'en-US': '/en/' }),
  login: Object.freeze({ 'pt-BR': '/entrar', 'en-US': '/en/login' }),
  privacy: Object.freeze({ 'pt-BR': '/privacidade', 'en-US': '/en/privacy' }),
  terms: Object.freeze({ 'pt-BR': '/termos', 'en-US': '/en/terms' }),
} satisfies Record<LocalizedRouteName, Record<Locale, `/${string}`>>);

export const homeAnchors = Object.freeze({
  'pt-BR': Object.freeze({
    features: 'recursos',
    howItWorks: 'como-funciona',
    audience: 'para-quem',
    demo: 'demonstracao',
  }),
  'en-US': Object.freeze({
    features: 'features',
    howItWorks: 'how-it-works',
    audience: 'who-its-for',
    demo: 'product-demo',
  }),
} satisfies Record<Locale, Record<HomeAnchor, string>>);

export function getLocalizedRoute(route: LocalizedRouteName, locale: Locale): `/${string}` {
  return localizedRoutes[route][locale];
}

export function getHomeAnchor(locale: Locale, anchor: HomeAnchor): string {
  return homeAnchors[locale][anchor];
}

export function getHomeAnchorHref(locale: Locale, anchor: HomeAnchor): `#${string}` {
  return `#${getHomeAnchor(locale, anchor)}`;
}
