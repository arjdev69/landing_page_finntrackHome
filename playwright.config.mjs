import { defineConfig, devices } from '@playwright/test';

const previewEnvironment = {
  PUBLIC_ENVIRONMENT: 'preview',
  PUBLIC_SITE_URL: 'http://127.0.0.1:4321',
  PUBLIC_APP_URL: 'https://finntrackhome.app',
  PUBLIC_APP_SIGNUP_URL: 'https://finntrackhome.app/cadastro',
  PUBLIC_APP_LOGIN_URL: 'https://finntrackhome.app/entrar',
};

export default defineConfig({
  testDir: './test/e2e',
  testMatch: '**/*.e2e.mjs',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'artifacts/playwright/html' }]],
  outputDir: 'artifacts/playwright/test-results',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 360, height: 800 } },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321/',
    env: previewEnvironment,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
