import type { PageSeoDefinition } from '@lib/seo/metadata';

import type { Locale } from '../locales';
import type { HomeAnchor } from '../routes';

export type BenefitIcon = 'monthly-result' | 'accounts' | 'comparison';

export interface HomeContent {
  readonly locale: Locale;
  readonly governance: Readonly<{
    reviewer: string;
    reviewedAt: string;
    status: 'approved';
  }>;
  readonly seo: PageSeoDefinition &
    Readonly<{
      openGraphLocale: string;
      socialImageAlt: string;
    }>;
  readonly shell: Readonly<{
    skipLink: string;
    homeLinkLabel: string;
    primaryNavigationLabel: string;
    mobileNavigationLabel: string;
    mobileMenuLabel: string;
    mobileMenuSupplement: string;
    languageSelectorLabel: string;
    switchLanguageLabel: string;
    currentLanguageLabel: string;
    footerLabel: string;
    footerNavigationLabel: string;
  }>;
  readonly header: Readonly<{
    navigation: readonly Readonly<{ anchor: HomeAnchor; label: string }>[];
    loginLabel: string;
    signupLabel: string;
  }>;
  readonly hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    secondaryCtaLabel: string;
    dashboardAltText: string;
    figureCaption: string;
  }>;
  readonly problem: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    situations: readonly string[];
  }>;
  readonly benefits: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    items: readonly Readonly<{
      title: string;
      description: string;
      icon: BenefitIcon;
    }>[];
  }>;
  readonly howItWorks: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    stepLabel: string;
    steps: readonly Readonly<{ title: string; description: string }>[];
  }>;
  readonly productPreview: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    dashboardAltText: string;
    caption: string;
  }>;
  readonly audience: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    profiles: readonly Readonly<{ title: string; description: string }>[];
    scopeLabel: string;
    limitation: string;
  }>;
  readonly faq: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    items: readonly Readonly<{ id: string; question: string; answer: string }>[];
  }>;
  readonly finalCta: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
  }>;
  readonly footer: Readonly<{
    description: string;
    loginLabel: string;
    privacyLabel: string;
    termsLabel: string;
    supportLabel: string;
    rightsLabel: string;
    supportEmail: string;
    legalLinksAvailable: boolean;
  }>;
}
