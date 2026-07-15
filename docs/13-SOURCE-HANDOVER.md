# FinnTrack Home — Handover da Landing Page

Versão: 1.0  
Status: Recomendação aprovada para criação de repositório separado  
Data: 2026-07-10  
Idioma inicial: Português do Brasil (`pt-BR`)

## 1. Objetivo deste documento

Este handover reúne o contexto necessário para criar o site público de aquisição
do FinnTrack Home em um repositório separado da aplicação principal.

O novo projeto não é apenas uma tela de login. Ele deve:

- explicar claramente o valor do FinnTrack Home;
- conquistar tráfego orgânico por meio de SEO;
- transformar visitantes em novos cadastros;
- encaminhar usuários existentes para o aplicativo;
- criar a base para futuras páginas de conteúdo e ferramentas gratuitas;
- preservar uma separação clara entre marketing público e produto autenticado.

Este documento deve ser copiado para o novo repositório como fonte inicial de
contexto do projeto.

## 2. Decisão principal

Separar o ecossistema em duas superfícies:

```text
finntrackhome.com
└── Site público de marketing, SEO, conteúdo e aquisição

app.finntrackhome.com
└── Aplicação autenticada FinnTrack Home
```

O site público atrai, explica e converte. A aplicação entrega o produto.

Se os domínios definitivos forem diferentes, a mesma separação conceitual deve
ser preservada por meio de variáveis de ambiente.

## 3. Contexto do produto

FinnTrack Home é um SaaS financeiro para proprietários e investidores
imobiliários. O produto permite acompanhar:

- imóveis cadastrados;
- receitas por imóvel e período;
- despesas por imóvel e período;
- contas pagas, pendentes e vencidas;
- resultado mensal;
- lucro ou prejuízo por imóvel;
- comparação de desempenho entre imóveis;
- relatórios financeiros.

A proposta de valor definida para o produto é:

> Saiba exatamente qual imóvel está gerando lucro ou prejuízo todos os meses.

O valor deve ser compreendido rapidamente. A landing não deve apresentar o
FinnTrack como um ERP imobiliário completo, uma imobiliária digital ou uma
plataforma de cobrança de inquilinos.

## 4. Público prioritário

### 4.1 Perfil principal

Proprietários independentes e pequenos investidores que:

- possuem aproximadamente 2 a 10 imóveis;
- administram a própria carteira;
- controlam informações em planilhas, cadernos ou WhatsApp;
- não conseguem visualizar facilmente o lucro líquido de cada imóvel;
- desejam uma solução simples, sem a complexidade de um software para grandes
  imobiliárias.

### 4.2 Perfis secundários

- proprietário com apenas um imóvel que deseja organização financeira;
- investidor construindo uma pequena carteira de imóveis;
- pequeno gestor que acompanha imóveis próprios ou de poucos familiares.

### 4.3 Público que não deve orientar o MVP da landing

- grandes imobiliárias;
- administradoras com centenas de unidades;
- pessoas procurando somente anúncios ou imóveis para alugar;
- inquilinos procurando uma área de pagamento;
- empresas que precisam de contratos, repasses, cobrança e gestão operacional
  completa.

## 5. Job to be Done

Quando administro meus imóveis e chega o fechamento do mês, quero reunir
receitas, despesas e contas em um único lugar para descobrir rapidamente quanto
cada imóvel realmente gerou de resultado e identificar o que exige atenção.

## 6. Posicionamento e mensagem

### 6.1 Categoria recomendada

> Painel financeiro para proprietários de imóveis.

Termos complementares que podem ser utilizados conforme o contexto:

- controle financeiro de imóveis;
- gestão financeira de imóveis alugados;
- acompanhamento de receitas e despesas de aluguel;
- rentabilidade por imóvel;
- controle de contas de imóveis.

### 6.2 Mensagem principal

> Saiba quais imóveis realmente dão lucro.

### 6.3 Texto de apoio

> Organize receitas, despesas e contas vencidas. Acompanhe o resultado mensal de
> cada imóvel em um só lugar.

### 6.4 CTA principal

> Começar gratuitamente

Enquanto o produto estiver validando aquisição e retenção, a comunicação pode
usar “Beta gratuito” ou “Começar gratuitamente”. Não utilizar “grátis para
sempre” sem uma decisão comercial explícita.

### 6.5 CTA secundário

> Ver como funciona

O CTA secundário deve levar o visitante até a demonstração visual do produto na
própria página, e não competir com a criação de conta.

### 6.6 Tom de voz

- claro e direto;
- profissional sem ser corporativo;
- confiável e transparente;
- educativo, sem excesso de termos financeiros;
- orientado a resultados e tranquilidade;
- sem promessas exageradas.

### 6.7 Restrições de comunicação

Não publicar números de usuários, imóveis acompanhados, economia média,
avaliações ou depoimentos sem evidência real.

Não afirmar que o produto:

- substitui contador, advogado ou imobiliária;
- garante rentabilidade;
- evita inadimplência;
- processa pagamentos;
- executa cobrança automática;
- possui funcionalidades que ainda são apenas visuais ou planejadas.

## 7. Objetivos da primeira versão

### 7.1 Objetivos

- comunicar a proposta de valor em poucos segundos;
- mostrar o produto com imagens reais;
- gerar cadastros no FinnTrack Home;
- oferecer um caminho evidente para usuários existentes entrarem no app;
- estabelecer os fundamentos técnicos de SEO;
- medir aquisição, conversão e origem dos usuários;
- funcionar muito bem em dispositivos móveis.

### 7.2 Fora de escopo inicialmente

- blog completo;
- dezenas de páginas programáticas;
- área administrativa própria;
- CMS complexo;
- autenticação dentro do site público;
- checkout ou cobrança;
- chat online;
- área de afiliados;
- tradução completa para outros idiomas;
- calculadora de rentabilidade, que está prevista para a segunda fase.

## 8. Arquitetura de informação

### 8.1 Rotas da primeira fase

```text
/
├── Landing principal
├── /entrar
├── /privacidade
├── /termos
└── /404
```

Comportamentos:

- `/` apresenta toda a narrativa comercial inicial;
- `/entrar` redireciona para a URL de login da aplicação;
- o CTA “Começar gratuitamente” direciona para o modo de cadastro da aplicação;
- `/privacidade` e `/termos` devem conter conteúdo real antes do lançamento;
- páginas inexistentes devem responder com status HTTP 404 real.

### 8.2 Expansão recomendada

```text
/
├── /controle-financeiro-de-imoveis
├── /controle-de-alugueis-para-proprietarios
├── /recursos
│   ├── /receitas-e-despesas
│   ├── /rentabilidade-por-imovel
│   └── /contas-vencidas
├── /calculadoras
│   └── /rentabilidade-de-imovel
├── /guias
│   ├── /como-controlar-alugueis
│   ├── /como-saber-se-um-imovel-da-lucro
│   └── /planilha-ou-aplicativo
├── /precos
├── /sobre
├── /privacidade
└── /termos
```

As páginas futuras somente devem ser criadas quando houver conteúdo útil,
original e suficiente para atender à intenção de busca. Não criar páginas vazias
ou variações artificiais apenas para repetir palavras-chave.

## 9. Estrutura da landing principal

### 9.1 Cabeçalho

- logotipo FinnTrack Home;
- links: Recursos, Como funciona e Para quem;
- link Entrar;
- botão Começar gratuitamente;
- menu adaptado para mobile;
- cabeçalho fixo somente se não prejudicar área útil ou desempenho.

### 9.2 Hero

Conteúdo inicial recomendado:

**Eyebrow**

> Controle financeiro para proprietários

**Título**

> Saiba quais imóveis realmente dão lucro.

**Descrição**

> Organize receitas, despesas e contas vencidas. Veja o resultado mensal de cada
> imóvel em um só lugar.

**Ações**

- Começar gratuitamente;
- Ver como funciona.

O hero deve incluir uma imagem real e legível do dashboard. Não utilizar um
mockup genérico que apresente informações ou funções inexistentes.

### 9.3 Problema

Apresentar as situações reconhecíveis pelo público:

- informações espalhadas em várias planilhas;
- contas esquecidas;
- dificuldade para calcular o resultado líquido;
- ausência de comparação entre imóveis;
- fechamento mensal trabalhoso.

### 9.4 Benefícios centrais

Priorizar três benefícios:

1. **Resultado mensal por imóvel** — receitas, despesas e saldo organizados por
   período.
2. **Contas sob controle** — itens pagos, pendentes e vencidos visíveis.
3. **Comparação da carteira** — identificação dos imóveis com melhor e pior
   desempenho.

### 9.5 Como funciona

Apresentar três passos:

1. Cadastre seus imóveis.
2. Registre receitas e despesas.
3. Acompanhe o resultado de cada mês.

### 9.6 Demonstração do produto

Utilizar screenshots reais, preferencialmente com dados demonstrativos coerentes
e sem informações pessoais. Mostrar:

- dashboard com KPIs;
- comparação entre receitas e despesas;
- lista ou visão geral de imóveis;
- contas vencidas ou pendentes.

As imagens devem ter texto alternativo descritivo e dimensões reservadas para
evitar mudança de layout durante o carregamento.

### 9.7 Para quem é

Explicar que o produto foi pensado para:

- proprietários que administram os próprios imóveis;
- investidores com pequenas carteiras;
- pessoas substituindo planilhas por uma visão centralizada.

Também esclarecer que não se trata de um sistema operacional completo para
grandes imobiliárias.

### 9.8 Perguntas frequentes

Perguntas iniciais sugeridas:

- Preciso instalar alguma coisa?
- Posso acompanhar vários imóveis?
- Quais informações consigo controlar?
- Meus dados ficam protegidos?
- O FinnTrack substitui uma imobiliária ou um contador?
- Posso usar no celular?
- O acesso é gratuito durante a fase beta?

As respostas devem refletir o comportamento real do produto no momento da
publicação.

### 9.9 CTA final

**Título**

> Descubra quais imóveis realmente dão resultado.

**Ação**

> Começar gratuitamente

### 9.10 Rodapé

- marca e descrição curta;
- link para entrar;
- política de privacidade;
- termos de uso;
- contato ou canal de suporte real;
- copyright com ano dinâmico.

## 10. Direção visual

O site deve parecer parte do mesmo produto, sem copiar o shell interno da
aplicação.

### 10.1 Linguagem visual

- moderna, limpa e profissional;
- sensação de clareza financeira;
- bastante espaço em branco;
- cards arredondados e sombras discretas;
- uso moderado de verde;
- hierarquia tipográfica forte;
- screenshots do produto como principal evidência visual;
- animações discretas e respeitando `prefers-reduced-motion`.

### 10.2 Base da marca existente

- verde principal: `#16A34A`;
- sucesso: `#22C55E`;
- perigo: `#DC2626`;
- alerta: `#F59E0B`;
- texto principal: `#0F172A`;
- texto secundário: `#64748B`;
- fundo: `#F8FAFC`;
- bordas: `#E5E7EB`;
- tipografia atual: Inter.

Esses valores devem originar tokens reutilizáveis. Evitar espalhar cores e
medidas diretamente pelos componentes.

### 10.3 Responsividade

O projeto deve ser desenhado mobile-first e validado, no mínimo, em:

- 360 px;
- 390 px;
- 768 px;
- 1024 px;
- 1440 px.

Nenhuma seção pode depender de hover para comunicar informação essencial.

## 11. Recomendação técnica

### 11.1 Stack preferencial

Para um repositório dedicado ao site público:

- Astro;
- TypeScript;
- Tailwind CSS;
- páginas estáticas por padrão;
- componentes React apenas quando houver interação real;
- conteúdo em Markdown ou MDX quando a área de guias for criada;
- testes leves para componentes e funções críticas;
- Playwright ou equivalente para o fluxo principal de conversão.

Astro é a recomendação padrão porque o site será predominantemente conteúdo
estático, com pouca necessidade de JavaScript no cliente. Next.js também é
aceitável se houver uma decisão de plataforma que justifique maior complexidade.

Não reutilizar automaticamente a arquitetura Clean Architecture da aplicação.
O site público tem responsabilidades mais simples e deve permanecer leve.

### 11.2 Variáveis de ambiente sugeridas

```text
PUBLIC_SITE_URL=https://finntrackhome.com
PUBLIC_APP_URL=https://app.finntrackhome.com
PUBLIC_APP_SIGNUP_URL=https://app.finntrackhome.com/?mode=signup
PUBLIC_APP_LOGIN_URL=https://app.finntrackhome.com/
PUBLIC_ANALYTICS_ID=
PUBLIC_SEARCH_CONSOLE_VERIFICATION=
```

Os caminhos finais de login e cadastro precisam ser confirmados com o
repositório da aplicação. Não codificar URLs de produção diretamente nos
componentes.

### 11.3 Estrutura de projeto sugerida

```text
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── Benefits.astro
│   ├── ProductPreview.astro
│   ├── HowItWorks.astro
│   ├── Audience.astro
│   ├── Faq.astro
│   └── FinalCta.astro
├── content/
│   └── guides/
├── layouts/
│   └── MarketingLayout.astro
├── pages/
│   ├── index.astro
│   ├── entrar.astro
│   ├── privacidade.astro
│   ├── termos.astro
│   └── 404.astro
├── styles/
│   └── global.css
└── config/
    ├── site.ts
    └── navigation.ts

public/
├── brand/
├── screenshots/
├── favicon.svg
├── apple-touch-icon.png
└── social-card.png
```

## 12. Integração com a aplicação

### 12.1 Fluxos

```text
Visitante novo
Landing → Começar gratuitamente → Cadastro no app → Onboarding

Usuário existente
Landing → Entrar → Login no app → Dashboard
```

### 12.2 Preservação de campanha

O site deve preservar parâmetros UTM ao encaminhar o usuário para o app, quando
possível:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

O app deve receber esses parâmetros e associá-los ao evento de cadastro ou à
primeira sessão. A solução deve respeitar as políticas de privacidade e a
configuração de consentimento adotada.

### 12.3 Contrato mínimo entre os repositórios

Antes de publicar, confirmar:

- URL de produção do app;
- URL ou parâmetro que abre diretamente o cadastro;
- URL de login;
- comportamento após autenticação;
- política de UTMs;
- nomes dos eventos compartilhados;
- origem autorizada para OAuth, se o domínio influenciar callbacks;
- identidade visual e screenshots atualizados.

## 13. SEO

### 13.1 Princípios

- conteúdo útil para pessoas, não texto criado apenas para mecanismos de busca;
- uma intenção principal por página;
- títulos e descrições exclusivos;
- URLs descritivas em português;
- HTML principal disponível sem depender da execução de JavaScript;
- links internos rastreáveis por elementos `<a href>`;
- uma URL canônica para cada conteúdo;
- páginas inexistentes com status correto;
- imagens relevantes próximas ao texto correspondente;
- conteúdo sem repetição artificial de palavras-chave.

### 13.2 Metadados iniciais da home

**Title**

> Controle Financeiro de Imóveis e Aluguéis | FinnTrack Home

**Meta description**

> Organize receitas, despesas e contas vencidas dos seus imóveis. Acompanhe o
> resultado mensal de cada propriedade com o FinnTrack Home.

**H1**

> Saiba quais imóveis realmente dão lucro.

### 13.3 Requisitos técnicos

- `lang="pt-BR"`;
- charset UTF-8;
- viewport responsivo;
- canonical absoluto;
- `robots.txt`;
- `sitemap.xml`;
- Open Graph;
- Twitter/X Card;
- favicon e ícones;
- página 404 real;
- redirecionamento consistente entre variantes `www` e sem `www`;
- HTTPS;
- Search Console configurado;
- sitemap submetido após a publicação;
- ambiente de preview protegido contra indexação;
- produção liberada para rastreamento.

### 13.4 Dados estruturados

Usar JSON-LD apenas quando os dados representarem fielmente o conteúdo visível.
Tipos iniciais possíveis:

- `Organization`;
- `WebSite`;
- `SoftwareApplication`;
- `FAQPage`, apenas se o conteúdo e as diretrizes vigentes justificarem.

Não publicar `AggregateRating`, avaliações, preço ou número de usuários sem
evidência e correspondência visível na página.

### 13.5 Palavras-chave iniciais

As seguintes hipóteses devem ser validadas com Keyword Planner e posteriormente
com Search Console:

- controle financeiro de imóveis;
- aplicativo para controle de imóveis alugados;
- controle de receitas e despesas de aluguel;
- sistema para proprietário de imóveis;
- como organizar aluguéis recebidos;
- como controlar despesas de imóveis;
- como saber se um imóvel dá lucro;
- planilha para controle de aluguel;
- calculadora de rentabilidade de imóvel.

Não interpretar esta lista como volume comprovado ou prioridade definitiva.

## 14. Performance

Objetivos de campo no percentil 75, em mobile e desktop:

- LCP menor ou igual a 2,5 segundos;
- INP menor ou igual a 200 milissegundos;
- CLS menor ou igual a 0,1.

Práticas recomendadas:

- gerar HTML estático;
- enviar o mínimo possível de JavaScript;
- otimizar e dimensionar imagens;
- usar formatos modernos quando compatíveis;
- fazer preload somente do recurso realmente crítico;
- hospedar ou carregar fontes de forma eficiente;
- evitar carrosséis pesados e vídeos automáticos no hero;
- reservar espaço para imagens e conteúdo assíncrono;
- carregar analytics sem bloquear renderização;
- testar a produção, não somente o ambiente local.

## 15. Acessibilidade

Meta mínima: WCAG 2.2 nível AA nos fluxos principais.

Requisitos:

- navegação completa por teclado;
- foco visível;
- contraste adequado;
- um único H1 por página;
- hierarquia de títulos coerente;
- landmarks semânticos;
- links e botões com nomes claros;
- menu mobile acessível;
- textos alternativos úteis;
- formulários com labels e mensagens de erro associadas;
- animações reduzidas quando solicitado pelo sistema;
- zoom e reflow sem perda de conteúdo;
- nenhum significado transmitido apenas por cor.

## 16. Analytics e conversão

### 16.1 Objetivo

Medir o caminho da origem do visitante até a ativação dentro do produto, sem
coletar dados pessoais desnecessários.

### 16.2 Eventos mínimos do site

```text
landing_view
signup_cta_click
login_click
secondary_cta_click
product_preview_view
faq_open
outbound_to_app
```

Propriedades possíveis:

```text
cta_location: header | hero | middle | footer
page_path
referrer_group
utm_source
utm_medium
utm_campaign
device_group
```

Não enviar e-mail, nome, endereço de imóvel ou outros dados pessoais como
propriedades de analytics.

### 16.3 Evento de ativação do produto

A definição recomendada de usuário ativado é:

> Usuário que cadastrou um imóvel, registrou pelo menos uma movimentação
> financeira relevante e visualizou o resultado mensal.

A implementação final desse evento pertence ao repositório do app, mas deve ser
relacionável à origem de aquisição.

### 16.4 Métricas principais

- visitantes por canal;
- cliques orgânicos sem marca;
- conversão de landing para cadastro;
- conversão por posição do CTA;
- percentual de cadastros ativados;
- tempo até o primeiro resultado mensal;
- retenção em 7 e 30 dias;
- cadastros por indicação.

Registrar uma linha de base antes de estabelecer metas percentuais definitivas.

## 17. Privacidade e conformidade

- publicar política de privacidade e termos revisados para a operação real;
- documentar ferramentas de analytics e cookies utilizadas;
- coletar somente dados necessários;
- não ativar pixels publicitários por padrão sem decisão e tratamento adequados;
- oferecer mecanismo de consentimento quando aplicável à configuração adotada;
- manter canal de contato para solicitações relacionadas a dados;
- nunca usar informações reais de usuários em screenshots.

Questões jurídicas e tributárias apresentadas em conteúdos futuros devem passar
por revisão especializada e utilizar fontes oficiais atualizadas.

## 18. Estratégia de aquisição após a landing

### 18.1 Fase 1 — Landing e beta

- publicar a landing;
- convidar os primeiros 20 a 30 proprietários;
- acompanhar sessões, cadastros e ativação;
- entrevistar usuários;
- substituir objeções presumidas por dúvidas reais;
- obter autorização explícita para depoimentos.

### 18.2 Fase 2 — Ferramenta gratuita

Criar uma calculadora de rentabilidade com:

- valor do imóvel;
- aluguel mensal;
- despesas mensais;
- vacância estimada;
- resultado mensal;
- rentabilidade bruta;
- rentabilidade líquida estimada;
- CTA para acompanhar o imóvel no FinnTrack.

As fórmulas, premissas e limitações devem ficar visíveis. A ferramenta não deve
ser apresentada como aconselhamento financeiro.

### 18.3 Fase 3 — Conteúdo SEO

Criar conteúdos a partir de problemas reais observados no uso do produto:

- como organizar aluguéis recebidos;
- como controlar despesas por imóvel;
- como calcular o resultado líquido do aluguel;
- custos que reduzem a rentabilidade;
- como substituir uma planilha de imóveis;
- fechamento financeiro mensal de uma carteira pequena.

Priorizar qualidade, exemplos práticos e utilidade. Evitar produção em massa de
artigos genéricos.

### 18.4 Fase 4 — Distribuição

- vídeos curtos demonstrando o produto;
- comunidades de proprietários e investidores;
- parcerias com corretores e contadores;
- programa simples de indicação;
- estudos de caso reais;
- mídia paga apenas após medir conversão e ativação orgânica.

## 19. Plano de execução sugerido

### Etapa 1 — Fundação

- criar repositório;
- configurar stack, lint, typecheck e testes;
- definir tokens de marca;
- configurar ambientes e deploy de preview;
- implementar layout e metadados globais.

### Etapa 2 — Landing

- implementar cabeçalho e hero;
- adicionar benefícios e como funciona;
- adicionar screenshots reais;
- adicionar público, FAQ e CTA final;
- implementar rodapé.

### Etapa 3 — Integração

- configurar URLs do app;
- implementar preservação de UTMs;
- configurar eventos;
- validar cadastro e login ponta a ponta.

### Etapa 4 — SEO, qualidade e publicação

- criar sitemap e robots;
- adicionar canonical e social cards;
- validar dados estruturados;
- testar performance e acessibilidade;
- revisar copy e afirmações;
- publicar privacidade e termos;
- conectar Search Console;
- realizar smoke test em produção.

## 20. Critérios de aceite da primeira versão

A primeira versão estará pronta quando:

- a proposta de valor estiver visível sem rolagem em desktop e mobile;
- existir um CTA principal evidente no cabeçalho, hero e final da página;
- cadastro e login direcionarem para os destinos corretos do app;
- screenshots exibirem o produto real sem dados pessoais;
- a página funcionar entre 320 px e 1440 px sem overflow horizontal;
- o conteúdo principal estiver presente no HTML entregue;
- title, description, canonical, Open Graph e idioma estiverem corretos;
- `robots.txt` e `sitemap.xml` estiverem acessíveis;
- páginas inexistentes responderem com 404;
- o ambiente de preview não for indexável;
- os eventos essenciais forem observáveis no analytics;
- UTMs forem preservadas no encaminhamento para o app;
- o fluxo landing → cadastro funcionar em mobile e desktop;
- testes automatizados, lint, typecheck e build passarem;
- não houver afirmações comerciais sem comprovação;
- política de privacidade e termos estiverem publicados;
- uma auditoria final de acessibilidade e performance não apresentar bloqueios
  críticos.

## 21. Entregáveis esperados

- repositório independente;
- README com setup e deploy;
- landing responsiva;
- páginas de privacidade, termos e 404;
- componentes reutilizáveis;
- tokens básicos da marca;
- imagens otimizadas;
- favicon, ícone e social card;
- configuração de SEO;
- sitemap e robots;
- analytics e documentação dos eventos;
- testes do fluxo principal;
- pipeline de validação;
- ambiente de preview;
- produção no domínio público.

## 22. Decisões pendentes antes da implementação final

1. Qual será o domínio oficial do site?
2. Qual será o domínio oficial da aplicação?
3. Qual URL abre diretamente o cadastro?
4. O lançamento será chamado de “Beta gratuito”?
5. Qual ferramenta de analytics será utilizada?
6. Quais ferramentas de cookies ou pixels serão utilizadas?
7. Quem fornecerá e aprovará privacidade e termos?
8. Quais screenshots definitivos serão usados?
9. Existe logotipo final em SVG e versão horizontal?
10. Qual será o canal público de suporte?
11. O inglês será lançado agora ou somente depois da validação no Brasil?
12. Qual plataforma hospedará o site?

Essas decisões não devem impedir a criação da estrutura inicial, desde que todos
os valores externos sejam configuráveis.

## 23. Checklist de handover para o novo repositório

- [ ] Copiar este documento para o novo repositório.
- [ ] Registrar as decisões da seção 22 no README ou em ADRs.
- [ ] Confirmar URLs de login e cadastro com o app.
- [ ] Exportar logotipo e ativos da marca.
- [ ] Produzir screenshots sem dados pessoais.
- [ ] Definir ferramenta de analytics.
- [ ] Definir política de UTMs entre site e app.
- [ ] Aprovar a copy final.
- [ ] Aprovar privacidade e termos.
- [ ] Configurar domínio e hospedagem.
- [ ] Configurar Search Console após publicação.
- [ ] Planejar a calculadora de rentabilidade como próxima entrega.

## 24. Referências internas

No repositório do aplicativo FinnTrack Home:

- `docs/01-Vision.md` — visão e proposta de valor;
- `docs/02-PRD.md` — escopo do produto;
- `docs/03-SRS.md` — requisitos autoritativos;
- `docs/09-UIUX-Specification.md` — linguagem visual;
- `docs/13-Security.md` — requisitos de segurança;
- `docs/14-Layout-Reference.md` — referências de interface;
- `src/features/auth/LoginScreen.tsx` — fluxo público atual;
- `src/features/dashboard/DashboardScreen.tsx` — principal evidência visual do
  produto.

## 25. Referências externas

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google JavaScript SEO Basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google — Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google — SoftwareApplication structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [web.dev — Core Web Vitals](https://web.dev/articles/vitals)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## 26. Resumo executivo

O novo repositório deve entregar um site público rápido, acessível e indexável
que apresente o FinnTrack Home como um painel financeiro para proprietários de
imóveis. A primeira versão deve concentrar esforços em uma landing de alta
qualidade e em um fluxo confiável de cadastro, evitando complexidade prematura.

A principal promessa é “Saiba quais imóveis realmente dão lucro”. O principal
público são proprietários independentes com pequenas carteiras. O principal
objetivo é transformar visitantes qualificados em usuários ativados do produto.

A expansão deve acontecer após dados reais: primeiro landing e beta, depois
calculadora de rentabilidade, conteúdo SEO, distribuição e monetização.

