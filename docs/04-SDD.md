# Software Design Document — Landing Page

Versão: 0.2.0
Status: approved — decisões pendentes continuam condicionando tarefas dependentes  
Data: 2026-07-30

## 1. Objetivo técnico

Entregar um site público estático por padrão, com o mínimo de JavaScript no
cliente, configuração externa para integração com o app e fronteiras claras
entre conteúdo, apresentação, analytics e navegação externa.

## 2. Decisões de arquitetura

### Baseline

- Astro para rotas, layouts, geração estática e otimização de assets.
- TypeScript em modo estrito.
- Tailwind CSS com tokens semânticos centralizados.
- Componentes `.astro` por padrão.
- JavaScript cliente apenas para menu móvel, enriquecimento de UTMs, analytics e
  qualquer interação que não possa ser atendida semanticamente pelo HTML.
- React somente se uma interação futura justificar a ilha; não é dependência
  necessária para o MVP documental atual.
- Conteúdo legal em Markdown/MDX apenas se a origem e sanitização forem
  controladas; copy da home pode permanecer em módulos tipados.

Astro + TypeScript estrito + Tailwind é a decisão aprovada em `DEC-002`.
Hospedagem e analytics estão definidos em `DEC-010` e `DEC-018`; a integração
do Vercel Web Analytics foi concluída em `ANA-003`.

## 3. Contexto e fronteiras

```text
Navegador
  ├─ HTML/CSS/assets estáticos ── Hospedagem/CDN
  ├─ pageview agregado ───────── Vercel Web Analytics (ANA-003)
  ├─ eventos allowlisted ─────── NoopAnalytics no plano Hobby
  └─ login/cadastro + UTMs ───── App FinnTrack Home

Landing
  não autentica
  não acessa banco de analytics
  não recebe segredo de analytics
  não recebe dados financeiros
  não decide ativação dentro do app
```

O app é um sistema externo. URLs e parâmetros são um contrato versionado, não
um detalhe de componente.

## 4. Estrutura proposta

```text
src/
├── components/
│   ├── layout/       # Header, Footer, MobileNavigation
│   ├── sections/     # Hero, Problem, Benefits, HowItWorks, ProductPreview...
│   ├── seo/          # SeoHead e JSON-LD aprovado
│   └── ui/           # ButtonLink, Container, SectionHeading...
├── config/
│   ├── env.ts        # leitura e validação de configuração pública
│   ├── navigation.ts # âncoras e links
│   └── site.ts       # metadados e informações da marca
├── content/
│   ├── copy.ts       # conteúdo tipado da home
│   └── legal/        # conteúdo aprovado de privacidade e termos
├── layouts/
│   └── MarketingLayout.astro
├── lib/
│   ├── analytics/    # contrato, classificação, noop e adaptador do provedor
│   ├── campaigns/    # allowlist e composição de URLs/UTMs
│   └── seo/          # canonical, metadados e schemas
├── pages/
│   ├── index.astro
│   ├── entrar.astro  # fallback; redirect primário é da plataforma
│   ├── privacidade.astro
│   ├── termos.astro
│   └── 404.astro
├── styles/
│   └── global.css
└── types/
    └── analytics.ts

public/
├── brand/
├── screenshots/
├── favicon.svg
├── apple-touch-icon.png
└── social-card.png

tests/
├── unit/
├── integration/
└── e2e/
```

## 5. Configuração

| Variável | Obrigatória em produção | Regra |
|---|---:|---|
| `PUBLIC_SITE_URL` | sim | origem HTTPS canônica, sem path/query |
| `PUBLIC_APP_URL` | sim | origem HTTPS do app |
| `PUBLIC_APP_SIGNUP_URL` | sim | URL absoluta que abre diretamente cadastro |
| `PUBLIC_APP_LOGIN_URL` | sim | URL absoluta de login |
| `PUBLIC_ANALYTICS_ID` | depende da decisão | identificador público, nunca segredo |
| `PUBLIC_SEARCH_CONSOLE_VERIFICATION` | após definição | token público de verificação |
| `PUBLIC_ENVIRONMENT` | sim | `production` ou `preview` |

Regras:

- validação ocorre no build e retorna mensagem acionável;
- produção rejeita HTTP, hosts inválidos e valores placeholder;
- componentes recebem configuração tipada e não leem ambiente diretamente;
- nenhum segredo é permitido, mesmo que o nome não contenha `PUBLIC`.

## 6. Renderização e hidratação

- `output: static` é a baseline.
- Conteúdo, navegação, FAQ e CTAs existem no HTML inicial.
- FAQ deve preferir `<details>/<summary>` quando a experiência aprovada permitir.
- Menu móvel deve preferir solução sem dependência de framework; se usar script,
  o script deve ser pequeno, focado e progressivamente aprimorado.
- Captura de eventos e UTMs não pode transformar o link em botão controlado por
  JavaScript.

## 7. Contrato de links e UTMs

### API interna proposta

```ts
type UTMKey =
  | 'utm_source'
  | 'utm_medium'
  | 'utm_campaign'
  | 'utm_content'
  | 'utm_term';

type CtaLocation = 'header' | 'hero' | 'middle' | 'footer';

function readAllowedUtms(url: URL): Partial<Record<UTMKey, string>>;
function appendUtms(destination: URL, utms: Partial<Record<UTMKey, string>>): URL;
```

Comportamento:

1. o HTML entrega `href` válido com o destino configurado;
2. um script progressivo lê apenas a allowlist na URL atual;
3. usa `URL`/`URLSearchParams` para mesclar os valores ao destino;
4. preserva parâmetros do destino, inclusive o futuro contrato de cadastro;
5. ignora chaves desconhecidas e nunca aceita destino vindo do visitante;
6. analytics observa o clique, mas não cancela a navegação.

O contrato de campanha do MVP termina na memória da página do app. Landing e
app não persistem first-touch/last-touch em cookie, Web Storage, banco ou perfil
de conta, nem correlacionam UTM com usuário. Retenção 7/30 dias é calculada pelo
produto a partir de cadastro/atividade, separadamente da origem de campanha. O
relatório do Vercel Web Analytics segue a janela de um mês do plano Hobby; o
identificador temporário descrito pelo provedor é descartado após 24 horas.

## 8. Analytics por adaptador

```ts
interface AnalyticsClient {
  page(name: 'landing_view', properties: LandingViewProperties): void;
  track<E extends AnalyticsEvent>(event: E, properties: EventProperties[E]): void;
}
```

Implementações:

- `NoopAnalytics`: padrão seguro em desenvolvimento, preview, configuração
  incompleta, custom events e falha;
- `@vercel/analytics/astro`: somente na home de produção, registra pageview
  agregado por endpoint de mesma origem, sem cookie ou storage e com
  `beforeSend` removendo query e fragmento;
- o plano Hobby não recebe os eventos personalizados do contrato nem UTMs; eles
  permanecem no adaptador `NoopAnalytics`.

Componentes emitem intenção sem conhecer SDK, ID ou consent manager. O adaptador
tipado existente preserva o contrato para uma decisão futura, sem rede no MVP.

`ANA-003` integra apenas o componente oficial de pageview. Os gates de
`docs/privacy/D0-005-ANALYTICS-POLICY.md` passaram localmente; a inspeção do
payload implantado permanece em `ANA-004`.

`lib/analytics/classification.ts` implementa os breakpoints de `device_group`, a
precedência de `referrer_group` e as allowlists versionadas definidas em
`06-SEO-ANALYTICS-SPEC.md`. Essa classificação é lógica pura e coberta por testes
unitários; nenhuma URL completa de referrer entra no payload.

## 9. SEO

`MarketingLayout` recebe title, description, canonical, image, robots e tipo de
página. `SeoHead` normaliza canonical com `PUBLIC_SITE_URL` e impede canonical
relativo em produção.

Dados estruturados ficam em módulos tipados separados. `Organization`,
`WebSite` e `SoftwareApplication` só serão ativados quando os campos visíveis e
aprovações correspondentes existirem. `FAQPage` não faz parte automática do MVP.

`robots.txt` deve variar por ambiente sem depender de JavaScript. Preview usa
`Disallow: /` e, quando suportado, header `X-Robots-Tag: noindex, nofollow`.

## 10. Imagens e fontes

- Imagens-fonte reais são armazenadas sem dados pessoais.
- O pipeline gera tamanhos responsivos e formato moderno com fallback quando
  necessário.
- Hero reserva dimensões e não usa vídeo automático ou carrossel.
- O social card tem 1200×630 px e passa por revisão visual.
- Inter deve ser hospedada/carregada de forma eficiente, com subset e fallback;
  a estratégia final deve respeitar licenciamento e orçamento de performance.

## 11. Redirecionamentos e status

- O host deve configurar `/entrar` como redirect temporário (302/307) para a URL
  de login enquanto o destino puder mudar, somente se a plataforma conseguir
  encaminhar exclusivamente a allowlist de UTMs e descartar qualquer outro
  parâmetro.
- O redirect de `/entrar` deve preservar `utm_source`, `utm_medium`,
  `utm_campaign`, `utm_content` e `utm_term`, sem sobrescrever parâmetros
  funcionais existentes no destino.
- Se a plataforma não conseguir filtrar a query string, `entrar.astro` fornece
  uma página mínima com link real e enriquecimento progressivo pela mesma função
  de allowlist usada nos demais links. Sem JavaScript, o login continua
  funcional, embora a atribuição da visita possa degradar.
- O destino nunca pode ser recebido por query parameter do visitante.
- O host deve servir `404.html` com status 404, nunca 200.
- HTTP e host não canônico redirecionam permanentemente para a origem oficial.

## 12. Segurança da entrega

Cabeçalhos-alvo, ajustados ao provedor escolhido:

- `Content-Security-Policy` com `default-src 'self'` e allowlists mínimas;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Content-Type-Options: nosniff`;
- `Permissions-Policy` desabilitando capacidades não usadas;
- `Strict-Transport-Security` somente após HTTPS/subdomínios estarem confirmados;
- proteção de framing por CSP `frame-ancestors`.

Scripts de terceiros entram na CSP somente depois de aprovados no inventário de
privacidade.

## 13. Build, testes e entrega

Scripts esperados:

```text
dev
build
preview
lint
typecheck
test
test:e2e
test:a11y
```

Pipeline mínimo:

1. instalação imutável pelo lockfile;
2. lint e typecheck;
3. testes unitários e de integração;
4. build de produção;
5. E2E contra preview do artefato;
6. auditorias de links, HTML, acessibilidade e performance;
7. deploy de preview; produção exige aprovação.

## 14. Observabilidade e falhas

Não há backend próprio de analytics no MVP; o pageview usa a entrada de mesma
origem administrada pela Vercel. Falhas relevantes são:

- configuração ausente: falha de build;
- analytics indisponível: a página e os CTAs continuam funcionais;
- imagem ausente: falha de build/teste de assets;
- app indisponível: link permanece correto, smoke test acusa dependência;
- conteúdo legal placeholder: falha do gate de lançamento;
- preview indexável ou 404 com 200: falha do gate técnico.

## 15. Evolução fora do MVP

MDX/coleções para guias, calculadora, páginas de recursos e novo componente
interativo devem entrar por atualização do PRD/SRS. A arquitetura permite essa
expansão, mas não cria CMS, API ou framework de ilhas antecipadamente.

## 16. Internacionalização `pt-BR` / `en-US`

`DEC-020` mantém `output: static`, `pt-BR` na raiz e `en-US` sob `/en/`. A
implementação deve:

- configurar locale padrão e caminho inglês de forma central;
- compartilhar layouts/componentes e injetar catálogo tipado completo;
- separar copy, metadata, rotas equivalentes e ativos dependentes de idioma;
- falhar no build para locale, chave ou metadata ausente;
- gerar canonical, alternates recíprocos e `x-default="/"`;
- usar links reais no seletor, com `PT-BR`/`EN-US` visuais e nomes acessíveis
  completos;
- não usar detecção automática, cookie, storage, tradução em runtime ou SDK;
- oferecer `/en/login`, `/en/privacy`, `/en/terms` e experiência 404 inglesa;
- preservar status HTTP 404 real em URL desconhecida sob `/en/*`;
- permitir pageview sanitizado somente em `/` e `/en/`;
- aplicar CSP e headers aprovados a todas as novas rotas.

Estrutura-alvo:

```text
src/
├── i18n/
│   ├── locales.ts
│   ├── routes.ts
│   └── content/
│       ├── pt-BR.ts
│       └── en-US.ts
├── components/layout/LocaleSwitcher.astro
└── pages/
    ├── index.astro
    └── en/
        ├── index.astro
        ├── login.astro
        ├── privacy.astro
        ├── terms.astro
        └── 404.astro
```

O roteamento pode usar recursos nativos do Astro e helpers locais mínimos. A
configuração da hospedagem para 404 localizada deve ser comprovada no artefato e
no endpoint real; rewrite que devolva HTTP 200 é proibido.
