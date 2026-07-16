import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['.astro/**', 'coverage/**', 'dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  eslintConfigPrettier,
];
