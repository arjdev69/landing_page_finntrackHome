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

## Handoff

- **Projeto**: FinnTrack Home Landing /
  `C:\Users\ARJ\Favorites\Develloper\landing_page_finntrackHome`
- **Bloco atual**: Épico 0 — Decisões e contratos (parcial; ciclo de `D0-003`
  concluído)
- **Tasks concluídas neste bloco**: `D0-003`
- **Em andamento (arquivo:linha)**: nenhum
- **Próximo passo**: obter domínio e hospedagem oficiais da landing para resolver
  `D0-002`/`DEC-010`; não iniciar deploy de produção enquanto permanecerem
  pendentes.
- **Validação**: app 7/7 testes focados e 4/4 E2E; smoke publicado mobile/desktop;
  landing `npm run format:check`, `npm run lint`, `npm run typecheck`,
  `npm test` 55/55 e `npm run build` aprovados.
- **Bloqueios**: domínio/hospedagem da landing (`D0-002`/`DEC-010`), decisão de
  analytics/consentimento (`D0-005`/`DEC-007`) e autenticação/OAuth real
  (`INT-004`).
- **Arquivos não commitados**: nenhum
- **Branch**: `main`
- **Orçamento na parada**: contexto 35,5% · quota semanal 22,0% (medido;
  `AMBIGUOUS=0`)
- **Motivo da parada**: quota semanal ≤30% no pré-voo de retomada
