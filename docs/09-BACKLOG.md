# Backlog de implementação

Versão: 0.1.1  
Status: approved  
Data: 2026-07-15

## Regras de execução

- Executar uma tarefa por vez.
- Não iniciar tarefa cujo requisito ou dependência esteja indefinido.
- Cada tarefa termina com testes e atualização da rastreabilidade.
- Não incluir escopo futuro sem atualização prévia de PRD/SRS.
- Decisões bloqueadoras de lançamento não impedem fundação configurável, mas
  impedem produção e o teste final dependente.

## Estado documental

- [x] `DOC-001` Importar o handover de origem.
- [x] `DOC-002` Criar baseline de visão, PRD, SRS, SDD, UX, SEO/analytics,
  segurança, testes, backlog, decisões e rastreabilidade.
- [x] `DOC-003` Aprovar a baseline `0.1.1` e mudar documentos normativos de
  `draft` para `approved`.

## Épico 0 — Decisões e contratos

- [x] `D0-001` Aprovar `DEC-002` (Astro + TypeScript + Tailwind).
- [x] `D0-002` Confirmar domínio do site, app e hospedagem (`DEC-004`, `DEC-010`).
  - Evidência (2026-07-24): Vercel aceita como hospedagem da landing estática,
    inicialmente em `https://finntrack-home-landing.vercel.app`; o app permanece
    em `https://finntrackhome.app`, com cadastro/login diretos. Configuração de
    produção validada, build aprovado, landing e destinos do app responderam 200,
    e HTTP redirecionou para HTTPS com 308. `DEC-010` aceita a plataforma e
    separa pipeline/preview, `/entrar`, 404, headers e rollback nas tarefas
    executáveis correspondentes; domínio customizado fica adiado.
- [x] `D0-003` Implementar/confirmar no app a URL que abre cadastro diretamente e
  o contrato de UTMs (`DEC-004`).
  - Evidência (2026-07-24): o app publicou
    `https://finntrackhome.app/cadastro` e
    `https://finntrackhome.app/entrar`; `/dashboard` permanece protegido e
    encaminha visitante sem sessão para `/entrar`. O repositório
    `arjdev69/finntrackhome` implementou rotas diretas (`f1a7919`), parser das
    cinco UTMs (`4e104a3`), adaptador seguro somente em memória (`ee88d6c`) e E2E
    desktop/mobile (`f2c18fd`). Testes focados passaram 7/7, E2E 4/4 e o smoke
    publicado confirmou cadastro/login em 360×800 e 1440×900. Retenção,
    atribuição durável, OAuth real e submissão de autenticação permanecem
    corretamente em `DEC-007`/`INT-004`; ver
    `docs/14-APP-INTEGRATION-HANDOVER.md`.
- [x] `D0-004` Definir beta/gratuidade e aprovar CTA/FAQ (`DEC-005`).
  - Evidência (2026-07-21): `DEC-005` aceita o CTA único “Criar conta” e proíbe
    alegações de gratuidade/beta sem nova decisão; pergunta sobre gratuidade foi
    retirada do FAQ normativo. PRD e especificação de UX atualizados.
- [ ] `D0-005` Escolher analytics e política de consentimento (`DEC-006/007`).
- [x] `D0-006` Definir responsáveis por jurídico, suporte e ativos
  (`DEC-008/009/011`).
  - Evidência (2026-07-21): governança jurídica aceita com redação assistida,
    validação factual e aprovação humana obrigatória; canal real
    `jobslens.ia@gmail.com`, responsável operacional e fluxo para solicitações de
    dados definidos; criação, revisão e aprovação de ativos atribuídas. A
    auditoria também reprovou a captura provisória como ativo final por conter
    identidade demonstrativa e trechos em inglês. `LEG-001`, `AST-001` e
    `SEO-002` preservam seus próprios critérios de aprovação.

Critério: decisões têm status, responsável, data e impacto refletidos nos docs.

## Épico 1 — Fundação

- [x] `FND-001` Inicializar Astro/TypeScript/Tailwind e lockfile.
  - Aceite: scripts `dev`, `build`, `lint`, `typecheck`, `test` operam.
  - Cobertura: `OPS-003..004`.
  - Evidência (2026-07-15): Astro 7.0.9, TypeScript 6.0.3, Tailwind CSS
    4.3.2, `package-lock.json`; `npm run lint`, `npm run typecheck`, `npm test` e
    `npm run build` aprovados; servidor `npm run dev -- --background` respondeu
    HTTP 200 e foi encerrado após o smoke test.
- [x] `FND-002` Configurar lint, formatação, testes e aliases.
  - Evidência (2026-07-15): ESLint 9 com regras recomendadas para Astro,
    TypeScript e acessibilidade; Prettier com suporte a `.astro`; aliases
    tipados para a estrutura do SDD; teste automatizado do contrato de tooling;
    `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test` e
    `npm run build` aprovados sem avisos.
- [x] `FND-003` Criar validação tipada das variáveis de ambiente.
  - Cobertura: `FR-CTA-009`, `SEC-001..003`, `OPS-001..002`.
  - Evidência (2026-07-16): schema público tipado do Astro e módulo central
    `src/config/env.ts`; validação obrigatória antes do build para ambiente,
    URLs absolutas, origens canônicas, HTTPS e placeholders; configuração local
    documentada em `.env.example`; sete testes aprovados, incluindo falha real de
    `npm run build` sem configuração; `npm run format:check`, `npm run lint`,
    `npm run typecheck`, `npm test` e build com configuração sintética aprovados.
- [x] `FND-004` Implementar tokens, estilos globais, fonte e primitives.
  - Cobertura: `A11Y-002`, `A11Y-006`, `RWD-001`.
  - Evidência (2026-07-16): tokens semânticos centralizados no Tailwind,
    combinações de contraste AA testadas, foco global de 3 px, reduced motion,
    Inter Variable latina auto-hospedada com `font-display: swap` e primitives
    tipadas `Container`, `ButtonLink` e `SectionHeading`; `npm run format:check`,
    `npm run lint`, `npm run typecheck`, 10 testes e build aprovados; inspeção do
    artefato em 320/360/390/768/1024/1440 px sem overflow ou erros de navegador,
    com capturas em `artifacts/fnd-004-*.png`.
- [x] `FND-005` Implementar `MarketingLayout`, o shell de `src/pages/index.astro`
  e o contrato de SEO.
  - Aceite: `/` responde 200 no artefato e monta o layout com metadados tipados;
    as seções de conteúdo podem ser adicionadas incrementalmente por `WEB-*`.
  - Cobertura: `FR-NAV-001`, `SEO-001..005`, `SEO-009`.
  - Evidência (2026-07-16): `MarketingLayout`, `SeoHead`, configuração tipada da
    home e normalização same-origin de canonical; preview protegido por
    `noindex,nofollow`; HTML inicial com title, description, canonical, Open
    Graph, Twitter, H1 único e nenhum script cliente; 12 testes, lint, typecheck,
    formatação e build aprovados; preview do artefato respondeu HTTP 200; smoke
    em 390/1440 px sem overflow ou logs, com capturas
    `artifacts/fnd-005-*.png`. Ícones e social card finais permanecem em
    `SEO-002`, sem referência antecipada a asset inexistente.
- [ ] `FND-006` Configurar CI com gates de PR e build de preview.
  - Cobertura: `OPS-003..005`.
  - Bloqueada por `DEC-010`, cuja data limite é anterior à tarefa.

## Épico 2 — Estrutura e conteúdo da home

- [x] `WEB-001` Implementar Header e navegação mobile acessível.
  - Cobertura: `FR-NAV-002..006`, `A11Y-001..005`.
  - Evidência (2026-07-16): `Header.astro`, `MobileNavigation.astro` e
    `navigation.ts` implementam marca, âncoras reais, URLs públicas tipadas e CTA
    neutro “Criar conta”, posteriormente aprovado por `DEC-005`. O menu usa
    `details/summary`, funciona sem JavaScript e acrescenta fechamento por
    `Escape` com retorno de foco; skip link e destinos são focáveis. Gates de
    formatação, lint, tipagem, build e 14 testes aprovados; smoke no navegador
    confirmou links/âncoras, ausência de logs de erro e captura
    `artifacts/web-001-desktop.png`.
- [x] `WEB-002` Implementar Hero com CTAs e asset temporário explicitamente
  marcado para substituição antes da produção.
  - Cobertura: `FR-HOME-001..003`, `FR-CTA-001..005`.
  - Evidência (2026-07-21): `Hero.astro` renderiza no HTML inicial a copy
    aprovada, CTA “Criar conta” pela URL pública tipada, CTA secundário para
    `#demonstracao` e captura real responsiva com status provisório explícito.
    `test/hero.test.mjs`, formatação, lint, tipagem, build e 43 testes aprovados.
    Inspeção em 360×800 e 1440×900 confirmou proposta, apoio e CTA acima da
    dobra, H1 único, ausência de overflow/logs e âncora funcional. O ativo segue
    pendente de aprovação/substituição em `AST-001`/`DEC-009`.
- [x] `WEB-003` Implementar Problema, Benefícios e Como funciona.
  - Cobertura: `FR-HOME-004..006`.
  - Evidência (2026-07-17): `Problem.astro`, `Benefits.astro` e
    `HowItWorks.astro` renderizam no HTML inicial a copy aprovada e uma hierarquia
    semântica de títulos/listas; `home-content.ts` centraliza o conteúdo tipado,
    sem alegação de rentabilidade. `test/home-sections.test.mjs` e o teste do
    artefato cobrem conteúdo, integração e ausência de runtime cliente. Gates de
    formatação, lint, tipagem, build e 16 testes aprovados; inspeção em 390/1440
    px sem overflow ou logs de erro, com capturas `artifacts/web-003-*.png`.
- [x] `WEB-004` Implementar ProductPreview com imagens responsivas.
  - Cobertura: `FR-HOME-007..008`, `PERF-005`.
  - Evidência (2026-07-21): `ProductPreview.astro` usa `astro:assets` para gerar
    WebP responsivo em 640/960/1440 px, com dimensões reservadas, lazy loading,
    alt text útil e legenda de dados demonstrativos. A captura 1440×900 veio do
    dashboard real do repositório local `FinntrackHome`, em modo local com seed
    sintético de junho de 2026; origem, classificação e aprovação provisória
    estão registradas em `product-assets.ts`. Gates de formatação, lint, tipagem,
    build e 18 testes aprovados; inspeção em 390/1440 px sem overflow ou logs de
    erro, com capturas `artifacts/web-004-*.jpg`. Aprovação/substituição final do
    ativo permanece em `AST-001`/`DEC-009`.
- [x] `WEB-005` Implementar Para quem, FAQ, CTA final e Footer.
  - Evidência (2026-07-21): `Audience.astro`, `Faq.astro`, `FinalCta.astro` e
    `Footer.astro` implementam o público prioritário e limite explícito, seis
    respostas verificadas contra o app, CTA neutro configurável, links legais,
    login, suporte real e ano dinâmico. FAQ usa `details/summary` e identificadores
    estáveis para analytics; links do app preservam fallback e instrumentação.
    Formatação, lint, tipagem, build e 45 testes aprovados. Inspeção em 360×800 e
    1440×900 confirmou layout sem overflow, FAQ operável e ausência de erros de
    navegador, com capturas em `artifacts/web-005-*.png`. O conteúdo das páginas
    legais continua reservado a `LEG-001`.
  - Cobertura: `FR-HOME-009..012`, `FR-NAV-003`, `FR-CTA-001`.
- [x] `WEB-006` Validar responsividade e conteúdo acima da dobra.
  - Evidência (2026-07-21): matriz visual executada em 320×800, 360×800,
    390×844, 768×1024, 1024×768 e 1440×900. A primeira passagem detectou
    overflow em 320 px causado pelo `min-width` rígido do elemento `html`; a
    regra foi removida e coberta por `test/responsive.test.mjs`. A segunda
    passagem confirmou `scrollWidth <= clientWidth` nos seis viewports, H1 único,
    proposta/texto/CTA acima da dobra, todas as seções presentes e demonstração
    com 271 px de largura e alternativa textual em 320 px. Formatação, lint,
    tipagem, build e 46 testes aprovados; sem logs de navegador. Capturas em
    `artifacts/web-006-*.png`.
  - Cobertura: `RWD-001..004`, `FR-HOME-001`.

## Épico 3 — Rotas e integração

- [ ] `INT-001` Implementar `/entrar` e configuração de redirect na plataforma.
  - Bloqueada por: `D0-002`/`DEC-010`, que define a estratégia de hospedagem.
  - Aceite: preserva somente a allowlist de UTMs e nunca aceita destino vindo da
    query; quando o host não filtrar parâmetros, usa o fallback documentado.
  - Cobertura: `FR-CTA-003`, `FR-UTM-001..005`, `SEO-007`, `SEO-012`.
- [x] `INT-002` Implementar helper de allowlist/merge de UTMs com testes.
  - Cobertura: `FR-UTM-001..005`.
  - Evidência (2026-07-21): `src/lib/navigation/utm.ts` expõe allowlist tipada,
    leitura somente de valores não vazios e merge por `URL/URLSearchParams` sem
    mutar nem sobrescrever parâmetros do destino. Chaves inesperadas, destino,
    token e fragmento da origem não são promovidos. `test/utm.test.mjs` cobre
    encoding, duplicidade, parâmetros funcionais, entradas vazias/inválidas e
    fallback intacto. Formatação, lint, tipagem, build e 22 testes aprovados.
- [x] `INT-003` Implementar enriquecimento progressivo dos links do app.
  - Cobertura: `FR-CTA-005..006`, `FR-UTM-001..005`.
  - Evidência (2026-07-21): os quatro CTAs de login/cadastro do header desktop e
    móvel mantêm `href` funcional no HTML e são enriquecidos progressivamente
    por `AppLinkEnhancer.astro`, somente com a allowlist de UTMs. A integração
    não intercepta cliques, não usa storage/cookie/SDK e preserva o fallback em
    qualquer falha. `test/app-link-enrichment.test.mjs`, a suíte completa
    (25/25), build e smoke no navegador comprovaram allowlist, encoding,
    ausência de PII/redirect/fragmento e fallback sem UTMs ou logs.
- [ ] `INT-004` Validar contrato real de cadastro/login e UTMs com o app.
  - Bloqueado por: `D0-003`.
  - Cobertura: `FR-CTA-007..008`, `FR-UTM-006..007`.

## Épico 4 — Analytics

- [x] `ANA-001` Implementar tipos, classificação determinística de
  `device_group`/`referrer_group`, contrato e `NoopAnalytics`.
  - Evidência (2026-07-21): `src/lib/analytics/contract.ts` expõe os sete eventos
    e somente as propriedades/enums catalogadas; `classification.ts` aplica os
    breakpoints, precedência e allowlists `2026-07-15.v1`; `noop.ts` fornece o
    padrão seguro sem SDK, rede, cookie ou storage. `test/analytics.test.mjs`
    cobre limites, precedência, sinais inválidos, contrato runtime e ausência de
    efeitos. Formatação, lint, tipagem, build e 30 testes aprovados.
- [x] `ANA-002` Instrumentar eventos sem SDK de provedor nos componentes.
  - Cobertura: `ANA-001..005`.
  - Evidência (2026-07-21): `AnalyticsInstrumentation.astro` conecta carregamento
    da home, CTAs, demonstração, CTA secundário e FAQ ao controlador tipado sem
    conhecer SDK ou consent manager. `page.ts` limita payloads, emite CTA antes
    de `outbound_to_app`, não aguarda rede, deduplica `landing_view` e
    `product_preview_view` e contém falhas do adaptador. O cliente padrão segue
    noop. `test/analytics-instrumentation.test.mjs`, smoke no navegador,
    formatação, lint, tipagem, build e 36 testes aprovados.
- [ ] `ANA-003` Integrar provedor e consentimento aprovados.
  - Bloqueado por: `D0-005`.
  - Cobertura: `ANA-006..007`, `PRIV-001..002`.
- [ ] `ANA-004` Validar payloads, duplicidade, PII e debug de produção.
  - Bloqueada por: `ANA-003`/`D0-005` para validação de debug em produção.

## Épico 5 — SEO, legal e assets

- [x] `SEO-001` Gerar robots/sitemap por ambiente e canonical.
  - Cobertura: `SEO-003`, `SEO-006..008`, `SEO-013`.
  - Evidência (2026-07-21): `crawling.ts` centraliza a lista explícita de rotas
    indexáveis e gera `robots.txt`/`sitemap.xml` por ambiente. Produção permite
    rastreamento, referencia o sitemap canônico e inclui somente a home 200;
    preview usa `Disallow: /` e sitemap XML válido sem URLs. Os endpoints Astro
    são prerenderizados com tipos MIME explícitos. `test/seo-crawling.test.mjs`,
    inspeção do artefato, smoke HTTP, formatação, lint, tipagem, build e 41
    testes aprovados.
- [x] `SEO-002` Adicionar ícones, social card e metadados sociais finais.
  - Depende dos ativos finais aprovados em `AST-001`, conforme `DEC-009`.
  - Evidência (2026-07-21): `homeSeo` referencia o social card aprovado por
    caminho tipado e `SeoHead.astro` emite favicon 64×64, Apple touch 180×180,
    Open Graph e Twitter/X `summary_large_image` com URL absoluta, tipo PNG,
    dimensões 1200×630 e texto alternativo. O teste do artefato confirma as
    tags no HTML inicial e a presença dos três PNGs em `dist`; formatação, lint,
    tipagem, build e 49 testes aprovados.
- [ ] `SEO-003` Adicionar apenas dados estruturados aprovados e testar.
  - Bloqueado por: `DEC-012`.
  - Cobertura: `SEO-010..011`.
- [x] `LEG-001` Publicar privacidade e termos aprovados.
  - Evidência (2026-07-27): versões 1.0 aprovadas em
    `docs/legal/PRIVACIDADE.md` e `docs/legal/TERMOS.md`, com matriz factual e
    aceites registrados em `docs/legal/APROVACAO-LEGAL.md`. As rotas estáticas
    `/privacidade` e `/termos` usam layout isolado, contato centralizado,
    canonical próprio e `noindex,follow`; permanecem fora do sitemap e não
    carregam analytics. `test/legal-drafts.test.mjs` e `test/seo.test.mjs`
    verificam conteúdo, aprovação, ausência de placeholders e o HTML gerado.
    Formatação, lint, tipagem, build, 55/55 testes nativos e 30/30 E2E em
    desktop/mobile aprovados.
  - Cobertura: `FR-LEG-001..003`, `PRIV-001..004`.
- [ ] `ERR-001` Implementar 404 e confirmar status real na hospedagem.
  - Bloqueado por: `DEC-010` para confirmação do status na hospedagem.
  - Cobertura: `FR-ERR-001..002`.
- [x] `AST-001` Substituir assets provisórios por logo/screenshots finais sem PII.
  - Liberada por `D0-006`; deve recapturar o dashboard sem identidade visível e
    em `pt-BR`, completar o inventário e registrar os aceites de `DEC-009`.
  - Evidência (2026-07-21): pacote final criado com logo horizontal,
    marca compacta, favicon 64×64, Apple touch 180×180, social card 1200×630 e
    dashboard 1160×716 em `pt-BR`, sem identidade visível ou metadados pessoais.
    A captura provisória com identidade foi removida; `product-assets.ts` registra
    finalidade, origem, tela/versão, data, dimensões, SHA-256, classificação e
    aprovações por ativo. Revisão independente de Privacidade aprovada; inspeção
    integrada em 360×800 e 1440×900, formatação, lint, tipagem, build e 49 testes
    aprovados. Produto visualizou logo, marca, dashboard e social card e registrou
    o aceite final em 2026-07-21, concluindo a governança de `DEC-009`.
  - Cobertura: `FR-HOME-007..008`, `PRIV-003`.

## Épico 6 — Qualidade e lançamento

- [ ] `QA-001` Automatizar E2E dos fluxos P0.
  - Evidência parcial (2026-07-22): Playwright 1.61.1 configurado contra o preview
    do build, com projetos Chromium 1440×900 e 360×800. Dez cenários, sem skips,
    validam home 200/H1/seções, navegação desktop, menu móvel por teclado, CTAs
    configurados, CTA secundário, allowlist/encoding de UTMs, descarte de e-mail e
    redirect arbitrário, ausência de erros no navegador e status 404 HTTP real.
    `npm run test:e2e` passou 10/10; a suíte nativa permaneceu separada e passou
    51/51, além de formatação, lint, tipagem e build. A tarefa permanece aberta
    para cadastro/login reais (`INT-004`), `/entrar` (`INT-001`), experiência
    404 (`ERR-001`) e consentimento (`ANA-003`); páginas legais foram concluídas
    em `LEG-001`.
- [ ] `QA-002` Executar auditoria manual/automática WCAG 2.2 AA.
  - Evidência parcial (2026-07-22): `@axe-core/playwright` e a suíte
    `test/e2e/accessibility.e2e.mjs` cobrem Axe WCAG A/AA, teclado, foco,
    landmarks, texto a 200%, reflow em 320 CSS px, reduced motion e alvos
    isolados nos perfis desktop/mobile. A primeira passagem encontrou overflow
    real nos textos flex da seção Problema; `min-w-0` corrigiu o reflow. A
    execução final passou 8/8, sem skips e com zero violações Axe. Relatório em
    `docs/audits/QA-002-ACCESSIBILITY.md`. A tarefa permanece aberta somente
    para o smoke com leitor de tela real exigido por `A11Y-011`.
- [ ] `QA-003` Executar matriz responsiva e navegadores.
  - Evidência parcial (2026-07-22): matriz Playwright isolada executou 24/24
    cenários, sem skips, nos seis viewports normativos com Chromium 149, Edge
    estável 150, Firefox 151 e WebKit 26.5. Foram validados conteúdo, overflow,
    menu móvel/desktop, FAQ, CTA, erros de runtime e carregamento real das imagens
    eager/lazy; 24 capturas e relatório HTML foram gerados, com inspeção visual
    das larguras extremas. A tarefa permanece aberta para as versões anteriores
    reais de Chrome/Edge/Firefox e Safari atual/anterior em macOS, conforme
    `RWD-005` e `docs/audits/QA-003-COMPATIBILITY.md`.
- [x] `QA-004` Medir bundle/Lighthouse e aprovar orçamento sintético.
  - Evidência (2026-07-22): runner Lighthouse 13.4.1 reproduzível mede três
    rodadas mobile e três desktop sobre o build e aplica o orçamento aceito em
    `DEC-016`. O gate final passou com performance 99/99, LCP mediano
    2,005/1,891 s, CLS 0,021, TBT 0 ms, 125.329 bytes, 4.107 bytes de JS e 18
    requests. O artefato possui 3.596 bytes de JS bruto, sem framework cliente.
    `npm run test:perf`, relatório `docs/audits/QA-004-PERFORMANCE.md`, baseline e
    sumário JSON aprovados. Métricas de campo permanecem em `REL-004` após haver
    amostra real.
- [ ] `QA-005` Configurar e validar headers de segurança.
  - Evidência parcial (2026-07-22): contrato portátil gera CSP com hash SHA-256
    do script inline, headers distintos para preview/produção e HSTS sem
    `includeSubDomains`/`preload`; `npm run test:security` aprovou build,
    aplicação local dos headers, menu, FAQ, UTM, zero violações CSP, zero erros
    de runtime, ausência de cookie e auditoria com zero vulnerabilidades. A
    tarefa permanece aberta para mapear e testar os headers no host HTTPS real,
    bloqueado por `DEC-010`. Evidência em `docs/audits/QA-005-SECURITY.md`.
- [ ] `REL-001` Fechar todas as decisões bloqueadoras e checklist de lançamento.
- [ ] `REL-002` Publicar, executar smoke/rollback e validar host/canonical/404.
- [ ] `REL-003` Configurar Search Console e submeter sitemap.
- [ ] `REL-004` Registrar linha de base de aquisição e conversão.

## Fora do backlog do MVP

Calculadora, guias, blog/CMS, páginas programáticas, preços, inglês, afiliados,
chat e checkout exigem nova versão do PRD/SRS. Não criar scaffolding específico
para essas funções durante os épicos acima.
