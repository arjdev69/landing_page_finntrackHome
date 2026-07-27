import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

const workflow = await readFile(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
const operations = await readFile(
  new URL('../docs/operations/FND-006-CI-PREVIEWS.md', import.meta.url),
  'utf8',
);

test('FND-006 defines reproducible pull request gates and a preview artifact', () => {
  assert.match(workflow, /^on:\s*[\r\n]+\s+pull_request:/m);
  assert.match(workflow, /\s+push:\s*[\r\n]+\s+branches:\s*[\r\n]+\s+- main/m);
  assert.match(workflow, /\s+workflow_dispatch:/);
  assert.match(workflow, /permissions:\s*[\r\n]+\s+contents: read/);
  assert.match(workflow, /PUBLIC_ENVIRONMENT: preview/);

  const commands = [
    'npm ci',
    'npm run format:check',
    'npm run lint',
    'npm run typecheck',
    'npm test',
    'npm run build',
    'npm run test:e2e',
    'npm run test:perf',
  ];

  let previousIndex = -1;
  for (const command of commands) {
    const commandIndex = workflow.indexOf(`run: ${command}`);
    assert.ok(commandIndex > previousIndex, `${command} must exist after the previous gate`);
    previousIndex = commandIndex;
  }

  assert.match(workflow, /uses: actions\/upload-artifact@v4/);
  assert.match(workflow, /name: preview-static-\$\{\{ github\.sha \}\}/);
  assert.match(workflow, /path: dist\//);
  assert.doesNotMatch(workflow, /pull_request_target|vercel --prod|VERCEL_TOKEN|secrets\./);
});

test('FND-006 documents Vercel preview validation without claiming production rollout', () => {
  assert.match(operations, /Pull requests e\s+branches diferentes da branch de produção/);
  assert.match(operations, /PUBLIC_ENVIRONMENT=preview/);
  assert.match(operations, /Confirmar `noindex` no preview/);
  assert.match(operations, /Produção não é promovida por este workflow/);
  assert.match(operations, /Rollback e smoke de produção\s+permanecem em `REL-002`/);
});
