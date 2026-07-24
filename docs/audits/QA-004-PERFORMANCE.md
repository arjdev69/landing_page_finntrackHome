# Auditoria de performance — QA-004

Data: 2026-07-22  
Ferramenta: Lighthouse 13.4.1  
Navegador: Microsoft Edge 150 headless  
Escopo: build estático de preview servido localmente

## Método

Foram executadas três rodadas mobile e três desktop. O gate usa a mediana de
cada métrica para reduzir ruído local. Os relatórios completos ficam em
`artifacts/lighthouse/raw/`, a linha de base em
`artifacts/lighthouse/baseline-summary.json` e o resultado com orçamento em
`artifacts/lighthouse/summary.json`.

## Resultado do gate

| Métrica | Mobile | Desktop | Limite aprovado |
|---|---:|---:|---:|
| Performance | 99 | 99 | ≥ 95 |
| LCP | 2.005 ms | 1.891 ms | ≤ 2.500 ms |
| CLS | 0,021 | 0,021 | ≤ 0,1 |
| TBT | 0 ms | 0 ms | ≤ 200 ms |
| Transferência inicial | 125.329 bytes | 125.329 bytes | ≤ 200.000 bytes |
| JavaScript inicial | 4.107 bytes | 4.107 bytes | ≤ 10.000 bytes |
| CSS inicial | 26.353 bytes | 26.353 bytes | ≤ 40.000 bytes |
| Imagens iniciais | 15.296 bytes | 15.296 bytes | ≤ 50.000 bytes |
| Requests | 18 | 18 | ≤ 25 |

O gate passou em mobile e desktop. Acessibilidade e boas práticas também
obtiveram 100. O score SEO 69 é esperado no preview porque o ambiente usa
`noindex,nofollow`; SEO não integra o orçamento de performance desta tarefa.

## Análise do artefato

O build contém 3.596 bytes de JavaScript não comprimido em três arquivos,
26.188 bytes de CSS, 48.256 bytes da fonte variável e cinco variantes WebP do
dashboard que somam 84.792 bytes. Apenas a variante adequada ao viewport entra
na transferência inicial; a demonstração abaixo da dobra permanece lazy.

Não há framework de componentes no cliente, vídeo, carrossel, SDK de analytics,
cookie ou storage. Os scripts existentes cobrem somente UTMs, instrumentação
noop e aprimoramento progressivo previsto no SDD.

## Orçamento aprovado

Os limites ficam em `scripts/performance-budget.mjs` e são aplicados por
`npm run test:perf`. A medição sempre reconstrói o artefato, executa seis
auditorias e falha se qualquer mediana ultrapassar o orçamento.

As metas de campo `PERF-001..003` continuam pendentes de amostra real e pertencem
a `REL-004`; esta auditoria sintética não substitui CrUX/RUM em produção.
