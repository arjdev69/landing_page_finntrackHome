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
- **Status**: ativa

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
- **Status**: ativa

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
- **Status**: ativa

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

## Handoff

- **Projeto**: FinnTrack Home Landing /
  `C:\Users\ARJ\Favorites\Develloper\landing_page_finntrackHome`
- **Bloco atual**: Épico 3 — Rotas e integração
- **Tasks concluídas neste bloco**: `INT-001`
- **Em andamento (arquivo:linha)**: nenhuma
- **Próximo passo**: obter decisão explícita para `INT-004`. Recomendação
  prática para o MVP: não persistir nem correlacionar UTMs com contas; aprovar o
  contrato em memória já entregue e medir retenção diretamente no app por
  coortes de cadastro/atividade no Supabase. Depois, alinhar SRS, Analytics,
  `DEC-004` e `T-UTM-002` antes de validar o fluxo real.
- **Validação**: `INT-001` revalidada em 9/9. Inspeção somente leitura do app
  confirmou que os últimos commits funcionais de aquisição continuam sendo os
  de 2026-07-24 e o adaptador permanece em memória. Smoke público em 2026-07-29
  confirmou HTTP 200 para `/cadastro`, `/entrar` e `/dashboard`.
- **Passada de negação**: não foram executadas submissão real de cadastro/login,
  callbacks OAuth nem associação de campanha à conta. HTTP 200 não comprova
  autenticação, pós-auth, retenção ou atribuição; portanto `INT-004` permanece
  aberta.
- **Bloqueios**: `INT-004` requer escolha entre simplificar formalmente o
  contrato do MVP ou aprovar/implementar persistência consent-aware. `ANA-003`
  continua bloqueada pela ausência de configuração server-side do
  Supabase/Vercel. `SEO-003` depende de `DEC-012`.
- **Arquivos não commitados**: nenhum após o checkpoint.
- **Branch**: `codex/ana-003-preflight`
- **Orçamento na parada**: contexto 63,8% · quota semanal 7,0%, com reset em
  2026-08-03 11:24 BRT (medido; `AMBIGUOUS=0`)
- **Motivo da parada**: `INT-004` bloqueada por decisão de produto/privacidade e
  ausência de E2E real; nenhuma tarefa ou implementação parcial foi iniciada
  neste ciclo.
