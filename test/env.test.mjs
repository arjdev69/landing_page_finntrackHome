import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import test from 'node:test';

import { PUBLIC_ENV_KEYS, PublicEnvValidationError, validatePublicEnv } from '../src/config/env.ts';

const validProductionEnv = {
  PUBLIC_ENVIRONMENT: 'production',
  PUBLIC_SITE_URL: 'https://www.finntrack-home.com.br',
  PUBLIC_APP_URL: 'https://app.finntrack-home.com.br',
  PUBLIC_APP_SIGNUP_URL: 'https://app.finntrack-home.com.br/cadastro?source=landing',
  PUBLIC_APP_LOGIN_URL: 'https://app.finntrack-home.com.br/entrar',
};

test('returns a normalized, typed public production configuration', () => {
  const config = validatePublicEnv({
    ...validProductionEnv,
    PUBLIC_ANALYTICS_ID: ' analytics-public-id ',
  });

  assert.deepEqual(config, {
    environment: 'production',
    siteUrl: 'https://www.finntrack-home.com.br',
    appUrl: 'https://app.finntrack-home.com.br',
    appSignupUrl: 'https://app.finntrack-home.com.br/cadastro?source=landing',
    appLoginUrl: 'https://app.finntrack-home.com.br/entrar',
    analyticsId: 'analytics-public-id',
  });
  assert.equal(Object.isFrozen(config), true);
});

test('accepts HTTP only for loopback preview URLs', () => {
  const config = validatePublicEnv({
    PUBLIC_ENVIRONMENT: 'preview',
    PUBLIC_SITE_URL: 'http://localhost:4321',
    PUBLIC_APP_URL: 'http://127.0.0.1:3000',
    PUBLIC_APP_SIGNUP_URL: 'http://127.0.0.1:3000/cadastro',
    PUBLIC_APP_LOGIN_URL: 'http://127.0.0.1:3000/entrar',
  });

  assert.equal(config.environment, 'preview');
  assert.equal(config.siteUrl, 'http://localhost:4321');
});

test('reports every missing required public variable without echoing values', () => {
  assert.throws(
    () => validatePublicEnv({}),
    (error) => {
      assert.ok(error instanceof PublicEnvValidationError);
      assert.equal(error.issues.length, 5);
      assert.match(error.message, /PUBLIC_ENVIRONMENT/);
      assert.match(error.message, /PUBLIC_APP_SIGNUP_URL/);
      return true;
    },
  );
});

test('rejects non-canonical origins, insecure production URLs and placeholders', () => {
  assert.throws(
    () =>
      validatePublicEnv({
        ...validProductionEnv,
        PUBLIC_SITE_URL: 'https://example.com/landing?campaign=test',
        PUBLIC_APP_URL: 'http://localhost:3000',
        PUBLIC_APP_LOGIN_URL: 'javascript:alert(1)',
      }),
    (error) => {
      assert.ok(error instanceof PublicEnvValidationError);
      assert.match(error.message, /PUBLIC_SITE_URL: deve conter somente a origem/);
      assert.match(error.message, /PUBLIC_SITE_URL: não pode usar host local, reservado/);
      assert.match(error.message, /PUBLIC_APP_URL: deve usar HTTPS/);
      assert.match(error.message, /PUBLIC_APP_LOGIN_URL: deve usar o protocolo HTTPS/);
      return true;
    },
  );
});

test('rejects an unsupported environment and production placeholder identifiers', () => {
  assert.throws(
    () => validatePublicEnv({ ...validProductionEnv, PUBLIC_ENVIRONMENT: 'staging' }),
    /deve ser exatamente "production" ou "preview"/,
  );

  assert.throws(
    () => validatePublicEnv({ ...validProductionEnv, PUBLIC_ANALYTICS_ID: 'change-me' }),
    /PUBLIC_ANALYTICS_ID: não pode usar valor placeholder/,
  );
});

test('Astro production build fails when required configuration is absent', () => {
  const npmCli = process.env.npm_execpath;
  assert.ok(npmCli, 'npm_execpath must be available while running npm test');
  const cleanEnv = {
    ...process.env,
    ...Object.fromEntries(PUBLIC_ENV_KEYS.map((key) => [key, ''])),
  };
  const result = spawnSync(process.execPath, [npmCli, 'run', 'build'], {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    env: cleanEnv,
    encoding: 'utf8',
  });
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;

  assert.notEqual(result.status, 0, output);
  assert.match(output, /Configuração pública inválida/);
  assert.match(output, /PUBLIC_ENVIRONMENT/);
  assert.match(output, /PUBLIC_APP_LOGIN_URL/);
});
