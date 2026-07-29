# REL-002 — Publicação e smoke de produção

Data: 2026-07-29  
Responsável: responsável técnico/Plataforma  
Host canônico: `https://finntrack-home-landing.vercel.app`

## Identificação da entrega

- Pull request: `#7` — `Concluir integração segura da landing com o app`
- Merge de produção: `dddc615a09719bd5a37c9bfb8354ab199d6dd7d8`
- Deployment Vercel: `FYnCQXk2DCbJpPKHcNtwUx8XZhCg`
- Preview anterior à produção: protegido por SSO da Vercel, com HTTP `302` e
  `X-Robots-Tag: noindex`
- Gates do PR: GitGuardian, Vercel e `Quality and preview build` aprovados

## Validação antes da publicação

Executados localmente no mesmo conteúdo enviado ao PR:

```text
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

Resultado: formatação, lint e tipagem sem erros; `68/68` testes aprovados; build
estático gerou home, `/entrar`, páginas legais, `robots.txt`, `sitemap.xml` e
404. O pipeline remoto também aprovou build, segurança, E2E, acessibilidade e
orçamento Lighthouse.

## Smoke pós-deploy

| Verificação | Resultado |
|---|---|
| Home HTTPS | `200`; canonical `https://finntrack-home-landing.vercel.app/` |
| HTTP | `308` para a origem HTTPS canônica |
| `/entrar` | `200`; canonical próprio e fallback publicado |
| `/privacidade` e `/termos` | `200`; canonicals próprios |
| `robots.txt` | `200`; permite rastreamento e referencia o sitemap canônico |
| `sitemap.xml` | `200`; contém somente a home canônica |
| URL inexistente | `404` real com página customizada |
| Headers | CSP presente, HSTS `max-age=31536000`, `nosniff` e Referrer Policy |
| App `/entrar` e `/cadastro` | ambos `200` |

O smoke em navegador abriu a home com `utm_source=smoke`,
`utm_campaign=lancamento`, `email` e `redirect`. Todos os sete links para o app
preservaram somente as duas UTMs aprovadas. Nenhum link propagou o e-mail nem o
destino arbitrário. A página não apresentou erro de aplicação ou overflow
horizontal.

## Procedimento de rollback

O rollback não deve ser disparado durante um deploy saudável. Em caso de erro
crítico:

1. confirmar a falha no host canônico e identificar o deployment afetado;
2. no projeto `finntrack-home-landing` da Vercel, executar `vercel rollback`
   para restaurar o deployment de produção imediatamente anterior;
3. acompanhar com `vercel rollback status`;
4. repetir o smoke da seção anterior no host canônico;
5. corrigir a causa em branch/preview e passar os gates antes de nova produção;
6. para desfazer o rollback, promover o deployment corrigido com
   `vercel promote <deployment-url>` e verificar `vercel promote status`.

No plano Hobby, o rollback é limitado ao deployment de produção imediatamente
anterior. O procedimento segue a documentação oficial da Vercel:
`https://vercel.com/docs/deployments/rollback-production-deployment`.

## Resultado

Publicação, host, canonical, HTTPS, 404, destinos do app e descarte de parâmetros
sensíveis foram comprovados. O procedimento de rollback está documentado sem
causar interrupção deliberada em uma produção saudável.
