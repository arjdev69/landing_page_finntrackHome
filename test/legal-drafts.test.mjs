import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

const privacyUrl = new URL('../docs/legal/PRIVACIDADE-RASCUNHO.md', import.meta.url);
const termsUrl = new URL('../docs/legal/TERMOS-RASCUNHO.md', import.meta.url);
const approvalUrl = new URL('../docs/legal/APROVACAO-LEGAL.md', import.meta.url);

test('LEG-001 drafts are dated, traceable and explicitly blocked from publication', async () => {
  const [privacy, terms, approval] = await Promise.all([
    readFile(privacyUrl, 'utf8'),
    readFile(termsUrl, 'utf8'),
    readFile(approvalUrl, 'utf8'),
  ]);

  for (const document of [privacy, terms]) {
    assert.match(document, /^# RASCUNHO — NÃO APROVADO PARA PUBLICAÇÃO/m);
    assert.match(document, /Data da minuta: 2026-07-21/);
    assert.match(document, /jobslens\.ia@gmail\.com/);
    assert.doesNotMatch(document, /lorem ipsum|TODO|TBD|\[preencher\]/i);
  }

  assert.match(approval, /Status: bloqueado para publicação/);
  assert.match(approval, /validação factual[\s\S]*pendente/i);
  assert.match(approval, /revisão jurídica brasileira[\s\S]*pendente/i);
  assert.match(approval, /aceite final para publicação[\s\S]*pendente/i);
  assert.doesNotMatch(approval, /agente jurídico/i);
  assert.match(approval, /agente de IA não aprovador/);
  assert.match(approval, /T-LEGAL-001/);
  assert.match(approval, /T-PRIV-001/);
});

test('LEG-001 does not leak unapproved drafts into public routes', async () => {
  await assert.rejects(access(new URL('../src/pages/privacidade.astro', import.meta.url)));
  await assert.rejects(access(new URL('../src/pages/termos.astro', import.meta.url)));
});
