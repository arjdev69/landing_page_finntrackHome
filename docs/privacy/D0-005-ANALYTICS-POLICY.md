# D0-005 — Política de analytics first-party

Data de aprovação: 2026-07-27
Responsável: Bruno Araujo, operador do FinnTrack Home
Status: aprovado para implementação; coleta ainda desativada

## Decisão

A landing usará analytics first-party por um endpoint server-side e uma tabela
dedicada no Supabase. O navegador não acessará o banco diretamente e não
receberá chave secreta. O cliente continuará `noop` até `ANA-003` implementar e
validar todos os controles deste documento.

A coleta não usará cookie, Web Storage, pixel publicitário, SDK de analytics de
terceiro, fingerprint, identificador de conta, sessão ou dispositivo. A
aplicação não armazenará IP nem cabeçalhos que permitam reconstruí-lo.

## Finalidade e base

A finalidade é medir, durante a validação do produto, quais origens de campanha
e interações da landing resultam em intenção de cadastro ou saída para o app.
A base aprovada pelo responsável é o legítimo interesse, limitada a dados não
sensíveis e ao contrato mínimo abaixo.

O teste de balanceamento segue as três fases recomendadas pela ANPD:

1. **Finalidade**: avaliar aquisição e usabilidade da landing, sem publicidade
   comportamental, venda de dados ou rastreamento entre sites.
2. **Necessidade**: coletar somente eventos e propriedades allowlisted, sem
   identidade ou texto livre; métricas de retenção 7/30 dias continuam no app.
3. **Balanceamento e salvaguardas**: ausência de identificador persistente,
   descarte de IP, retenção curta, endpoint first-party, acesso restrito,
   transparência pública e canal para oposição.

Se a implementação real exigir cookie, storage, identificador, pixel, SDK
externo, cruzamento com conta ou nova propriedade, esta decisão deixa de cobrir
a coleta. O cliente deve permanecer `noop` até nova decisão e revisão da
política.

## Inventário técnico aprovado

| Item | Regra |
|---|---|
| controlador | Bruno Araujo, pessoa física |
| operadores | Vercel para endpoint/hospedagem; Supabase para banco |
| origem | somente a landing canônica |
| eventos | contrato fechado de `docs/06-SEO-ANALYTICS-SPEC.md` |
| propriedades | somente propriedades allowlisted por evento |
| dados proibidos | nome, e-mail, telefone, IP persistido, URL/referrer completos, texto livre, conta, imóvel, fingerprint e identificadores persistentes |
| cookies/storage/pixels | nenhum |
| credencial do banco | segredo somente server-side; nunca em variável pública ou bundle |
| acesso ao banco | tabela sem leitura/escrita para `anon`; acesso mínimo do backend; RLS habilitada quando a tabela estiver em schema exposto |
| retenção | eventos brutos por no máximo 90 dias, com exclusão automatizada |
| compartilhamento | nenhum para publicidade; somente operadores necessários |
| preview/local | `NoopAnalytics` |
| produção | `noop` até os gates de `ANA-003`; debug controlado sem PII |
| direitos/oposição | `jobslens.ia@gmail.com`; a landing e os CTAs funcionam sem analytics |

## Gates obrigatórios de `ANA-003`

- endpoint aceita apenas `POST`, mesma origem e corpo com limite pequeno;
- schema rejeita eventos, propriedades e valores fora das allowlists;
- IP e cabeçalhos desnecessários são descartados antes da persistência;
- proteção contra abuso e limite de taxa não criam identificador analítico;
- chave secreta fica somente no ambiente server-side;
- tabela não concede acesso a `anon`/`authenticated` e não expõe leitura pública;
- expiração de 90 dias é automatizada e testável;
- cliente falha silenciosamente para `noop`, sem bloquear CTA ou renderização;
- CSP permite somente a origem first-party necessária;
- modo de debug comprova eventos mínimos, duplicidade e ausência de PII;
- política pública e este inventário coincidem com o deploy.

## Limites

Esta decisão não autoriza atribuição durável no app, correlação com conta,
first-touch/last-touch persistente, publicidade, metas percentuais ou analytics
de retenção do produto. Esses trabalhos permanecem em `INT-004`, `ANA-003`,
`ANA-004` e `REL-004`.

## Referências

- [ANPD — Guia sobre legítimo interesse](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_hipoteses_legais_tratamento_de_dados_pessoais_legitimo_interesse)
- [Supabase — Segurança de dados](https://supabase.com/docs/guides/database/secure-data)
- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
