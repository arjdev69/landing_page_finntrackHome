import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

const privacyUrl = new URL('../docs/legal/PRIVACIDADE.md', import.meta.url);
const termsUrl = new URL('../docs/legal/TERMOS.md', import.meta.url);
const approvalUrl = new URL('../docs/legal/APROVACAO-LEGAL.md', import.meta.url);
const privacyPageUrl = new URL('../src/pages/privacidade.astro', import.meta.url);
const termsPageUrl = new URL('../src/pages/termos.astro', import.meta.url);
const legalLayoutUrl = new URL('../src/layouts/LegalLayout.astro', import.meta.url);

const forbiddenPublicationMarkers =
  /RASCUNHO|NÃO APROVADO|placeholder|lorem ipsum|TODO|TBD|\[preencher\]|não identificado|vigência: não definida/i;

test('LEG-001 final documents are dated, approved and contain no publication markers', async () => {
  const [privacy, terms, approval, privacyPage, termsPage] = await Promise.all([
    readFile(privacyUrl, 'utf8'),
    readFile(termsUrl, 'utf8'),
    readFile(approvalUrl, 'utf8'),
    readFile(privacyPageUrl, 'utf8'),
    readFile(termsPageUrl, 'utf8'),
  ]);

  for (const document of [privacy, terms, privacyPage, termsPage]) {
    assert.doesNotMatch(document, forbiddenPublicationMarkers);
    assert.match(document, /Bruno\s+Araujo/);
  }

  for (const document of [privacy, terms]) {
    assert.match(document, /Status: aprovado para publicação/);
    assert.match(document, /jobslens\.ia@gmail\.com/);
  }

  assert.match(privacy, /Versão: 1\.2/);
  assert.match(privacy, /Vigência: 2026-07-29/);
  assert.match(terms, /Versão: 1\.0/);
  assert.match(terms, /Vigência: 2026-07-27/);

  for (const page of [privacyPage, termsPage]) {
    assert.match(page, /footerContent\.supportEmail/);
  }

  assert.match(terms, /gratuito durante a fase atual de validação/i);
  assert.match(terms, /não gera assinatura ou\s+cobrança automática/i);
  assert.match(privacy, /Vercel/);
  assert.match(privacy, /Supabase/);
  assert.match(privacy, /Google\/Gmail/);
  assert.match(privacy, /Vercel Web Analytics registra\s+pageviews agregados/i);
  assert.match(privacy, /query e fragmento são removidos/i);
  assert.match(privacy, /não usa cookie ou Web Storage/i);
  assert.match(privacy, /legítimo interesse documentado/i);
  assert.match(privacy, /janela de relatório de um mês/i);
  assert.match(privacy, /oposição ao Web Analytics/i);
  assert.match(privacyPage, /Versão 1\.2/);
  assert.match(privacyPage, /Vercel Web Analytics/);
  assert.match(privacyPage, /24\s+horas/i);
  assert.match(approval, /Status: aprovado para publicação/);
  assert.match(approval, /validação factual do MVP simplificado[\s\S]*Bruno Araujo/i);
  assert.match(approval, /aceite final para publicação[\s\S]*Bruno Araujo/i);
  assert.match(approval, /aprovação da Política 1\.2 e do Vercel Web Analytics/i);
  assert.match(approval, /T-LEGAL-001/);
  assert.match(approval, /T-PRIV-001/);
});

test('LEG-001 public routes use the isolated legal layout and approved SEO definitions', async () => {
  const [privacyPage, termsPage, legalLayout] = await Promise.all([
    readFile(privacyPageUrl, 'utf8'),
    readFile(termsPageUrl, 'utf8'),
    readFile(legalLayoutUrl, 'utf8'),
  ]);

  assert.match(privacyPage, /LegalLayout \{\.\.\.privacySeo\}/);
  assert.match(termsPage, /LegalLayout \{\.\.\.termsSeo\}/);
  assert.match(privacyPage, /id="main-content"/);
  assert.match(termsPage, /id="main-content"/);
  assert.match(legalLayout, /Pular para o conteúdo/);
  assert.match(legalLayout, /Voltar ao início/);
  assert.match(legalLayout, /href="\/privacidade"/);
  assert.match(legalLayout, /href="\/termos"/);
  assert.doesNotMatch(legalLayout, /AnalyticsInstrumentation|VercelWebAnalytics|AppLinkEnhancer/);
});
