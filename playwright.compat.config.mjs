import { defineConfig } from '@playwright/test';

const previewEnvironment = {
  PUBLIC_ENVIRONMENT: 'preview',
  PUBLIC_SITE_URL: 'http://127.0.0.1:4321',
  PUBLIC_APP_URL: 'https://app.finntrack-home.com.br',
  PUBLIC_APP_SIGNUP_URL: 'https://app.finntrack-home.com.br/cadastro',
  PUBLIC_APP_LOGIN_URL: 'https://app.finntrack-home.com.br/entrar',
};

export default defineConfig({
  testDir: './test/e2e',
  testMatch: 'compatibility.e2e.mjs',
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'artifacts/playwright/compatibility-report' }],
  ],
  outputDir: 'artifacts/playwright/compatibility-results',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium-bundled', use: { browserName: 'chromium' } },
    { name: 'edge-stable', use: { browserName: 'chromium', channel: 'msedge' } },
    { name: 'firefox-bundled', use: { browserName: 'firefox' } },
    { name: 'webkit-bundled', use: { browserName: 'webkit' } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321/',
    env: previewEnvironment,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
