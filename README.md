# FinnTrack Home — Landing Page

Repositório do site público de marketing, SEO e aquisição do FinnTrack Home.
O aplicativo autenticado permanece em uma superfície separada. Este repositório
começa pela especificação: nenhum código de produto deve ser implementado antes
de o requisito correspondente estar aprovado e rastreado.

## Estado atual

- Fase: fundação pronta para implementação.
- Baseline documental: `0.1.1-approved`, 2026-07-15.
- Implementação: ainda não iniciada.
- Idioma inicial: português do Brasil (`pt-BR`).

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

Executar somente a primeira tarefa elegível do backlog. Decisões que bloqueiam
uma tarefa específica devem ser resolvidas antes dela; decisões classificadas
apenas como bloqueadoras de lançamento não impedem trabalho preparatório ou de
fundação configurável. Nenhum deploy de produção pode ocorrer enquanto houver
bloqueador de lançamento aberto.
