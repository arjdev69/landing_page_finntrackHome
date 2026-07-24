import process from 'node:process';

import { loadEnv } from 'vite';

import { validatePublicEnv } from '../src/config/env.ts';

const mode = process.env.PUBLIC_ENVIRONMENT === 'preview' ? 'preview' : 'production';

validatePublicEnv(loadEnv(mode, process.cwd(), ''));
