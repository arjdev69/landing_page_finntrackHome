# Controle de validação e aprovação — LEG-001

Versão do controle: 0.1  
Data: 2026-07-21  
Status: bloqueado para publicação

## Documentos sob controle

| Documento | Versão | Estado | Rota pública |
|---|---:|---|---|
| `PRIVACIDADE-RASCUNHO.md` | 0.1 | minuta não aprovada | não criada |
| `TERMOS-RASCUNHO.md` | 0.1 | minuta não aprovada | não criada |

## Matriz factual bloqueadora

| Item | Responsável pela confirmação | Estado |
|---|---|---|
| identidade, documento, endereço e representantes do controlador de dados | Produto/representante legal | pendente |
| identidade, documento, endereço e representantes do fornecedor contratual | Produto/representante legal | pendente |
| relação entre controlador, fornecedor e operadores | Privacidade/Jurídico | pendente |
| escopo: Política cobre landing, app e atendimento? Termos cobrem landing e app? | Produto/Jurídico | pendente |
| domínios e ambientes oficiais | Produto/Plataforma | pendente |
| categorias de dados e campos efetivamente usados | Produto/Técnica/Privacidade | pendente |
| finalidades e bases legais por tratamento | Controlador/Jurídico | pendente |
| fornecedores, operadores e autenticação social ativos | Produto/Técnica/Privacidade | pendente |
| Google/Gmail no atendimento: papel, acesso, retenção e localização | Produto/Privacidade/Jurídico | pendente |
| evidência do app por repositório, commit, arquivos e testes homologados | Produto/Técnica | código local observado; produção pendente |
| transferência internacional e localização de dados | Privacidade/Jurídico | pendente |
| retenção, backups, exclusão e obrigações de conservação | Produto/Técnica/Jurídico | pendente |
| cookies, storage, scripts e analytics de produção | Técnica/Privacidade | pendente; landing atual em noop |
| política para crianças e adolescentes | Produto/Jurídico | pendente |
| preço, cobrança, cancelamento e reembolso | Produto/Jurídico | pendente |
| propriedade intelectual e licenças | Representante legal/Jurídico | pendente |
| SLA, suspensão, encerramento e responsabilidade | Produto/Jurídico | pendente |
| canal de suporte e dados `jobslens.ia@gmail.com` | Produto/Operações | confirmado em `DEC-011` |

## Etapas e aprovações

| Etapa | Aprovador identificado | Data | Estado |
|---|---|---|---|
| redação inicial assistida | responsável técnico, com apoio editorial e pesquisa de agente de IA não aprovador | 2026-07-21 | concluída |
| revisão consultiva da minuta | agente de IA não aprovador | 2026-07-21 | concluída; não substitui advogado |
| validação factual | não identificado | — | pendente |
| revisão jurídica brasileira | não identificado | — | pendente |
| aceite final para publicação | não identificado | — | pendente |

## Regra de liberação

As rotas `/privacidade` e `/termos` somente podem ser criadas quando todos os
itens aplicáveis estiverem confirmados, os documentos tiverem versão e vigência,
e os três aprovadores humanos exigidos em `DEC-008` estiverem identificados. Até
lá, o build deve continuar sem essas minutas.

## Verificações obrigatórias antes da liberação

- `T-LEGAL-001`: conteúdo final datado/aprovado e detector no HTML sem
  “RASCUNHO”, “pendente”, colchetes de preenchimento ou dados fictícios.
- `T-PRIV-001`: inventário de dados, cookies, storage, scripts, terceiros e
  configuração de produção reconciliado com a política.
- `/privacidade` e `/termos`: HTTP 200, conteúdo acessível, title/description,
  canonical próprio, `noindex,follow`, fora do sitemap e sem `landing_view`.
- Canal `mailto:` correto e retorno para a home em ambas as páginas.
- Versão, vigência, nome, função e data dos três aceites humanos registrados.
- Formatação, lint, tipagem, testes, build e smoke das rotas aprovados.
