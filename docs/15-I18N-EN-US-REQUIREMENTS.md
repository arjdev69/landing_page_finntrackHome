# Requisitos de internacionalização `en-US`

Versão: 0.2.0
Status: approved — anexo normativo do SRS; implementação condicionada aos bloqueadores
Data: 2026-07-30

## 1. Finalidade

Este documento define a expansão aprovada da landing page do FinnTrack Home
para inglês dos Estados Unidos (`en-US`). Ele organiza objetivo, escopo,
arquitetura de informação, catálogo de copy aprovado, requisitos, dependências, testes e
sequência de entrega antes de qualquer alteração no código.

`DEC-020` aceita este documento como anexo normativo incorporado por referência
ao `03-SRS.md`. Em caso de conflito, o SRS prevalece. A aceitação documental não
autoriza iniciar uma tarefa bloqueada nem publicar conteúdo, ativo ou fluxo sem
as aprovações registradas nas seções 10 e 12.

## 2. Diagnóstico da baseline

### 2.1 Fatos extraídos

- `DEC-003`, PRD e SRS definem `pt-BR` como idioma inicial e excluem inglês do
  MVP publicado.
- A home atual é composta por Header, Hero, Problema, Benefícios, Como funciona,
  Demonstração, Para quem, FAQ, CTA final e Footer.
- A home, os metadados, a navegação, os textos alternativos, o FAQ e o screenshot
  final estão em `pt-BR`.
- A raiz `/` é a única página indexável; páginas legais usam `noindex,follow`.
- Login e cadastro apontam para um aplicativo externo por URLs configuráveis.
- O app publicado possui rotas diretas `/cadastro` e `/entrar`, mas a
  disponibilidade de uma experiência completa em `en-US` não está documentada
  nesta landing.
- O Vercel Web Analytics aprovado mede pageview agregado somente na home `/`;
  eventos customizados permanecem `noop`.
- O projeto usa Astro estático, componentes `.astro`, conteúdo inicial em HTML e
  JavaScript progressivo mínimo.

### 2.2 Bloqueadores remanescentes

1. Cadastro, login e onboarding do app em `en-US` ainda não possuem evidência
   de release registrada nesta landing.
2. Screenshot final em inglês, com dados sintéticos, ainda não existe.
3. Privacidade e termos em inglês exigem validação factual e jurídica própria.
4. Os testes e o comportamento de 404 localizada precisam ser implementados e
   comprovados na hospedagem.

## 3. Decisões aceitas

| Tema | Decisão | Razão |
|---|---|---|
| locale de conteúdo | usar `en-US` | identifica inglês usado nos Estados Unidos conforme BCP 47 |
| locale padrão | manter `pt-BR` | preserva a URL e os sinais orgânicos da home já publicada |
| URL inglesa | usar prefixo `/en/` | URL legível, estática e compatível com a origem atual |
| domínio | manter a mesma origem | evita nova operação de domínio e preserva a arquitetura estática |
| seleção | exibir `PT-BR` / `EN-US`, com nomes acessíveis completos `Português (Brasil)` / `English (US)` | mantém o Header compacto sem perder clareza para tecnologia assistiva |
| detecção automática | não redirecionar por idioma do navegador ou IP | preserva escolha, rastreabilidade e descoberta de todas as versões |
| persistência | não usar cookie, storage ou identificador | mantém a política de minimização atual |
| fallback | não publicar conteúdo `pt-BR` sob URL `/en/` | evita página com URL/idioma divergentes e conteúdo misto |
| abrangência | localizar toda a superfície pública vinculada pela home | evita que navegação, legal, erro ou login voltem inesperadamente ao português |
| implementação | compartilhar estrutura e separar conteúdo tipado por locale | reduz divergência visual e permite paridade testável |
| mercado | localização de idioma, sem entrada comercial ativa nos Estados Unidos nesta entrega | evita criar alegações, jurisdição ou aquisição não aprovadas |
| app | exigir jornada coerente em inglês ou exceção explícita antes do release | evita quebra de expectativa após o CTA |
| analytics | medir pageview agregado em `/` e `/en/`, pelo pathname sanitizado | permite baseline por idioma sem ampliar propriedades pessoais |
| 404 | servir experiência `en-US` para URL desconhecida sob `/en/*`, sempre com status 404 real | mantém recuperação coerente sem mascarar erro |
| `x-default` | apontar para `/` | preserva a raiz como destino padrão sem criar página seletora |
| moeda e ativos | não converter valores; ativo final depende do contexto aprovado e deve declarar a moeda exibida | evita equivalência financeira presumida |

## 4. Escopo aprovado

### 4.1 Incluído

- versão completa da home em inglês americano;
- seletor de idioma no Header, menu móvel e Footer;
- metadados SEO e sociais localizados;
- URLs separadas, canonical próprio e alternates recíprocos;
- páginas de login, privacidade, termos e recuperação de erro coerentes com o
  locale;
- copy, FAQ, labels, nomes acessíveis e textos alternativos em `en-US`;
- screenshot do produto compatível com a promessa da versão inglesa;
- preservação segura da allowlist de UTMs nos CTAs e, quando aplicável, na troca
  de idioma;
- analytics agregado distinguível por pathname, sem nova coleta pessoal;
- testes de conteúdo, rotas, SEO, acessibilidade, responsividade e integração;
- smoke e validação de indexação após o deploy.

### 4.2 Excluído desta entrega

- tradução automática em runtime;
- CMS ou plataforma externa de tradução;
- seletor baseado apenas em bandeiras;
- redirecionamento automático por IP, geolocalização ou `Accept-Language`;
- cookie ou storage para lembrar idioma;
- conversão automática de valores financeiros;
- alteração silenciosa de moeda, preços ou jurisdição;
- localização do aplicativo autenticado dentro deste repositório;
- novos depoimentos, métricas, preços, alegações de gratuidade ou promessas de
  resultado;
- suporte a outros locales além de `pt-BR` e `en-US`.

## 5. Arquitetura de informação

### 5.1 Mapa de rotas recomendado

| Conteúdo | `pt-BR` | `en-US` | Indexação |
|---|---|---|---|
| home | `/` | `/en/` | ambas indexáveis |
| login intermediário | `/entrar` | `/en/login` | não entra no sitemap |
| privacidade | `/privacidade` | `/en/privacy` | `noindex,follow` |
| termos | `/termos` | `/en/terms` | `noindex,follow` |
| erro | URL desconhecida fora de `/en/*` usa 404 `pt-BR` | URL desconhecida sob `/en/*` usa 404 `en-US` | `noindex,nofollow`; status 404 real |

As rotas inglesas só podem ser publicadas quando o conteúdo correspondente
estiver completo. Um recurso inexistente em `en-US` deve retornar a experiência
404 inglesa com status HTTP 404 real. Somente uma ação explícita dessa página
pode levar à home portuguesa; rewrite silencioso com conteúdo `pt-BR` é
proibido.

### 5.2 Estrutura mental da home

```text
Header
├─ Marca
├─ Resources
├─ How it works
├─ Who it's for
├─ Seletor Português (Brasil) / English (US)
├─ Log in
└─ Create account

Main
├─ Hero
│  ├─ categoria
│  ├─ promessa principal
│  ├─ apoio
│  ├─ Create account
│  ├─ See how it works
│  └─ screenshot real em inglês
├─ Problem
├─ Benefits
├─ How it works
├─ Product preview
├─ Audience
├─ FAQ
└─ Final CTA

Footer
├─ posicionamento
├─ Log in
├─ Privacy
├─ Terms
├─ suporte
├─ seletor de idioma
└─ copyright
```

A ordem narrativa e os componentes visuais permanecem equivalentes nos dois
idiomas. A localização altera conteúdo, metadados, URLs e ativos dependentes de
idioma, não cria uma segunda landing com layout independente.

## 6. Catálogo de copy `en-US` aprovado

O catálogo canônico completo está em `05-UX-CONTENT-SPEC.md` §16. Ele foi
transcriado para inglês americano, comparado com a home `pt-BR` implementada e
aprovado para implementação por Produto/Conteúdo.

| Campo | Registro |
|---|---|
| estado | `approved-for-implementation` |
| revisor | Produto/Conteúdo — Bruno Araujo |
| data | 2026-07-30 |
| evidência de aprovação | comunicação explícita “aprovado, podemos seguir” |
| baseline do app revalidada | commit `2e401fb061d452aff36200b50b19425f252a2e07` do repositório `FinntrackHome` |
| escopo excluído | jurídico, screenshot, social card, publicação e release |

### 6.1 Inventário aprovado

O catálogo cobre, sem fallback:

1. title, meta description, H1 e texto alternativo da imagem social;
2. skip link, nomes acessíveis do shell, menu e seletor de idioma;
3. Header, Hero, Problema, Benefícios e Como funciona;
4. Demonstração, inclusive badge, texto alternativo e legenda;
5. Para quem, perfis e limite explícito de escopo;
6. FAQ completo, com título, introdução, seis perguntas e seis respostas;
7. CTA final, Footer, copyright, suporte e labels de navegação.

O H1 aprovado permanece `See how each property performs month by month.`.
Termos como `free`, `free trial`, `beta`, preço, ROI garantido, aumento de lucro
ou redução de inadimplência continuam proibidos sem nova decisão e evidência.

### 6.2 Validação factual

As afirmações do FAQ foram revalidadas em 2026-07-30 contra o app:

- execução web e interface responsiva;
- autenticação e isolamento por usuário com Supabase/RLS;
- propriedades, receitas, despesas, estados pago/pendente/vencido, resultados
  mensais e comparações;
- limite de três imóveis imposto pelo serviço de aplicação;
- catálogo nativo `pt-BR`/`en-US` presente no app.

A validação de fatos não substitui o smoke da jornada publicada exigido por
`I18N-002`, nem a revalidação final do FAQ na data do release.

### 6.3 SEO e formatos

- Title: `Rental Property Financial Tracking | FinnTrack Home`
- Meta description: `Track rental income, expenses, and overdue bills. Review each property's monthly results in one place with FinnTrack Home.`
- Intenção principal: `rental property financial tracker for owners`
- Hipóteses secundárias, sem volume comprovado: `rental property income and expense tracker`, `rental portfolio dashboard`, `track rental property profit` e `financial tracking for landlords`.
- Datas editoriais usam mês por extenso e ano, como `June 2026`.
- O catálogo não converte valores; qualquer ativo com valor financeiro deve
  identificar explicitamente a moeda de origem.

## 7. Requisitos normativos

### 7.1 Locale, rotas e navegação

| ID | Pri. | Requisito |
|---|---|---|
| I18N-FR-001 | MUST | O site DEVE suportar exatamente `pt-BR` e `en-US` nesta entrega. |
| I18N-FR-002 | MUST | `pt-BR` DEVE permanecer como locale padrão e continuar acessível na raiz `/`. |
| I18N-FR-003 | MUST | A home `en-US` DEVE usar uma URL estática própria em `/en/` e responder HTTP 200. |
| I18N-FR-004 | MUST | Cada documento DEVE declarar o `lang` correspondente em formato BCP 47. |
| I18N-FR-005 | MUST | A navegação DEVE oferecer links reais com labels visuais `PT-BR` e `EN-US`, nomes acessíveis completos `Português (Brasil)` e `English (US)` e nenhum uso exclusivo de bandeiras, JavaScript ou hover. |
| I18N-FR-006 | MUST | O locale atual DEVE ser identificado visualmente e por tecnologia assistiva com `aria-current="page"` ou semântica equivalente. |
| I18N-FR-007 | MUST | A troca de idioma DEVE levar à rota equivalente quando ela existir e à home do locale quando não houver equivalência aprovada. |
| I18N-FR-008 | MUST | O site NÃO DEVE redirecionar automaticamente por IP, geolocalização, idioma do navegador ou `Accept-Language`. |
| I18N-FR-009 | MUST | O site NÃO DEVE usar cookie, Web Storage ou identificador para persistir o locale nesta entrega. |
| I18N-FR-010 | MUST | Conteúdo `pt-BR` NÃO DEVE ser servido sob URL `/en/` por fallback ou rewrite silencioso. |
| I18N-FR-011 | MUST | As âncoras internas DEVEM possuir equivalência documentada entre locales sem quebrar os fragmentos públicos existentes de `pt-BR`. |
| I18N-FR-012 | MUST | Quando preservar contexto, a troca de idioma DEVE encaminhar somente UTMs allowlisted e o fragmento equivalente; qualquer outro parâmetro DEVE ser descartado. A troca sem parâmetros continua válida. |
| I18N-FR-013 | MUST | Toda URL desconhecida sob `/en/*` DEVE responder com experiência `en-US`, status HTTP 404 real, `noindex,nofollow`, retorno às homes e nenhum `landing_view`. |

### 7.2 Conteúdo e experiência

| ID | Pri. | Requisito |
|---|---|---|
| I18N-CONT-001 | MUST | Header, Hero, Problema, Benefícios, Como funciona, Demonstração, Para quem, FAQ, CTA final e Footer DEVEM estar integralmente localizados em `en-US`. |
| I18N-CONT-002 | MUST | A versão inglesa DEVE preservar a mesma proposta de valor e os mesmos limites funcionais da versão `pt-BR`, sem adicionar capacidade, garantia ou alegação comercial. |
| I18N-CONT-003 | MUST | A copy DEVE ser transcriada para inglês americano natural e NÃO DEVE ser publicada apenas com tradução automática não revisada. |
| I18N-CONT-004 | MUST | A home inglesa DEVE conter exatamente um H1 aprovado e manter proposta, apoio e CTA principal acima da dobra em 360×800 e 1440×900. |
| I18N-CONT-005 | MUST | Labels, nomes acessíveis, mensagens, textos alternativos, legendas e conteúdo semântico DEVEM usar o locale da página. |
| I18N-CONT-006 | MUST | Perguntas e respostas do FAQ em inglês DEVEM ser revalidadas contra a versão do app publicada na data do release. |
| I18N-CONT-007 | MUST | O limite atual de até três imóveis DEVE permanecer explícito onde a resposta correspondente aparecer. |
| I18N-CONT-008 | MUST | Datas, números e moedas visíveis DEVEM ter formato coerente com o contexto aprovado; a localização NÃO DEVE converter valores financeiros silenciosamente. |
| I18N-CONT-009 | MUST | O screenshot da home inglesa DEVE usar UI em inglês, dados 100% sintéticos e nenhuma PII ou metadado pessoal. |
| I18N-CONT-010 | MUST | A home inglesa NÃO DEVE usar screenshot em português como evidência final do produto. |
| I18N-CONT-011 | MUST | Privacidade e termos em inglês DEVEM ser revisados factual e juridicamente para o público atendido antes da publicação. |
| I18N-CONT-012 | MUST | Caso o app não ofereça o fluxo em inglês, a landing `en-US` NÃO DEVE ser lançada sem exceção explícita, risco documentado e aviso claro antes do CTA. |

### 7.3 SEO e compartilhamento

| ID | Pri. | Requisito |
|---|---|---|
| I18N-SEO-001 | MUST | `/` e `/en/` DEVEM possuir title, meta description, H1 e conteúdo visível localizados e únicos. |
| I18N-SEO-002 | MUST | Cada home DEVE usar canonical absoluto apontando para si própria. |
| I18N-SEO-003 | MUST | As homes DEVEM declarar alternates recíprocos `hreflang="pt-BR"` e `hreflang="en-US"`. |
| I18N-SEO-004 | MUST | A raiz `/` DEVE ser declarada como `x-default`, conforme `DEC-020`. |
| I18N-SEO-005 | MUST | O sitemap de produção DEVE incluir as duas homes indexáveis e excluir login, páginas legais `noindex` e 404. |
| I18N-SEO-006 | MUST | Open Graph DEVE usar `pt_BR` ou `en_US` conforme a página e declarar o locale alternativo quando aplicável. |
| I18N-SEO-007 | MUST | `og:url`, title, description e texto da imagem social DEVEM corresponder ao locale da página. |
| I18N-SEO-008 | MUST | A versão inglesa DEVE usar somente inglês no conteúdo principal e na navegação, exceto nomes próprios e o nome explícito do outro idioma no seletor. |
| I18N-SEO-009 | MUST | Links entre versões DEVEM usar `href` rastreável e não depender de evento cliente. |
| I18N-SEO-010 | MUST | Preview das novas rotas DEVE permanecer `noindex,nofollow`; as rotas de produção DEVEM permanecer não indexáveis até copy, legal, ativos, app e testes estarem aprovados. |
| I18N-SEO-011 | MUST | Nenhum novo JSON-LD DEVE ser adicionado como consequência da internacionalização sem reabrir `DEC-012`. |
| I18N-SEO-012 | MUST | O deploy NÃO DEVE criar conteúdo inglês duplicado em `/en-US/`, `/us/` ou outra variante não canônica. |
| I18N-SEO-013 | MUST | `/en/privacy` e `/en/terms` DEVEM possuir `lang="en-US"`, title/description localizados, canonical próprio, `noindex,follow` e permanecer fora do sitemap. |
| I18N-SEO-014 | MUST | `/en/login` e a 404 inglesa DEVEM possuir metadata localizada, permanecer fora do sitemap e usar `noindex,nofollow`. |

### 7.4 App, analytics e privacidade

| ID | Pri. | Requisito |
|---|---|---|
| I18N-INT-001 | MUST | CTAs ingleses DEVEM continuar usando as URLs configuradas e tipadas de cadastro/login, sem destino de produção codificado em componente. |
| I18N-INT-002 | MUST | O fluxo `/en/` → cadastro e login DEVE ser testado em mobile e desktop, incluindo o locale efetivamente entregue pelo app. |
| I18N-INT-003 | MUST | A allowlist e as regras atuais de UTM DEVEM permanecer idênticas nos dois locales. |
| I18N-INT-004 | MUST | Falha de detecção, analytics ou enriquecimento de UTM NÃO DEVE quebrar o seletor nem os CTAs. |
| I18N-INT-005 | MUST | `/en/login` DEVE usar `PUBLIC_APP_LOGIN_URL`, funcionar sem JavaScript, preservar somente UTMs allowlisted e não aceitar destino vindo da query. |
| I18N-ANA-001 | MUST | O pageview agregado aprovado DEVE cobrir somente `/` e `/en/`, distinguíveis pelo pathname, com query e fragmento removidos. |
| I18N-ANA-002 | MUST | A internacionalização NÃO DEVE adicionar cookie, storage, fingerprint, IP de aplicação, PII ou correlação com conta. |
| I18N-ANA-003 | MUST | Rotas legais, login e 404 localizadas DEVEM permanecer fora da coleta aprovada. |
| I18N-ANA-004 | MUST | Caso o contrato tipado de eventos seja usado no futuro, `locale` DEVE ser enum allowlisted (`pt-BR` ou `en-US`), nunca texto livre. |
| I18N-PRIV-001 | MUST | Inventário, política interna de analytics e política pública DEVEM registrar que o pageview agregado cobre `/` e `/en/`, sem novas propriedades ou persistência. |
| I18N-PRIV-002 | MUST | Aprovação jurídica DEVE ser reaberta se a expansão alterar público, fornecedor, transferência, finalidade, moeda, disponibilidade geográfica ou jurisdição. |

### 7.5 Acessibilidade, responsividade e performance

| ID | Pri. | Requisito |
|---|---|---|
| I18N-A11Y-001 | MUST | O seletor de idioma DEVE ser operável por teclado, ter foco visível e nome acessível que expresse a ação e o destino. |
| I18N-A11Y-002 | MUST | O idioma atual NÃO DEVE ser comunicado apenas por cor, posição ou bandeira. |
| I18N-A11Y-003 | MUST | Leitor de tela DEVE pronunciar o conteúdo principal conforme o `lang` do documento; trechos no outro idioma DEVEM declarar `lang` quando necessário. |
| I18N-A11Y-004 | MUST | A ordem de foco e os landmarks DEVEM permanecer equivalentes nos dois locales. |
| I18N-RWD-001 | MUST | A versão inglesa DEVE ser validada em 320, 360, 390, 768, 1024 e 1440 px sem overflow, truncamento ou sobreposição. |
| I18N-RWD-002 | MUST | Header, menu móvel, CTAs, cards, FAQ e Footer DEVEM acomodar expansão ou contração de texto sem largura fixa dependente do português. |
| I18N-PERF-001 | MUST | A segunda home NÃO DEVE introduzir framework cliente, tradução em runtime ou request de catálogo no carregamento. |
| I18N-PERF-002 | MUST | Cada locale DEVE continuar atendendo ao orçamento sintético aprovado em `DEC-016`. |
| I18N-SEC-001 | MUST | Todas as rotas `en-US`, inclusive login, legais e 404, DEVEM receber o mesmo contrato aprovado de CSP e headers de segurança e passar por smoke HTTPS. |

### 7.6 Arquitetura e governança

| ID | Pri. | Requisito |
|---|---|---|
| I18N-ARCH-001 | MUST | A estrutura visual DEVE ser compartilhada; conteúdo e metadados DEVEM ser resolvidos por locale tipado. |
| I18N-ARCH-002 | MUST | Os catálogos `pt-BR` e `en-US` DEVEM possuir paridade de chaves verificável no typecheck ou em teste. |
| I18N-ARCH-003 | MUST | Chave ausente, locale desconhecido ou metadata incompleta DEVE falhar no build; fallback silencioso de copy é proibido. |
| I18N-ARCH-004 | MUST | Rotas, locale, `lang`, Open Graph locale, canonical e alternates DEVEM derivar de uma configuração central. |
| I18N-ARCH-005 | MUST | Componentes NÃO DEVEM conter condicionais espalhadas como `locale === "en-US"` para copy comercial. |
| I18N-ARCH-006 | SHOULD | A implementação DEVE usar os recursos nativos de i18n/roteamento do Astro ou helpers locais mínimos, sem SDK externo enquanto dois locales estáticos forem suficientes. |
| I18N-ARCH-007 | MUST | A configuração DEVE preservar `output: static` e conteúdo essencial no HTML inicial. |
| I18N-GOV-001 | MUST | Toda mudança de copy em um locale DEVE avaliar a necessidade de atualização equivalente no outro. |
| I18N-GOV-002 | MUST | Cada catálogo DEVE registrar revisor de conteúdo, data e estado de aprovação. |
| I18N-GOV-003 | MUST | Traduções jurídicas e screenshots DEVEM manter aprovações próprias; aprovação do texto português não aprova automaticamente o inglês. |
| I18N-GOV-004 | MUST | Cada bloqueador DEVE registrar papel responsável, evidência exigida e estado antes de desbloquear a tarefa dependente. |

## 8. Desenho técnico recomendado para a implementação futura

Estrutura conceitual, sujeita à revisão durante a tarefa técnica:

```text
src/
├── i18n/
│   ├── locales.ts          # Locale, defaultLocale e guardas
│   ├── routes.ts           # equivalência de rotas e alternates
│   └── content/
│       ├── pt-BR.ts        # catálogo completo aprovado
│       └── en-US.ts        # catálogo completo aprovado
├── config/
│   ├── site.ts             # marca e configuração não localizada
│   └── seo.ts              # metadata por locale
├── layouts/
│   ├── MarketingLayout.astro
│   └── LegalLayout.astro
├── components/
│   ├── layout/
│   │   └── LocaleSwitcher.astro
│   └── sections/           # recebem conteúdo tipado; não traduzem
└── pages/
    ├── index.astro
    ├── entrar.astro
    ├── privacidade.astro
    ├── termos.astro
    └── en/
        ├── index.astro
        ├── login.astro
        ├── privacy.astro
        ├── terms.astro
        └── 404.astro
```

O catálogo deve conter a página como um contrato completo, não como strings
soltas sem contexto. IDs técnicos de analytics/FAQ devem permanecer estáveis e
independentes do texto traduzido.

A hospedagem deve mapear URLs desconhecidas sob `/en/*` para o artefato da 404
inglesa sem transformar a resposta em HTTP 200. Se a plataforma estática não
preservar esse status, a tarefa permanece bloqueada até existir uma estratégia
compatível com `output: static` e `FR-ERR-001`.

## 9. Critérios de teste

| Caso | Cobertura | Evidência esperada |
|---|---|---|
| T-I18N-ROUTE-001 | `I18N-FR-001..004` | `/` e `/en/` retornam 200, possuem locale correto e não geram variante duplicada |
| T-I18N-ROUTE-002 | `I18N-FR-005..007` | links reais equivalentes, labels compactos, nomes completos e estado atual acessível |
| T-I18N-ROUTE-003 | `I18N-FR-008..012` | nenhum redirect/persistência/fallback silencioso; query e fragmento seguem o contrato |
| T-I18N-ROUTE-004 | `I18N-FR-013` | URL desconhecida `/en/*` retorna 404 real, inglês, noindex, retorno e nenhum pageview |
| T-I18N-CONT-001 | `I18N-CONT-001..005` | todas as seções, H1, labels, alt texts e conteúdo sem mistura de idioma |
| T-I18N-CONT-002 | `I18N-CONT-006..012` | FAQ revalidado, limite de imóveis, formatos, legal, app e ativo inglês sem PII |
| T-I18N-SEO-001 | `I18N-SEO-001..004` | metadados das homes, canonical, `hreflang` recíproco e `x-default="/"` |
| T-I18N-SEO-002 | `I18N-SEO-005..012` | sitemap, OG, links, indexação por ambiente, ausência de JSON-LD e duplicatas |
| T-I18N-SEO-003 | `I18N-SEO-013..014` | legais, login e 404 possuem lang, metadata, canonical/noindex e exclusão corretos |
| T-I18N-INT-001 | `I18N-INT-001..004` | cadastro/login/UTM reais nas duas homes em desktop e mobile |
| T-I18N-INT-002 | `I18N-INT-005` | `/en/login` usa config, funciona sem JS e descarta destino/parâmetros proibidos |
| T-I18N-ANA-001 | `I18N-ANA-001..003` | um pageview sanitizado em cada home e nenhuma coleta nas demais rotas |
| T-I18N-ANA-002 | `I18N-ANA-004`, `I18N-PRIV-001..002` | enum allowlisted, inventário/políticas coerentes e nenhuma nova persistência/coleta |
| T-I18N-A11Y-001 | `I18N-A11Y-001..002` | teclado, foco, nome completo e estado não dependente de cor/bandeira |
| T-I18N-A11Y-002 | `I18N-A11Y-003..004` | pronúncia, `lang` de trechos, ordem de foco e landmarks equivalentes |
| T-I18N-RWD-001 | `I18N-RWD-001..002` | seis viewports por locale sem overflow/truncamento |
| T-I18N-PERF-001 | `I18N-PERF-001..002` | bundle e Lighthouse dentro de `DEC-016` em ambas as homes |
| T-I18N-SEC-001 | `I18N-SEC-001` | CSP e headers aprovados em todas as rotas inglesas no artefato e HTTPS real |
| T-I18N-ARCH-001 | `I18N-ARCH-001..003` | estrutura compartilhada, paridade tipada e falha de build para catálogo inválido |
| T-I18N-ARCH-002 | `I18N-ARCH-004..007` | configuração central, ausência de condicionais dispersas e HTML estático |
| T-I18N-GOV-001 | `I18N-GOV-001..004` | revisores, datas, responsáveis, aprovações e evidências registrados |

Gates mínimos para a implementação futura:

1. testes unitários de locale, rotas, alternates e paridade de catálogos;
2. testes de HTML e SEO das duas homes;
3. E2E desktop/mobile de seletor, âncoras, cadastro e login;
4. acessibilidade automática e smoke manual com leitor de tela nos dois idiomas;
5. matriz responsiva e navegadores nos dois idiomas;
6. revisão visual de screenshot, social card e textos;
7. build estático, performance, CSP e analytics;
8. smoke de produção, sitemap e Search Console.

## 10. Dependências e bloqueadores

| Dependência | Estado | Papel responsável | Evidência para encerrar | Efeito |
|---|---|---|---|---|
| `DEC-020` e baseline normativa | aceita | Produto + Técnico | PRD/SRS/UX/SEO/Segurança/Testes/Backlog/Traceability atualizados | desbloqueia somente tarefas sem dependência externa |
| escopo de idioma, sem entrada comercial nos EUA | aceita | Produto | `DEC-020` | proíbe alegações geográficas/comerciais novas |
| copy `en-US` | aceita em `I18N-001` | Produto/Conteúdo | catálogo completo em UX §16, revisor/data e aceite registrados | libera `I18N-003`; integração/publicação ainda depende das demais tarefas |
| app em inglês ou exceção explícita | aprovação humana registrada; smoke não comprovado | responsável técnico do app + Produto | smoke de cadastro/login/onboarding ou decisão de exceção com aviso | bloqueia jornada e release até existir evidência |
| screenshot inglês sem PII | direção aprovada; arquivo ausente | Design/Marca + Privacidade + Produto | inventário, hash e aprovações visual/técnica/privacidade do arquivo final | bloqueia Hero/Demonstração até existir o ativo |
| privacidade e termos em inglês | aprovação humana registrada; versões ausentes | Produto/controlador + Jurídico | arquivos `en-US`, validação factual, versão, vigência e aceite vinculados ao conteúdo final | bloqueia rotas e Footer ingleses até existirem as versões |
| 404 `/en/*` com status real | não implementada | Técnico/Plataforma | teste do artefato e smoke HTTPS de URL desconhecida | bloqueia release |
| analytics nas duas homes | aprovado, não implementado | Técnico + Privacidade | política/inventário atualizados e payload real auditado | bloqueia baseline por idioma |
| Search Console e baseline `/en/` | pendente | SEO/Operações | sitemap processado e relatório inicial separado por pathname | bloqueia fechamento operacional |

## 11. Sequência futura recomendada

1. `DOC-005`: promoção documental concluída.
2. `I18N-001`: transcriação completa, FAQ e metadados aprovados.
3. Confirmar o fluxo do app em inglês, conteúdo jurídico e screenshots.
4. Implementar modelo tipado de locale e catálogo sem alterar a composição.
5. Adicionar rotas, seletor, SEO alternates, sitemap, analytics e 404 inglesa.
6. Executar todos os gates por locale e corrigir divergências.
7. Publicar preview, obter aprovação humana e só então promover a produção.
8. Submeter o sitemap atualizado e registrar baseline separada de `/en/`.

## 12. Critério de pronto da fase documental

A fase de requisitos está aprovada quando:

1. `DEC-020` e as escolhas da seção 3 estiverem aceitas;
2. bloqueadores de app, jurídico, conteúdo, ativos, analytics e 404 tiverem papel
   responsável, evidência e tarefa;
3. os requisitos estiverem incorporados ao SRS;
4. testes e tarefas estiverem na matriz de rastreabilidade;
5. `DOC-005` possuir validação mecânica real;
6. nenhuma tarefa de código bloqueada tiver sido iniciada.

Atender a este critério aprova a documentação, não o release. A publicação
continua condicionada ao encerramento das dependências da seção 10.

## 13. Referências técnicas

- [Astro — Internationalization routing](https://docs.astro.build/en/guides/internationalization/)
- [Astro — Configuration reference: i18n](https://docs.astro.build/en/reference/configuration-reference/#i18n)
- [Google Search Central — Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [RFC 5646 / BCP 47 — Tags for Identifying Languages](https://www.rfc-editor.org/rfc/rfc5646)
