# Regras de trabalho — FinnTrack Home Landing

## Fonte de verdade

Antes de alterar código, leia `docs/00-SPEC-INDEX.md` e os documentos indicados
para a tarefa. `docs/03-SRS.md` é autoritativo para escopo e comportamento.

## Fluxo SDD

1. Selecione exatamente uma tarefa pendente e elegível em `docs/09-BACKLOG.md`.
2. Confirme requisitos, decisões e dependências associados.
3. Não implemente se a tarefa estiver bloqueada por decisão pendente.
4. Faça a menor mudança que satisfaça a tarefa.
5. Execute os testes definidos em `docs/08-TEST-PLAN.md`.
6. Atualize backlog e `docs/11-TRACEABILITY.md` com a evidência real.

## Restrições

- Não ampliar o MVP sem atualizar PRD, SRS e rastreabilidade primeiro.
- Não codificar URLs de produção diretamente em componentes.
- Não adicionar SDK, cookie, storage, pixel ou terceiro sem decisão de
  privacidade registrada.
- Não incluir segredo em código, variável pública ou artefato estático.
- Não usar dados reais de usuários em screenshots, fixtures ou documentação.
- Não publicar alegação, preço, depoimento ou métrica sem aprovação/evidência.
- Astro/HTML é o padrão; não adicionar React ou outro runtime sem caso de uso e
  decisão aceita.

## Definição de conclusão de tarefa

Uma tarefa só é concluída quando o comportamento, testes, build e documentação
afetada estão consistentes. Se a validação não puder ser executada, registre o
comando, o bloqueio e mantenha a tarefa aberta.
