import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import process from 'node:process';
import test from 'node:test';
import { URL } from 'node:url';

import { resolveSeoMetadata } from '../src/lib/seo/metadata.ts';

const homeDefinition = {
  title: 'Controle Financeiro de Imóveis e Aluguéis | FinnTrack Home',
  description:
    'Organize receitas, despesas e contas vencidas dos seus imóveis. Acompanhe o resultado mensal de cada propriedade com o FinnTrack Home.',
  canonicalPath: '/',
  imagePath: '/social-card.png',
  heading: 'Saiba quais imóveis realmente dão lucro.',
  type: 'website',
};

test('resolves absolute same-origin SEO metadata and protects preview indexing', () => {
  const production = resolveSeoMetadata(
    'https://www.finntrack-home.com.br',
    homeDefinition,
    'production',
  );
  const preview = resolveSeoMetadata('http://localhost:4321', homeDefinition, 'preview');

  assert.equal(production.canonical, 'https://www.finntrack-home.com.br/');
  assert.equal(production.image, 'https://www.finntrack-home.com.br/social-card.png');
  assert.equal(production.robots, 'index,follow');
  assert.equal(preview.canonical, 'http://localhost:4321/');
  assert.equal(preview.robots, 'noindex,nofollow');
  assert.throws(
    () =>
      resolveSeoMetadata(
        'https://www.finntrack-home.com.br',
        { ...homeDefinition, canonicalPath: 'https://external.invalid/' },
        'production',
      ),
    /deve permanecer na origem configurada/,
  );
});

test('production artifact renders the typed home SEO contract in initial HTML', async () => {
  const npmCli = process.env.npm_execpath;
  assert.ok(npmCli, 'npm_execpath must be available while running npm test');

  const result = await import('node:child_process').then(({ spawnSync }) =>
    spawnSync(process.execPath, [npmCli, 'run', 'build'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PUBLIC_ENVIRONMENT: 'production',
        PUBLIC_SITE_URL: 'https://www.finntrack-home.com.br',
        PUBLIC_APP_URL: 'https://app.finntrack-home.com.br',
        PUBLIC_APP_SIGNUP_URL: 'https://app.finntrack-home.com.br/cadastro',
        PUBLIC_APP_LOGIN_URL: 'https://app.finntrack-home.com.br/entrar',
      },
      encoding: 'utf8',
    }),
  );

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const robots = await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8');
  const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  const [favicon, appleTouchIcon, socialCard] = await Promise.all([
    readFile(new URL('../dist/favicon.png', import.meta.url)),
    readFile(new URL('../dist/apple-touch-icon.png', import.meta.url)),
    readFile(new URL('../dist/social-card.png', import.meta.url)),
  ]);
  const h1Matches = html.match(/<h1\b/g) ?? [];

  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<meta charset="UTF-8">/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
  assert.match(html, /<title>Controle Financeiro de Imóveis e Aluguéis \| FinnTrack Home<\/title>/);
  assert.match(html, /<meta name="description" content="Organize receitas, despesas/);
  assert.match(html, /<link rel="canonical" href="https:\/\/www\.finntrack-home\.com\.br\/">/);
  assert.match(html, /<meta property="og:type" content="website">/);
  assert.match(html, /<meta property="og:url" content="https:\/\/www\.finntrack-home\.com\.br\/">/);
  assert.match(html, /<link rel="icon" type="image\/png" sizes="64x64" href="\/favicon\.png">/);
  assert.match(
    html,
    /<link rel="apple-touch-icon" sizes="180x180" href="\/apple-touch-icon\.png">/,
  );
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/www\.finntrack-home\.com\.br\/social-card\.png">/,
  );
  assert.match(html, /<meta property="og:image:type" content="image\/png">/);
  assert.match(html, /<meta property="og:image:width" content="1200">/);
  assert.match(html, /<meta property="og:image:height" content="630">/);
  assert.match(html, /<meta property="og:image:alt" content="FinnTrack Home/);
  assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  assert.match(
    html,
    /<meta name="twitter:image" content="https:\/\/www\.finntrack-home\.com\.br\/social-card\.png">/,
  );
  assert.match(html, /<meta name="twitter:image:alt" content="FinnTrack Home/);
  assert.match(html, /<meta name="robots" content="index,follow">/);
  assert.equal(h1Matches.length, 1);
  assert.match(html, /Saiba quais imóveis realmente dão lucro\./);
  assert.match(html, /<main id="main-content"/);
  assert.match(html, /Seu fechamento mensal não precisa depender de várias planilhas\./);
  assert.match(html, /Resultado mensal por imóvel/);
  assert.match(html, /Itens pagos, pendentes e vencidos ficam visíveis\./);
  assert.match(html, /Comparação da carteira/);
  assert.match(html, /Cadastre seus imóveis\./);
  assert.match(html, /Registre receitas e despesas\./);
  assert.match(html, /Acompanhe o resultado de cada mês\./);
  assert.match(html, /<section id="demonstracao"/);
  assert.match(html, /Uma visão clara da sua carteira\./);
  assert.match(html, /Dashboard do FinnTrack Home com receitas, despesas, saldo mensal/);
  assert.match(html, /<img[^>]+width="1160"[^>]+height="716"/);
  assert.match(html, /<img[^>]+srcset=/);
  assert.match(html, /Feito para quem administra a própria carteira\./);
  assert.match(html, /Não é um sistema operacional completo para grandes imobiliárias\./);
  assert.match(html, /Dúvidas comuns, respostas diretas\./);
  assert.equal((html.match(/data-faq-id=/g) ?? []).length, 6);
  assert.match(html, /Descubra quais imóveis realmente dão resultado\./);
  assert.match(
    html,
    /href="https:\/\/app\.finntrack-home\.com\.br\/cadastro"[^>]+data-cta-location="footer"/,
  );
  assert.match(html, /href="\/privacidade"/);
  assert.match(html, /href="\/termos"/);
  assert.match(html, /href="mailto:jobslens\.ia@gmail\.com"/);
  assert.match(html, new RegExp(`© ${new Date().getUTCFullYear()} FinnTrack Home`));
  assert.doesNotMatch(html, /<astro-island\b/);
  assert.equal(favicon.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(appleTouchIcon.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(socialCard.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(
    robots,
    'User-agent: *\nAllow: /\nSitemap: https://www.finntrack-home.com.br/sitemap.xml\n',
  );
  assert.match(sitemap, /<loc>https:\/\/www\.finntrack-home\.com\.br\/<\/loc>/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 1);
});
