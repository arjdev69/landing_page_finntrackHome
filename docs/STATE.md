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
- **Status**: superseded por AD-009

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
- **Status**: superseded por AD-010

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
- **Status**: superseded por AD-010

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

### AD-008

- **Decisão**: encerrar o contrato de aquisição do MVP com UTMs somente em
  memória no app, sem persistência first/last-touch e sem correlação com conta.
  Cadastro, atividade e retenção 7/30 dias serão medidos separadamente no
  produto.
- **Razão**: validar retenção de usuários não exige identificar a campanha de
  cada conta; separar as medições reduz complexidade e tratamento de dados.
- **Trade-off**: o MVP mede intenção/saída na landing e retenção no app, mas não
  calcula conversão identificada landing → cadastro nem retenção por campanha.
- **Data**: 2026-07-29
- **Status**: ativa

### AD-009

- **Decisão**: adotar `https://finntrackhomepage.app` como origem canônica da
  landing e redirecionar permanentemente o host Vercel anterior e a variante
  `www`, preservando path e query.
- **Razão**: o responsável do projeto vinculou o domínio customizado à landing;
  manter canonical e sitemap no host anterior dividiria sinais de indexação.
- **Trade-off**: Search Console e sitemap precisam ser configurados novamente
  para a nova propriedade; o host anterior deve continuar vinculado à Vercel
  durante a migração para entregar o redirect.
- **Data**: 2026-07-29
- **Status**: ativa

### AD-010

- **Decisão**: usar Vercel Web Analytics no plano Hobby somente para pageview
  agregado da home em produção, sanitizando o caminho para `/` e descartando
  query, hash, eventos customizados, rotas legais, `/entrar`, 404 e previews.
  O cliente de eventos tipados existente permanece `noop`.
- **Razão**: o responsável ativou o recurso gratuito da hospedagem e priorizou
  uma medição simples para validar interesse, sem operar endpoint ou banco
  próprios e sem correlacionar aquisição com contas.
- **Trade-off**: o plano Hobby oferece 50.000 eventos mensais e relatório de um
  mês, mas não oferece eventos customizados nem dimensões UTM. Conversão,
  ativação e retenção continuam sendo métricas separadas do app.
- **Data**: 2026-07-29
- **Status**: ativa

### AD-011

- **Decisão**: aprovar `DEC-012` com lista vazia de dados estruturados no MVP;
  nenhum JSON-LD será publicado até existir nova decisão com campos e evidência
  visíveis.
- **Razão**: o responsável priorizou uma implementação prática e sem alegações
  ou marcação desnecessária durante a validação inicial do produto.
- **Trade-off**: a landing não buscará resultados enriquecidos nesta fase, mas
  evita schemas sem benefício ou evidência comprovados.
- **Data**: 2026-07-29
- **Status**: ativa

### AD-012

- **Decisão**: adiar os testes manuais restantes de `QA-002` e `QA-003` para uma
  etapa posterior, mantendo ambas as tarefas abertas.
- **Razão**: leitor de tela real, Safari/macOS e versões anteriores de
  navegadores não estão disponíveis no ambiente atual.
- **Trade-off**: as coberturas automatizadas permanecem válidas, mas o projeto
  não reivindica conclusão integral de acessibilidade ou compatibilidade até as
  evidências manuais existirem.
- **Data**: 2026-07-29
- **Status**: ativa

## Handoff

- **Projeto**: FinnTrack Home Landing /
  `C:\Users\ARJ\Favorites\Develloper\landing_page_finntrackHome`
- **Bloco concluído neste ciclo**: Épico 5 — `SEO-003`.
- **Implementação**: `DEC-012` foi aceita com lista vazia de schemas no MVP.
  SRS, especificação de SEO e plano de testes agora proíbem JSON-LD até nova
  decisão; o teste do artefato cobre home, páginas legais e 404.
- **Validação**: teste SEO focado 3/3; formatação com finais de linha automáticos;
  lint; tipagem com 0 erros/avisos; suíte completa 75/75, mesma contagem
  anterior; build estático de 5 páginas aprovado.
- **Passada de negação**: nenhum Rich Results Test foi executado porque não há
  schema no artefato; `Organization`, `WebSite`, `SoftwareApplication` e
  `FAQPage` permanecem candidatos futuros sem aprovação. `AggregateRating`,
  preço, avaliações e métricas de usuários não são emitidos.
- **Decisão adicional**: `QA-002` e `QA-003` foram adiadas por `DEC-019`, mas
  permanecem abertas e não são apresentadas como concluídas.
- **Próximo passo operacional**: `REL-004` quando houver amostra real confiável
  no Vercel Analytics, anotando os 5 pageviews sintéticos de `ANA-004`.
- **Bloqueios restantes**: `QA-002` exige leitor de tela real; `QA-003` exige
  versões anteriores reais e Safari/macOS; `REL-001` depende do fechamento
  formal desses gates; `REL-004` aguarda amostra real utilizável.
- **Branch**: `codex/seo-003-no-schema`.
- **Orçamento após o bloco**: `OK`, com contexto restante 58,6%, quota semanal
  restante 77,0% e reset em 2026-08-05 17:19 BRT (`AMBIGUOUS=0`).
- **Motivo da parada**: um bloco atômico concluído; nenhum outro bloco foi
  iniciado neste ciclo.
