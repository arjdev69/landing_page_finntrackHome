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

## Handoff

- **Projeto**: FinnTrack Home Landing /
  `C:\Users\ARJ\Favorites\Develloper\landing_page_finntrackHome`
- **Bloco atual**: Épico 1 — Fundação (`FND-006` em andamento)
- **Tasks concluídas neste bloco**: nenhuma nesta retomada
- **Em andamento (arquivo:linha)**: `.github/workflows/ci.yml:1`
- **Próximo passo**: após autorização explícita do usuário, instalar/autenticar
  GitHub CLI, publicar uma branch de validação e abrir um PR draft; aguardar o
  check `Quality and preview build` e o Preview Deployment da Vercel. Se ambos
  passarem, registrar a URL/evidência, marcar `FND-006`, atualizar
  `docs/11-TRACEABILITY.md` e fazer o commit atômico final.
- **Validação**: revalidação de `LEG-001` em `npm test` 55/55. Para `FND-006`,
  teste focado 2/2; `npm run format:check`, lint e typecheck aprovados; suíte
  completa 57/57; build explícito com `PUBLIC_ENVIRONMENT=preview`; E2E 30/30;
  Lighthouse 99/99, acessibilidade 100/100 e orçamento aprovado. Workflow e
  documentação também passaram no Prettier.
- **Bloqueios**: execução remota do GitHub Actions e geração do preview exigem
  publicar branch/PR, ação externa ainda não autorizada. O GitHub CLI `gh`
  também não está instalado. O conector confirmou zero workflows no commit
  `de67918`; não há falha funcional local conhecida.
- **Arquivos não commitados**: `.github/workflows/ci.yml`,
  `docs/operations/FND-006-CI-PREVIEWS.md`, `test/ci-workflow.test.mjs`
- **Branch**: `main`
- **Orçamento na parada**: contexto 52,9% · quota semanal 81,0% (medido;
  `AMBIGUOUS=0`)
- **Motivo da parada**: bloqueio de autoridade/ferramenta para validação remota
