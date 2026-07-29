# Migração do domínio canônico — 2026-07-29

Estado: concluída

Responsável: responsável técnico/Plataforma

## Escopo

- Origem anterior: `https://finntrack-home-landing.vercel.app`
- Origem canônica nova: `https://finntrackhomepage.app`
- Variante secundária: `https://www.finntrackhomepage.app`
- App autenticado, sem alteração: `https://finntrackhome.app`

Esta migração executa a condição já aprovada em `DEC-004/010`. Ela não altera
copy, funcionalidades, coleta, destinos de cadastro/login ou escopo do MVP.

## Mudanças

- `PUBLIC_SITE_URL` de produção passou a usar a nova origem;
- canonical, Open Graph, `robots.txt` e `sitemap.xml` continuam derivados da
  configuração tipada;
- o host anterior e `www` receberam redirect permanente, preservando path e
  query;
- a propriedade nova foi verificada no Google Search Console e recebeu o
  sitemap canônico;
- as duas tags de verificação foram mantidas temporariamente para preservar a
  propriedade anterior durante a migração.

## Publicação

- PR [#12](https://github.com/arjdev69/landing_page_finntrackHome/pull/12),
  merge `fb454a3`: configuração, redirects, testes e documentação inicial;
- PR [#13](https://github.com/arjdev69/landing_page_finntrackHome/pull/13),
  merge `f9d701b`: verificação da propriedade do domínio customizado;
- deployment de produção final: Vercel `5662052222`,
  `https://finntrack-home-landing-pmxh73t3m-arjs-projects-dbfc9b0f.vercel.app`;
- pipeline da `main` `30475375794`: concluído com sucesso.

## Evidência exigida

| Verificação | Resultado |
|---|---|
| Home no novo domínio | `200`, HTML publicado em `https://finntrackhomepage.app/` |
| Canonical e `og:url` | ambos iguais a `https://finntrackhomepage.app/` |
| `robots.txt` e `sitemap.xml` | `200`; sitemap com `application/xml` e somente a home canônica; acesso também confirmado como Googlebot |
| Redirect do host anterior | `308` para o domínio canônico, preservando path e query |
| Redirect de `www` | HTTPS válido e `308` para o domínio canônico, preservando path e query |
| Search Console | propriedade `https://finntrackhomepage.app/` verificada por tag HTML; `/sitemap.xml` submetido em 2026-07-29 |

## Estado do Google

O Search Console confirmou “Sitemap enviado”, mas o primeiro estado da tabela
foi “Não foi possível buscar o sitemap”, tipo desconhecido e zero páginas. Esse
estado inicial não invalida o smoke HTTP — o arquivo respondeu `200` para agente
comum e Googlebot —, porém também não comprova processamento ou indexação. A
leitura deve ser monitorada até o Google atualizar o relatório.

## Rollback

Se a publicação falhar, restaurar temporariamente `PUBLIC_SITE_URL` para a
origem anterior e promover o último deployment saudável. Não remover o domínio
novo nem alterar DNS durante um incidente antes de confirmar qual deployment
está atendendo cada host.
