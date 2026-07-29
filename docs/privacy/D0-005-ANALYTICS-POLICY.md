# Política de analytics — Vercel Web Analytics

Versão: 2.0
Data de aprovação: 2026-07-29
Responsável: Bruno Araujo, operador do FinnTrack Home
Status: aprovado para implementação em `ANA-003`

Esta versão substitui a implementação própria com Supabase aprovada inicialmente
em `D0-005`. A base e as salvaguardas de minimização permanecem; o fornecedor e
o inventário técnico passam a seguir `DEC-018`.

## Decisão

A landing usará o Vercel Web Analytics no plano Hobby somente para pageviews
agregados da home de produção. A integração usa o pacote oficial
`@vercel/analytics`, com entrada entregue pela própria origem da landing.
Preview, páginas legais, `/entrar` e 404 não carregam o componente.

O plano aprovado não recebe custom events nem fornece dimensões de UTM. Os
eventos tipados existentes permanecem no `NoopAnalytics`; eles não são enviados
à Vercel nem persistidos em banco.

## Finalidade e base

A finalidade é entender volume e uso básico da landing durante a validação do
produto. A base aprovada pelo responsável é o legítimo interesse, limitada a
dados agregados e sem correlação com conta.

O teste de balanceamento mantém as três fases recomendadas pela ANPD:

1. **Finalidade**: avaliar o uso básico da landing, sem publicidade
   comportamental, venda de dados ou rastreamento entre sites.
2. **Necessidade**: registrar apenas pageview da home; query e fragmento são
   removidos antes do envio; métricas de ativação e retenção continuam no app.
3. **Balanceamento e salvaguardas**: ausência de cookie, storage e identificador
   persistente; relatório agregado; transparência pública; canal para oposição;
   rollback por deploy e pelo painel da Vercel.

Se a implementação exigir custom event, propriedade adicional, cookie, storage,
identificador persistente, cruzamento com conta, nova rota ou nova finalidade,
esta decisão deixa de cobrir a coleta e exige nova revisão.

## Inventário técnico aprovado

| Item | Regra |
|---|---|
| controlador | Bruno Araujo, pessoa física |
| operador | Vercel, como hospedagem e Web Analytics |
| origem | somente `https://finntrackhomepage.app/` |
| pacote | `@vercel/analytics` versão travada pelo lockfile |
| coleta | pageview agregado da home |
| dados operacionais do provedor | timestamp, pathname, referrer, país/região, navegador, sistema e tipo de dispositivo |
| sanitização | `beforeSend` remove query e fragmento da URL |
| dados proibidos | nome, e-mail, telefone, texto livre, conta, imóvel, query, fragmento, custom events e identificador persistente |
| cookies/storage | nenhum |
| identificação temporária | hash derivado da requisição, descartado pelo provedor após 24 horas |
| relatório | janela de um mês no plano Hobby |
| preview/local | componente ausente |
| páginas legais, `/entrar` e 404 | componente ausente |
| direitos/oposição | `jobslens.ia@gmail.com`; a landing e os CTAs funcionam sem analytics |

## Gates obrigatórios de `ANA-003`

- dashboard da Vercel habilitado pelo responsável;
- dependência oficial presente e travada no lockfile;
- componente renderizado somente na home quando `PUBLIC_ENVIRONMENT=production`;
- `beforeSend` remove query e fragmento;
- preview e rotas excluídas não carregam o script;
- CSP continua restrita à própria origem, sem `unsafe-inline` ou nova origem;
- falha ou bloqueio do script não quebra conteúdo, CTA ou navegação;
- política pública, aprovação e inventário coincidem com o deploy;
- produção expõe a entrada do Web Analytics e permite inspeção no painel/rede.

## Limites

Esta decisão não autoriza custom events, atribuição durável, correlação com
conta, first-touch/last-touch persistente, publicidade ou analytics de retenção
do produto. CTR de cadastro e conversão por UTM não são mensuradas pelo plano
Hobby. Ativação e retenção 7/30 dias permanecem no app.

## Rollback

Remover o componente e a dependência, publicar novo deployment e desativar Web
Analytics no painel da Vercel. Nenhum dado analítico é requisito para o
funcionamento da landing.

## Referências

- [ANPD — Guia sobre legítimo interesse](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_hipoteses_legais_tratamento_de_dados_pessoais_legitimo_interesse)
- [Vercel — Privacidade e conformidade](https://vercel.com/docs/analytics/privacy-policy)
- [Vercel — Quickstart do Web Analytics](https://vercel.com/docs/analytics/quickstart)
- [Vercel — Limites e preços](https://vercel.com/docs/analytics/limits-and-pricing)
