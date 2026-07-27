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
- **Bloco atual**: Épico 5 — SEO, legal e ativos (`LEG-001` em andamento)
- **Tasks concluídas neste bloco**: nenhuma nesta retomada
- **Em andamento (arquivo:linha)**: `test/legal-drafts.test.mjs:42`
- **Próximo passo**: em uma nova execução, tornar a asserção de gratuidade
  tolerante à quebra de linha Markdown (`/não gera assinatura ou\s+cobrança
  automática/i`), rodar `npm test` e só então seguir para build, E2E, smoke,
  documentação, checkbox e commit de `LEG-001`.
- **Validação**: terceira tentativa de `npm test` passou 54/55. Falha restante:
  o texto aprovado contém “não gera assinatura ou” e “cobrança automática” em
  linhas consecutivas, enquanto o teste exige espaço literal. O build de
  produção executado dentro de `test/seo.test.mjs` gerou as duas rotas e todas
  as demais asserções passaram.
- **Bloqueios**: limite de três tentativas do SDD atingido nesta execução; não há
  falha funcional conhecida. Analytics (`D0-005`/`DEC-007`), OAuth (`INT-004`) e
  dados estruturados (`DEC-012`) continuam bloqueados separadamente.
- **Arquivos não commitados**: `docs/10-DECISION-LOG.md`,
  `docs/legal/APROVACAO-LEGAL.md`, `docs/legal/PRIVACIDADE.md`,
  `docs/legal/TERMOS.md`, `src/config/site.ts`, `src/layouts/LegalLayout.astro`,
  `src/pages/privacidade.astro`, `src/pages/termos.astro`,
  `src/styles/global.css`, `test/legal-drafts.test.mjs`, `test/seo.test.mjs`
- **Branch**: `main`
- **Orçamento na parada**: contexto 19,9% · quota semanal 93,0% (medido;
  `AMBIGUOUS=0`)
- **Motivo da parada**: bloqueio de validação após três tentativas; alterações de
  `LEG-001` preservadas sem commit
