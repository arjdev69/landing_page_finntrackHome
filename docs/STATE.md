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
- **Bloco atual**: Épico 6 — Qualidade e lançamento
- **Tasks concluídas neste bloco**: nenhuma nesta execução
- **Em andamento (arquivo:linha)**: `QA-005`
  (`test/foundation.test.mjs:30`)
- **Próximo passo**: atualizar a expectativa literal do comando
  `format:check` em `test/foundation.test.mjs` para incluir
  `vendor/**/*.{cjs,ts,json}`; então repetir `npm test`. Se passar, executar
  `npm run test:security`, build, E2E e validação remota da Vercel antes de
  marcar `QA-005`.
- **Validação**: contrato Vercel e compatibilidade passaram 7/7; lint passou;
  typecheck passou com 0 erros, warnings ou hints; `npm run test:security`
  recompilou o site, validou o hash CSP no Chromium e terminou com zero
  vulnerabilidades. A suíte ampla passou 61/62: somente o teste de fundação
  falhou porque ainda espera o comando antigo do Prettier sem a pasta `vendor`.
- **Bloqueios**: limite de três correções da skill atingido nesta task. Falhas
  encontradas em sequência: auditoria detectou `GHSA-mh99-v99m-4gvg`; lint
  exigiu compatibilidade CommonJS/import explícito; suíte ampla detectou a
  expectativa literal desatualizada em `test/foundation.test.mjs:30`.
- **Arquivos não commitados**: `.github/workflows/ci.yml`,
  `docs/operations/FND-006-CI-PREVIEWS.md`, `package.json`,
  `package-lock.json`, `scripts/security-headers.mjs`,
  `scripts/validate-security-headers.mjs`, `test/security-headers.test.mjs`,
  `vercel.mjs`, `vendor/minimatch-compat/*` e `docs/STATE.md`. Alguns arquivos
  existentes aparecem modificados apenas por normalização local de final de
  linha e não possuem diff de conteúdo.
- **Branch**: `codex/qa-005-vercel-security-headers`
- **Orçamento na parada**: contexto 25,4% · quota semanal 43,0% (medido;
  `AMBIGUOUS=0`)
- **Motivo da parada**: bloqueio pelo limite de três tentativas de correção;
  `QA-005` permanece aberta e nenhum código incompleto foi commitado ou publicado
