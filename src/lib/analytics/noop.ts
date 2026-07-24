import type {
  AnalyticsClient,
  AnalyticsEvent,
  AnalyticsEventProperties,
  LandingViewProperties,
} from './contract.ts';

export class NoopAnalytics implements AnalyticsClient {
  page(name: 'landing_view', properties: LandingViewProperties): void {
    void name;
    void properties;
  }

  track<Event extends AnalyticsEvent>(
    event: Event,
    properties: AnalyticsEventProperties[Event],
  ): void {
    void event;
    void properties;
  }
}
