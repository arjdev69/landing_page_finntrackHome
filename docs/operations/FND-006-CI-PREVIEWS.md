# CI e previews — FND-006

Versão: 1.0
Data: 2026-07-27

## Contrato do pipeline

O workflow `.github/workflows/ci.yml` executa em pull requests, em atualizações
da `main` e por disparo manual. A instalação usa `npm ci` e o lockfile; os gates
são formatação, lint, typecheck, testes nativos, build em ambiente `preview`,
E2E/acessibilidade e orçamento Lighthouse.

O gate de segurança valida o mapeamento da política para a Vercel, executa a CSP
em Chromium e audita as dependências antes dos demais E2E. O artefato estático
do build é preservado por sete dias com o SHA do commit.
Relatórios do Playwright e Lighthouse são preservados quando um gate de
navegador falha. O workflow possui somente permissão de leitura do conteúdo e
não recebe segredos de deploy.

## Preview remoto

O repositório está conectado à Vercel conforme `DEC-010`. Pull requests e
branches diferentes da branch de produção devem gerar um Preview Deployment
antes da integração na `main`. A Vercel é responsável pelo endereço efêmero e
pela indicação do resultado no pull request; o GitHub Actions valida o mesmo
commit de forma independente.

No PR #1, o Preview Deployment foi concluído e protegido pela autenticação da
Vercel. Uma requisição sem sessão recebeu a página de login com
`X-Matched-Path: /login`, impedindo acesso anônimo ao artefato. Quando a proteção
estiver ativa, ela substitui o smoke público do HTML; a validação de `noindex`,
robots e sitemap permanece coberta pelo build de preview no pipeline.

Variáveis `PUBLIC_*` usadas no build são publicáveis. A configuração de Preview
na Vercel deve usar `PUBLIC_ENVIRONMENT=preview`; essa condição mantém
`robots.txt` bloqueado e adiciona `noindex` ao HTML. Nenhum token da Vercel deve
ser adicionado ao workflow enquanto a integração Git continuar responsável pelo
deploy.

## Verificação de um pull request

1. Confirmar que o check `Quality and preview build` terminou com sucesso.
2. Abrir o Preview Deployment informado pela Vercel, nunca a produção.
3. Se o preview estiver protegido, confirmar a exigência de autenticação. Se
   estiver público, conferir `/`, `/privacidade`, `/termos`, `/robots.txt` e
   `/sitemap.xml`.
4. No preview público, confirmar `noindex` e ausência das páginas legais no
   sitemap.
5. Integrar na `main` somente depois dos gates e do preview aprovados.

## Falha e recuperação

- Falha no GitHub Actions: corrigir o primeiro gate vermelho e publicar novo
  commit; não ignorar o check.
- Falha apenas na Vercel: consultar o log do Preview Deployment e conferir as
  variáveis do ambiente Preview.
- Preview indexável: interromper a integração, corrigir
  `PUBLIC_ENVIRONMENT=preview` e gerar um novo preview.
- Produção não é promovida por este workflow. Rollback e smoke de produção
  permanecem em `REL-002`, conforme `OPS-006`.
