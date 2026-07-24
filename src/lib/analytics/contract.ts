import { UTM_KEYS, type AllowedUtms } from '../navigation/utm.ts';

export const CTA_LOCATIONS = ['header', 'hero', 'middle', 'footer'] as const;
export const DESTINATION_TYPES = ['signup', 'login'] as const;
export const DEVICE_GROUPS = ['mobile', 'tablet', 'desktop'] as const;
export const REFERRER_GROUPS = [
  'direct',
  'organic',
  'social',
  'referral',
  'paid',
  'unknown',
] as const;
export const ANALYTICS_EVENTS = [
  'landing_view',
  'signup_cta_click',
  'login_click',
  'secondary_cta_click',
  'product_preview_view',
  'faq_open',
  'outbound_to_app',
] as const;

export type CtaLocation = (typeof CTA_LOCATIONS)[number];
export type DestinationType = (typeof DESTINATION_TYPES)[number];
export type DeviceGroup = (typeof DEVICE_GROUPS)[number];
export type ReferrerGroup = (typeof REFERRER_GROUPS)[number];

interface PageProperties {
  readonly page_path: string;
}

interface DeviceProperties {
  readonly device_group: DeviceGroup;
}

interface CtaProperties {
  readonly cta_location: CtaLocation;
}

export type LandingViewProperties = PageProperties &
  DeviceProperties &
  AllowedUtms & {
    readonly referrer_group: ReferrerGroup;
  };

export interface AnalyticsEventProperties {
  landing_view: LandingViewProperties;
  signup_cta_click: PageProperties & DeviceProperties & CtaProperties & AllowedUtms;
  login_click: PageProperties & DeviceProperties & CtaProperties & AllowedUtms;
  secondary_cta_click: PageProperties & DeviceProperties & CtaProperties;
  product_preview_view: PageProperties & DeviceProperties;
  faq_open: PageProperties & {
    readonly faq_id: string;
  };
  outbound_to_app: PageProperties &
    CtaProperties &
    AllowedUtms & {
      readonly destination_type: DestinationType;
    };
}

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export const ANALYTICS_PROPERTY_KEYS = {
  landing_view: ['page_path', 'referrer_group', ...UTM_KEYS, 'device_group'],
  signup_cta_click: ['cta_location', 'page_path', ...UTM_KEYS, 'device_group'],
  login_click: ['cta_location', 'page_path', ...UTM_KEYS, 'device_group'],
  secondary_cta_click: ['cta_location', 'page_path', 'device_group'],
  product_preview_view: ['page_path', 'device_group'],
  faq_open: ['faq_id', 'page_path'],
  outbound_to_app: ['destination_type', 'cta_location', 'page_path', ...UTM_KEYS],
} as const satisfies Record<AnalyticsEvent, readonly string[]>;

export interface AnalyticsClient {
  page(name: 'landing_view', properties: LandingViewProperties): void;
  track<Event extends AnalyticsEvent>(
    event: Event,
    properties: AnalyticsEventProperties[Event],
  ): void;
}
