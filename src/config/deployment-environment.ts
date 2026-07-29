import type { PublicEnvironment } from '@lib/seo/metadata';

export function resolveDeploymentEnvironment(
  configuredEnvironment: PublicEnvironment,
  vercelEnvironment: string | undefined,
): PublicEnvironment {
  if (vercelEnvironment === undefined) return configuredEnvironment;

  return vercelEnvironment === 'production' && configuredEnvironment === 'production'
    ? 'production'
    : 'preview';
}
