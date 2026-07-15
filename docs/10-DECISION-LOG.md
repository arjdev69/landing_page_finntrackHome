# Registro de decisões e questões abertas

Versão: 0.1.1  
Data: 2026-07-15

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

- Status: **Pendente — bloqueador de lançamento**.
- Confirmar: domínio do site, domínio do app, login, URL que abre cadastro,
  comportamento pós-auth, allowlist/atribuição de UTMs e OAuth origins.
- Evidência atual: o app usa `/` para login; `LoginScreen` inicia em `signin` e
  não lê `?mode=signup`; não foi encontrada captura de UTMs.
- Ação externa: atualizar/confirmar contrato no repositório do app.
- Responsável: responsável técnico do app, com validação do responsável técnico
  da landing.
- Data de registro: 2026-07-15.
- Data limite: antes de `INT-004` e obrigatoriamente antes do lançamento.
- Evidência para encerrar: URLs de login/cadastro aprovadas, OAuth origins
  configuradas e E2E landing → app cobrindo cadastro, login e UTMs.

### DEC-005 — Beta e gratuidade

- Status: **Pendente — bloqueador de copy/lançamento**.
- Decidir se “Começar gratuitamente” e “Beta gratuito” são afirmações corretas.
- Restrição: “grátis para sempre” permanece proibido sem decisão comercial.
- Responsável: Produto/Comercial.
- Data de registro: 2026-07-15.
- Data limite: antes de aprovar a copy de `WEB-002` e `WEB-005`.
- Evidência para encerrar: decisão comercial registrada e copy única atualizada
  em UX, SRS e componentes.

### DEC-006 — Provedor de analytics

- Status: **Pendente — não bloqueia adaptador, bloqueia produção instrumentada**.
- Critérios: privacidade, cookies, custo, integração com eventos do app, debug,
  retenção e exportação.
- Responsável: Growth/Dados, com validação de Privacidade e responsável técnico.
- Data de registro: 2026-07-15.
- Data limite: antes de `ANA-003`.
- Evidência para encerrar: provedor escolhido, inventário técnico, configuração
  de debug e contrato de eventos aprovados.

### DEC-007 — Consentimento, cookies e pixels

- Status: **Pendente — bloqueador de lançamento com terceiros**.
- Decidir ferramentas autorizadas, base/regra de consentimento, persistência de
  UTMs e comportamento de rejeição.
- Default seguro: nenhum pixel publicitário e analytics noop.
- Responsável: Privacidade/Jurídico, com implementação do responsável técnico.
- Data de registro: 2026-07-15.
- Data limite: antes de `ANA-003` e de qualquer terceiro em produção.
- Evidência para encerrar: matriz ferramenta × dados × storage × consentimento,
  política atualizada e testes de aceitar/rejeitar.

### DEC-008 — Conteúdo jurídico

- Status: **Pendente — bloqueador de lançamento**.
- Definir responsável por fornecer e aprovar privacidade e termos.
- Conteúdo placeholder não é aceitável.
- Responsável: Jurídico, com aceite final de Produto.
- Data de registro: 2026-07-15.
- Data limite: antes de `LEG-001` ser concluída.
- Evidência para encerrar: versões datadas de privacidade e termos com aprovação
  registrada.

### DEC-009 — Marca e screenshots

- Status: **Pendente — bloqueador de lançamento visual**.
- Confirmar logotipo SVG/horizontal, favicon, social card e screenshots finais.
- Ativos devem usar dados sintéticos e corresponder ao produto atual.
- Responsável: Marca/Design, com aceite de Produto e revisão de Privacidade.
- Data de registro: 2026-07-15.
- Data limite: antes de `AST-001` e `SEO-002` serem concluídas.
- Evidência para encerrar: inventário de ativos, origem, data de captura e
  aprovações registradas.

### DEC-010 — Domínio e hospedagem

- Status: **Pendente — bloqueador de deploy**.
- Critérios: deploy estático, preview, redirects/status 404, headers, rollback,
  domínio/HTTPS e proteção contra indexação.
- Responsável: responsável técnico/Plataforma.
- Data de registro: 2026-07-15.
- Data limite: antes de `FND-006` e do teste final de `INT-001`.
- Evidência para encerrar: provedor e domínios aprovados, preview operacional,
  configuração de redirects/headers e procedimento de rollback.

### DEC-011 — Canal público de suporte e dados

- Status: **Pendente — bloqueador de rodapé/política**.
- Definir canal real e responsável operacional.
- Responsável: Produto/Operações.
- Data de registro: 2026-07-15.
- Data limite: antes de `WEB-005` e `LEG-001` serem concluídas.
- Evidência para encerrar: canal publicado, pessoa/equipe atendente e processo de
  encaminhamento de solicitações de dados.

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

- Status: **Proposta**.
- Dependência: `DEC-010`.
- Preferência: redirect 302/307 na hospedagem para permitir mudança de destino.
- Regra: o redirect deve preservar somente a allowlist de UTMs. Se a hospedagem
  não filtrar query strings, usar página estática mínima com link real e
  enriquecimento progressivo, conforme SDD §11.
- Responsável: responsável técnico/Plataforma.
- Data de registro: 2026-07-15.
- Data limite: durante `INT-001`, após `DEC-010`.
- Evidência para encerrar: configuração escolhida e `T-UTM-003` aprovado.

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
