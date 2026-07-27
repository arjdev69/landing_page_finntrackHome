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

## Handoff

- **Projeto**: FinnTrack Home Landing /
  `C:\Users\ARJ\Favorites\Develloper\landing_page_finntrackHome`
- **Bloco atual**: Épico 1 — Fundação concluído
- **Tasks concluídas neste bloco**: `FND-006`
- **Em andamento (arquivo:linha)**: nenhuma
- **Próximo passo**: em nova execução, selecionar exatamente uma tarefa pendente
  e elegível; não iniciar `INT-001` enquanto a estratégia `DEC-013` permanecer
  proposta.
- **Validação**: teste focado 2/2; formatação, lint e typecheck aprovados; suíte
  completa 57/57; build explícito com `PUBLIC_ENVIRONMENT=preview`; E2E 30/30;
  Lighthouse 99/99 e acessibilidade 100/100. O PR #1 foi integrado por squash
  em `4215628`; GitHub Actions da `main` passou em 3m05s, a Vercel concluiu o
  deploy de produção e o smoke retornou HTTP 200 em `/`, `/privacidade`,
  `/termos`, `/robots.txt` e `/sitemap.xml`.
- **Bloqueios**: nenhum para `FND-006`. O preview não permite smoke anônimo do
  HTML porque a Vercel intercepta com `X-Matched-Path: /login`; o artefato de
  preview é validado pelo pipeline. O Actions registrou aviso não bloqueador de
  runtime Node 20 nas actions v4. `D0-005`, `DEC-012` e `DEC-013` continuam
  bloqueando seus trabalhos dependentes.
- **Arquivos não commitados**: nenhum após o commit de fechamento de `FND-006`
- **Branch**: `main`
- **Orçamento na parada**: contexto 23,2% · quota semanal 65,0% (medido;
  `AMBIGUOUS=0`)
- **Motivo da parada**: `FND-006` concluída; orçamento em WARN, sem iniciar nova
  tarefa
