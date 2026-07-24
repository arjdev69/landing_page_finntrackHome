# QA-005 — Headers de segurança

Data: 2026-07-22  
Status: parcial — contrato e validação local aprovados; ativação e teste no host aguardam `DEC-010`

## Resultado

O projeto passou a gerar um contrato de headers a partir do artefato estático. O
hash SHA-256 do script inline é calculado sobre o `dist/index.html`, portanto a CSP
não depende de `unsafe-inline`. O gate serve o build localmente com os headers,
abre a página em Chromium e valida menu, FAQ, propagação de UTM, ausência de
violações CSP, erros de runtime e `Set-Cookie`.

O contrato gerado está em `artifacts/security/security-headers.json`. A política
de produção inclui CSP restritiva, `Referrer-Policy`, `X-Content-Type-Options`,
`Permissions-Policy`, `X-Frame-Options` como compatibilidade e HSTS de um ano. O
preview recebe `X-Robots-Tag: noindex, nofollow` e não recebe HSTS, pois o teste
local é HTTP.

`includeSubDomains` e `preload` não foram ativados: essa escolha só é segura após
confirmar domínio, subdomínios e HTTPS na `DEC-010`. A política também precisará
ser revista antes de liberar qualquer provedor de analytics externo.

## Evidência executada

- `npm run test:security`: aprovado;
- build Astro 7.1.3: aprovado, 70 arquivos sem erros, avisos ou hints;
- Chromium: CSP aplicada sem violações e comportamento crítico funcional;
- `npm audit --audit-level=moderate`: zero vulnerabilidades;
- `astro@7.1.3` e `fast-uri@3.1.4` substituíram versões afetadas encontradas na
  auditoria inicial.

## Bloqueio restante

Sem a plataforma e o domínio definidos em `DEC-010`, não existe configuração de
deploy correta para editar nem endpoint HTTPS de produção para inspecionar. A
tarefa permanece aberta até mapear este contrato para o provedor escolhido e
validar as respostas reais do host, inclusive redirects e HSTS.

## Referências técnicas

- [MDN — Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)
- [MDN — CSP frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- [MDN — Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)
- [OWASP — HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [OWASP — Testing HTTP Security Headers](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/14-Test_Other_HTTP_Security_Header_Misconfigurations)
