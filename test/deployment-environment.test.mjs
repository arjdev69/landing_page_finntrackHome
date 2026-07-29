import assert from 'node:assert/strict';
import test from 'node:test';

import { resolveDeploymentEnvironment } from '../src/config/deployment-environment.ts';

test('Vercel preview prevalece sobre configuração pública de produção', () => {
  assert.equal(resolveDeploymentEnvironment('production', 'preview'), 'preview');
  assert.equal(resolveDeploymentEnvironment('production', 'development'), 'preview');
  assert.equal(resolveDeploymentEnvironment('production', 'unknown'), 'preview');
});

test('produção exige concordância entre configuração pública e Vercel', () => {
  assert.equal(resolveDeploymentEnvironment('production', 'production'), 'production');
  assert.equal(resolveDeploymentEnvironment('preview', 'production'), 'preview');
  assert.equal(resolveDeploymentEnvironment('preview', undefined), 'preview');
  assert.equal(resolveDeploymentEnvironment('production', undefined), 'production');
});
