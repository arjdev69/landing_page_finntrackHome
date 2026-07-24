import type { APIRoute } from 'astro';

import { getRuntimeSiteConfig } from '@config/site';
import { renderSitemapXml } from '@lib/seo/crawling';

export const prerender = true;

export const GET: APIRoute = ({ url }) => {
  const runtimeConfig = getRuntimeSiteConfig(url);

  return new Response(renderSitemapXml(runtimeConfig.origin, runtimeConfig.environment), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
