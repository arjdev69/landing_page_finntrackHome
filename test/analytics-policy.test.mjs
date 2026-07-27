import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

const policyUrl = new URL('../docs/privacy/D0-005-ANALYTICS-POLICY.md', import.meta.url);
const decisionUrl = new URL('../docs/10-DECISION-LOG.md', import.meta.url);
const srsUrl = new URL('../docs/03-SRS.md', import.meta.url);
const analyticsSpecUrl = new URL('../docs/06-SEO-ANALYTICS-SPEC.md', import.meta.url);
const securityUrl = new URL('../docs/07-SECURITY-PRIVACY.md', import.meta.url);
const privacyUrl = new URL('../docs/legal/PRIVACIDADE.md', import.meta.url);
const privacyPageUrl = new URL('../src/pages/privacidade.astro', import.meta.url);
const clientUrl = new URL('../src/lib/analytics/client.ts', import.meta.url);
const instrumentationUrl = new URL(
  '../src/components/layout/AnalyticsInstrumentation.astro',
  import.meta.url,
);

test('D0-005 aprova provedor, base, inventário e retenção sem ampliar dados', async () => {
  const [policy, decisions, srs, analyticsSpec, security] = await Promise.all([
    readFile(policyUrl, 'utf8'),
    readFile(decisionUrl, 'utf8'),
    readFile(srsUrl, 'utf8'),
    readFile(analyticsSpecUrl, 'utf8'),
    readFile(securityUrl, 'utf8'),
  ]);

  assert.match(decisions, /DEC-006[\s\S]*Status: \*\*Aceita/);
  assert.match(decisions, /DEC-007[\s\S]*Status: \*\*Aceita/);
  assert.match(policy, /endpoint server-side[\s\S]*Supabase/i);
  assert.match(policy, /legítimo interesse/i);
  assert.match(policy, /Finalidade[\s\S]*Necessidade[\s\S]*Balanceamento e salvaguardas/i);
  assert.match(policy, /eventos brutos por no máximo 90 dias/i);
  assert.match(policy, /segredo somente server-side/i);
  assert.match(policy, /tabela sem leitura\/escrita para `anon`/i);
  assert.match(
    policy,
    /não usará cookie, Web Storage, pixel publicitário, SDK de analytics de\s+terceiro, fingerprint, identificador de conta, sessão ou dispositivo/i,
  );
  assert.match(policy, /não armazenará IP/i);
  assert.match(srs, /ANA-008[\s\S]*descartar IP[\s\S]*90 dias/i);
  assert.match(analyticsSpec, /política first-party definida; implementação permanece noop/i);
  assert.match(security, /solicitações de informação ou oposição/i);
});

test('D0-005 mantém coleta desligada até ANA-003 e política pública consistente', async () => {
  const [policy, privacy, privacyPage, client, instrumentation] = await Promise.all([
    readFile(policyUrl, 'utf8'),
    readFile(privacyUrl, 'utf8'),
    readFile(privacyPageUrl, 'utf8'),
    readFile(clientUrl, 'utf8'),
    readFile(instrumentationUrl, 'utf8'),
  ]);

  for (const document of [policy, privacy, privacyPage]) {
    assert.match(document, /analytics first-party/i);
    assert.match(document, /desativad[oa]|noop/i);
    assert.match(document, /90\s+dias/i);
  }

  assert.match(privacy, /Versão: 1\.1/);
  assert.match(privacyPage, /Versão 1\.1/);
  assert.match(client, /new NoopAnalytics\(\)/);
  for (const source of [client, instrumentation]) {
    assert.doesNotMatch(source, /supabase|service_role|sb_secret|fetch\(/i);
  }
});
