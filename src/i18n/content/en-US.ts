import type { HomeContent } from './types';

export const enUSHomeContent = Object.freeze({
  locale: 'en-US',
  governance: Object.freeze({
    reviewer: 'Product/Content — Bruno Araujo',
    reviewedAt: '2026-07-30',
    status: 'approved',
  }),
  seo: Object.freeze({
    title: 'Rental Property Financial Tracking | FinnTrack Home',
    description:
      "Track rental income, expenses, and overdue bills. Review each property's monthly results in one place with FinnTrack Home.",
    canonicalPath: '/en/',
    heading: 'See how each property performs month by month.',
    robots: 'noindex,nofollow',
    type: 'website',
    openGraphLocale: 'en_US',
    socialImageAlt: 'FinnTrack Home — financial tracking for rental property owners.',
  }),
  shell: Object.freeze({
    skipLink: 'Skip to content',
    homeLinkLabel: 'FinnTrack Home — home',
    primaryNavigationLabel: 'Primary navigation',
    mobileNavigationLabel: 'Mobile navigation',
    mobileMenuLabel: 'Menu',
    mobileMenuSupplement: 'navigation',
    languageSelectorLabel: 'Language',
    switchLanguageLabel: 'Switch language to',
    currentLanguageLabel: 'current language',
    footerLabel: 'Footer',
    footerNavigationLabel: 'Footer navigation',
  }),
  header: Object.freeze({
    navigation: Object.freeze([
      Object.freeze({ anchor: 'features', label: 'Features' }),
      Object.freeze({ anchor: 'howItWorks', label: 'How it works' }),
      Object.freeze({ anchor: 'audience', label: "Who it's for" }),
    ]),
    loginLabel: 'Log in',
    signupLabel: 'Create account',
  }),
  hero: Object.freeze({
    eyebrow: 'Financial tracking for rental property owners',
    title: 'See how each property performs month by month.',
    description:
      "Organize rental income, expenses, and overdue bills. Track each property's monthly results in one place.",
    secondaryCtaLabel: 'See how it works',
    dashboardAltText:
      'FinnTrack Home dashboard showing rental income, expenses, monthly balance, overdue bills, period charts, and a property overview.',
    figureCaption: 'Actual product interface with synthetic data for June 2026.',
  }),
  problem: Object.freeze({
    eyebrow: 'The challenge',
    title: "Month-end reporting shouldn't depend on multiple spreadsheets.",
    description:
      'When information is scattered, understanding how each property performed requires repetitive manual checks.',
    situations: Object.freeze([
      'Information spread across different tools.',
      'Bills that can slip through the cracks.',
      'Difficulty calculating net results.',
      'Time-consuming comparisons across properties.',
      'Monthly reporting completed by hand.',
    ]),
  }),
  benefits: Object.freeze({
    eyebrow: 'Benefits',
    title: 'The essentials for tracking your portfolio.',
    description:
      'Organized financial information to help you understand each property and compare results for the period.',
    items: Object.freeze([
      Object.freeze({
        title: 'Monthly results by property',
        description: 'Income, expenses, and balance organized by period.',
        icon: 'monthly-result',
      }),
      Object.freeze({
        title: 'Bills under control',
        description: 'Paid, pending, and overdue items stay visible.',
        icon: 'accounts',
      }),
      Object.freeze({
        title: 'Portfolio comparison',
        description: 'See which properties performed better or worse during the period.',
        icon: 'comparison',
      }),
    ]),
  }),
  howItWorks: Object.freeze({
    eyebrow: 'How it works',
    title: 'From setup to monthly review.',
    description:
      'A simple routine to keep transactions organized and review the results for each period.',
    stepLabel: 'Step',
    steps: Object.freeze([
      Object.freeze({
        title: 'Add your properties.',
        description: 'Keep the properties you track together in one portfolio.',
      }),
      Object.freeze({
        title: 'Track income and expenses.',
        description: "Organize each property's income and bills throughout the month.",
      }),
      Object.freeze({
        title: "Review each month's results.",
        description: 'Review income, expenses, and balance by property and period.',
      }),
    ]),
  }),
  productPreview: Object.freeze({
    eyebrow: 'Product demo',
    title: 'A clear view of your rental portfolio.',
    description:
      'Period KPIs, income and expense charts, and a property overview in one dashboard.',
    badge: 'Product screenshot · synthetic data',
    dashboardAltText:
      'FinnTrack Home dashboard showing rental income, expenses, monthly balance, overdue bills, period charts, and a property overview.',
    caption: 'Dashboard from the demo environment for June 2026; all displayed data is synthetic.',
  }),
  audience: Object.freeze({
    eyebrow: "Who it's for",
    title: 'Built for owners who manage their own portfolios.',
    description:
      'A centralized financial view for tracking small portfolios without relying on scattered tools.',
    profiles: Object.freeze([
      Object.freeze({
        title: 'Rental property owners',
        description: 'For people who track income, expenses, and bills for their own properties.',
      }),
      Object.freeze({
        title: 'Small-scale real estate investors',
        description: 'For people who need to compare property results over time.',
      }),
      Object.freeze({
        title: 'Anyone moving beyond spreadsheets',
        description: "Bring your portfolio's financial view together in one dashboard.",
      }),
    ]),
    scopeLabel: 'Scope limitation:',
    limitation:
      'FinnTrack Home is a financial dashboard for small portfolios. It is not a full property management system for large companies.',
  }),
  faq: Object.freeze({
    eyebrow: 'Frequently asked questions',
    title: 'Common questions, straightforward answers.',
    description: 'See how FinnTrack Home fits the routine of people who manage a small portfolio.',
    items: Object.freeze([
      Object.freeze({
        id: 'installation',
        question: 'Do I need to install anything?',
        answer:
          'No. FinnTrack Home works on the web and can be accessed directly from your browser.',
      }),
      Object.freeze({
        id: 'multiple-properties',
        question: 'Can I track multiple properties?',
        answer:
          'Yes. An account can currently add up to three properties and track income, expenses, and monthly results by property and period.',
      }),
      Object.freeze({
        id: 'tracked-information',
        question: 'What information can I track?',
        answer:
          'Properties, income, expenses, paid, pending, and overdue bills, monthly results, and portfolio comparisons.',
      }),
      Object.freeze({
        id: 'data-protection',
        question: 'How is my data protected?',
        answer:
          'The app uses authentication and user-level access rules. No system eliminates all risks; review the Privacy Policy to understand how data is handled.',
      }),
      Object.freeze({
        id: 'professional-scope',
        question: 'Does FinnTrack Home replace a property manager or accountant?',
        answer:
          "No. It organizes and presents your portfolio's financial information; it does not replace accounting, legal, or property management services.",
      }),
      Object.freeze({
        id: 'mobile-use',
        question: 'Can I use it on my phone?',
        answer: 'Yes. The app works in a browser and adapts to smaller screens.',
      }),
    ]),
  }),
  finalCta: Object.freeze({
    eyebrow: 'Start organizing your portfolio',
    title: 'See how each property performs.',
    description: 'Bring income, expenses, and bills together to review each month more clearly.',
  }),
  footer: Object.freeze({
    description: 'Financial tracking for rental property owners and small portfolios.',
    loginLabel: 'Log in',
    privacyLabel: 'Privacy',
    termsLabel: 'Terms',
    supportLabel: 'Support',
    rightsLabel: 'All rights reserved.',
    supportEmail: 'jobslens.ia@gmail.com',
    legalLinksAvailable: false,
  }),
} satisfies HomeContent);
