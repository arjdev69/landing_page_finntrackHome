# Matriz de rastreabilidade

Versão: 0.1.1  
Status: approved — cobertura planejada; implementação iniciada
Data: 2026-07-15

## Como ler

Cada linha liga requisitos do SRS ao desenho, aos casos de teste e às tarefas de
implementação. Intervalos são inclusivos. “Planejada” significa que a cobertura
está especificada, não que o teste já passou.

| Requisitos | Desenho / especificação | Testes | Backlog | Estado |
|---|---|---|---|---|
| `FR-NAV-001` | SDD §§4,6,11; UX §§3,14 | `T-ROUTE-001` | `FND-005` | planejada |
| `FR-NAV-002..006` | SDD §6; UX §3 | `T-NAV-001`, `T-A11Y-001` | `WEB-001` | planejada |
| `FR-HOME-001..003` | UX §§2,4,14 | `T-HOME-001`, `T-RWD-001` | `WEB-002`, `WEB-006` | planejada |
| `FR-HOME-004..006` | UX §§5–7 | `T-HOME-001` | `WEB-003` | planejada |
| `FR-HOME-007..008` | SDD §10; UX §8 | `T-ASSET-001` | `WEB-004`, `AST-001` | planejada |
| `FR-HOME-009..012` | UX §§9–12 | `T-CONTENT-001` | `WEB-005`, `LEG-001` | planejada |
| `FR-CTA-001..004` | SDD §§5,7,11; UX §§3–4,11 | `T-CTA-001`, `T-UTM-003` | `WEB-002`, `WEB-005`, `INT-001` | planejada |
| `FR-CTA-005..006` | SDD §§6–8 | `T-CTA-001`, `T-ANA-001` | `INT-003`, `ANA-002` | planejada |
| `FR-CTA-007..008` | SDD §§3,7,11 | `T-CTA-002` | `INT-004` | bloqueada por `DEC-004` |
| `FR-CTA-009` | SDD §5 | `T-CTA-002`, `T-OPS-001` | `FND-003` | planejada |
| `FR-UTM-001..005` | SDD §§7,11; Analytics §6 | `T-UTM-001`, `T-UTM-003` | `INT-001..003` | planejada |
| `FR-UTM-006..007` | SDD §7; Analytics §6 | `T-UTM-002` | `D0-003`, `INT-004` | bloqueada por `DEC-004/007` |
| `FR-LEG-001..003` | UX §12; Segurança §5 | `T-LEGAL-001` | `LEG-001` | bloqueada por `DEC-008` |
| `FR-ERR-001..002` | SDD §§9,11 | `T-ROUTE-001`, `T-404-001` | `ERR-001` | depende de `DEC-010` |
| `SEO-001..005` | SDD §9; UX §2; Analytics §2 | `T-SEO-001` | `FND-005`, `SEO-001` | planejada |
| `SEO-006..009` | SDD §§9–11; Analytics §2 | `T-SEO-002` | `SEO-001..002`, `ERR-001` | planejada |
| `SEO-010..011` | SDD §9; Analytics §2 | `T-SEO-003` | `SEO-003` | depende de `DEC-012` |
| `SEO-012` | SDD §11 | `T-SEO-004` | `INT-001`, `REL-002` | depende de `DEC-010` |
| `SEO-013` | SDD §9; Analytics §2 | `T-SEO-002` | `SEO-001`, `LEG-001` | planejada; decisão `DEC-015` aceita |
| `ANA-001..005` | SDD §8; Analytics §§3–5 | `T-ANA-001` | `ANA-001..002`, `ANA-004` | planejada |
| `ANA-006..007` | SDD §8; Analytics §8; Segurança §5 | `T-ANA-002` | `ANA-003..004` | bloqueada por `DEC-006/007` |
| `A11Y-001..005` | SDD §6; UX §§3,14 | `T-A11Y-001` | `WEB-001`, `QA-002` | planejada |
| `A11Y-006..007` | UX §13 | `T-A11Y-002` | `FND-004`, `QA-002` | planejada |
| `A11Y-008` | UX §14 | `T-A11Y-003` | `WEB-006`, `QA-002` | planejada |
| `A11Y-009` | UX §§13–14 | `T-A11Y-004` | `FND-004`, `QA-002` | planejada |
| `A11Y-010` | UX §14 | `T-A11Y-005` | `WEB-001`, `QA-002` | planejada |
| `A11Y-011` | Plano de testes §6 | `T-A11Y-006` | `QA-002` | planejada |
| `RWD-001..004` | UX §14; SDD §§6,10 | `T-RWD-001..002` | `WEB-006`, `QA-003` | planejada |
| `RWD-005` | SDD §13 | `T-RWD-003` | `QA-003` | matriz pendente |
| `PERF-001..003` | SDD §§10,13; Plano §8 | `T-PERF-001` | `QA-004`, `REL-004` | objetivos de campo após amostra |
| `PERF-004..006` | SDD §§2,6,8,10 | `T-PERF-002` | `FND-004`, `WEB-004`, `QA-004` | planejada |
| `PERF-007` | SDD §13 | `T-PERF-003` | `QA-004` | após primeiro build |
| `SEC-001..004` | SDD §§5,7,12; Segurança §§2–4 | `T-SEC-001` | `FND-003`, `INT-002`, `QA-005` | planejada |
| `SEC-005..006` | SDD §§12–13; Segurança §§3–4 | `T-SEC-002` | `FND-001`, `FND-006`, `QA-005` | planejada |
| `PRIV-001..004` | Analytics §5; Segurança §§1,5–6 | `T-PRIV-001` | `ANA-003..004`, `LEG-001`, `AST-001` | decisões pendentes |
| `OPS-001..002` | SDD §5 | `T-OPS-001` | `FND-003` | planejada |
| `OPS-003..004` | SDD §13 | `T-OPS-001` | `FND-001..002`, `FND-006` | `FND-001..002` concluídas e validadas; pipeline remoto pendente |
| `OPS-005..007` | SDD §§13–14 | `T-OPS-002` | `FND-006`, `REL-002..003` | depende de `DEC-010` |

## Cobertura documental

- Todos os grupos de requisitos do SRS possuem desenho, teste e tarefa.
- Requisitos bloqueados não foram removidos nem reinterpretados.
- `FND-001..002` possuem evidência de fundação e qualidade local; requisitos que
  dependem de `FND-006` permanecem parciais até a configuração do pipeline.

## Evidência de implementação

| Tarefa | Data | Artefatos | Validação | Estado |
|---|---|---|---|---|
| `FND-001` | 2026-07-15 | `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `src/styles/global.css`, `test/foundation.test.mjs` | `npm run lint`; `npm run typecheck`; `npm test`; `npm run build`; smoke HTTP 200 com servidor Astro | concluída |
| `FND-002` | 2026-07-15 | `eslint.config.js`, `prettier.config.mjs`, `.prettierignore`, `package.json`, `package-lock.json`, `tsconfig.json`, `src/pages/index.astro`, `test/foundation.test.mjs` | `npm run format:check`; `npm run lint`; `npm run typecheck`; `npm test`; `npm run build` | concluída |

## Atualização obrigatória

Ao concluir uma tarefa, substituir “planejada” pelo link/identificador da
evidência (teste, relatório, PR ou artefato). Qualquer requisito sem cobertura
impede marcar o MVP como pronto.
