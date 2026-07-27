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

## Handoff

- **Projeto**: FinnTrack Home Landing /
  `C:\Users\ARJ\Favorites\Develloper\landing_page_finntrackHome`
- **Bloco atual**: Épico 0 — Decisões e contratos
- **Tasks concluídas neste bloco**: `D0-005`
- **Em andamento (arquivo:linha)**: nenhuma
- **Próximo passo**: `ANA-003` está desbloqueada, mas não iniciada. Implementar
  endpoint/tabela e todos os gates de
  `docs/privacy/D0-005-ANALYTICS-POLICY.md`, mantendo `noop` até a validação.
- **Validação**: teste focado 4/4; formatação, lint e typecheck aprovados; suíte
  completa passou de 62 para 64 testes; build estático aprovado; E2E 30/30 em
  desktop/mobile.
- **Passada de negação**: endpoint, tabela, credenciais, expiração, rate limit,
  descarte real de IP, CSP e debug de produção não foram implementados; todos
  permanecem explicitamente em `ANA-003/004`. O cliente ativo continua
  `NoopAnalytics`.
- **Bloqueios**: nenhum para `D0-005`. `INT-001`, `INT-004` e `SEO-003`
  continuam dependentes de suas decisões/contratos próprios.
- **Arquivos não commitados**: nenhum após o commit atômico.
- **Branch**: `codex/d0-005-decision-handoff`
- **Orçamento na parada**: contexto 28,0% · quota semanal 22,0%, com reset em
  2026-08-03 11:24 BRT (medido; `AMBIGUOUS=0`)
- **Motivo da parada**: ciclo SDD concluído após uma única tarefa, `D0-005`
