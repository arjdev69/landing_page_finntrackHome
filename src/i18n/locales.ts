export const supportedLocales = ['pt-BR', 'en-US'] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = 'pt-BR';

export const localeConfig = Object.freeze({
  'pt-BR': Object.freeze({
    path: '/',
    pathPrefix: '',
    openGraphLocale: 'pt_BR',
    visualLabel: 'PT-BR',
    accessibleName: 'Português (Brasil)',
  }),
  'en-US': Object.freeze({
    path: '/en/',
    pathPrefix: '/en',
    openGraphLocale: 'en_US',
    visualLabel: 'EN-US',
    accessibleName: 'English (US)',
  }),
} satisfies Record<
  Locale,
  Readonly<{
    path: `/${string}`;
    pathPrefix: string;
    openGraphLocale: string;
    visualLabel: string;
    accessibleName: string;
  }>
>);

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function assertLocale(value: string): asserts value is Locale {
  if (!isLocale(value)) {
    throw new Error(`[i18n] locale não suportado: ${value}`);
  }
}
