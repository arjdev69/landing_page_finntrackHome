import { appendUtms, readAllowedUtms } from './utm.ts';

export interface LinkWithHref {
  href: string;
}

export function enrichAppLinks(sourceUrl: URL, links: Iterable<LinkWithHref>): void {
  const utms = readAllowedUtms(sourceUrl);

  for (const link of links) {
    try {
      link.href = appendUtms(new URL(link.href), utms).href;
    } catch {
      // A malformed link keeps its original href and does not block other CTAs.
    }
  }
}
