# Plano de testes e qualidade

Versão: 0.2.0
Status: approved  
Data: 2026-07-30

## 1. Objetivo

Fornecer evidência verificável para cada requisito obrigatório do MVP. A entrega
combina testes automatizados, inspeções estáticas e validações manuais que não
podem ser substituídas de forma confiável por automação.

## 2. Pirâmide de verificação

- **Unitário**: URL/UTM, configuração, analytics, canonical e helpers puros.
- **Componente/integração**: HTML semântico, conteúdo, navegação, menu, FAQ e
  metadados.
- **E2E**: rotas, conversão, redirecionamentos, status, viewport e consentimento.
- **Estático**: lint, typecheck, build, links, HTML, sitemap, robots e assets.
- **Auditoria**: acessibilidade automatizada, Lighthouse e headers.
- **Manual**: teclado, leitor de tela, copy, ativos, jurídico e fluxo real no app.

## 3. Ambientes

- Local: testes rápidos e determinísticos, analytics noop.
- Preview: artefato de produção, bloqueado para indexação, URLs de app de teste.
- Produção: smoke test sem criar tráfego ou contas indevidas; Search Console e
  headers reais.

`npm run test:e2e` usa Playwright/Chromium contra o preview do artefato em
1440×900 e 360×800. Enquanto rotas ou integrações P0 estiverem bloqueadas, a
suíte cobre somente comportamentos já implementados e a lacuna permanece aberta
no backlog; testes ausentes não podem ser substituídos por `skip`.

Após a implementação de `DEC-020`, todas as verificações aplicáveis devem cobrir
`/` e `/en/`. Login, páginas legais e 404 são exercitados no locale
correspondente; uma rota inglesa bloqueada não pode ser substituída por fallback
português no teste.

Testes não devem depender do provedor real de analytics. Use adaptador/fake e
valide o provedor separadamente em modo de debug.

## 4. Casos funcionais P0

| Caso | Cobertura principal | Evidência esperada |
|---|---|---|
| T-ROUTE-001 | `FR-NAV-001`, `FR-ERR-001` | home 200; URL desconhecida 404 real |
| T-NAV-001 | `FR-NAV-002..006` | links, âncoras e menu operáveis por teclado |
| T-HOME-001 | `FR-HOME-001..006` | conteúdo/seções/H1/copy presentes nos viewports-alvo |
| T-ASSET-001 | `FR-HOME-007..008`, `PRIV-003` | ativos aprovados, dimensões e alt text; revisão sem PII |
| T-CONTENT-001 | `FR-HOME-009..012` | público, FAQ, rodapé e alegações revisados |
| T-CTA-001 | `FR-CTA-001..006` | todos os CTAs têm href correto e eventos sem bloquear navegação |
| T-CTA-002 | `FR-CTA-007..009` | destinos reais abrem cadastro/login diretamente em mobile/desktop; build falha sem config |
| T-UTM-001 | `FR-UTM-001..005` | allowlist, encoding, merge e degradação cobertos unitariamente |
| T-UTM-002 | `FR-UTM-006..007` | contrato ponta a ponta aprovado sem persistência, correlação com conta ou OAuth ativo |
| T-UTM-003 | `FR-CTA-003`, `FR-UTM-001..005` | `/entrar` preserva somente UTMs permitidas até o login; parâmetros desconhecidos e destino externo são descartados |
| T-LEGAL-001 | `FR-LEG-001..003` | conteúdo datado/aprovado; detector de placeholder passa |
| T-404-001 | `FR-ERR-001..002` | status 404, noindex, link home e nenhum landing_view |

## 5. SEO e analytics P0/P1

| Caso | Cobertura principal | Evidência esperada |
|---|---|---|
| T-SEO-001 | `SEO-001..005` | análise do HTML de cada rota indexável |
| T-SEO-002 | `SEO-006..009`, `SEO-013` | robots/sitemap/cards/ícones válidos por ambiente; páginas legais com noindex/canonical e fora do sitemap |
| T-SEO-003 | `SEO-010..011` | quando a lista aprovada for vazia, ausência de JSON-LD em todas as rotas; schemas futuros exigem validação e campos sem alegações proibidas |
| T-SEO-004 | `SEO-012` | redirect HTTPS/host canônico sem cadeia ou loop |
| T-ANA-001 | `ANA-001..005` | contrato, classificação determinística de device/referrer, payload permitido e falha do SDK |
| T-ANA-002 | `ANA-006..007` | preview sem coleta; produção verificável por painel/rede; eventos não suportados permanecem `noop` |
| T-ANA-003 | `ANA-008` | inventário aprovado; somente home em produção; query/fragmento removidos; ausência de cookie/storage/identificador persistente e custom events |

## 6. Acessibilidade

| Caso | Cobertura principal | Método |
|---|---|---|
| T-A11Y-001 | `A11Y-001..005` | teclado completo + árvore de acessibilidade + teste automático |
| T-A11Y-002 | `A11Y-006..007` | contraste automatizado e revisão de significado |
| T-A11Y-003 | `A11Y-008` | zoom 200% e viewport de 320 CSS px |
| T-A11Y-004 | `A11Y-009` | emulação de reduced motion |
| T-A11Y-005 | `A11Y-010` | inspeção de alvos de toque e espaçamento |
| T-A11Y-006 | `A11Y-011` | zero violações críticas + smoke com leitor de tela |

Checklist manual por rota:

- skip link quando necessário;
- foco inicial e retorno de foco do menu;
- nome/estado do controle móvel;
- headings e landmarks;
- links distinguíveis e descritos;
- alt text contextual;
- leitura coerente sem CSS/imagens.

Automação de `QA-002`: `npm run test:a11y` executa Axe e as verificações de
teclado, foco, landmarks, texto a 200%, reflow em 320 CSS px, movimento reduzido
e alvos isolados em desktop/mobile. A árvore acessível automatizada não substitui
o smoke com leitor de tela real exigido por `T-A11Y-006`; a evidência e as
pendências ficam em `docs/audits/QA-002-ACCESSIBILITY.md`.

## 7. Responsividade e compatibilidade

| Caso | Cobertura principal | Método |
|---|---|---|
| T-RWD-001 | `RWD-001..004` | snapshots e inspeção em 320/360/390/768/1024/1440 px |
| T-RWD-002 | `RWD-003` | asserção `scrollWidth <= clientWidth` nas rotas |
| T-RWD-003 | `RWD-005` | E2E/smoke na matriz de navegadores aprovada |

Os snapshots auxiliam, mas não substituem inspeção de legibilidade e prioridade
visual.

Automação de `QA-003`: `npm run test:compat` executa a home nos seis viewports
normativos em Chromium, Edge estável, Firefox e WebKit disponíveis. O teste exige
imagem eager e lazy realmente carregadas, comportamento responsivo, FAQ, CTA,
ausência de overflow e ausência de erros. Versões anteriores e Safari real devem
ser cobertos pelo smoke manual descrito em
`docs/audits/QA-003-COMPATIBILITY.md`.

## 8. Performance

| Caso | Cobertura principal | Método |
|---|---|---|
| T-PERF-001 | `PERF-001..003` | CrUX ou RUM em produção, p75 por dispositivo quando houver amostra |
| T-PERF-002 | `PERF-004..006` | análise do bundle, requests, imagens, fontes e main thread |
| T-PERF-003 | `PERF-007` | orçamento sintético aprovado após primeiro build |

O gate pré-lançamento usa auditoria sintética repetível; Core Web Vitals de campo
são monitorados após volume suficiente e continuam sendo a meta normativa.

Orçamento aprovado em `QA-004`, aplicado por `npm run test:perf` sobre a mediana
de três rodadas mobile e três desktop: performance ≥95; LCP ≤2,5 s; CLS ≤0,1;
TBT ≤200 ms; transferência inicial ≤200 KB; JavaScript ≤10 KB; CSS ≤40 KB;
imagens iniciais ≤50 KB; até 25 requests. Limites executáveis em
`scripts/performance-budget.mjs` e evidência em
`docs/audits/QA-004-PERFORMANCE.md`.

## 9. Segurança, privacidade e operação

| Caso | Cobertura principal | Evidência esperada |
|---|---|---|
| T-SEC-001 | `SEC-001..004` | inspeção de bundle, URLs, redirect e injeção de conteúdo |
| T-SEC-002 | `SEC-005..006` | lockfile/auditoria e headers em produção |
| T-PRIV-001 | `PRIV-001..004` | inventário, política, ativos e contato aprovados |
| T-OPS-001 | `OPS-001..004` | config tipada e pipeline verde/reproduzível |
| T-OPS-002 | `OPS-005..007` | preview, smoke/rollback e Search Console documentados |

## 10. Gates de pull request

Obrigatórios em toda mudança de código:

1. lint;
2. typecheck;
3. testes unitários/integração;
4. build;
5. E2E afetado;
6. verificação de links/HTML quando conteúdo ou rotas mudarem.

Mudanças visuais incluem screenshots nos viewports afetados. Mudanças em eventos,
cookies, storage ou terceiros exigem atualização de analytics/privacidade.
Mudanças de catálogo, seletor ou rota localizada exigem testes nos dois locales,
mesmo quando o componente visual compartilhado não muda.

## 11. Gates de lançamento

- todos os P0 e P1 do MVP aprovados;
- nenhuma violação crítica/séria de acessibilidade sem exceção aceita;
- fluxo real de login e cadastro aprovado;
- preview noindex e produção indexável conforme decisão;
- 404 e redirects com status corretos;
- políticas/termos/ativos/suporte aprovados;
- eventos validados sem PII;
- smoke e rollback documentados;
- requisitos e rastreabilidade atualizados.

## 12. Evidência

Cada tarefa concluída deve registrar comando, resultado e artefato relevante no
PR ou relatório de entrega. Falhas conhecidas não podem ser omitidas; uma exceção
exige decisão registrada, risco, responsável e prazo.

## 13. Internacionalização `en-US`

Os casos detalhados abaixo são P0 para o release de `/en/`:

| Caso | Cobertura | Evidência esperada |
|---|---|---|
| T-I18N-ROUTE-001 | `I18N-FR-001..004` | `/` e `/en/` 200, locales corretos e nenhuma variante inglesa duplicada |
| T-I18N-ROUTE-002 | `I18N-FR-005..007` | links equivalentes, labels compactos, nomes completos e locale atual acessível |
| T-I18N-ROUTE-003 | `I18N-FR-008..012` | sem redirect/persistência/fallback silencioso; query e fragmento allowlisted |
| T-I18N-ROUTE-004 | `I18N-FR-013` | `/en/desconhecida` retorna 404 real, inglês, noindex e nenhum pageview |
| T-I18N-CONT-001 | `I18N-CONT-001..005` | seções, H1, labels e alt texts completos sem mistura de idioma |
| T-I18N-CONT-002 | `I18N-CONT-006..012` | FAQ/app revalidados, formatos, legal e ativos ingleses aprovados |
| T-I18N-SEO-001 | `I18N-SEO-001..004` | metadata das homes, canonicals, `hreflang` recíproco e `x-default` |
| T-I18N-SEO-002 | `I18N-SEO-005..012` | sitemap, OG, links, robots, ausência de JSON-LD e duplicatas |
| T-I18N-SEO-003 | `I18N-SEO-013..014` | metadata/noindex/canonical de legais, login e 404 |
| T-I18N-INT-001 | `I18N-INT-001..004` | cadastro/login/UTM reais nas duas homes em desktop/mobile |
| T-I18N-INT-002 | `I18N-INT-005` | `/en/login` usa config, funciona sem JS e descarta destino/query proibida |
| T-I18N-ANA-001 | `I18N-ANA-001..003` | pageview sanitizado somente em `/` e `/en/` |
| T-I18N-ANA-002 | `I18N-ANA-004`, `I18N-PRIV-001..002` | enum, inventário/políticas e ausência de nova persistência/coleta |
| T-I18N-A11Y-001 | `I18N-A11Y-001..002` | teclado, foco, nome completo e estado não dependente de cor/bandeira |
| T-I18N-A11Y-002 | `I18N-A11Y-003..004` | pronúncia, `lang` de trechos, ordem de foco e landmarks |
| T-I18N-RWD-001 | `I18N-RWD-001..002` | seis viewports por locale sem overflow/truncamento |
| T-I18N-PERF-001 | `I18N-PERF-001..002` | ambas as homes dentro do orçamento `DEC-016` |
| T-I18N-SEC-001 | `I18N-SEC-001` | CSP/headers em todas as rotas inglesas no artefato e HTTPS real |
| T-I18N-ARCH-001 | `I18N-ARCH-001..003` | paridade tipada e falha de build para catálogo inválido |
| T-I18N-ARCH-002 | `I18N-ARCH-004..007` | configuração central, HTML estático e ausência de condicionais dispersas |
| T-I18N-GOV-001 | `I18N-GOV-001..004` | revisores, responsáveis, datas, aprovações e evidências |

Além da automação, o release exige smoke manual de leitor de tela em inglês,
revisão humana da transcriação, inspeção de screenshot/social card e validação
do fluxo real no app em `en-US`.
