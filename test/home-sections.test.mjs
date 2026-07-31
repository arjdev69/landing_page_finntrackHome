import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';
import test from 'node:test';

import { benefits, howItWorksSteps, problemContent } from '../src/config/home-content.ts';

test('WEB-003 content follows the approved problem, benefits and workflow copy', () => {
  assert.equal(
    problemContent.title,
    'Seu fechamento mensal não precisa depender de várias planilhas.',
  );
  assert.equal(problemContent.situations.length, 5);
  assert.deepEqual(
    benefits.map(({ title, description }) => ({ title, description })),
    [
      {
        title: 'Resultado mensal por imóvel',
        description: 'Receitas, despesas e saldo organizados por período.',
      },
      {
        title: 'Contas sob controle',
        description: 'Itens pagos, pendentes e vencidos ficam visíveis.',
      },
      {
        title: 'Comparação da carteira',
        description: 'Veja quais imóveis tiveram melhor e pior resultado no período.',
      },
    ],
  );
  assert.deepEqual(
    howItWorksSteps.map(({ title }) => title),
    [
      'Cadastre seus imóveis.',
      'Registre receitas e despesas.',
      'Acompanhe o resultado de cada mês.',
    ],
  );
  assert.doesNotMatch(
    JSON.stringify({ problemContent, benefits, howItWorksSteps }),
    /rentabilidade/i,
  );
});

test('WEB-003 sections are semantic, focusable and rendered without a client runtime', async () => {
  const [page, problem, benefitsSection, howItWorks] = await Promise.all([
    readFile(new URL('../src/components/pages/HomePage.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/Problem.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/Benefits.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/sections/HowItWorks.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /<Problem/);
  assert.match(page, /<Benefits/);
  assert.match(page, /<HowItWorks/);
  assert.match(problem, /aria-labelledby="problem-heading"/);
  assert.match(benefitsSection, /getHomeAnchor\(locale, 'features'\)/);
  assert.match(benefitsSection, /tabindex="-1"/);
  assert.match(howItWorks, /getHomeAnchor\(locale, 'howItWorks'\)/);
  assert.match(howItWorks, /tabindex="-1"/);
  assert.match(howItWorks, /<ol/);
  assert.doesNotMatch(`${page}${problem}${benefitsSection}${howItWorks}`, /client:|<script/);
});
