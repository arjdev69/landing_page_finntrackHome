# QA-005 — Headers de segurança

Data: 2026-07-27
Status: concluída — contrato, configuração Vercel, CI e endpoint HTTPS aprovados

## Resultado

O projeto gera um contrato de headers a partir do artefato estático e o aplica
na Vercel por `vercel.mjs`. O hash SHA-256 do script inline é verificado
byte a byte contra o `dist/index.html`, portanto a CSP não depende de
`unsafe-inline`. O gate serve o build localmente com os headers, abre a página
em Chromium e valida menu, FAQ, propagação de UTM, ausência de violações CSP,
erros de runtime e `Set-Cookie`.

O contrato gerado está em `artifacts/security/security-headers.json`. A política
de produção inclui CSP restritiva, `Referrer-Policy`, `X-Content-Type-Options`,
`Permissions-Policy`, `X-Frame-Options` como compatibilidade e HSTS de um ano. O
preview recebe `X-Robots-Tag: noindex, nofollow` e não recebe HSTS. O Preview
Deployment do PR #4 ficou protegido por autenticação da Vercel; a resposta
anônima recebeu `X-Robots-Tag: noindex` e o artefato foi validado pelo mesmo
pipeline que antecedeu o merge.

`includeSubDomains` e `preload` não foram ativados, conforme a decisão
conservadora de `DEC-017`. A política precisará ser revista antes de liberar
qualquer provedor de analytics ou outra origem externa.

## Evidência executada

- `npm run test:security`: aprovado;
- build Astro 7.1.3: aprovado, 70 arquivos sem erros, avisos ou hints;
- Chromium: CSP aplicada sem violações e comportamento crítico funcional;
- `npm audit --audit-level=moderate`: zero vulnerabilidades;
- suíte local: 62/62; E2E desktop/mobile: 30/30;
- PR #4: checks do GitHub, Vercel e GitGuardian aprovados;
- pipeline pós-merge `30303082672`: aprovado em 3m14s;
- produção em `https://finntrack-home-landing.vercel.app`: HTTP 200 com CSP,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Content-Type-Options: nosniff`, `Permissions-Policy`,
  `X-Frame-Options: DENY` e
  `Strict-Transport-Security: max-age=31536000`;
- smoke Playwright de produção: menu, FAQ e UTM funcionais, sem violação CSP,
  erro de console/página ou `Set-Cookie`.

## Limites mantidos

O preview autenticado não permite inspecionar anonimamente os headers do
artefato após a camada de SSO. Essa limitação é coberta pelo teste da seleção de
ambiente em `vercel.mjs`, pela validação do artefato no CI e pela proteção
`noindex` da própria resposta de autenticação. Analytics externo permanece fora
do escopo até nova revisão explícita de privacidade e CSP.

## Referências técnicas

- [MDN — Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)
- [MDN — CSP frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- [MDN — Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)
- [OWASP — HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [OWASP — Testing HTTP Security Headers](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/14-Test_Other_HTTP_Security_Header_Misconfigurations)
