import { readAllowedUtms } from '../navigation/utm.ts';
import { classifyDeviceGroup, classifyReferrerGroup } from './classification.ts';
import type {
  AnalyticsClient,
  AnalyticsEvent,
  AnalyticsEventProperties,
  CtaLocation,
  DestinationType,
} from './contract.ts';

export interface PageAnalyticsSignals {
  readonly referrer: string;
  readonly url: URL;
  readonly viewportWidth: number;
}

export interface AppLinkIntent {
  readonly ctaLocation: CtaLocation;
  readonly destinationType: DestinationType;
}

function safePage(
  client: AnalyticsClient,
  properties: AnalyticsEventProperties['landing_view'],
): void {
  try {
    client.page('landing_view', properties);
  } catch {
    // A falha do adaptador nunca deve afetar a página.
  }
}

function safeTrack<Event extends AnalyticsEvent>(
  client: AnalyticsClient,
  event: Event,
  properties: AnalyticsEventProperties[Event],
): void {
  try {
    client.track(event, properties);
  } catch {
    // A falha do adaptador nunca deve afetar a interação ou navegação.
  }
}

export function createPageAnalytics(client: AnalyticsClient, signals: PageAnalyticsSignals) {
  const pagePath = signals.url.pathname;
  const utms = readAllowedUtms(signals.url);
  const deviceGroup = classifyDeviceGroup(signals.viewportWidth);
  const referrerGroup = classifyReferrerGroup({
    currentHostname: signals.url.hostname,
    referrer: signals.referrer,
    utmMedium: utms.utm_medium,
    utmSource: utms.utm_source,
  });
  let landingViewed = false;
  let productPreviewViewed = false;

  return {
    viewLanding(): void {
      if (pagePath !== '/' || landingViewed) return;

      landingViewed = true;
      safePage(client, {
        page_path: pagePath,
        referrer_group: referrerGroup,
        ...utms,
        device_group: deviceGroup,
      });
    },

    clickAppLink(intent: AppLinkIntent): void {
      const clickProperties = {
        cta_location: intent.ctaLocation,
        page_path: pagePath,
        ...utms,
        device_group: deviceGroup,
      };

      safeTrack(
        client,
        intent.destinationType === 'signup' ? 'signup_cta_click' : 'login_click',
        clickProperties,
      );
      safeTrack(client, 'outbound_to_app', {
        destination_type: intent.destinationType,
        cta_location: intent.ctaLocation,
        page_path: pagePath,
        ...utms,
      });
    },

    clickSecondary(ctaLocation: CtaLocation): void {
      safeTrack(client, 'secondary_cta_click', {
        cta_location: ctaLocation,
        page_path: pagePath,
        device_group: deviceGroup,
      });
    },

    viewProductPreview(): void {
      if (productPreviewViewed) return;

      productPreviewViewed = true;
      safeTrack(client, 'product_preview_view', {
        page_path: pagePath,
        device_group: deviceGroup,
      });
    },

    openFaq(faqId: string): void {
      if (faqId.length === 0) return;

      safeTrack(client, 'faq_open', {
        faq_id: faqId,
        page_path: pagePath,
      });
    },
  };
}

export type PageAnalytics = ReturnType<typeof createPageAnalytics>;
