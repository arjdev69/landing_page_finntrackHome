# Segurança e privacidade

Versão: 0.1.3
Status: approved — baseline, jurídico e política de analytics definidos
Data: 2026-07-29

## 1. Escopo de dados

A landing não possui conta ou formulário financeiro. Ela processa localmente
URL/referrer allowlisted, informações técnicas mínimas e interação com
conteúdo. `DEC-018` autoriza o Vercel Web Analytics somente para pageviews
agregados da home de produção; custom events permanecem `noop`.

As UTMs encaminhadas ao app permanecem somente em memória durante a página
atual. O MVP não as grava no perfil, não as associa à conta e mede retenção do
produto separadamente.

## 2. Modelo de ameaças resumido

| Ameaça | Controle principal |
|---|---|
| segredo exposto no bundle | proibição de segredos e revisão do artefato |
| open redirect | destinos somente por configuração de build validada |
| XSS em conteúdo/terceiros | conteúdo confiável, sanitização e CSP |
| supply chain | lockfile, atualização controlada e auditoria |
| exfiltração por analytics | endpoint de mesma origem, pageview apenas da home, remoção de query/fragmento e nenhum custom event |
| indexação de preview | robots + `X-Robots-Tag` + gate automatizado |
| vazamento por screenshot | dados fictícios e revisão de ativos |
| falsa alegação de segurança | copy limitada ao comportamento verificável |

## 3. Requisitos de implementação

- Variáveis públicas contêm apenas configuração publicável.
- Destinos de app aceitam apenas HTTPS e hosts aprovados em produção.
- Query do visitante nunca define um destino de redirect.
- Conteúdo Markdown/MDX não aceita HTML/script não confiável.
- Scripts inline devem ser evitados ou compatíveis com nonce/hash da CSP.
- Dependências de terceiros devem ter finalidade, proprietário e dados
  documentados antes de entrar no projeto.
- Source maps públicos e headers da hospedagem devem ser uma decisão consciente.

## 4. Cabeçalhos mínimos

Configurar e testar na plataforma escolhida:

- `Content-Security-Policy`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `X-Content-Type-Options: nosniff`;
- `Permissions-Policy` restritiva;
- `frame-ancestors` por CSP;
- HSTS após confirmar HTTPS e impacto nos subdomínios.

Não copiar uma CSP genérica sem ajustar fontes de analytics, imagens e fontes.

### Contrato implementado para o MVP

`scripts/security-headers.mjs` gera as políticas de preview e produção a partir
do HTML compilado. Scripts inline recebem hash SHA-256; `unsafe-inline`,
`unsafe-eval`, objetos, frames e atributos de script permanecem bloqueados. O
preview recebe `X-Robots-Tag: noindex, nofollow`. A produção recebe
`upgrade-insecure-requests` e `Strict-Transport-Security: max-age=31536000`, sem
`includeSubDomains` ou `preload` enquanto a topologia de domínio da `DEC-010` não
for aprovada.

O gate `npm run test:security` aplica os headers a um servidor local, executa o
build em Chromium e audita dependências. O contrato deve ser mapeado para a
plataforma escolhida e testado novamente no endpoint HTTPS real. A introdução de
analytics, fontes ou assets externos exige revisar explicitamente as diretivas.

## 5. Privacidade e consentimento

Antes de ativar analytics em produção devem existir:

- política de privacidade real, datada e aprovada;
- termos de uso reais, datados e aprovados;
- inventário de cookies/storage/scripts/terceiros;
- base e regra de consentimento definidas para cada ferramenta;
- canal público de solicitações relacionadas a dados;
- processo para atualização da política quando a instrumentação mudar.

`DEC-018` adota legítimo interesse para pageviews agregados, sem consentimento
prévio porque não há cookie, storage, identificador persistente ou correlação
com conta. O pacote oficial da Vercel é o único script de analytics aprovado; o
identificador temporário do provedor é descartado após 24 horas. O teste de
balanceamento, inventário e salvaguardas estão em
`docs/privacy/D0-005-ANALYTICS-POLICY.md`.

Qualquer mudança que introduza persistência no navegador, identificador, terceiro
ou nova finalidade — incluindo correlação de campanha com conta — exige nova
decisão. A landing e os CTAs continuam funcionais com `NoopAnalytics`, e
solicitações de informação ou oposição usam o canal
`jobslens.ia@gmail.com`.

## 6. Screenshots e conteúdo

- Usar dados sintéticos, nunca mascaramento parcial de produção.
- Remover nomes, e-mails, endereços, avatares, IDs e metadados do arquivo.
- Manter registro da origem e da aprovação do ativo.
- Depoimentos e métricas exigem autorização/evidência rastreável.
- Conteúdo jurídico ou tributário futuro exige revisão especializada e fontes
  oficiais atualizadas.

## 7. Resposta e manutenção

O rollback de analytics remove o componente/pacote, executa novo deploy e
desativa Web Analytics no painel da Vercel. Incidente de script/asset de terceiro
deve permitir desativação por novo deploy. Dependências e headers devem ser
revistos periodicamente e sempre que analytics, hospedagem ou fontes externas
mudarem.

## 8. Checklist de lançamento

- [ ] Artefato estático inspecionado sem segredos.
- [ ] Hosts de login/cadastro conferidos.
- [ ] CSP e demais headers verificados em produção.
- [ ] Preview confirmado como não indexável.
- [ ] Inventário de terceiros coincide com a política.
- [x] Payloads de analytics não contêm PII.
- [ ] Screenshots e metadados foram revisados.
- [ ] Privacidade, termos e canal de dados foram aprovados.
- [ ] Rollback da hospedagem foi testado ou documentado.
