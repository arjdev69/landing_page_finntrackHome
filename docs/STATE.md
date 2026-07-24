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

## Handoff

- **Projeto**: FinnTrack Home Landing /
  `C:\Users\ARJ\Favorites\Develloper\landing_page_finntrackHome`
- **Bloco atual**: Épico 0 — Decisões e contratos (parcial; ciclo de `D0-003`
  concluído)
- **Tasks concluídas neste bloco**: `D0-003`
- **Em andamento (arquivo:linha)**: nenhum
- **Próximo passo**: após o reset de orçamento, retomar `D0-002` registrando
  Vercel e o domínio gerado no primeiro preview; depois configurar CI/preview
  em `FND-006`, sem ativar analytics.
- **Validação**: app 7/7 testes focados e 4/4 E2E; smoke publicado mobile/desktop;
  landing `npm run format:check`, `npm run lint`, `npm run typecheck`,
  `npm test` 55/55 e `npm run build` aprovados.
- **Bloqueios**: domínio gerado ainda inexistente (`D0-002`/`DEC-010`);
  retenção/base legal e aprovação jurídica para analytics Supabase
  (`D0-005`/`DEC-007`); autenticação/OAuth real (`INT-004`); documentos legais
  sem as aprovações humanas de `DEC-008`.
- **Arquivos não commitados**: nenhum
- **Branch**: `main`
- **Orçamento na parada**: contexto 23,4% · quota semanal 19,0% (medido;
  `AMBIGUOUS=0`)
- **Motivo da parada**: quota semanal ≤30% no pré-voo de retomada
