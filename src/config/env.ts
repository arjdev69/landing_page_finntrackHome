export const PUBLIC_ENV_KEYS = [
  'PUBLIC_SITE_URL',
  'PUBLIC_APP_URL',
  'PUBLIC_APP_SIGNUP_URL',
  'PUBLIC_APP_LOGIN_URL',
  'PUBLIC_ANALYTICS_ID',
  'PUBLIC_SEARCH_CONSOLE_VERIFICATION',
  'PUBLIC_ENVIRONMENT',
] as const;

export type PublicEnvKey = (typeof PUBLIC_ENV_KEYS)[number];
export type PublicEnvironment = 'production' | 'preview';
export type PublicEnvInput = Partial<Record<PublicEnvKey, string | undefined>>;

export interface PublicConfig {
  readonly environment: PublicEnvironment;
  readonly siteUrl: string;
  readonly appUrl: string;
  readonly appSignupUrl: string;
  readonly appLoginUrl: string;
  readonly analyticsId?: string;
  readonly searchConsoleVerification?: string;
}

interface ValidationIssue {
  readonly key: PublicEnvKey;
  readonly message: string;
}

interface UrlRule {
  readonly originOnly: boolean;
  readonly environment: PublicEnvironment;
}

const REQUIRED_URL_KEYS = [
  'PUBLIC_SITE_URL',
  'PUBLIC_APP_URL',
  'PUBLIC_APP_SIGNUP_URL',
  'PUBLIC_APP_LOGIN_URL',
] as const;

const PLACEHOLDER_TEXT =
  /(?:change[-_ ]?me|placeholder|todo|your[-_ ]?(?:domain|url)|seu[-_ ]?dominio)/i;
const RESERVED_HOST = /(?:^|\.)(?:example\.(?:com|net|org)|example|invalid|test)$/i;

export class PublicEnvValidationError extends Error {
  readonly issues: readonly ValidationIssue[];

  constructor(issues: readonly ValidationIssue[]) {
    super(
      `[env] Configuração pública inválida:\n${issues
        .map(({ key, message }) => `- ${key}: ${message}`)
        .join('\n')}`,
    );
    this.name = 'PublicEnvValidationError';
    this.issues = issues;
  }
}

function requiredValue(
  input: PublicEnvInput,
  key: PublicEnvKey,
  issues: ValidationIssue[],
): string | undefined {
  const value = input[key]?.trim();

  if (!value) {
    issues.push({
      key,
      message: 'é obrigatória para builds de production e preview',
    });
    return undefined;
  }

  return value;
}

function isLoopback(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function parsePublicUrl(
  key: (typeof REQUIRED_URL_KEYS)[number],
  value: string,
  rule: UrlRule,
  issues: ValidationIssue[],
): string | undefined {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    issues.push({ key, message: 'deve ser uma URL absoluta válida' });
    return undefined;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    issues.push({ key, message: 'deve usar o protocolo HTTPS' });
  }

  if (url.username || url.password) {
    issues.push({ key, message: 'não pode conter credenciais embutidas' });
  }

  if (rule.originOnly && (url.pathname !== '/' || url.search || url.hash)) {
    issues.push({ key, message: 'deve conter somente a origem, sem path, query ou fragmento' });
  }

  const httpAllowedForLocalPreview =
    rule.environment === 'preview' && url.protocol === 'http:' && isLoopback(url.hostname);

  if (url.protocol !== 'https:' && !httpAllowedForLocalPreview) {
    issues.push({
      key,
      message: 'deve usar HTTPS; HTTP só é aceito em preview para localhost/loopback',
    });
  }

  if (
    rule.environment === 'production' &&
    (isLoopback(url.hostname) || RESERVED_HOST.test(url.hostname) || PLACEHOLDER_TEXT.test(value))
  ) {
    issues.push({
      key,
      message: 'não pode usar host local, reservado ou valor placeholder em produção',
    });
  }

  return rule.originOnly ? url.origin : url.href;
}

function optionalPublicValue(
  input: PublicEnvInput,
  key: 'PUBLIC_ANALYTICS_ID' | 'PUBLIC_SEARCH_CONSOLE_VERIFICATION',
  environment: PublicEnvironment,
  issues: ValidationIssue[],
): string | undefined {
  const value = input[key]?.trim();

  if (!value) {
    return undefined;
  }

  if (environment === 'production' && PLACEHOLDER_TEXT.test(value)) {
    issues.push({ key, message: 'não pode usar valor placeholder em produção' });
  }

  return value;
}

export function validatePublicEnv(input: PublicEnvInput): Readonly<PublicConfig> {
  const issues: ValidationIssue[] = [];
  const environmentValue = requiredValue(input, 'PUBLIC_ENVIRONMENT', issues);
  const environment =
    environmentValue === 'production' || environmentValue === 'preview'
      ? environmentValue
      : undefined;

  if (environmentValue && !environment) {
    issues.push({
      key: 'PUBLIC_ENVIRONMENT',
      message: 'deve ser exatamente "production" ou "preview"',
    });
  }

  const rawUrls = Object.fromEntries(
    REQUIRED_URL_KEYS.map((key) => [key, requiredValue(input, key, issues)]),
  ) as Record<(typeof REQUIRED_URL_KEYS)[number], string | undefined>;

  if (!environment) {
    throw new PublicEnvValidationError(issues);
  }

  const siteUrl = rawUrls.PUBLIC_SITE_URL
    ? parsePublicUrl(
        'PUBLIC_SITE_URL',
        rawUrls.PUBLIC_SITE_URL,
        { originOnly: true, environment },
        issues,
      )
    : undefined;
  const appUrl = rawUrls.PUBLIC_APP_URL
    ? parsePublicUrl(
        'PUBLIC_APP_URL',
        rawUrls.PUBLIC_APP_URL,
        { originOnly: true, environment },
        issues,
      )
    : undefined;
  const appSignupUrl = rawUrls.PUBLIC_APP_SIGNUP_URL
    ? parsePublicUrl(
        'PUBLIC_APP_SIGNUP_URL',
        rawUrls.PUBLIC_APP_SIGNUP_URL,
        { originOnly: false, environment },
        issues,
      )
    : undefined;
  const appLoginUrl = rawUrls.PUBLIC_APP_LOGIN_URL
    ? parsePublicUrl(
        'PUBLIC_APP_LOGIN_URL',
        rawUrls.PUBLIC_APP_LOGIN_URL,
        { originOnly: false, environment },
        issues,
      )
    : undefined;
  const analyticsId = optionalPublicValue(input, 'PUBLIC_ANALYTICS_ID', environment, issues);
  const searchConsoleVerification = optionalPublicValue(
    input,
    'PUBLIC_SEARCH_CONSOLE_VERIFICATION',
    environment,
    issues,
  );

  if (!siteUrl || !appUrl || !appSignupUrl || !appLoginUrl || issues.length > 0) {
    throw new PublicEnvValidationError(issues);
  }

  return Object.freeze({
    environment,
    siteUrl,
    appUrl,
    appSignupUrl,
    appLoginUrl,
    ...(analyticsId ? { analyticsId } : {}),
    ...(searchConsoleVerification ? { searchConsoleVerification } : {}),
  });
}
