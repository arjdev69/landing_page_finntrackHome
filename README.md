# FinnTrack Home — Landing Page

Repositório do site público de marketing, SEO e aquisição do FinnTrack Home.
O aplicativo autenticado permanece em uma superfície separada. Este repositório
começa pela especificação: nenhum código de produto deve ser implementado antes
de o requisito correspondente estar aprovado e rastreado.

## Estado atual

- Fase: fundação técnica, qualidade local, configuração tipada, design system e
  shell SEO concluídos (`FND-001..005`).
- Baseline documental: `0.1.1-approved`, 2026-07-15.
- Implementação: Astro + TypeScript estrito + Tailwind CSS.
- Idioma inicial: português do Brasil (`pt-BR`).
- Hospedagem: Vercel, com produção inicial em
  `https://finntrack-home-landing.vercel.app`.
- Aplicativo: `https://finntrackhome.app`, com cadastro em `/cadastro` e login
  em `/entrar`.

## Desenvolvimento local

Pré-requisito: Node.js 22.12.0 ou superior.

```bash
npm install
npm run dev
```

Validação da fundação:

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
```

## Configuração pública

Copie `.env.example` para `.env` no desenvolvimento local. Builds de `preview` e
`production` exigem `PUBLIC_SITE_URL`, `PUBLIC_APP_URL`,
`PUBLIC_APP_SIGNUP_URL`, `PUBLIC_APP_LOGIN_URL` e `PUBLIC_ENVIRONMENT`. Em
produção, todas as URLs devem usar HTTPS, origens não podem conter path/query e
valores locais, reservados ou placeholder são rejeitados.

Variáveis `PUBLIC_*` são publicáveis no artefato estático e nunca podem conter
segredos. Analytics e verificação do Search Console permanecem opcionais até as
decisões correspondentes serem aprovadas.

Na produção inicial da Vercel, a configuração aprovada é:

```dotenv
PUBLIC_ENVIRONMENT=production
PUBLIC_SITE_URL=https://finntrack-home-landing.vercel.app
PUBLIC_APP_URL=https://finntrackhome.app
PUBLIC_APP_SIGNUP_URL=https://finntrackhome.app/cadastro
PUBLIC_APP_LOGIN_URL=https://finntrackhome.app/entrar
```

Esses valores devem ser configurados no ambiente `Production` da Vercel. Uma
futura troca de domínio exige atualizar `PUBLIC_SITE_URL`, canonical,
`robots.txt`, sitemap, Search Console e o redirect permanente do host anterior.

## Fonte de verdade

Comece por [docs/00-SPEC-INDEX.md](docs/00-SPEC-INDEX.md). Em caso de conflito:

1. `docs/03-SRS.md` define o comportamento obrigatório;
2. `docs/04-SDD.md` define como o comportamento será implementado;
3. `docs/08-TEST-PLAN.md` define como ele será verificado;
4. `docs/09-BACKLOG.md` define a ordem de execução;
5. `docs/13-SOURCE-HANDOVER.md` preserva o contexto de origem, mas não substitui
   os documentos normativos acima.

Mudanças de escopo exigem atualização do SRS, da matriz de rastreabilidade e,
quando aplicável, do registro de decisões antes da alteração de código.

## Escopo do MVP

- Landing principal em `/`.
- Redirecionamento de usuários existentes em `/entrar`.
- Páginas reais de privacidade e termos.
- Página 404 com status HTTP correto.
- CTAs de cadastro e login integrados ao app por variáveis de ambiente.
- Preservação de UTMs, analytics consent-aware, SEO técnico, acessibilidade e
  metas de Core Web Vitals.

Blog, CMS, checkout, autenticação no site público, internacionalização completa
e calculadora de rentabilidade não fazem parte do MVP.

## Próximo passo

Configurar CI e previews em `FND-006`, agora desbloqueada pela aceitação da
Vercel em `D0-002`. Depois, concluir `/entrar`, a experiência 404 e os headers
reais nas tarefas `INT-001`, `ERR-001` e `QA-005`. `LEG-001`, `D0-005` e
`SEO-003` continuam condicionadas às aprovações registradas nas respectivas
decisões.
