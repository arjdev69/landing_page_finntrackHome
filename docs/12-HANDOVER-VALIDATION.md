# Validação do handover da landing page

Versão: 1.1  
Data da validação: 2026-07-15  
Método: duas passagens — extração factual e crítica/evolução

## Diagnóstico

O handover é consistente com a visão, escopo funcional e linguagem visual do
FinnTrack Home e é suficiente para iniciar o novo repositório. Ele não era,
sozinho, uma especificação executável: combinava contexto, recomendações,
requisitos, fases futuras e 12 decisões abertas. A principal divergência prática
é que o app atual não implementa a URL de cadastro nem a atribuição de UTMs
sugeridas no handover.

Esta baseline preserva o handover e converte seu conteúdo em SRS, SDD, testes,
backlog, decisões e rastreabilidade sem inventar funcionalidades de produto.

## Passagem 1 — fatos extraídos

### Fontes lidas

No repositório `FinntrackHome`:

- `docs/00-Spec-Index.md`: SRS é a fonte autoritativa do app.
- `docs/01-Vision.md`: proposta de valor, público e compreensão financeira rápida.
- `docs/02-PRD.md`: escopo do app, autenticação, dashboard, imóveis, receitas,
  despesas e relatórios.
- `docs/03-SRS.md`: comportamento autoritativo, `pt-BR`, Supabase Auth/RLS e rotas.
- `docs/09-UIUX-Specification.md`: paleta, Inter e direção visual.
- `docs/13-Security.md`: autenticação/RLS e proteção de dados do app.
- `docs/14-Layout-Reference.md`: estrutura visual e evidências do produto.
- `src/features/auth/LoginScreen.tsx`: login/cadastro são estados locais; o estado
  inicial é `signin`.
- `src/App.tsx`: `/` é a rota pública do app e autenticação redireciona ao dashboard.
- `src/features/dashboard/DashboardScreen.tsx`: KPIs e comparações descritos no
  handover existem na implementação.

Documento-alvo: `docs/27-Landing-Page-Handover.md`, versão 1.0, 2026-07-10.

### Alinhamentos confirmados

- Proposta de valor e categoria financeira são coerentes com Vision/PRD/SRS.
- Benefícios centrais refletem dashboard, despesas, propriedades e relatórios.
- Paleta e tipografia correspondem à especificação UI/UX.
- Separar site e app não altera as regras do domínio autenticado.
- Restrições de alegação evitam transformar stubs ou planos em capacidades.
- A landing em Astro está coerente com uma superfície pública estática, embora
  seja uma arquitetura nova e não derivada da stack React do app.

## Passagem 2 — crítica e evolução

### 1. URL de cadastro sugerida não funciona no app atual — impacto crítico

- Problema: o handover sugere `...?mode=signup`.
- Evidência: `LoginScreen.tsx` inicializa `mode` como `signin` e não lê query
  parameters; `App.tsx` apenas monta a tela em `/`.
- Risco: principal CTA leva ao login, aumentando atrito e invalidando o fluxo de
  aceite landing → cadastro.
- Evolução: `DEC-004`, `FR-CTA-007`, `D0-003` e teste E2E bloqueador.

### 2. UTMs não têm consumidor no app — impacto crítico

- Problema: o handover exige preservação e associação à criação de conta.
- Evidência: a busca no código do app não encontrou `utm_source`,
  `utm_campaign` ou lógica equivalente.
- Risco: a landing anexa parâmetros, mas a atribuição se perde no destino.
- Evolução: contrato explícito em Analytics §6 e bloqueio em `DEC-004`.

### 3. Requisitos e recomendações estavam misturados — impacto alto

- Problema: expressões como “preferencialmente”, “quando possível” e “tipos
  possíveis” conviviam com critérios obrigatórios.
- Risco: dois implementadores poderiam entregar comportamentos incompatíveis.
- Evolução: SRS com IDs/prioridades; opções ficam no SDD/Decision Log.

### 4. Decisões pendentes não tinham dono, prazo ou bloqueio — impacto alto

- Problema: doze perguntas abertas estavam listadas sem governança.
- Risco: placeholders, SDKs ou URLs provisórias chegarem à produção.
- Evolução: `10-DECISION-LOG.md` classifica impacto, papel responsável, data de
  registro/aceitação, marco limite e evidência de encerramento;
  `09-BACKLOG.md` registra dependências. Os papéis devem ser associados a pessoas
  no instrumento de gestão antes da tarefa dependente.

### 5. Semântica dos eventos estava incompleta — impacto médio/alto

- Problema: nomes e propriedades existiam, mas não frequência, limiar,
  duplicidade nem relação entre clique e outbound.
- Risco: métricas inconsistentes e impossível comparar posições de CTA.
- Evolução: contrato de eventos e regras de disparo em
  `06-SEO-ANALYTICS-SPEC.md`.

### 6. Consentimento e persistência de campanha estavam ambíguos — impacto alto

- Problema: “quando possível” e “quando aplicável” não definem storage/cookies.
- Risco: implementação prematura incompatível com política de privacidade.
- Evolução: default noop/sem persistência; qualquer retenção depende de
  `DEC-007`.

### 7. 404, redirects e noindex dependem da hospedagem — impacto alto

- Problema: o handover exige status reais, mas a plataforma não está escolhida.
- Risco: SPA fallback/404 200, redirect frágil ou preview indexado.
- Evolução: contratos no SDD, testes de status e dependência de `DEC-010`.

### 8. FAQ e “gratuito” ainda dependem de realidade comercial — impacto alto

- Problema: a copy usa “Começar gratuitamente” e pergunta sobre beta sem decisão.
- Risco: alegação comercial incorreta ou inconsistência em múltiplos CTAs.
- Evolução: conteúdo centralizado e `DEC-005` como bloqueador.

### 9. Assets reais não estavam governados — impacto médio/alto

- Problema: screenshots e logos eram entregáveis, sem critério de origem/aprovação.
- Risco: PII, UI desatualizada, social card inconsistente ou alegação fictícia.
- Evolução: critérios em UX/Segurança, tarefa `AST-001` e `DEC-009`.

### 10. Metas de campo não tinham estratégia pré-lançamento — impacto médio

- Problema: Core Web Vitals p75 só existem após tráfego suficiente.
- Risco: aceite impossível antes do lançamento ou substituição indevida por um
  único Lighthouse.
- Evolução: auditoria sintética como gate inicial e objetivos de campo mantidos
  como norma pós-lançamento.

### 11. O app ainda chama sua tela pública de “landing” — impacto médio

- Problema: PRD/SRS do app incluem “Public landing / sign-in”, enquanto o novo
  site assume marketing separado.
- Risco: ownership duplicado de SEO/copy e confusão sobre a rota `/` em domínios
  distintos.
- Evolução: `DEC-001` define superfícies; o app mantém `/` como login no seu
  domínio, e o site usa `/` como landing no domínio público.

## Itens não inventados

- metas percentuais de conversão;
- preço/plano do produto;
- provedor de analytics, consent manager ou hospedagem;
- domínio final;
- texto jurídico;
- suporte público;
- prazo de atribuição;
- páginas futuras e calculadora no MVP.

## Resultado

O handover foi aceito como fonte histórica e de contexto. A implementação deve
seguir os documentos normativos deste repositório, resolvendo primeiro os
contratos externos necessários à tarefa em execução e todos os bloqueadores
antes do lançamento.

## Correções aplicadas após a validação

Em 2026-07-15, a baseline recebeu as seguintes correções sem ampliar o MVP:

- `DEC-002` foi aceita e a stack deixou de aparecer simultaneamente como proposta
  e premissa confirmada;
- README e backlog passaram a distinguir bloqueadores de tarefa de bloqueadores
  exclusivos de lançamento;
- todas as decisões passaram a registrar papel responsável, data/marco e
  evidência esperada;
- `/entrar` recebeu contrato explícito para filtrar e preservar a allowlist de
  UTMs, com o caso `T-UTM-003`;
- `device_group` e `referrer_group` receberam regras determinísticas;
- `DEC-015` definiu `noindex,follow` para páginas legais no MVP;
- `FND-005` passou a incluir explicitamente o shell de `index.astro` e a resposta
  HTTP 200 da home;
- `FR-NAV-005` foi corrigido de `SHOULD` para `COULD`;
- SRS, SDD, testes, backlog e rastreabilidade foram atualizados em conjunto.
