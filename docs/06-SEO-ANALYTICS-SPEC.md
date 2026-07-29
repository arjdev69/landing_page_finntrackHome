# Especificação de SEO, analytics e aquisição

Versão: 0.1.3
Status: approved — aquisição simplificada e política first-party definidas
Data: 2026-07-29

## 1. Objetivo

Permitir descoberta orgânica e medir o caminho até o app sem coletar dados
pessoais desnecessários. A landing mede intenção e saída; ativação pertence ao
app e depende de um contrato entre repositórios.

## 2. SEO da fase 1

### Páginas

- Home: indexável, intenção “controle financeiro de imóveis”.
- Privacidade e termos: conteúdo real, canonical próprio, `noindex,follow` e fora
  do sitemap no MVP, conforme `DEC-015`.
- `/entrar`: redirect, não entra no sitemap.
- 404: `noindex`, fora do sitemap.

### Regras técnicas

- canonical absoluto baseado em `PUBLIC_SITE_URL`;
- title/description únicos;
- HTML semântico e conteúdo inicial renderizado;
- um H1 por página;
- links internos e externos com `href` rastreável;
- sitemap somente com URLs canônicas 200/indexáveis;
- robots por ambiente;
- Open Graph e Twitter/X card com social card aprovado;
- redirecionamento único para HTTPS e host canônico.

### Hipóteses de palavras-chave

- controle financeiro de imóveis;
- aplicativo para controle de imóveis alugados;
- controle de receitas e despesas de aluguel;
- sistema para proprietário de imóveis;
- como saber se um imóvel dá lucro.

São hipóteses, não volumes comprovados. Pesquisa e dados de Search Console devem
preceder novas páginas. Não criar páginas artificiais apenas para repetir termos.

### Dados estruturados

Tipos candidatos: `Organization`, `WebSite` e `SoftwareApplication`. Cada campo
deve corresponder a conteúdo visível e aprovado. `FAQPage` é opcional e só pode
ser adicionado após conferir elegibilidade e benefício no momento da publicação.

## 3. Eventos

| Evento | Disparo | Propriedades permitidas |
|---|---|---|
| `landing_view` | uma vez por carregamento válido da home | `page_path`, `referrer_group`, UTMs, `device_group` |
| `signup_cta_click` | clique em CTA de cadastro | `cta_location`, `page_path`, UTMs, `device_group` |
| `login_click` | clique/link/redirect para login | `cta_location`, `page_path`, UTMs, `device_group` |
| `secondary_cta_click` | clique em “Ver como funciona” | `cta_location`, `page_path`, `device_group` |
| `product_preview_view` | seção de demonstração cruza o limiar definido | `page_path`, `device_group` |
| `faq_open` | item muda de fechado para aberto | `faq_id`, `page_path` |
| `outbound_to_app` | imediatamente antes de navegar ao app | `destination_type`, `cta_location`, `page_path`, UTMs |

### Enumerações

```text
cta_location: header | hero | middle | footer
destination_type: signup | login
device_group: mobile | tablet | desktop
referrer_group: direct | organic | social | referral | paid | unknown
```

`faq_id` usa identificador estável, nunca a pergunta completa.

Classificação de `device_group`, calculada a partir da largura do viewport no
momento do evento:

```text
mobile: 0–767 CSS px
tablet: 768–1023 CSS px
desktop: 1024 CSS px ou mais
```

Classificação de `referrer_group`, nesta ordem de precedência:

1. `paid`: `utm_medium`, normalizado para minúsculas, pertence a
   `cpc | ppc | paid | paid_social | display`;
2. `social`: `utm_source` ou host do referrer pertence à allowlist versionada de
   redes sociais e a visita não foi classificada como `paid`;
3. `organic`: host do referrer pertence à allowlist versionada de mecanismos de
   busca e a visita não foi classificada como `paid`;
4. `referral`: existe referrer externo válido que não pertence às categorias
   anteriores;
5. `direct`: não existe referrer nem UTM de origem/mídia;
6. `unknown`: os sinais existem, mas são insuficientes ou inválidos para as
   categorias anteriores.

As allowlists de redes sociais e mecanismos de busca ficam em módulo tipado,
possuem testes unitários e só mudam junto com este contrato ou decisão
registrada. A classificação não pode enviar a URL completa do referrer.

Allowlist `2026-07-15.v1`:

- mídias pagas: `cpc`, `ppc`, `paid`, `paid_social`, `display`;
- origens sociais: `facebook`, `instagram`, `linkedin`, `tiktok`, `twitter`,
  `x`, `youtube`;
- hosts sociais: `facebook.com`, `instagram.com`, `linkedin.com`, `tiktok.com`,
  `t.co`, `twitter.com`, `x.com`, `youtube.com`;
- hosts de busca: `bing.com`, `duckduckgo.com`, `google.com`,
  `search.brave.com`, `yahoo.com`.

Origens e mídias são comparadas após trim e normalização para minúsculas. Hosts
aceitam o domínio exato ou subdomínios e nunca são incluídos no payload.

## 4. Regras de disparo

- `landing_view` não dispara em `/entrar`, páginas legais ou 404.
- `product_preview_view` dispara no máximo uma vez por carregamento quando pelo
  menos 50% da seção ficar visível por 1 segundo; o limiar pode mudar somente com
  atualização deste contrato.
- `faq_open` não dispara no fechamento.
- Clique de cadastro dispara `signup_cta_click` e `outbound_to_app`; clique de
  login dispara `login_click` e `outbound_to_app`.
- Eventos não devem atrasar navegação aguardando callback de rede.

## 5. Propriedades proibidas

- nome, e-mail, telefone, IP capturado pela aplicação;
- endereço ou nome de imóvel;
- texto livre fornecido pelo visitante;
- identificador de conta do app;
- URL completa quando puder carregar dados além da allowlist;
- parâmetros de campanha fora da allowlist.

O endpoint first-party deve descartar IP e cabeçalhos desnecessários antes da
persistência. Cookie, storage, pixel, SDK externo e identificador persistente
continuam proibidos por `DEC-006/007`.

## 6. UTMs e atribuição

Allowlist:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Regras:

- preservar exatamente as chaves presentes e valores não vazios;
- usar APIs de URL para encoding;
- não promover qualquer query arbitrária;
- não sobrescrever parâmetros funcionais do destino, como o futuro modo de
  cadastro, exceto quando o contrato assim definir;
- o link funciona mesmo se enriquecimento ou analytics falhar.

### Contrato com o app

Antes do lançamento, o app deve:

1. aceitar a URL de cadastro definida;
2. aceitar a allowlist de UTMs;
3. manter a campanha somente em memória durante a página atual;
4. não persistir first-touch/last-touch nem associar campanha à conta;
5. manter cadastro, atividade e retenção do produto separados da origem de
   campanha;
6. não enviar PII à ferramenta de analytics.

Rotas, allowlist e adaptador em memória foram validados em `D0-003/INT-004`.
Nenhum provedor OAuth está ativo no MVP publicado; ativação futura exige nova
configuração e validação de origins/callbacks.

## 7. Métricas derivadas

- CTR de cadastro = sessões com `signup_cta_click` / sessões da landing.
- Saída para cadastro = sessões com `outbound_to_app{signup}` / sessões.
- Conversão identificada landing → cadastro não é calculada no MVP, pois não há
  correlação entre campanha e conta.
- Ativação recomendada: usuário cadastrou imóvel, registrou movimentação
  financeira relevante e visualizou o resultado mensal.

Não definir meta percentual antes de linha de base confiável. Métricas de
cadastro, ativação e retenção em 7/30 dias pertencem ao app/produto e usam
coortes próprias, sem UTMs ou identificadores da landing.

## 8. Validação operacional

- ambiente preview usa analytics noop ou propriedade separada;
- produção oferece modo de debug documentado;
- cada evento tem teste de contrato sem chamar rede real;
- QA verifica ausência de PII no payload;
- dashboard/relatório do provedor só é criado depois de os eventos passarem;
- Search Console e sitemap são verificados após produção.

## 9. Política aprovada

`DEC-006/007` escolhe endpoint first-party e Supabase, com legítimo interesse
documentado, retenção bruta máxima de 90 dias e nenhuma persistência no
navegador. O inventário, teste de balanceamento e gates de ativação estão em
`docs/privacy/D0-005-ANALYTICS-POLICY.md`.

Esta decisão não ativa coleta. `ANA-003` deve implementar o endpoint e
permanecer `noop` até passar segurança, privacidade e debug; `ANA-004` valida o
comportamento real em produção.
