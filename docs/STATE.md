# STATE — FinnTrack Home Landing

## Perfil

TEST: `npm test` | `npm run test:e2e` | `npm run build`
CONVENÇÕES: `AGENTS.md`, `docs/00-SPEC-INDEX.md`, `docs/03-SRS.md`
ARQUITETURA: Astro estático; configuração tipada; componentes e bibliotecas sem runtime de framework
STACK: Astro 7, TypeScript 6, Tailwind CSS 4, npm

## Decisões

### AD-001

- **Decisão**: encerrar `D0-003` com rotas diretas e captura allowlisted somente
  em memória; atribuição durável e autenticação real permanecem em
  `DEC-007`/`INT-004`.
- **Razão**: o app publicado e os testes comprovam o contrato seguro de entrada,
  enquanto persistência e terceiros ainda dependem de consentimento e
  configuração externa.
- **Trade-off**: a origem de campanha ainda não é associada de forma persistente
  à conta ou primeira sessão.
- **Data**: 2026-07-24
- **Status**: ativa

### AD-002

- **Decisão**: usar Vercel como plataforma de hospedagem da landing, inicialmente
  com o domínio gerado pela plataforma e domínio customizado pendente.
- **Razão**: a plataforma atende ao deploy estático, preview, HTTPS, CI e
  rollback exigidos por `DEC-010`.
- **Trade-off**: o host canônico definitivo e a configuração de DNS permanecem
  pendentes até a escolha do domínio customizado.
- **Data**: 2026-07-24
- **Status**: superseded por AD-009

### AD-003

- **Decisão**: preparar analytics first-party com entrada server-side e tabela
  no Supabase, sem cookie ou identificador persistente; manter a coleta
  desativada até aprovação de retenção, base legal e conteúdo jurídico.
- **Razão**: o Web Analytics gratuito da Vercel não cobre o contrato de eventos
  customizados e UTMs do MVP.
- **Trade-off**: métricas de aquisição permanecem noop até a liberação de
  `DEC-007`, e a solução própria exigirá proteção contra abuso, RLS, retenção e
  operação.
- **Data**: 2026-07-24
- **Status**: superseded por AD-010

### AD-004

- **Decisão**: considerar confirmada pelo responsável do projeto a aprovação
  jurídica das minutas de Política de Privacidade e Termos para publicação em
  `LEG-001`.
- **Razão**: o usuário registrou explicitamente a confirmação da aprovação
  jurídica em 2026-07-24, removendo o bloqueio humano de `DEC-008` para essas
  duas páginas.
- **Trade-off**: a aprovação do conteúdo legal não aprova automaticamente
  retenção, base legal ou consentimento do analytics first-party; essas decisões
  permanecem em `D0-005`/`DEC-007`.
- **Data**: 2026-07-24
- **Status**: ativa

### AD-005

- **Decisão**: aceitar a autenticação da Vercel como proteção remota do Preview
  Deployment; builds de preview continuam obrigados a gerar robots/noindex, e
  qualquer preview público deve expor essas proteções.
- **Razão**: o preview do PR #1 foi criado antes de produção, mas requisições sem
  sessão são interceptadas pela Vercel com `X-Matched-Path: /login`, impedindo
  crawlers de acessar o artefato. O mesmo commit passou pelo build de preview no
  GitHub Actions.
- **Trade-off**: o smoke anônimo não consegue inspecionar o HTML implantado
  enquanto a autenticação estiver ativa; a integridade do artefato é comprovada
  no pipeline e o controle de acesso é verificado no endpoint.
- **Data**: 2026-07-27
- **Status**: ativa

### AD-006

- **Decisão**: aprovar analytics first-party por endpoint server-side e tabela
  dedicada no Supabase, sob legítimo interesse documentado, sem cookie,
  storage, pixel, SDK externo ou identificador persistente.
- **Razão**: medir aquisição e usabilidade de forma mínima durante a validação
  do produto, sem depender de plano pago de terceiro nem rastrear pessoas entre
  sessões ou sites.
- **Trade-off**: eventos brutos expiram em 90 dias e não podem ser correlacionados
  com contas; métricas de conversão/ativação e retenção do produto continuam
  dependentes do app. A coleta permanece `noop` até `ANA-003`.
- **Data**: 2026-07-27
- **Status**: superseded por AD-010

### AD-007

- **Decisão**: implementar `/entrar` como fallback estático, em vez de redirect
  genérico da Vercel, reutilizando o enriquecimento progressivo allowlisted.
- **Razão**: o host não oferece filtro por chave para encaminhar somente as
  cinco UTMs aprovadas; preservar toda a query violaria `FR-UTM-004`.
- **Trade-off**: existe uma etapa explícita de confirmação antes de abrir o app,
  mas o login funciona sem JavaScript, o destino não vem da query e parâmetros
  desconhecidos ou sensíveis não são propagados.
- **Data**: 2026-07-27
- **Status**: ativa

### AD-008

- **Decisão**: encerrar o contrato de aquisição do MVP com UTMs somente em
  memória no app, sem persistência first/last-touch e sem correlação com conta.
  Cadastro, atividade e retenção 7/30 dias serão medidos separadamente no
  produto.
- **Razão**: validar retenção de usuários não exige identificar a campanha de
  cada conta; separar as medições reduz complexidade e tratamento de dados.
- **Trade-off**: o MVP mede intenção/saída na landing e retenção no app, mas não
  calcula conversão identificada landing → cadastro nem retenção por campanha.
- **Data**: 2026-07-29
- **Status**: ativa

### AD-009

- **Decisão**: adotar `https://finntrackhomepage.app` como origem canônica da
  landing e redirecionar permanentemente o host Vercel anterior e a variante
  `www`, preservando path e query.
- **Razão**: o responsável do projeto vinculou o domínio customizado à landing;
  manter canonical e sitemap no host anterior dividiria sinais de indexação.
- **Trade-off**: Search Console e sitemap precisam ser configurados novamente
  para a nova propriedade; o host anterior deve continuar vinculado à Vercel
  durante a migração para entregar o redirect.
- **Data**: 2026-07-29
- **Status**: ativa

### AD-010

- **Decisão**: usar Vercel Web Analytics no plano Hobby somente para pageview
  agregado da home em produção, sanitizando o caminho para `/` e descartando
  query, hash, eventos customizados, rotas legais, `/entrar`, 404 e previews.
  O cliente de eventos tipados existente permanece `noop`.
- **Razão**: o responsável ativou o recurso gratuito da hospedagem e priorizou
  uma medição simples para validar interesse, sem operar endpoint ou banco
  próprios e sem correlacionar aquisição com contas.
- **Trade-off**: o plano Hobby oferece 50.000 eventos mensais e relatório de um
  mês, mas não oferece eventos customizados nem dimensões UTM. Conversão,
  ativação e retenção continuam sendo métricas separadas do app.
- **Data**: 2026-07-29
- **Status**: ativa

## Handoff

- **Projeto**: FinnTrack Home Landing /
  `C:\Users\ARJ\Favorites\Develloper\landing_page_finntrackHome`
- **Bloco atual**: Épico 6 — Qualidade e lançamento
- **Última task concluída**: `QA-001`, integrada na `main` pelo PR #20 e merge
  `ace75ff`.
- **Retomada validada**: a suíte focada de `QA-001` passou novamente em 2026-07-29
  com 20/20 cenários P0 em Chromium desktop/mobile. Os quatro checks remotos do
  PR #20 estavam verdes antes do squash merge.
- **Próximo passo operacional**: não há task pendente elegível sem evidência ou
  decisão externa. Reavaliar primeiro a pré-condição de `REL-004` após existir
  uma amostra real confiável no Vercel Analytics, descontando/anotando os 5
  pageviews sintéticos de `ANA-004`.
- **Bloqueios**: `SEO-003` depende de `DEC-012`; `QA-002` depende de leitor de
  tela real; `QA-003` depende de versões anteriores reais e Safari em macOS;
  `REL-001` depende do fechamento desses gates/decisões; `REL-004` aguarda
  amostra real utilizável.
- **Branch**: `codex/sdd-handoff-blocked`, criada a partir de `origin/main`.
- **Orçamento no pré-voo**: `OK`, com contexto restante 89,1%, quota semanal
  restante 82,0% e reset em 2026-08-05 17:19 BRT (`AMBIGUOUS=0`).
- **Motivo da parada**: bloqueio; nenhum novo checkbox foi marcado porque todas
  as tarefas pendentes exigem decisão, ambiente manual ou dados reais ainda
  indisponíveis.
