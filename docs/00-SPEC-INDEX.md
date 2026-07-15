# Índice da especificação

Versão: 0.1.1  
Status: approved  
Data: 2026-07-15

## Objetivo

Este índice organiza a documentação orientada a especificações da landing page
do FinnTrack Home e define autoridade, leitura e controle de mudanças.

## Documentos normativos

| Ordem | Documento | Responsabilidade |
|---:|---|---|
| 1 | [01-PRODUCT-VISION.md](01-PRODUCT-VISION.md) | problema, público, posicionamento e resultados |
| 2 | [02-PRD.md](02-PRD.md) | escopo do produto e experiência do MVP |
| 3 | [03-SRS.md](03-SRS.md) | requisitos funcionais e não funcionais autoritativos |
| 4 | [04-SDD.md](04-SDD.md) | desenho técnico e contratos de implementação |
| 5 | [05-UX-CONTENT-SPEC.md](05-UX-CONTENT-SPEC.md) | arquitetura de informação, copy e direção visual |
| 6 | [06-SEO-ANALYTICS-SPEC.md](06-SEO-ANALYTICS-SPEC.md) | descoberta, medição, eventos e atribuição |
| 7 | [07-SECURITY-PRIVACY.md](07-SECURITY-PRIVACY.md) | segurança, privacidade, consentimento e dados |
| 8 | [08-TEST-PLAN.md](08-TEST-PLAN.md) | estratégia e critérios de verificação |
| 9 | [09-BACKLOG.md](09-BACKLOG.md) | sequência executável de tarefas |
| 10 | [10-DECISION-LOG.md](10-DECISION-LOG.md) | decisões aceitas e questões pendentes |
| 11 | [11-TRACEABILITY.md](11-TRACEABILITY.md) | ligação entre requisitos, testes e tarefas |

## Documentos informativos

- [12-HANDOVER-VALIDATION.md](12-HANDOVER-VALIDATION.md): resultado da validação
  em duas passagens e lacunas encontradas.
- [13-SOURCE-HANDOVER.md](13-SOURCE-HANDOVER.md): cópia preservada do handover
  recebido, versão 1.0 de 2026-07-10.

## Regra de conflito

1. O SRS prevalece sobre qualquer outro documento para comportamento e escopo.
2. O registro de decisões prevalece para uma decisão explicitamente aceita,
   desde que a alteração também seja refletida no SRS.
3. O SDD não pode criar funcionalidade ausente no SRS.
4. Copy e layout não podem afirmar capacidades ausentes no produto autenticado.
5. O handover original é contexto histórico; divergências encontradas durante a
   validação estão registradas em `12-HANDOVER-VALIDATION.md`.

## Vocabulário normativo

- **DEVE**: requisito obrigatório para o MVP.
- **NÃO DEVE**: proibição obrigatória.
- **PODE**: opção permitida, não obrigatória.
- **PENDENTE**: depende de decisão ou contrato externo e não pode ser presumido.
- **Bloqueador de lançamento**: permite trabalho preparatório, mas impede produção.

## Controle de mudanças

Toda mudança de comportamento deve:

1. receber ou alterar um identificador no SRS;
2. atualizar critérios e cobertura no plano de testes;
3. atualizar a matriz de rastreabilidade;
4. atualizar o backlog quando esforço ou dependência mudar;
5. gerar uma decisão em `10-DECISION-LOG.md` quando envolver arquitetura,
   plataforma, privacidade, contratos externos ou escopo.

Não renumerar requisitos existentes. Requisitos removidos permanecem registrados
como `Retirado`, com justificativa.
