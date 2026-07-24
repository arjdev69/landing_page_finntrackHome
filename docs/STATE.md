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
- **Bloco atual**: Épico 5 — SEO, legal e ativos (`LEG-001` não iniciado)
- **Tasks concluídas neste bloco**: nenhuma nesta retomada
- **Em andamento (arquivo:linha)**: nenhum
- **Próximo passo**: após o reset de orçamento, executar `LEG-001`: formalizar o
  aceite em `docs/legal/APROVACAO-LEGAL.md`, publicar `/privacidade` e `/termos`
  a partir das minutas aprovadas e validar `T-LEGAL-001`/`T-SEO-002`.
- **Validação**: `npm test` 55/55, `npm run build`, `git diff --check` e smoke
  HTTP aprovados; landing, cadastro e login responderam 200, e HTTP da landing
  redirecionou para HTTPS com 308.
- **Bloqueios**: retenção/base legal e aprovação jurídica para analytics Supabase
  (`D0-005`/`DEC-007`); autenticação/OAuth real (`INT-004`); dados estruturados
  sem `DEC-012`. A aprovação jurídica das páginas legais foi confirmada em
  `AD-004` e não bloqueia mais `LEG-001`.
- **Arquivos não commitados**: nenhum
- **Branch**: `main`
- **Orçamento na parada**: contexto 49,6% · quota semanal 4,0% (medido;
  `AMBIGUOUS=0`)
- **Motivo da parada**: limite obrigatório de orçamento do SDD atingido no
  pré-voo; nenhuma tarefa de implementação iniciada
