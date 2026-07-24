# Product Requirements Document — Landing Page

Versão: 0.1.1  
Status: approved  
Data: 2026-07-15

## 1. Resumo

O MVP é um site público independente, estático por padrão, que apresenta o
FinnTrack Home, demonstra o produto real e encaminha visitantes ao cadastro ou
login no aplicativo. Não autentica usuários nem replica funcionalidades do app.

## 2. Objetivos do MVP

- Comunicar proposta de valor e público em poucos segundos.
- Demonstrar benefícios com screenshots reais e dados não pessoais.
- Gerar cadastros e oferecer login evidente.
- Estabelecer fundamentos de SEO, performance, acessibilidade e medição.
- Preservar a separação entre marketing público e aplicação autenticada.

## 3. Escopo

### Incluído

- Home `/` com cabeçalho, hero, problema, benefícios, funcionamento,
  demonstração, público, FAQ, CTA final e rodapé.
- `/entrar` como redirecionamento controlado para o login do app.
- `/privacidade` e `/termos` com conteúdo real e aprovado antes do lançamento.
- Página de erro para URLs inexistentes com resposta HTTP 404.
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
- tradução completa para outros idiomas;
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
| `/` | narrativa comercial e conversão | sim |
| `/entrar` | redirecionar ao login do app | não é página de aquisição |
| `/privacidade` | política real de privacidade | não (`noindex,follow`), conforme `DEC-015` |
| `/termos` | termos reais de uso | não (`noindex,follow`), conforme `DEC-015` |
| `/404` / desconhecida | orientar recuperação com status 404 | não |

## 6. Experiência da home

1. Cabeçalho: marca, âncoras “Recursos”, “Como funciona”, “Para quem”, login e
   CTA principal.
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
- Tratamento de UTMs e atribuição no app.
- Provedor de analytics e regra de consentimento.
- logotipo e screenshots finais aprovados.
- conteúdo jurídico aprovado e canal público de suporte.
- domínio, hospedagem, Search Console e política de previews.

Essas dependências são registradas em `10-DECISION-LOG.md` e classificadas como
bloqueadoras de lançamento quando aplicável.

## 9. Definição de sucesso da entrega

O MVP é aceito somente quando todos os requisitos `MUST` do SRS possuem evidência
de teste, todas as decisões bloqueadoras de lançamento estão resolvidas e os
gates de qualidade do plano de testes passam em artefato de produção.
