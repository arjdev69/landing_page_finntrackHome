# Segurança e privacidade

Versão: 0.1.1  
Status: approved — baseline técnica; conteúdo jurídico permanece pendente  
Data: 2026-07-15

## 1. Escopo de dados

A landing não possui conta, banco de dados, formulário financeiro ou API própria.
Ela processa localmente URL/referrer, informações técnicas mínimas para analytics
e interação com conteúdo. O provedor de analytics pode ampliar esse escopo e,
portanto, não pode ser ativado antes de inventário e decisão de consentimento.

## 2. Modelo de ameaças resumido

| Ameaça | Controle principal |
|---|---|
| segredo exposto no bundle | proibição de segredos e revisão do artefato |
| open redirect | destinos somente por configuração de build validada |
| XSS em conteúdo/terceiros | conteúdo confiável, sanitização e CSP |
| supply chain | lockfile, atualização controlada e auditoria |
| exfiltração por analytics | adaptador, allowlist de propriedades e consentimento |
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

## 5. Privacidade e consentimento

Antes da produção devem existir:

- política de privacidade real, datada e aprovada;
- termos de uso reais, datados e aprovados;
- inventário de cookies/storage/scripts/terceiros;
- base e regra de consentimento definidas para cada ferramenta;
- canal público de solicitações relacionadas a dados;
- processo para atualização da política quando a instrumentação mudar.

Se a decisão exigir consentimento prévio, analytics/pixels permanecem em noop até
uma escolha afirmativa válida. Rejeitar deve ser tão simples quanto aceitar, e a
landing/CTAs continuam funcionais sem consentimento.

## 6. Screenshots e conteúdo

- Usar dados sintéticos, nunca mascaramento parcial de produção.
- Remover nomes, e-mails, endereços, avatares, IDs e metadados do arquivo.
- Manter registro da origem e da aprovação do ativo.
- Depoimentos e métricas exigem autorização/evidência rastreável.
- Conteúdo jurídico ou tributário futuro exige revisão especializada e fontes
  oficiais atualizadas.

## 7. Resposta e manutenção

Como não há backend, rollback do site é o principal mecanismo de contenção.
Incidente de script/asset de terceiro deve permitir desativação por configuração
e novo deploy. Dependências e headers devem ser revistos periodicamente e sempre
que analytics, hospedagem ou fontes externas mudarem.

## 8. Checklist de lançamento

- [ ] Artefato estático inspecionado sem segredos.
- [ ] Hosts de login/cadastro conferidos.
- [ ] CSP e demais headers verificados em produção.
- [ ] Preview confirmado como não indexável.
- [ ] Inventário de terceiros coincide com a política.
- [ ] Payloads de analytics não contêm PII.
- [ ] Screenshots e metadados foram revisados.
- [ ] Privacidade, termos e canal de dados foram aprovados.
- [ ] Rollback da hospedagem foi testado ou documentado.
