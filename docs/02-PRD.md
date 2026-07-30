# Product Requirements Document — Landing Page

Versão: 0.2.0
Status: approved  
Data: 2026-07-30

## 1. Resumo

O MVP é um site público independente, estático por padrão, que apresenta o
FinnTrack Home, demonstra o produto real e encaminha visitantes ao cadastro ou
login no aplicativo. A superfície pública suporta `pt-BR` na raiz e `en-US` sob
`/en/`, sem autenticar usuários nem replicar funcionalidades do app.

## 2. Objetivos do MVP

- Comunicar proposta de valor e público em poucos segundos.
- Demonstrar benefícios com screenshots reais e dados não pessoais.
- Gerar cadastros e oferecer login evidente.
- Estabelecer fundamentos de SEO, performance, acessibilidade e medição.
- Preservar a separação entre marketing público e aplicação autenticada.
- Oferecer a mesma proposta e os mesmos limites funcionais em `pt-BR` e
  `en-US`, sem entrada comercial ativa nos Estados Unidos nesta entrega.

## 3. Escopo

### Incluído

- Homes `/` (`pt-BR`) e `/en/` (`en-US`) com cabeçalho, hero, problema,
  benefícios, funcionamento, demonstração, público, FAQ, CTA final e rodapé.
- Seletor explícito por links `PT-BR`/`EN-US`, com nomes acessíveis completos,
  sem redirect automático ou persistência de locale.
- `/entrar` e `/en/login` como páginas controladas de encaminhamento ao login
  do app.
- `/privacidade`, `/termos`, `/en/privacy` e `/en/terms` com conteúdo real e
  aprovado antes do lançamento correspondente.
- Página de erro localizada para URLs inexistentes, sempre com resposta HTTP
  404 real.
- URLs externas configuráveis para site, login e cadastro.
- Preservação da allowlist de UTMs no encaminhamento ao app.
- Eventos mínimos de analytics por meio de adaptador substituível.
- SEO técnico, social card, favicon, sitemap e robots.
- Responsividade de 320 px a 1440 px ou mais.
- Testes unitários dos contratos críticos e testes E2E de conversão.
- Pipeline de lint, typecheck, testes e build.

### Excluído

- autenticação ou formulário de cadastro no site público;
- blog completo, CMS, páginas programáticas ou produção massiva de conteúdo;
- checkout, cobrança, chat, afiliados e área administrativa;
- suporte a outros idiomas além de `pt-BR` e `en-US`;
- calculadora de rentabilidade;
- implementação da ativação e retenção dentro do app;
- mudanças no app autenticado neste repositório.

## 4. Fluxos principais

### Novo visitante

`Origem → Landing → CTA de cadastro → App em modo de cadastro → Onboarding`

O trecho “app em modo de cadastro” depende de contrato ainda não implementado no
app atual. Até sua confirmação, a URL é configurável e o lançamento permanece
bloqueado, sem impedir a construção da landing.

### Usuário existente

`Landing → Entrar → Login do app → Dashboard após autenticação`

### Navegação informativa

`Landing → Privacidade/Termos → Retorno à landing ou encaminhamento ao app`

## 5. Arquitetura de informação do MVP

| Rota | Finalidade | Indexação |
|---|---|---|
| `/` | narrativa comercial e conversão em `pt-BR`; `x-default` | sim |
| `/en/` | narrativa comercial e conversão em `en-US` | sim |
| `/entrar` / `/en/login` | encaminhar ao login do app no locale da origem | não |
| `/privacidade` | política real de privacidade | não (`noindex,follow`), conforme `DEC-015` |
| `/termos` | termos reais de uso | não (`noindex,follow`), conforme `DEC-015` |
| `/en/privacy` | política em inglês factual e juridicamente aprovada | não (`noindex,follow`) |
| `/en/terms` | termos em inglês factuais e juridicamente aprovados | não (`noindex,follow`) |
| `/404` / desconhecida | orientar recuperação em `pt-BR` ou `en-US`, conforme o prefixo, com status 404 | não |

## 6. Experiência da home

1. Cabeçalho: marca, âncoras localizadas, seletor de idioma, login e CTA
   principal; no mobile, o seletor fica no primeiro nível do menu.
2. Hero: posicionamento, promessa, apoio, CTA principal/secundário e screenshot
   real legível.
3. Problema: situações reconhecíveis do controle fragmentado.
4. Benefícios: resultado mensal, contas sob controle e comparação da carteira.
5. Como funciona: cadastrar imóveis, registrar movimentações, acompanhar mês.
6. Demonstração: dashboard, receitas versus despesas, imóveis e contas.
7. Para quem é: público e limite explícito para grandes operações.
8. FAQ: respostas verificadas contra o comportamento real do produto.
9. CTA final e rodapé legal/suporte.

## 7. Restrições de comunicação

Não publicar métricas de uso, depoimentos, avaliações, preço, economia média ou
resultados sem evidência e autorização. Não afirmar que o produto garante
rentabilidade, evita inadimplência, processa pagamentos ou executa cobranças.

O CTA aprovado é “Criar conta”. Conforme `DEC-005`, alegações de gratuidade,
preço ou beta são proibidas até nova decisão comercial explícita e rastreável.

## 8. Dependências externas

- URL e domínio de produção do app.
- Contrato de abertura direta do cadastro.
- Captura allowlisted de UTMs somente em memória no app, sem correlação com
  contas; retenção do produto é medida separadamente.
- Implementação do Vercel Web Analytics aprovado em `DEC-018`, limitada a
  pageviews agregados no plano Hobby e condicionada aos gates de `ANA-003/004`.
- logotipo e screenshots finais aprovados.
- conteúdo jurídico aprovado e canal público de suporte.
- copy, FAQ, conteúdo jurídico e screenshot `en-US` aprovados;
- cadastro, login e onboarding do app em inglês ou exceção explícita com aviso;
- 404 inglesa com status real e analytics sanitizado nas duas homes;
- domínio, hospedagem, Search Console e política de previews.

Essas dependências são registradas em `10-DECISION-LOG.md` e classificadas como
bloqueadoras de lançamento quando aplicável.

## 9. Definição de sucesso da entrega

O MVP bilíngue é aceito somente quando todos os requisitos `MUST` do SRS e do
anexo `15-I18N-EN-US-REQUIREMENTS.md` possuem evidência de teste, todas as
decisões e dependências bloqueadoras estão resolvidas e os gates de qualidade
passam para os dois locales no artefato de produção.
