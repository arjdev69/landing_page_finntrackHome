import type { AnalyticsClient } from './contract.ts';
import { NoopAnalytics } from './noop.ts';

const analyticsClient: AnalyticsClient = new NoopAnalytics();

export function getAnalyticsClient(): AnalyticsClient {
  return analyticsClient;
}
