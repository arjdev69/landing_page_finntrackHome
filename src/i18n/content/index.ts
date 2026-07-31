import type { Locale } from '../locales';
import { enUSHomeContent } from './en-US';
import { ptBRHomeContent } from './pt-BR';
import type { HomeContent } from './types';

export const homeContentByLocale = Object.freeze({
  'pt-BR': ptBRHomeContent,
  'en-US': enUSHomeContent,
} satisfies Record<Locale, HomeContent>);

export function getHomeContent(locale: Locale): HomeContent {
  const content = homeContentByLocale[locale];

  if (!content) {
    throw new Error(`[i18n] catálogo ausente para ${locale}`);
  }

  return content;
}

export type { BenefitIcon, HomeContent } from './types';
