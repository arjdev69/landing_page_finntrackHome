# Handover — integração do app FinnTrack Home com a landing

Versão: 0.2
Data: 2026-07-24
Status: execução recebida e validada para o escopo de `D0-003`
Destinatário: agente responsável pelo repositório do app autenticado

## 1. Missão

Executar no repositório do app principal a parte externa de `D0-003`/`DEC-004`:

1. oferecer destinos públicos e estáveis que abram diretamente cadastro e login;
2. aceitar somente a allowlist de UTMs definida pela landing;
3. documentar o comportamento pós-autenticação, atribuição e eventual retenção;
4. produzir evidência para o E2E landing → app em desktop e mobile.

Não alterar o repositório da landing como parte desta entrega. Antes de editar o
app, ler as instruções e a documentação autoritativa do próprio repositório.

## 2. Contexto e fonte de verdade

Na landing, o SRS é autoritativo. O contrato relevante está em:

- `FR-CTA-002..009`: destinos configuráveis, cadastro/login diretos e falha
  segura;
- `FR-UTM-001..007`: allowlist, encoding, descarte de dados arbitrários,
  retenção condicionada e aprovação ponta a ponta;
- `SEC-002..003`: HTTPS e proibição de open redirect;
- `PRIV-001..002`: coleta mínima e inventário de cookies/storage/terceiros.

A landing já acrescenta UTMs permitidas aos links por APIs de URL, sem cookie,
storage ou SDK. O app não deve depender de JavaScript da landing para receber o
visitante.

## 3. Estado observado em produção

Inspeção pública e somente leitura executada em 2026-07-24:

- origem do app: `https://finntrackhome.app`;
- hospedagem observada nos headers: Vercel;
- HTTPS e HSTS ativos;
- `/` monta `LoginScreen` e inicia no modo `signup`;
- `/dashboard` é rota protegida; visitante sem sessão retorna para `/`;
- `/reset-password` existe;
- `/entrar` e `/cadastro` não estão declaradas no roteador publicado;
- a regra curinga encaminha rotas desconhecidas para `/dashboard`, seguida da
  proteção que leva o visitante sem sessão para `/`;
- o `LoginScreen` publicado não lê `mode`, `URLSearchParams` ou
  `location.search`;
- não foi encontrada captura de `utm_source` no bundle principal publicado.

Limite da inspeção: não foi criada conta nem usado dado pessoal real. O agente do
app deve validar o código-fonte, o backend de autenticação e os ambientes antes
de implementar.

## 4. Contrato público recomendado

Implementar e confirmar:

```text
PUBLIC_APP_URL=https://finntrackhome.app
PUBLIC_APP_SIGNUP_URL=https://finntrackhome.app/cadastro
PUBLIC_APP_LOGIN_URL=https://finntrackhome.app/entrar
```

Comportamento:

- `/cadastro` abre diretamente o formulário/estado de criação de conta;
- `/entrar` abre diretamente o formulário/estado de login;
- atualizar a página preserva o modo definido pela rota;
- usuário já autenticado pode seguir para `/dashboard`;
- `/dashboard` continua sendo destino pós-auth protegido e não deve ser usado
  como URL de CTA da landing;
- as rotas devem ser declaradas antes do fallback curinga;
- não usar query fornecida pelo visitante para escolher um destino de redirect.

Se o app optar por query em vez de rotas, por exemplo `/?mode=signup`, a decisão
deve ser justificada e coberta pelos mesmos testes. Rotas explícitas são a opção
preferida por oferecer URLs estáveis e legíveis.

## 5. Contrato de UTMs

Aceitar exclusivamente:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Regras obrigatórias:

1. ler e escrever parâmetros com `URL`/`URLSearchParams`;
2. considerar somente valores presentes e não vazios;
3. manter o primeiro valor não vazio quando a mesma chave se repetir;
4. ignorar qualquer chave fora da allowlist;
5. não capturar URL completa, fragmento, e-mail, nome, telefone, endereço,
   token, código de autenticação ou texto livre como campanha;
6. não aceitar `redirect`, `returnTo`, `next`, `destination` ou equivalente
   vindo da query sem allowlist interna de destinos same-origin;
7. ausência, erro ou bloqueio da captura não pode impedir cadastro ou login;
8. não enviar PII a analytics nem registrar parâmetros sensíveis em logs.

## 6. Retenção e atribuição

O agente deve documentar:

- first-touch, last-touch ou ambos;
- em que momento a campanha é associada à conta/primeira sessão;
- duração e local de retenção;
- comportamento em cadastro por senha, login e OAuth, quando ativo;
- expiração, exclusão e comportamento após rejeição de consentimento.

`DEC-007` ainda está pendente. Portanto, não adicionar cookie, `localStorage`,
pixel, SDK ou persistência durável de campanha sem aprovação de
Privacidade/Jurídico. É permitido implementar parser, tipos, fluxo em memória e
adaptador desativado/noop, deixando a persistência bloqueada e explicitamente
documentada até a decisão.

## 7. OAuth e autenticação

O agente deve:

1. listar provedores de autenticação realmente ativos por ambiente;
2. registrar origins e callback URLs necessárias, sem expor segredos;
3. confirmar o comportamento pós-auth de cadastro e login;
4. informar quais origins da landing precisarão ser autorizadas quando o domínio
   oficial for definido;
5. garantir que parâmetros de OAuth, tokens e códigos não sejam tratados como
   UTMs nem apareçam em evidências.

Não ativar novo provedor de autenticação como efeito colateral desta tarefa.

## 8. Testes mínimos no app

### Unitários/integração

- rota `/cadastro` seleciona `signup`;
- rota `/entrar` seleciona `signin`;
- refresh preserva o modo;
- parser aceita as cinco UTMs;
- encoding e chaves repetidas seguem o contrato;
- parâmetros desconhecidos e sensíveis são descartados;
- falha de captura mantém autenticação funcional;
- nenhum destino externo pode ser controlado pela query.

### E2E em desktop e mobile

1. abrir `/cadastro` sem sessão e confirmar cadastro visível;
2. abrir `/entrar` sem sessão e confirmar login visível;
3. abrir `/dashboard` sem sessão e confirmar encaminhamento seguro para login;
4. acessar cadastro e login com as cinco UTMs e confirmar que somente elas
   chegam ao ponto de atribuição aprovado;
5. incluir `email`, `token`, `redirect=https://example.invalid` e chave
   desconhecida e confirmar descarte;
6. repetir sem UTMs e com captura indisponível;
7. validar o callback e o pós-auth dos provedores realmente ativos;
8. executar contra preview e, após aprovação, contra produção.

Usar somente dados sintéticos. Não criar screenshots, fixtures ou logs com dados
reais de usuários.

## 9. Evidência que deve retornar à landing

Entregar ao responsável técnico da landing:

- repositório, branch, commit e PR da mudança;
- arquivos alterados;
- URLs exatas de app, cadastro e login por ambiente;
- descrição do comportamento pós-auth;
- contrato de UTMs implementado;
- decisão de first-touch/last-touch e retenção, ou bloqueio explícito por
  `DEC-007`;
- inventário de cookies, storage, SDKs e terceiros afetados;
- provedores OAuth ativos e origins/callbacks, sem segredos;
- comandos e resultados de testes;
- evidência E2E desktop/mobile em preview;
- limitações, riscos e passos manuais restantes.

Após o retorno, o agente da landing deve atualizar `DEC-004`, configurar
`PUBLIC_APP_*` com os destinos aprovados e executar `INT-004`/`T-CTA-002`/
`T-UTM-002`.

## 10. Critério de conclusão

O trabalho do app está pronto para aceite quando:

- cadastro e login possuem destinos diretos, estáveis e HTTPS;
- `/dashboard` permanece protegido e fora dos CTAs;
- somente as cinco UTMs são aceitas;
- não existe open redirect, propagação de PII ou persistência não aprovada;
- comportamento pós-auth e OAuth está documentado;
- testes unitários e E2E desktop/mobile passam;
- o responsável técnico do app fornece todas as evidências da seção 9.

## 11. Retorno recebido e validação

Repositório do app: `https://github.com/arjdev69/finntrackhome`
Branch validada: `main`

Entregas:

- `f1a7919`: rotas diretas `/cadastro` e `/entrar`;
- `4e104a3`: parser com allowlist das cinco UTMs;
- `ee88d6c`: contexto de aquisição somente em memória;
- `f2c18fd`: E2E desktop/mobile dos fluxos de aquisição;
- `docs/29-Landing-Integration-Evidence.md`: evidência devolvida pelo app.

Resultados confirmados em 2026-07-24:

- testes focados de rotas/campanha/adaptador: 7/7;
- E2E do app: 4/4 em Chromium desktop e mobile;
- `/cadastro` publicado abre “Crie sua conta grátis”;
- `/entrar` publicado abre “Acesse sua conta”;
- `/dashboard` sem sessão encaminha para `/entrar`;
- smoke externo em 360×800 e 1440×900 sem overflow;
- parâmetros sensíveis não preenchem o formulário;
- o bundle publicado contém somente a allowlist e captura em memória.

A execução permite encerrar `D0-003` no escopo de rotas diretas e contrato seguro
de entrada. Ela não encerra `DEC-004` ou `INT-004`: cadastro/login reais,
origins/callbacks OAuth e atribuição persistente consent-aware ainda exigem
configuração, decisão e E2E próprios.
