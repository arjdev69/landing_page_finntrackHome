# ANA-004 — Auditoria de Analytics em produção

Data: 2026-07-29
Status: concluída — painel, rede, minimização e resiliência aprovados

## Resultado

O Vercel Web Analytics foi validado no host canônico por painel autenticado e
por uma sessão Chromium limpa. A home enviou um único pageview por carregamento,
sempre para o endpoint same-origin da Vercel, com `dp: "/"`, origem canônica sem
parâmetros e referrer vazio. Query, fragmento, UTM e e-mail sintético usados no
teste não apareceram no payload.

Não houve cookie, `Set-Cookie`, `localStorage` ou `sessionStorage`. As rotas
`/privacidade`, `/termos`, `/entrar` e uma URL 404 não carregaram o loader nem
enviaram pageview. Com o loader bloqueado como por um bloqueador de conteúdo, a
home continuou HTTP 200, o CTA permaneceu visível e funcional e a FAQ continuou
interativa.

## Evidência executada

- painel Vercel, ambiente `Production`, período de 22 a 29 de julho de 2026:
  9 visitantes e 10 pageviews;
- painel com uma única página agregada, `/`, sem dados de referrer ou UTM;
- painel de eventos com `No custom events`, coerente com o plano Hobby;
- `ANALYTICS_PRODUCTION_URL=https://finntrackhomepage.app npm run
  test:analytics:production`: aprovado;
- dois carregamentos controlados da home: dois `POST /view`, ambos HTTP 200 e
  exatamente um por carregamento;
- payload permitido: `dp`, `o`, `r`, `sdkn`, `sdkv`, `sv` e `ts`;
- zero cookies e zero chaves em `localStorage`/`sessionStorage`;
- rotas excluídas: `/privacidade` 200, `/termos` 200, `/entrar` 200 e URL
  inexistente 404, todas com zero loader e zero pageview;
- loader bloqueado: home 200, zero pageview, CTA visível e FAQ interativa.

## Como repetir

No PowerShell:

```powershell
$env:ANALYTICS_PRODUCTION_URL = "https://finntrackhomepage.app"
$env:ANALYTICS_ALLOW_SYNTHETIC_PAGEVIEWS = "1"
npm run test:analytics:production
```

O comando exige uma origem HTTPS sem caminho, query ou fragmento. Ele usa
somente marcadores sintéticos e não grava payloads ou dados do painel em
artefatos versionados. A confirmação adicional é obrigatória porque cada
execução aprovada envia dois pageviews reais ao painel.

## Limites mantidos

Esta auditoria comprova pageviews agregados da landing, não conversão,
ativação ou retenção do produto. Essas métricas continuam pertencendo ao app e
não são correlacionadas com UTMs ou contas no MVP. Os totais do painel são uma
fotografia do período e naturalmente mudarão com novos acessos.

O painel mostrava 10 pageviews antes da automação deste ciclo. As três
tentativas do validador somaram 5 pageviews sintéticos (1 na primeira tentativa
interrompida e 2 em cada execução aprovada). `REL-004` deve anotar esse tráfego
de QA ao registrar a linha de base; o plano Hobby não oferece uma dimensão para
excluí-lo retroativamente.
