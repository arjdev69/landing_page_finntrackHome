# RASCUNHO — NÃO APROVADO PARA PUBLICAÇÃO

Documento: Política de Privacidade do FinnTrack Home  
Versão da minuta: 0.1  
Data da minuta: 2026-07-21  
Vigência: não definida  
Status: validação factual, revisão jurídica e aceite do representante legal pendentes

Esta minuta organiza somente fatos verificáveis no código e na documentação atual.
Ela não identifica o controlador nem presume bases legais, retenção, fornecedores
ou transferências internacionais. Enquanto essas lacunas não forem resolvidas, o
texto não pode ser publicado em `/privacidade`.

## 1. Escopo pretendido

A versão final deverá explicar, de modo claro, como o controlador do FinnTrack
Home trata dados pessoais na landing pública, no aplicativo autenticado e nos
canais de atendimento. O controlador deverá ser identificado por nome ou razão
social, CPF/CNPJ quando aplicável, endereço e contato.

## 2. Evidências técnicas observadas

### Landing pública — inspeção local confirmada

- É um site estático, sem conta, formulário, banco de dados ou API próprios.
- O build atual não ativa provedor de analytics, pixel publicitário, cookie ou
  armazenamento no navegador; o adaptador de analytics permanece em modo noop.
- URL, referrer, largura do viewport e interações podem ser processados localmente
  para classificação e instrumentação. O cliente de analytics está em noop e não
  transmite eventos; esta constatação não cobre logs da hospedagem, navegação ao
  app nem mensagens enviadas pelo canal de e-mail.
- Valores recebidos em URL/referrer/UTMs não são semanticamente inspecionados e
  não devem ser descritos como anônimos; parâmetros de campanha não devem conter
  nome, e-mail ou outra informação pessoal.
- O canal publicado de suporte e solicitações relacionadas a dados é
  `jobslens.ia@gmail.com`.

### Aplicativo autenticado — código local não homologado para produção

A inspeção do repositório local indica que o aplicativo possui fluxos para
conta, imóveis, receitas, despesas e preferências. O código permite configuração
com Supabase e autenticação por e-mail/senha; Google e Apple aparecem como opções
condicionadas a flags. Isso não comprova quais fornecedores ou opções estão
ativos em produção e, portanto, requer validação do Produto/controlador.

Evidência inspecionada: repositório `FinntrackHome`, commit
`83aa8642bf8c4e27f595587fbb74025214a1fd0f`, especialmente
`src/infrastructure/supabase/repositories.ts`,
`src/infrastructure/supabase/supabase-auth.ts`, `src/features/auth/LoginScreen.tsx`
e `src/features/settings/SettingsScreen.tsx`. Essa referência demonstra o estado
do código, não a configuração ou operação efetiva em produção.

## 3. Inventário preliminar sujeito a confirmação

| Contexto | Dados observados | Finalidade técnica aparente | Evidência | Situação para publicação |
|---|---|---|---|---|
| Conta | identificador, e-mail, nome e credencial gerida pelo serviço de autenticação | cadastro, autenticação, recuperação e perfil | `FinntrackHome@83aa864`, `supabase-auth.ts` | confirmar fornecedor, base legal e ambiente real |
| Imóveis | nome/identificador do imóvel e campos definidos no cadastro | organizar a carteira do usuário | `FinntrackHome@83aa864`, `repositories.ts` e domínio | confirmar campos reais, necessidade e retenção |
| Receitas e despesas | valores, datas, categorias, descrições e vínculo com imóvel/usuário | controle financeiro e relatórios | `FinntrackHome@83aa864`, `repositories.ts` e domínio | confirmar campos, base legal e retenção |
| Preferências | idioma, moeda, formato de data e lembretes locais | personalização do aplicativo | `FinntrackHome@83aa864`, `settings.ts` | confirmar persistência e retenção |
| Atendimento | endereço de e-mail e conteúdo enviado voluntariamente | suporte e exercício de direitos | `DEC-011` e rodapé da landing | canal confirmado; processo, Google/Gmail, acesso e retenção pendentes |
| Landing | URL/referrer, UTMs, viewport e interação processados no cliente | navegação, encaminhamento ao app e contrato de analytics | `utm.ts`, `page.ts`, `NoopAnalytics` e testes locais | analytics sem transmissão; hospedagem/app/e-mail e conteúdo dos parâmetros pendentes |

## 4. Informações obrigatórias ainda não confirmadas

Antes da publicação, o responsável factual deverá documentar:

- identidade e contato completo do controlador de dados e, separadamente, do
  fornecedor contratual do serviço, seus representantes e eventuais operadores;
- finalidades e bases legais por operação de tratamento;
- fornecedores e operadores efetivamente ativos, inclusive hospedagem, Supabase,
  autenticação social, Google/Gmail no atendimento, monitoramento e analytics;
- locais de armazenamento e eventual transferência internacional;
- critérios e prazos de retenção, backups e descarte;
- cookies, storage, identificadores e scripts realmente usados em produção;
- procedimento de verificação da identidade e atendimento de solicitações;
- tratamento de dados de crianças e adolescentes, se o serviço admitir esse público;
- medidas de segurança que possam ser descritas sem promessa absoluta.

## 5. Direitos dos titulares — texto-base para revisão

Após identificar o controlador e o tratamento aplicável, a política poderá
informar que o titular pode solicitar confirmação e acesso, correção, informações
sobre compartilhamento, anonimização, bloqueio ou eliminação quando cabíveis,
portabilidade nos termos da regulamentação, revogação do consentimento quando
essa for a base utilizada, oposição e revisão de decisões automatizadas quando
aplicável. O atendimento deve observar as exceções e os prazos legais.

Solicitações iniciais serão recebidas em `jobslens.ia@gmail.com`, com o assunto
“FinnTrack Home — Dados pessoais”. Nenhum prazo contratual adicional é prometido
enquanto não houver SLA aprovado.

## 6. Exclusão e conservação

O aplicativo contém um fluxo técnico de exclusão de conta, mas o funcionamento
do backend, o alcance da exclusão, backups e hipóteses de conservação ainda devem
ser confirmados. A versão final não deve prometer exclusão imediata ou integral
sem essa validação.

## 7. Cookies, armazenamento e analytics

Na inspeção do código da landing não foi encontrado cookie, storage, pixel ou SDK
de analytics ativo. Isso não cobre mecanismos da hospedagem, do aplicativo nem
do serviço de e-mail, que permanecem pendentes no inventário. A política deve ser
revista antes de ativar qualquer terceiro ou identificador.

## 8. Segurança e incidentes

A versão final poderá descrever somente controles efetivamente comprovados e
ligados a evidência técnica, como regras de acesso por usuário, sem afirmar
segurança absoluta. O
processo de resposta a incidentes e comunicação deverá ser confirmado pelo
controlador.

## 9. Atualizações

A política final deverá informar versão, data de vigência e forma de comunicação
de mudanças materiais. Nova revisão é obrigatória quando mudarem dados,
finalidades, bases legais, fornecedores, retenção, cookies ou condições do serviço.

## 10. Referências oficiais para a revisão

- [Lei Geral de Proteção de Dados Pessoais — Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm)
- [ANPD — Direito dos titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares)
- [ANPD — Denúncia e petição de titular](https://www.gov.br/anpd/pt-br/canais_atendimento/cidadao-titular-de-dados/denuncia-peticao-de-titular-referente-lgpd)
- [ANPD — Guia orientativo sobre cookies e proteção de dados pessoais](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf/@@display-file/file)

## 11. Aprovações necessárias

- Validação factual do Produto/controlador: pendente.
- Revisão jurídica por advogado ou assessoria formalmente indicada: pendente.
- Aceite final do representante legal do controlador: pendente.
