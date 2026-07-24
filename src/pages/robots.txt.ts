import type { APIRoute } from 'astro';

import { getRuntimeSiteConfig } from '@config/site';
import { renderRobotsTxt } from '@lib/seo/crawling';

export const prerender = true;

export const GET: APIRoute = ({ url }) => {
  const runtimeConfig = getRuntimeSiteConfig(url);

  return new Response(renderRobotsTxt(runtimeConfig.origin, runtimeConfig.environment), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
