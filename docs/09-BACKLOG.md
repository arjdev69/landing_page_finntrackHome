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
- [ ] `D0-002` Confirmar domínio do site, app e hospedagem (`DEC-004`, `DEC-010`).
- [ ] `D0-003` Implementar/confirmar no app a URL que abre cadastro diretamente e
  o contrato de UTMs (`DEC-004`).
- [ ] `D0-004` Definir beta/gratuidade e aprovar CTA/FAQ (`DEC-005`).
- [ ] `D0-005` Escolher analytics e política de consentimento (`DEC-006/007`).
- [ ] `D0-006` Definir responsáveis por jurídico, suporte e ativos
  (`DEC-008/009/011`).

Critério: decisões têm status, responsável, data e impacto refletidos nos docs.

## Épico 1 — Fundação

- [ ] `FND-001` Inicializar Astro/TypeScript/Tailwind e lockfile.
  - Aceite: scripts `dev`, `build`, `lint`, `typecheck`, `test` operam.
  - Cobertura: `OPS-003..004`.
- [ ] `FND-002` Configurar lint, formatação, testes e aliases.
- [ ] `FND-003` Criar validação tipada das variáveis de ambiente.
  - Cobertura: `FR-CTA-009`, `SEC-001..003`, `OPS-001..002`.
- [ ] `FND-004` Implementar tokens, estilos globais, fonte e primitives.
  - Cobertura: `A11Y-002`, `A11Y-006`, `RWD-001`.
- [ ] `FND-005` Implementar `MarketingLayout`, o shell de `src/pages/index.astro`
  e o contrato de SEO.
  - Aceite: `/` responde 200 no artefato e monta o layout com metadados tipados;
    as seções de conteúdo podem ser adicionadas incrementalmente por `WEB-*`.
  - Cobertura: `FR-NAV-001`, `SEO-001..005`, `SEO-009`.
- [ ] `FND-006` Configurar CI com gates de PR e build de preview.
  - Cobertura: `OPS-003..005`.

## Épico 2 — Estrutura e conteúdo da home

- [ ] `WEB-001` Implementar Header e navegação mobile acessível.
  - Cobertura: `FR-NAV-002..006`, `A11Y-001..005`.
- [ ] `WEB-002` Implementar Hero com CTAs e asset temporário explicitamente
  marcado para substituição antes da produção.
  - Cobertura: `FR-HOME-001..003`, `FR-CTA-001..005`.
- [ ] `WEB-003` Implementar Problema, Benefícios e Como funciona.
  - Cobertura: `FR-HOME-004..006`.
- [ ] `WEB-004` Implementar ProductPreview com imagens responsivas.
  - Cobertura: `FR-HOME-007..008`, `PERF-005`.
- [ ] `WEB-005` Implementar Para quem, FAQ, CTA final e Footer.
  - Cobertura: `FR-HOME-009..012`, `FR-NAV-003`, `FR-CTA-001`.
- [ ] `WEB-006` Validar responsividade e conteúdo acima da dobra.
  - Cobertura: `RWD-001..004`, `FR-HOME-001`.

## Épico 3 — Rotas e integração

- [ ] `INT-001` Implementar `/entrar` e configuração de redirect na plataforma.
  - Aceite: preserva somente a allowlist de UTMs e nunca aceita destino vindo da
    query; quando o host não filtrar parâmetros, usa o fallback documentado.
  - Cobertura: `FR-CTA-003`, `FR-UTM-001..005`, `SEO-007`, `SEO-012`.
- [ ] `INT-002` Implementar helper de allowlist/merge de UTMs com testes.
  - Cobertura: `FR-UTM-001..005`.
- [ ] `INT-003` Implementar enriquecimento progressivo dos links do app.
  - Cobertura: `FR-CTA-005..006`, `FR-UTM-001..005`.
- [ ] `INT-004` Validar contrato real de cadastro/login e UTMs com o app.
  - Bloqueado por: `D0-003`.
  - Cobertura: `FR-CTA-007..008`, `FR-UTM-006..007`.

## Épico 4 — Analytics

- [ ] `ANA-001` Implementar tipos, classificação determinística de
  `device_group`/`referrer_group`, contrato e `NoopAnalytics`.
- [ ] `ANA-002` Instrumentar eventos sem SDK de provedor nos componentes.
  - Cobertura: `ANA-001..005`.
- [ ] `ANA-003` Integrar provedor e consentimento aprovados.
  - Bloqueado por: `D0-005`.
  - Cobertura: `ANA-006..007`, `PRIV-001..002`.
- [ ] `ANA-004` Validar payloads, duplicidade, PII e debug de produção.

## Épico 5 — SEO, legal e assets

- [ ] `SEO-001` Gerar robots/sitemap por ambiente e canonical.
  - Cobertura: `SEO-003`, `SEO-006..008`, `SEO-013`.
- [ ] `SEO-002` Adicionar ícones, social card e metadados sociais finais.
  - Bloqueado por: `D0-006` para ativos finais.
- [ ] `SEO-003` Adicionar apenas dados estruturados aprovados e testar.
  - Cobertura: `SEO-010..011`.
- [ ] `LEG-001` Publicar privacidade e termos aprovados.
  - Bloqueado por: `D0-006`.
  - Cobertura: `FR-LEG-001..003`, `PRIV-001..004`.
- [ ] `ERR-001` Implementar 404 e confirmar status real na hospedagem.
  - Cobertura: `FR-ERR-001..002`.
- [ ] `AST-001` Substituir assets provisórios por logo/screenshots finais sem PII.
  - Bloqueado por: `D0-006`.
  - Cobertura: `FR-HOME-007..008`, `PRIV-003`.

## Épico 6 — Qualidade e lançamento

- [ ] `QA-001` Automatizar E2E dos fluxos P0.
- [ ] `QA-002` Executar auditoria manual/automática WCAG 2.2 AA.
- [ ] `QA-003` Executar matriz responsiva e navegadores.
- [ ] `QA-004` Medir bundle/Lighthouse e aprovar orçamento sintético.
- [ ] `QA-005` Configurar e validar headers de segurança.
- [ ] `REL-001` Fechar todas as decisões bloqueadoras e checklist de lançamento.
- [ ] `REL-002` Publicar, executar smoke/rollback e validar host/canonical/404.
- [ ] `REL-003` Configurar Search Console e submeter sitemap.
- [ ] `REL-004` Registrar linha de base de aquisição e conversão.

## Fora do backlog do MVP

Calculadora, guias, blog/CMS, páginas programáticas, preços, inglês, afiliados,
chat e checkout exigem nova versão do PRD/SRS. Não criar scaffolding específico
para essas funções durante os épicos acima.
