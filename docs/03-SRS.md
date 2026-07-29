# Software Requirements Specification — Landing Page

Versão: 0.1.2
Status: approved — baseline autoritativo  
Data: 2026-07-29

## 1. Finalidade e prioridade

Este documento define o comportamento obrigatório do MVP. Os termos DEVE e NÃO
DEVE são normativos. Se outro documento divergir, este SRS prevalece após a
divergência ser registrada e corrigida.

Prioridades:

- **MUST**: necessário para lançar.
- **SHOULD**: necessário salvo justificativa aprovada.
- **COULD**: opcional; não deve atrasar o MVP.

## 2. Premissas confirmadas

- O site público e o app autenticado são superfícies separadas.
- O idioma inicial é `pt-BR`.
- O site não autentica, não armazena dados financeiros e não executa regras do app.
- A página deve ser estática por padrão e utilizável sem JavaScript para o
  conteúdo e os links essenciais.
- Astro, TypeScript estrito e Tailwind CSS formam a baseline técnica aprovada em
  `DEC-002`; a saída é estática e componentes React não fazem parte do MVP.

## 3. Requisitos funcionais

### 3.1 Rotas e navegação

| ID | Pri. | Requisito |
|---|---|---|
| FR-NAV-001 | MUST | A rota `/` DEVE responder com a landing principal e status HTTP 200. |
| FR-NAV-002 | MUST | O cabeçalho DEVE conter marca, âncoras para Recursos, Como funciona e Para quem, link Entrar e CTA de cadastro. |
| FR-NAV-003 | MUST | Cada âncora interna DEVE levar a um elemento identificável da mesma página e preservar foco/navegação previsível. |
| FR-NAV-004 | MUST | O menu móvel DEVE ser operável por teclado, informar estado expandido e poder ser fechado sem ponteiro. |
| FR-NAV-005 | COULD | O cabeçalho PODE ser fixo apenas se não ocultar foco, conteúdo-alvo nem área útil crítica. |
| FR-NAV-006 | MUST | Nenhuma informação ou ação essencial DEVE depender exclusivamente de hover. |

### 3.2 Conteúdo da home

| ID | Pri. | Requisito |
|---|---|---|
| FR-HOME-001 | MUST | A proposta de valor, texto de apoio e CTA principal DEVEM aparecer sem rolagem em 360×800 e 1440×900. |
| FR-HOME-002 | MUST | A página DEVE conter exatamente um `h1`: “Saiba quais imóveis realmente dão lucro.” |
| FR-HOME-003 | MUST | O hero DEVE usar a copy aprovada em `05-UX-CONTENT-SPEC.md` ou uma revisão formalmente aprovada. |
| FR-HOME-004 | MUST | A página DEVE apresentar as seções Problema, Benefícios, Como funciona, Demonstração, Para quem, FAQ e CTA final. |
| FR-HOME-005 | MUST | Benefícios DEVEM refletir funcionalidades existentes: resultado mensal, contas pagas/pendentes/vencidas e comparação entre imóveis. |
| FR-HOME-006 | MUST | Como funciona DEVE descrever: cadastrar imóvel, registrar receitas/despesas e acompanhar o resultado mensal. |
| FR-HOME-007 | MUST | A demonstração DEVE usar imagens reais ou capturas aprovadas do produto, sem dados pessoais e sem capacidades fictícias. |
| FR-HOME-008 | MUST | Toda imagem de conteúdo DEVE ter texto alternativo útil e dimensões/aspect ratio reservados. |
| FR-HOME-009 | MUST | A seção Para quem DEVE indicar o público prioritário e esclarecer que o produto não é uma solução operacional completa para grandes imobiliárias. |
| FR-HOME-010 | MUST | Respostas do FAQ DEVEM ser validadas contra o app no momento da publicação. |
| FR-HOME-011 | MUST | O rodapé DEVE conter marca, descrição breve, login, privacidade, termos, canal real de suporte e ano dinâmico. |
| FR-HOME-012 | MUST | Nenhuma alegação comercial DEVE ser publicada sem comprovação rastreável. |

### 3.3 Conversão e integração com o app

| ID | Pri. | Requisito |
|---|---|---|
| FR-CTA-001 | MUST | O CTA de cadastro DEVE estar presente no cabeçalho, hero e CTA final. |
| FR-CTA-002 | MUST | Todos os CTAs de cadastro DEVEM usar `PUBLIC_APP_SIGNUP_URL`, sem URL de produção codificada no componente. |
| FR-CTA-003 | MUST | O link Entrar e `/entrar` DEVEM usar `PUBLIC_APP_LOGIN_URL`. |
| FR-CTA-004 | MUST | O CTA secundário “Ver como funciona” DEVE levar à demonstração na própria página. |
| FR-CTA-005 | MUST | Links para o app DEVEM continuar funcionais sem JavaScript, mesmo que analytics ou enriquecimento de UTM falhem. |
| FR-CTA-006 | MUST | O encaminhamento ao app DEVE disparar o evento correspondente sem atrasar perceptivelmente a navegação. |
| FR-CTA-007 | MUST | O fluxo landing → cadastro DEVE ser validado em mobile e desktop contra um destino de app que abra o cadastro diretamente. |
| FR-CTA-008 | MUST | O fluxo landing → login DEVE ser validado em mobile e desktop. |
| FR-CTA-009 | MUST | Ausência ou invalidade de uma URL obrigatória DEVE falhar no build de produção. |

### 3.4 Campanhas e UTMs

| ID | Pri. | Requisito |
|---|---|---|
| FR-UTM-001 | MUST | A landing DEVE reconhecer apenas `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` e `utm_term`. |
| FR-UTM-002 | MUST | Parâmetros UTM reconhecidos DEVEM ser acrescentados aos destinos de login/cadastro sem remover parâmetros já existentes. |
| FR-UTM-003 | MUST | Valores DEVEM ser decodificados e recodificados por API de URL; concatenação manual de query strings é proibida. |
| FR-UTM-004 | MUST | Parâmetros desconhecidos, fragmentos e dados sensíveis NÃO DEVEM ser propagados automaticamente. |
| FR-UTM-005 | MUST | A falha de captura/persistência NÃO DEVE bloquear o CTA. |
| FR-UTM-006 | MUST | O MVP NÃO DEVE reter campanha em cookie, Web Storage ou outro mecanismo persistente no navegador; qualquer adoção futura exige prazo documentado e nova decisão de privacidade. |
| FR-UTM-007 | MUST | O contrato ponta a ponta aprovado para o MVP DEVE limitar UTMs à memória da página no app, sem persistência ou correlação com conta; métricas de retenção do produto DEVEM permanecer separadas. |

### 3.5 Páginas legais e erro

| ID | Pri. | Requisito |
|---|---|---|
| FR-LEG-001 | MUST | `/privacidade` DEVE conter conteúdo real, datado e aprovado para a operação em produção. |
| FR-LEG-002 | MUST | `/termos` DEVE conter conteúdo real, datado e aprovado para a operação em produção. |
| FR-LEG-003 | MUST | Políticas NÃO DEVEM usar texto placeholder no build de produção. |
| FR-ERR-001 | MUST | Toda URL inexistente DEVE responder com status HTTP 404 real. |
| FR-ERR-002 | MUST | A página 404 DEVE oferecer caminho para a home e não disparar `landing_view`. |

## 4. SEO e compartilhamento

| ID | Pri. | Requisito |
|---|---|---|
| SEO-001 | MUST | O documento DEVE usar `lang="pt-BR"`, UTF-8 e viewport responsivo. |
| SEO-002 | MUST | A home DEVE usar title, meta description e H1 definidos na especificação de conteúdo. |
| SEO-003 | MUST | Toda página indexável DEVE ter title, description e canonical absolutos e únicos. |
| SEO-004 | MUST | O conteúdo principal DEVE estar no HTML inicial, sem depender de JavaScript. |
| SEO-005 | MUST | Navegação rastreável DEVE usar links reais com `href`. |
| SEO-006 | MUST | O site DEVE fornecer `/robots.txt` e `/sitemap.xml` válidos. |
| SEO-007 | MUST | O sitemap NÃO DEVE incluir redirects, 404 ou páginas bloqueadas. |
| SEO-008 | MUST | Preview/staging NÃO DEVE ser indexável; produção DEVE ter política explícita de rastreamento. |
| SEO-009 | MUST | Open Graph, Twitter/X Card, favicon, apple touch icon e social card DEVEM estar configurados. |
| SEO-010 | MUST | Apenas JSON-LD fiel ao conteúdo visível e validado PODE ser publicado. |
| SEO-011 | MUST | `AggregateRating`, preço, avaliações e métricas de usuários NÃO DEVEM ser emitidos sem evidência visível. |
| SEO-012 | MUST | Variantes canônicas de host/protocolo DEVEM redirecionar de forma consistente para HTTPS e host oficial. |
| SEO-013 | MUST | `/privacidade` e `/termos` DEVEM usar `noindex,follow`, canonical próprio e permanecer fora do sitemap no MVP. |

Para o MVP atual, a lista aprovada de tipos JSON-LD é vazia conforme
`DEC-012`; nenhum schema deve ser emitido até nova decisão com campos e
evidência próprios.

## 5. Analytics

| ID | Pri. | Requisito |
|---|---|---|
| ANA-001 | MUST | A instrumentação DEVE expor os eventos definidos em `06-SEO-ANALYTICS-SPEC.md`. |
| ANA-002 | MUST | Eventos DEVEM usar nomes e propriedades do contrato; propriedades não catalogadas exigem revisão. |
| ANA-003 | MUST | E-mail, nome, endereço de imóvel, texto livre e outros dados pessoais NÃO DEVEM ser enviados. |
| ANA-004 | MUST | Analytics DEVE carregar sem bloquear renderização ou interação. |
| ANA-005 | MUST | Falha ou bloqueio do provedor NÃO DEVE quebrar a página nem os CTAs. |
| ANA-006 | MUST | Coleta condicionada a consentimento DEVE permanecer desativada até consentimento válido. |
| ANA-007 | MUST | Produção DEVE permitir verificar cada coleta habilitada em modo de debug, painel ou ferramenta equivalente; eventos não suportados pelo plano aprovado DEVEM permanecer `noop`. |
| ANA-008 | MUST | O Vercel Web Analytics aprovado em `DEC-018` NÃO DEVE usar cookie, storage, identificador persistente ou correlação com conta; a integração DEVE limitar-se à home, remover query e fragmento antes do envio, não ativar eventos personalizados no plano Hobby e manter somente dados agregados conforme a janela do provedor. |

## 6. Acessibilidade

Meta: WCAG 2.2 AA nos fluxos principais.

| ID | Pri. | Requisito |
|---|---|---|
| A11Y-001 | MUST | Toda funcionalidade DEVE ser operável por teclado. |
| A11Y-002 | MUST | Foco visível DEVE atender contraste e não ser ocultado por componentes fixos. |
| A11Y-003 | MUST | A ordem de foco DEVE acompanhar a ordem lógica do conteúdo. |
| A11Y-004 | MUST | A página DEVE usar landmarks e hierarquia de títulos coerentes. |
| A11Y-005 | MUST | Controles e links DEVEM ter nome acessível que descreva sua finalidade. |
| A11Y-006 | MUST | Contraste de texto e componentes DEVE atender WCAG AA. |
| A11Y-007 | MUST | Significado NÃO DEVE depender apenas de cor, posição, forma ou movimento. |
| A11Y-008 | MUST | Conteúdo DEVE suportar zoom de 200% e reflow a 320 CSS px sem perda ou rolagem horizontal bidimensional. |
| A11Y-009 | MUST | Animações não essenciais DEVEM respeitar `prefers-reduced-motion`. |
| A11Y-010 | MUST | Alvos de toque e espaçamento DEVEM ser adequados ao uso móvel conforme WCAG 2.2 AA. |
| A11Y-011 | MUST | Testes automatizados sem violações críticas DEVEM ser complementados por verificação manual de teclado e leitor de tela. |

## 7. Responsividade e compatibilidade

| ID | Pri. | Requisito |
|---|---|---|
| RWD-001 | MUST | A implementação DEVE ser mobile-first. |
| RWD-002 | MUST | Layout e conteúdo DEVEM ser verificados em 320, 360, 390, 768, 1024 e 1440 px. |
| RWD-003 | MUST | Não DEVE existir overflow horizontal de página nos tamanhos suportados. |
| RWD-004 | MUST | A evidência visual do produto DEVE permanecer compreensível ou oferecer alternativa acessível em telas pequenas. |
| RWD-005 | MUST | O fluxo crítico DEVE funcionar nas duas versões estáveis mais recentes de Chrome, Edge e Firefox e nas versões atual e anterior do Safari disponíveis na data do teste; limitações da automação DEVEM ser cobertas por smoke manual documentado. |

## 8. Performance

Medição de campo no percentil 75, segmentada em mobile e desktop:

| ID | Pri. | Requisito |
|---|---|---|
| PERF-001 | SHOULD | LCP de campo DEVE ser menor ou igual a 2,5 s quando houver amostra suficiente. |
| PERF-002 | SHOULD | INP de campo DEVE ser menor ou igual a 200 ms quando houver amostra suficiente. |
| PERF-003 | SHOULD | CLS de campo DEVE ser menor ou igual a 0,1 quando houver amostra suficiente. |
| PERF-004 | MUST | JavaScript no cliente DEVE ser limitado às interações que o exigem. |
| PERF-005 | MUST | Imagens DEVEM ser dimensionadas, responsivas, comprimidas e servidas em formatos adequados. |
| PERF-006 | MUST | Fontes e analytics NÃO DEVEM bloquear a renderização. |
| PERF-007 | MUST | Um orçamento sintético de Lighthouse DEVE ser aprovado após o primeiro build real e atendido como gate pré-lançamento, sem substituir os objetivos de campo. |

## 9. Segurança e privacidade

| ID | Pri. | Requisito |
|---|---|---|
| SEC-001 | MUST | Nenhum segredo DEVE ser incluído em variável `PUBLIC_*`, código cliente ou artefato estático. |
| SEC-002 | MUST | Somente URLs HTTPS aprovadas DEVEM ser aceitas em produção para site e app. |
| SEC-003 | MUST | Destinos de redirecionamento NÃO DEVEM ser controláveis por query parameter do visitante. |
| SEC-004 | MUST | Conteúdo externo ou Markdown DEVE ser tratado de modo a impedir injeção de HTML/script não confiável. |
| SEC-005 | MUST | Dependências DEVEM ser travadas por lockfile e verificadas no pipeline. |
| SEC-006 | MUST | Cabeçalhos de segurança aplicáveis a site estático DEVEM ser configurados na hospedagem e testados. |
| PRIV-001 | MUST | O site DEVE coletar somente dados necessários e documentados. |
| PRIV-002 | MUST | Cookies, storage, pixels e terceiros DEVEM constar na política e no inventário técnico. |
| PRIV-003 | MUST | Screenshots NÃO DEVEM conter dados reais de usuários. |
| PRIV-004 | MUST | Um canal real para solicitações de dados DEVE estar publicado. |

## 10. Configuração e operação

| ID | Pri. | Requisito |
|---|---|---|
| OPS-001 | MUST | URLs de site, login e cadastro DEVEM vir de configuração validada e tipada. |
| OPS-002 | MUST | Produção e preview DEVEM ter configurações explícitas e independentes. |
| OPS-003 | MUST | O pipeline DEVE executar lint, typecheck, testes e build. |
| OPS-004 | MUST | O build DEVE ser reproduzível a partir do repositório e lockfile. |
| OPS-005 | MUST | O deploy DEVE oferecer preview antes de produção. |
| OPS-006 | MUST | O lançamento DEVE incluir smoke test pós-deploy e procedimento de rollback da hospedagem. |
| OPS-007 | MUST | Search Console e submissão do sitemap DEVEM ser concluídos após a publicação. |

## 11. Critério global de aceite

O MVP está pronto quando:

1. todos os requisitos MUST estão aprovados e cobertos por evidência;
2. todos os testes P0/P1 do plano passam no artefato de produção;
3. todas as decisões marcadas como bloqueadoras de lançamento estão resolvidas;
4. privacidade, termos, suporte, ativos e screenshots foram aprovados;
5. não há alegações não comprovadas nem violações críticas de acessibilidade,
   segurança, SEO ou fluxo de conversão.
