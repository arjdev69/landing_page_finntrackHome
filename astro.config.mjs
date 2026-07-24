import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        url: true,
      }),
      PUBLIC_APP_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        url: true,
      }),
      PUBLIC_APP_SIGNUP_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        url: true,
      }),
      PUBLIC_APP_LOGIN_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        url: true,
      }),
      PUBLIC_ANALYTICS_ID: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      PUBLIC_SEARCH_CONSOLE_VERIFICATION: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      PUBLIC_ENVIRONMENT: envField.enum({
        context: 'server',
        access: 'public',
        optional: true,
        values: ['production', 'preview'],
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
