# Registro de decisões e questões abertas

Versão: 0.1.2
Data: 2026-07-29

Status possíveis: `Aceita`, `Proposta`, `Pendente`, `Substituída`.

Cada decisão registra um papel responsável. Antes de iniciar a tarefa que depende
dela, o papel deve estar associado a uma pessoa no instrumento de gestão do
projeto. “Data limite” expressa um marco quando ainda não existe cronograma com
datas de calendário aprovado.

## Decisões

### DEC-001 — Separar site público e aplicativo

- Status: **Aceita** (origem: handover aprovado).
- Decisão: site de marketing/SEO e app autenticado vivem em superfícies e
  repositórios separados.
- Consequência: a landing não implementa autenticação; integração ocorre por URL.
- Responsável: Produto e responsável técnico.
- Data de aceitação: 2026-07-10.
- Evidência: handover aprovado e repositório independente criado.

### DEC-002 — Stack do site

- Status: **Aceita**.
- Decisão: Astro + TypeScript estrito + Tailwind CSS, saída estática e ilhas
  somente quando necessárias.
- Alternativa registrada: Next.js apenas se uma decisão futura de plataforma
  justificar o custo adicional e atualizar SRS/SDD.
- Consequência: React não é dependência do MVP; componentes `.astro` e HTML
  semântico são o padrão.
- Responsável: responsável técnico da landing.
- Data de aceitação: 2026-07-15.
- Evidência: SRS §2, SDD §2 e tarefa `D0-001` concluída.

### DEC-003 — Idioma e mercado inicial

- Status: **Aceita**.
- Escopo: MVP `pt-BR`.
- Decisão: `pt-BR`, Brasil-first. Inglês fica fora do MVP até nova decisão.
- Responsável: Produto.
- Data de aceitação: 2026-07-15.
- Evidência: Product Vision e PRD da baseline `0.1.1-approved`.

### DEC-004 — Domínios, URLs do app e contrato de aquisição

- Status: **Aceita para o MVP da landing**.
- Decisão: aprovar os destinos reais de cadastro/login e a captura allowlisted
  somente em memória. O MVP não persiste first-touch/last-touch, não correlaciona
  UTM com conta e mede cadastro/atividade/retenção separadamente no app.
- Confirmado em 2026-07-24: o app de produção usa
  `https://finntrackhome.app`, servido pela Vercel; cadastro abre diretamente
  em `/cadastro`, login em `/entrar` e `/dashboard` permanece protegido. O app
  aceita somente `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` e
  `utm_term`, mantendo o primeiro valor não vazio e descartando internamente
  parâmetros desconhecidos, sensíveis, fragmentos e controle de redirect.
- Confirmado em 2026-07-24 por `D0-002`: a landing usa inicialmente
  `https://finntrack-home-landing.vercel.app` como origem canônica de produção,
  também servida pela Vercel. O domínio customizado fica adiado sem alterar os
  destinos do app; qualquer migração futura exige atualizar configuração,
  canonical, sitemap, Search Console e redirect permanente do host anterior.
- Privacidade: a captura entregue é somente em memória, sem cookie, Web Storage,
  escrita no Supabase, analytics, terceiro ou atribuição durável. Essa ausência
  de persistência é a decisão final do MVP, alinhada a `DEC-007`.
- Evidência: `D0-003`, `14-APP-INTEGRATION-HANDOVER.md` e commits do app
  `f1a7919`, `4e104a3`, `ee88d6c`, `f2c18fd`.
- Validação final em 2026-07-29: landing → `/cadastro` preservou somente as UTMs
  permitidas e descartou `email`/`redirect`; o app publicado não expõe provedor
  OAuth ativo. O Supabase aceitou cadastro sintético com confirmação de e-mail
  obrigatória; o registro pendente foi excluído pelo responsável.
- OAuth: nenhum provedor está ativo no MVP publicado, portanto não há
  origin/callback de terceiro a aprovar. Ativação futura reabre esta decisão.
- Responsável: responsável técnico do app, com validação do responsável técnico
  da landing.
- Data de registro: 2026-07-15.
- Data de aceitação: 2026-07-29.
- Evidência de encerramento: URLs de login/cadastro, E2E do app 4/4 em
  desktop/mobile, smoke público e `T-CTA-002/T-UTM-002`.

### DEC-005 — Beta e gratuidade

- Status: **Aceita**.
- Decisão: usar o CTA neutro “Criar conta” em toda a landing. Não publicar
  “Começar gratuitamente”, “Beta gratuito”, “grátis” ou alegação equivalente.
- FAQ: não incluir pergunta ou resposta sobre gratuidade/beta enquanto não
  existir nova decisão comercial com evidência.
- Restrição: qualquer alegação futura de preço, gratuidade ou beta exige nova
  decisão e atualização coordenada de PRD, SRS, UX e componentes.
- Responsável: Produto/Comercial.
- Data de registro: 2026-07-15.
- Data de aceitação: 2026-07-21.
- Evidência: aprovação explícita do responsável solicitante nesta tarefa; copy
  normativa atualizada em PRD e UX. Componentes passam a usar a fonte única
  durante `WEB-002` e `WEB-005`.

### DEC-006 — Provedor de analytics

- Status: **Aceita; implementação permanece bloqueada até `ANA-003`**.
- Decisão: usar endpoint first-party de mesma origem com persistência em tabela
  dedicada no Supabase. O navegador não acessa o banco nem recebe segredo ou SDK
  de analytics de terceiro.
- Escopo: somente eventos e propriedades allowlisted em
  `06-SEO-ANALYTICS-SPEC.md`; debug por consultas/relatório restrito. Métricas de
  ativação e retenção do produto continuam fora da landing.
- Operação: eventos brutos expiram em até 90 dias; preview/local usam
  `NoopAnalytics`; falha, configuração ausente ou kill switch degradam para
  `noop`.
- Responsável: Bruno Araujo, com implementação do responsável técnico.
- Data de registro: 2026-07-15.
- Data de aceitação: 2026-07-27.
- Evidência: aprovação explícita do responsável; contrato de eventos e
  `docs/privacy/D0-005-ANALYTICS-POLICY.md`.

### DEC-007 — Consentimento, cookies e pixels

- Status: **Aceita para o analytics first-party mínimo**.
- Base e regra: legítimo interesse documentado por teste de balanceamento para
  medição de aquisição/usabilidade. Não há banner de consentimento porque a
  coleta aprovada não usa cookie, Web Storage, pixel, SDK externo, fingerprint,
  identificador persistente ou correlação com conta.
- Minimização: o endpoint deve descartar IP e cabeçalhos desnecessários antes da
  persistência. Nome, e-mail, texto livre, URL/referrer completos e demais dados
  proibidos continuam rejeitados.
- Direitos: transparência na política pública e canal
  `jobslens.ia@gmail.com` para informação e oposição. A landing e os CTAs
  funcionam integralmente com analytics `noop`.
- Mudança de escopo: qualquer persistência no navegador, terceiro, identificador
  ou nova finalidade — inclusive correlação de UTM com conta — exige nova
  decisão, revisão jurídica, atualização da CSP e consentimento quando
  aplicável.
- Responsável: Bruno Araujo, com implementação do responsável técnico.
- Data de registro: 2026-07-15.
- Data de aceitação: 2026-07-27.
- Evidência: aprovação explícita do responsável,
  `docs/privacy/D0-005-ANALYTICS-POLICY.md`, Política de Privacidade 1.1 e
  `T-ANA-003`.

### DEC-008 — Conteúdo jurídico

- Status: **Aceita; versão simplificada 1.0 liberada para publicação**.
- Decisão: um agente de IA pode apoiar a pesquisa em fontes oficiais, a
  organização e a redação inicial, desde que cada documento seja identificado
  como “RASCUNHO — NÃO APROVADO PARA PUBLICAÇÃO”. Conteúdo placeholder, fatos
  presumidos e garantias absolutas não são aceitáveis.
- Responsáveis:
  - redação inicial: responsável técnico da landing, com apoio de agente;
  - validação factual: responsável pelo Produto/controlador, que deve confirmar
    identidade empresarial, tratamentos de dados, fornecedores, retenção,
    cookies, segurança e canal de direitos;
  - revisão e aprovação jurídica: advogado brasileiro ou assessoria jurídica
    formalmente indicada;
  - aceite final para publicação: representante legal do controlador.
- Controle: `LEG-001` deve registrar versão, vigência e aprovadores. A revisão
  deve ser refeita quando mudarem coleta, finalidade, fornecedor, retenção,
  transferência, cookies ou condições comerciais.
- Data de registro: 2026-07-15.
- Data de aceitação da governança: 2026-07-21.
- Data de liberação do conteúdo 1.0: 2026-07-27.
- Escopo liberado: MVP gratuito operado por Bruno Araujo como pessoa física,
  sem cobrança automática, analytics, publicidade ou restrição rígida de idade.
  O serviço não é direcionado especificamente a crianças.
- Aceite: aprovação jurídica comunicada pelo responsável do projeto em
  `AD-004`; validação factual e aceite final registrados por Bruno Araujo em
  `docs/legal/APROVACAO-LEGAL.md`.
- Evidência: autorização do responsável solicitante para elaboração assistida e
  fluxo conservador baseado na LGPD, nas orientações da ANPD e no CDC. A
  governança está definida por `D0-006`; as versões datadas e a aprovação humana
  identificada continuam sendo critérios obrigatórios de `LEG-001` e do
  lançamento.
- Referências oficiais consultadas: [LGPD compilada][lgpd],
  [direitos dos titulares — ANPD][anpd-direitos],
  [atuação do encarregado — ANPD][anpd-encarregado] e [CDC compilado][cdc].

### DEC-009 — Marca e screenshots

- Status: **Aceita quanto à governança — ativos finais permanecem bloqueadores
  visuais**.
- Decisão: criação e exportação ficam a cargo do agente de Design/Marca;
  integração e revisão técnica, do responsável técnico da landing; revisão
  independente de PII/metadados, de Privacidade; fidelidade ao produto e aceite
  visual final, de Produto.
- Inventário mínimo: logo horizontal SVG, variante compacta, favicon, ícone
  Apple, social card 1200×630 e captura final do dashboard. Cada ativo deve
  registrar caminho, finalidade, origem, versão/tela, data, dimensões, hash,
  classificação dos dados e aprovações.
- Regra: screenshots usam somente dados sintéticos, sem nomes, e-mails,
  endereços, avatares, IDs ou metadados, e devem corresponder ao produto e à
  tradução `pt-BR` atuais. Produto deve visualizar os arquivos antes do aceite.
- Data de registro: 2026-07-15.
- Data de aceitação da governança: 2026-07-21.
- Data de aceite visual final de Produto: 2026-07-21.
- Resultado final: logo horizontal, marca compacta, favicon, ícone Apple, social
  card e captura higienizada do dashboard foram visualizados e aprovados por
  Produto; revisão técnica e revisão independente de Privacidade também
  aprovadas. `AST-001` concluída e ativos liberados para `SEO-002`.
- Evidência: auditoria de `D0-006` encontrou apenas a captura provisória
  `dashboard-demo-jun-2026.jpg`; ela contém nome, e-mail, avatar e trechos em
  inglês e, portanto, não pode ser aprovada como final. `AST-001` deve recapturar
  a tela limpa; `SEO-002` deve integrar somente os ativos aprovados.

### DEC-010 — Domínio e hospedagem

- Status: **Aceita**.
- Decisão: publicar a landing estática na Vercel. A origem canônica inicial é
  `https://finntrack-home-landing.vercel.app`; o app permanece em
  `https://finntrackhome.app`. Um domínio customizado pode ser adotado depois,
  mediante migração canônica e redirects verificados.
- Critérios: deploy estático, preview, redirects/status 404, headers, rollback,
  domínio/HTTPS e proteção contra indexação.
- Resultado da decisão: o provedor e as origens estão definidos e o build de
  produção foi publicado com HTTPS, home 200, canonical, robots, sitemap e CTAs
  apontando para cadastro/login reais. A escolha do provedor desbloqueia
  `FND-006`, `INT-001`, `ERR-001`, `QA-005` e `REL-002`, mas não conclui esses
  trabalhos operacionais.
- Implementação concluída: pipeline e preview remoto em `FND-006`, página 404
  em `ERR-001` e headers reais em `QA-005`, validados pelos PRs #1, #3 e #4,
  GitHub Actions, Preview Deployment protegido e smokes de produção.
- Pendências de implementação: `/entrar` em `INT-001`; smoke de rollback e
  redirects finais em `REL-002`.
- Responsável: responsável técnico/Plataforma.
- Data de registro: 2026-07-15.
- Data de aceitação: 2026-07-24.
- Evidência: `D0-002`, configuração de produção validada, deploy público na
  Vercel e smoke HTTP de `https://finntrack-home-landing.vercel.app`,
  `https://finntrackhome.app/cadastro` e `https://finntrackhome.app/entrar`.

### DEC-011 — Canal público de suporte e dados

- Status: **Aceita**.
- Canal: `jobslens.ia@gmail.com`, a ser exposto como link `mailto:` no rodapé e
  nas páginas legais.
- Responsável operacional: Jobslens IA, no papel de Produto/Operações.
- Processo: mensagens de suporte são triadas por Produto/Operações; solicitações
  relacionadas a dados pessoais são identificadas pelo assunto “FinnTrack Home
  — Dados pessoais”, registradas e encaminhadas ao responsável formal de
  Privacidade/Jurídico para análise e resposta. Nenhum prazo de atendimento é
  prometido até existir SLA aprovado.
- Data de registro: 2026-07-15.
- Data de aceitação: 2026-07-21.
- Evidência: canal confirmado pelo responsável solicitante e já usado pelo app
  no repositório local `FinntrackHome`, em
  `src/features/settings/SettingsScreen.tsx`, com teste correspondente. A
  publicação do canal na landing permanece em `WEB-005` e `LEG-001`.

[lgpd]: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm
[anpd-direitos]: https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares
[anpd-encarregado]: https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-lanca-guia-sobre-atuacao-do-encarregado
[cdc]: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm

### DEC-012 — Dados estruturados

- Status: **Proposta**.
- Decisão proposta: não publicar schema automaticamente; ativar somente tipos e
  campos validados contra conteúdo visível. `FAQPage` não é requisito do MVP.
- Responsável: responsável técnico de SEO.
- Data de registro: 2026-07-15.
- Data limite: antes de `SEO-003`.
- Evidência para encerrar: lista de schemas/campos aprovada e validação do
  artefato no Rich Results Test ou ferramenta equivalente.

### DEC-013 — Estratégia de `/entrar`

- Status: **Aceita**.
- Dependência: `DEC-010`.
- Decisão: usar a página estática mínima prevista no SDD §11, pois o redirect
  genérico da hospedagem não oferece o filtro necessário para encaminhar
  exclusivamente a allowlist de UTMs.
- Regra: o link real usa `PUBLIC_APP_LOGIN_URL` e funciona sem JavaScript. O
  enriquecimento progressivo reutiliza a allowlist de `INT-002`, não aceita
  destino da query e descarta parâmetros desconhecidos, fragmentos e dados
  sensíveis.
- Responsável: responsável técnico/Plataforma.
- Data de registro: 2026-07-15.
- Data de aceitação: 2026-07-27.
- Data limite: durante `INT-001`, após `DEC-010`.
- Evidência: `src/pages/entrar.astro`, `test/login-fallback.test.mjs` e
  `T-UTM-003`.

### DEC-014 — Framework de componentes interativos

- Status: **Proposta**.
- Decisão proposta: React não entra por padrão; Astro/HTML atende o MVP. Adicionar
  integração somente com caso de uso e impacto de bundle justificados.
- Responsável: responsável técnico da landing.
- Data de registro: 2026-07-15.
- Data limite: antes de adicionar qualquer framework de componentes.
- Evidência para encerrar: decisão aceita ou substituída em ADR/Decision Log e
  impacto de bundle documentado.

### DEC-015 — Indexação das páginas legais

- Status: **Aceita**.
- Escopo: MVP.
- Decisão: `/privacidade` e `/termos` permanecem acessíveis, usam canonical
  próprio e `noindex,follow`, e não entram no sitemap. A home é a única rota
  indexável da primeira fase.
- Alternativa registrada: indexar páginas legais em versão futura se houver
  justificativa jurídica/SEO e atualização de SRS, sitemap e testes.
- Consequência: o sitemap inicial não inclui páginas legais; os links do rodapé
  continuam rastreáveis e funcionais.
- Responsável: Produto e responsável técnico de SEO.
- Data de aceitação: 2026-07-15.
- Evidência: `SEO-013`, SEO/Analytics §2 e `T-SEO-002`.

### DEC-016 — Orçamento sintético de performance

- Status: **Aceita**.
- Escopo: build estático do MVP, perfis mobile e desktop.
- Decisão: usar a mediana de três rodadas Lighthouse por perfil e exigir score
  de performance ≥95, LCP ≤2,5 s, CLS ≤0,1, TBT ≤200 ms, transferência inicial
  ≤200 KB, JavaScript ≤10 KB, CSS ≤40 KB, imagens iniciais ≤50 KB e no máximo 25
  requests.
- Contexto: a linha de base mediu performance 99, LCP entre 1,87 e 1,93 s, CLS
  0,021, TBT 0 ms, 125 KB transferidos e 4,1 KB de JavaScript. Os limites mantêm
  folga para variação local sem permitir regressão estrutural do MVP.
- Consequência: `npm run test:perf` é gate técnico repetível; métricas de campo
  continuam em `REL-004` e não são inferidas da auditoria sintética.
- Responsável: responsável técnico da landing.
- Data de aceitação: 2026-07-22.
- Evidência: `scripts/performance-budget.mjs`,
  `artifacts/lighthouse/baseline-summary.json`,
  `artifacts/lighthouse/summary.json` e
  `docs/audits/QA-004-PERFORMANCE.md`.

### DEC-017 — Contrato portátil de headers de segurança

- Status: **Aceita**.
- Escopo: build estático do MVP em preview e produção.
- Decisão: manter a política em código independente do provedor, gerar hashes
  SHA-256 para scripts inline e validar o build em navegador com os headers
  aplicados. Produção usa HSTS por um ano, sem `includeSubDomains` e `preload`;
  preview não usa HSTS e recebe `X-Robots-Tag: noindex, nofollow`.
- Contexto: o contrato foi definido antes da escolha da hospedagem e depois
  mapeado para a Vercel sem duplicar a política em componentes.
- Consequência: `QA-005` está concluída após validação local, CI do PR #4 e
  inspeção do endpoint HTTPS real. Analytics ou outra origem externa continua
  exigindo revisão explícita da CSP.
- Responsável: responsável técnico da landing.
- Data de aceitação: 2026-07-22.
- Evidência: `scripts/security-headers.mjs`,
  `scripts/validate-security-headers.mjs`,
  `vercel.mjs`, PR #4, Actions `30303082672`,
  `artifacts/security/security-headers.json` e
  `docs/audits/QA-005-SECURITY.md`.

## Template para novas decisões

```text
### DEC-NNN — Título
- Status:
- Contexto:
- Decisão:
- Alternativas:
- Consequências:
- Responsável:
- Data:
```
