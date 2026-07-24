export type PublicEnvironment = 'production' | 'preview';
export type RobotsDirective = 'index,follow' | 'noindex,follow' | 'noindex,nofollow';
export type OpenGraphType = 'website' | 'article';

export interface PageSeoDefinition {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: `/${string}`;
  readonly heading: string;
  readonly imagePath?: `/${string}`;
  readonly robots?: RobotsDirective;
  readonly type?: OpenGraphType;
}

export interface ResolvedSeoMetadata {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  readonly image?: string;
  readonly robots: RobotsDirective;
  readonly type: OpenGraphType;
}

function resolveSiteUrl(siteOrigin: string, path: string, field: string): string {
  const origin = new URL(siteOrigin);
  const resolved = new URL(path, origin);

  if (resolved.origin !== origin.origin) {
    throw new Error(`[seo] ${field} deve permanecer na origem configurada do site`);
  }

  resolved.hash = '';
  resolved.search = '';
  return resolved.href;
}

export function resolveSeoMetadata(
  siteOrigin: string,
  definition: PageSeoDefinition,
  environment: PublicEnvironment,
): Readonly<ResolvedSeoMetadata> {
  const robots =
    environment === 'preview' ? 'noindex,nofollow' : (definition.robots ?? 'index,follow');

  return Object.freeze({
    title: definition.title,
    description: definition.description,
    canonical: resolveSiteUrl(siteOrigin, definition.canonicalPath, 'canonical'),
    ...(definition.imagePath
      ? { image: resolveSiteUrl(siteOrigin, definition.imagePath, 'imagem social') }
      : {}),
    robots,
    type: definition.type ?? 'website',
  });
}
