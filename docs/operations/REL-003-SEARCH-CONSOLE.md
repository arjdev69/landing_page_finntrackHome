# REL-003 — Google Search Console e sitemap

Data: 2026-07-29

Responsável: responsável técnico/SEO

Propriedade: `https://finntrack-home-landing.vercel.app/`

## Identificação da entrega

- Método de verificação: tag HTML pública na home
- Pull request da verificação: `#9`
- Merge de produção: `57544ef`
- Deployment Vercel:
  `EpEMJajVQWszjQzr9Z83eY6VwveK`
- Sitemap submetido:
  `https://finntrack-home-landing.vercel.app/sitemap.xml`

A tag serve somente para comprovar a propriedade. Ela não adiciona script,
cookie, storage, pixel, SDK ou coleta de dados.

## Validação da propriedade

Após o deploy, a home respondeu HTTP `200` e expôs a tag de verificação
esperada. O Google Search Console confirmou **Propriedade verificada** pelo
método **Tag HTML**.

## Submissão e validação do sitemap

O sitemap foi enviado pela área **Indexação → Sitemaps**, e o Search Console
confirmou **Sitemap enviado**. Em seguida, a validação técnica externa obteve:

| Verificação | Resultado |
|---|---|
| HTTP com agente comum | `200` |
| HTTP com agente Googlebot | `200` |
| Content-Type | `application/xml` |
| Estrutura XML | `urlset` válido com namespace oficial |
| URLs incluídas | somente a home canônica |

Na primeira leitura, realizada no mesmo dia da submissão, o Search Console
exibiu **Não foi possível ler o sitemap**. Uma tentativa de **Testar o URL
publicado** retornou o aviso genérico **Ocorreu um erro — tente novamente em
algumas horas**. Portanto, este registro não afirma que o processamento do
Google já esteja em estado **Sucesso**.

O arquivo público está acessível e válido; a submissão e a configuração exigidas
por `OPS-007` foram concluídas. O estado do relatório deve ser conferido
novamente após o processamento assíncrono do Google. A documentação oficial
orienta que falhas de busca podem ser transitórias e recomenda repetir o teste
ao vivo:
`https://support.google.com/webmasters/answer/7451001?hl=pt-BR`.

## Resultado

A origem canônica foi verificada no Search Console e o sitemap foi submetido.
`REL-003` está concluída no seu escopo operacional, com o estado inicial de
processamento registrado como ressalva de monitoramento.
