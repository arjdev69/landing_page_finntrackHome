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
const vercelComponentUrl = new URL(
  '../src/components/layout/VercelWebAnalytics.astro',
  import.meta.url,
);

test('DEC-018 aprova o inventário mínimo do Vercel Web Analytics', async () => {
  const [policy, decisions, srs, analyticsSpec, security] = await Promise.all([
    readFile(policyUrl, 'utf8'),
    readFile(decisionUrl, 'utf8'),
    readFile(srsUrl, 'utf8'),
    readFile(analyticsSpecUrl, 'utf8'),
    readFile(securityUrl, 'utf8'),
  ]);

  assert.match(decisions, /DEC-006[\s\S]*Substituída por `DEC-018`/);
  assert.match(decisions, /DEC-007[\s\S]*Substituída por `DEC-018`/);
  assert.match(decisions, /DEC-018[\s\S]*Status: \*\*Aceita para o MVP/);
  assert.match(policy, /Vercel Web Analytics[\s\S]*plano Hobby/i);
  assert.match(policy, /Finalidade[\s\S]*Necessidade[\s\S]*Balanceamento e salvaguardas/i);
  assert.match(policy, /query e fragmento são\s+removidos/i);
  assert.match(policy, /não recebe custom events/i);
  assert.match(policy, /descartado pelo provedor após 24 horas/i);
  assert.match(policy, /janela de um mês/i);
  assert.match(srs, /ANA-008[\s\S]*Vercel Web Analytics[\s\S]*query e fragmento/i);
  assert.match(analyticsSpec, /custom events permanecem\s+`noop`/i);
  assert.match(security, /rollback de analytics remove o componente\/pacote/i);
});

test('Política 1.2 coincide com a integração limitada à home de produção', async () => {
  const [policy, privacy, privacyPage, client, vercelComponent] = await Promise.all([
    readFile(policyUrl, 'utf8'),
    readFile(privacyUrl, 'utf8'),
    readFile(privacyPageUrl, 'utf8'),
    readFile(clientUrl, 'utf8'),
    readFile(vercelComponentUrl, 'utf8'),
  ]);

  for (const document of [policy, privacy, privacyPage]) {
    assert.match(document, /Vercel Web Analytics/i);
    assert.match(document, /24 horas/i);
    assert.match(document, /um mês/i);
    assert.match(document, /cookie/i);
  }

  assert.match(privacy, /Versão: 1\.2/);
  assert.match(privacyPage, /Versão 1\.2/);
  assert.match(client, /new NoopAnalytics\(\)/);
  assert.match(vercelComponent, /@vercel\/analytics\/astro/);
  assert.match(vercelComponent, /sanitizeVercelAnalyticsEvent/);
  assert.doesNotMatch(vercelComponent, /supabase|service_role|sb_secret/i);
});
