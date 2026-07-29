# Controle de validação e aprovação — LEG-001

Versão do controle: 1.2
Data de liberação: 2026-07-29
Status: aprovado para publicação

## Documentos sob controle

| Documento | Versão | Estado | Rota pública |
|---|---:|---|---|
| `PRIVACIDADE.md` | 1.2 | aprovado | `/privacidade` |
| `TERMOS.md` | 1.0 | aprovado | `/termos` |
| `PRIVACIDADE-RASCUNHO.md` | 0.1 | histórico, não publicável | — |
| `TERMOS-RASCUNHO.md` | 0.1 | histórico, não publicável | — |

## Matriz factual bloqueadora

| Item | Responsável pela confirmação | Estado |
|---|---|---|
| operador/controlador do MVP | Produto/representante | Bruno Araujo, pessoa física |
| contato público | Produto/Operações | `jobslens.ia@gmail.com` |
| escopo | Produto | landing, app e atendimento |
| domínios | Produto/Plataforma | landing Vercel e app `finntrackhome.app` |
| categorias e finalidades | Produto/Técnica | conta, carteira financeira, suporte e segurança |
| fornecedores | Produto/Técnica | Vercel, Supabase e Google/Gmail |
| transferência internacional | Produto/Privacidade | possível conforme infraestrutura dos fornecedores |
| retenção e exclusão | Produto/Privacidade | app/suporte conforme necessidade; relatório do Web Analytics por um mês e identificação temporária descartada após 24 horas |
| cookies e analytics | Técnica/Privacidade | Vercel Web Analytics somente na home; sem cookie, storage, custom event ou identificador persistente |
| crianças e adolescentes | Produto | serviço não direcionado especificamente a crianças; canal para responsáveis |
| preço | Produto | gratuito na validação, sem cobrança automática |
| propriedade e licenças | Produto | uso não transfere direitos; terceiros preservam licenças |
| SLA e disponibilidade | Produto | nenhum SLA; produto em validação |
| canal de suporte e dados `jobslens.ia@gmail.com` | Produto/Operações | confirmado em `DEC-011` |

## Etapas e aprovações

| Etapa | Aprovador identificado | Data | Estado |
|---|---|---|---|
| redação inicial assistida | responsável técnico, com apoio de agente de IA não aprovador | 2026-07-21 | concluída |
| validação factual do MVP simplificado | Bruno Araujo, responsável pelo projeto | 2026-07-27 | concluída |
| aprovação jurídica comunicada pelo projeto | Bruno Araujo, responsável pelo projeto | 2026-07-24 | confirmada em `AD-004` |
| aceite final para publicação | Bruno Araujo, operador e responsável pelo projeto | 2026-07-27 | concluído |
| aprovação da Política 1.1 e da regra de analytics | Bruno Araujo, operador e responsável pelo projeto | 2026-07-27 | confirmada em `D0-005` |
| aprovação da Política 1.2 e do Vercel Web Analytics | Bruno Araujo, operador e responsável pelo projeto | 2026-07-29 | confirmada em `DEC-018`/`ANA-003` |

## Regra de liberação

Os Termos 1.0 e a Política 1.2 foram limitados aos fatos confirmados do MVP
gratuito operado por pessoa física. A Política 1.2 autoriza somente os pageviews
agregados do Vercel Web Analytics delimitados em `DEC-018`; custom events
permanecem `noop`. Cobrança, publicidade, novos fornecedores, identificadores ou
novas categorias de dados exigem revisão antes do deploy correspondente. As
minutas 0.1 permanecem somente como histórico e não são fonte do conteúdo
público.

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

## Resultado da liberação

Em 2026-07-29, as verificações da Política 1.2 e dos Termos publicáveis foram
aprovadas. O build estático gera `/privacidade` e `/termos`; os testes
automatizados confirmam conteúdo, SEO, exclusão do sitemap e ausência de
analytics nas rotas legais. O Vercel Web Analytics aprovado em `DEC-018` foi
integrado à home de produção em `ANA-003`.
