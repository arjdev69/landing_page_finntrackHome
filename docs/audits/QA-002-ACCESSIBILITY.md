# Auditoria de acessibilidade — QA-002

Data: 2026-07-22  
Escopo: home pública implementada  
Meta: WCAG 2.2 níveis A e AA nos fluxos principais

## Resultado

A auditoria automatizada e a revisão estruturada da home não encontraram
violações WCAG A/AA após a correção descrita abaixo. A tarefa permanece parcial
porque `A11Y-011` exige um smoke com leitor de tela real; a árvore acessível e a
automação de teclado não substituem essa sessão assistiva.

| Cobertura | Resultado | Evidência |
|---|---|---|
| `A11Y-001..005` | aprovado no escopo executável | Axe, navegação por teclado, skip link, foco visível, retorno de foco, landmarks, headings e nomes acessíveis em desktop/mobile |
| `A11Y-006..007` | aprovado | zero violações Axe A/AA; revisão de contraste e de significado independente de cor/forma |
| `A11Y-008` | aprovado | texto a 200% e reflow em 320 CSS px sem overflow horizontal após correção |
| `A11Y-009` | aprovado | `prefers-reduced-motion: reduce` emulado; scroll e transições reduzidos |
| `A11Y-010` | aprovado | alvos isolados visíveis com ao menos 24×24 CSS px; link de e-mail em texto corrido usa a exceção normativa para alvos inline |
| `A11Y-011` | parcial | zero violações Axe e smoke de teclado automatizado; smoke com leitor de tela real pendente |

## Achado corrigido

Ao ampliar o texto para 200%, dois textos dos cartões da seção Problema excediam
a largura disponível porque o item flex mantinha `min-width: auto`. A classe
`min-w-0` foi aplicada ao texto em `Problem.astro`, permitindo quebra e reflow
sem perda de conteúdo.

## Execução

- `npm run test:a11y`: 8/8 testes aprovados, zero skips, Chromium em 1440×900 e
  360×800;
- Axe: zero violações nas tags WCAG 2 A/AA, 2.1 A/AA e 2.2 AA;
- o relatório HTML é gerado em `artifacts/playwright/html/index.html`;
- a auditoria cobre somente rotas publicadas e não antecipa páginas ainda
  bloqueadas no backlog.

## Pendência manual

Executar a home em leitor de tela real, registrar ferramenta/versão, navegador,
ordem e anúncios do skip link, menu, headings, imagem do produto, FAQ e CTAs.
Até essa evidência existir, `QA-002` não deve ser marcada como concluída.
