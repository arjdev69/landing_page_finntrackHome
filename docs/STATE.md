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
- **Bloco atual**: Épico 0 — Decisões e contratos (parcial; ciclo de `D0-002`
  concluído)
- **Tasks concluídas neste bloco**: `D0-002`, `D0-003`
- **Em andamento (arquivo:linha)**: nenhum
- **Próximo passo**: após o reset de orçamento, executar `FND-006` para
  configurar e comprovar os gates de CI e preview na Vercel; não iniciar
  `LEG-001`, `D0-005` ou `SEO-003` enquanto suas aprovações permanecerem abertas.
- **Validação**: `npm test` 55/55, `npm run build`, `git diff --check` e smoke
  HTTP aprovados; landing, cadastro e login responderam 200, e HTTP da landing
  redirecionou para HTTPS com 308.
- **Bloqueios**: retenção/base legal e aprovação jurídica para analytics Supabase
  (`D0-005`/`DEC-007`); autenticação/OAuth real (`INT-004`); documentos legais
  sem as aprovações humanas de `DEC-008`; dados estruturados sem `DEC-012`.
- **Arquivos não commitados**: nenhum
- **Branch**: `main`
- **Orçamento na parada**: contexto 50,9% · quota semanal 5,0% (medido;
  `AMBIGUOUS=0`)
- **Motivo da parada**: tarefa concluída; limite obrigatório de orçamento do SDD
  atingido no checkpoint pós-bloco
