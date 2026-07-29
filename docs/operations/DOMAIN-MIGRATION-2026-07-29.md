# Migração do domínio canônico — 2026-07-29

Estado: em andamento

Responsável: responsável técnico/Plataforma

## Escopo

- Origem anterior: `https://finntrack-home-landing.vercel.app`
- Origem canônica nova: `https://finntrackhomepage.app`
- Variante secundária: `https://www.finntrackhomepage.app`
- App autenticado, sem alteração: `https://finntrackhome.app`

Esta migração executa a condição já aprovada em `DEC-004/010`. Ela não altera
copy, funcionalidades, coleta, destinos de cadastro/login ou escopo do MVP.

## Mudanças

- `PUBLIC_SITE_URL` de produção passa a usar a nova origem;
- canonical, Open Graph, `robots.txt` e `sitemap.xml` continuam derivados da
  configuração tipada;
- o host anterior e `www` recebem redirect permanente, preservando path e query;
- a propriedade nova deve ser verificada no Google Search Console e receber o
  sitemap canônico.

## Evidência exigida

| Verificação | Resultado |
|---|---|
| Home no novo domínio | pendente de novo deploy |
| Canonical e `og:url` | pendente de novo deploy |
| `robots.txt` e `sitemap.xml` | pendente de novo deploy |
| Redirect do host anterior | configurado na Vercel como `308` para o domínio canônico |
| Redirect de `www` | configurado como `308`; certificado SSL em geração |
| Search Console | pendente após publicação |

## Rollback

Se a publicação falhar, restaurar temporariamente `PUBLIC_SITE_URL` para a
origem anterior e promover o último deployment saudável. Não remover o domínio
novo nem alterar DNS durante um incidente antes de confirmar qual deployment
está atendendo cada host.
