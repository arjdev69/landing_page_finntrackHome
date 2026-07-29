import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

const documentUrls = {
  prd: new URL('../docs/02-PRD.md', import.meta.url),
  srs: new URL('../docs/03-SRS.md', import.meta.url),
  design: new URL('../docs/04-SDD.md', import.meta.url),
  analytics: new URL('../docs/06-SEO-ANALYTICS-SPEC.md', import.meta.url),
  security: new URL('../docs/07-SECURITY-PRIVACY.md', import.meta.url),
  tests: new URL('../docs/08-TEST-PLAN.md', import.meta.url),
  backlog: new URL('../docs/09-BACKLOG.md', import.meta.url),
  decisions: new URL('../docs/10-DECISION-LOG.md', import.meta.url),
};

async function readDocuments() {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(documentUrls).map(async ([name, url]) => [name, await readFile(url, 'utf8')]),
    ),
  );
}

test('INT-004 approves direct app routes and the in-memory acquisition contract', async () => {
  const documents = await readDocuments();

  assert.match(documents.decisions, /DEC-004[\s\S]*Status: \*\*Aceita para o MVP da landing\*\*/);
  assert.match(documents.decisions, /nenhum provedor está ativo no MVP publicado/i);
  assert.match(documents.srs, /FR-UTM-006[\s\S]*NÃO DEVE reter campanha/i);
  assert.match(
    documents.srs,
    /FR-UTM-007[\s\S]*memória da página no app[\s\S]*sem persistência ou correlação com conta/i,
  );
  assert.match(documents.tests, /T-UTM-002[\s\S]*sem persistência, correlação com conta/i);
  assert.match(documents.backlog, /\[x\] `INT-004`/);
});

test('INT-004 keeps product retention separate and forbids campaign-account correlation', async () => {
  const documents = await readDocuments();

  for (const source of [documents.prd, documents.design, documents.analytics, documents.security]) {
    assert.match(source, /retenção[\s\S]*separad/i);
  }

  assert.match(documents.analytics, /não persistir first-touch\/last-touch/i);
  assert.match(documents.analytics, /(?:não|nem) associar campanha à conta/i);
  assert.match(documents.security, /não as associa à conta/i);
  assert.match(documents.decisions, /correlação de UTM com conta[\s\S]*exige nova\s+decisão/i);
  assert.doesNotMatch(
    documents.analytics,
    /Conversão landing → cadastro exige evento correlacionável/,
  );
  assert.doesNotMatch(documents.analytics, /associar campanha à criação de conta/);
});
