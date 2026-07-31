# Especificação de UX e conteúdo

Versão: 0.2.0
Status: approved — copy `en-US` aprovada; jurídico e ativos aguardam artefatos finais
Data: 2026-07-30

## 1. Tom e princípios editoriais

- Claro, direto e profissional sem linguagem corporativa excessiva.
- Educativo sem jargão financeiro desnecessário.
- Orientado a resultado e tranquilidade, sem prometer resultado financeiro.
- “Imóvel” é a unidade principal; “propriedade” pode aparecer em metadados, mas
  a interface deve preferir consistência com o vocabulário do app em pt-BR.
- Copy deve descrever comportamento real na data do lançamento.

## 2. Metadados da home

- Title: `Controle Financeiro de Imóveis e Aluguéis | FinnTrack Home`
- Meta description: `Organize receitas, despesas e contas vencidas dos seus imóveis. Acompanhe o resultado mensal de cada propriedade com o FinnTrack Home.`
- H1: `Saiba quais imóveis realmente dão lucro.`
- Intenção principal: controle financeiro de imóveis para proprietários.

Versão `en-US` aprovada por Produto/Conteúdo em 2026-07-30:

- Title: `Rental Property Financial Tracking | FinnTrack Home`
- Meta description: `Track rental income, expenses, and overdue bills. Review each property's monthly results in one place with FinnTrack Home.`
- H1: `See how each property performs month by month.`
- Intenção principal: `rental property financial tracker for owners`

## 3. Cabeçalho

- Marca: `FinnTrack Home` e logotipo aprovado.
- Âncoras: `Recursos`, `Como funciona`, `Para quem`.
- Link secundário: `Entrar`.
- CTA principal: `Criar conta`.
- Seletor: `PT-BR` e `EN-US` como links reais, com nomes acessíveis
  `Português (Brasil)` e `English (US)`; o locale atual usa `aria-current` ou
  semântica equivalente.
- Em mobile, o CTA principal continua visível ou permanece acessível no primeiro
  nível do menu; o seletor fica dentro do menu aberto para preservar espaço no
  Header.

## 4. Hero

Eyebrow:

> Controle financeiro para proprietários

Título:

> Saiba quais imóveis realmente dão lucro.

Descrição:

> Organize receitas, despesas e contas vencidas. Veja o resultado mensal de cada
> imóvel em um só lugar.

Ações:

- `Criar conta` → cadastro no app.
- `Ver como funciona` → seção de demonstração.

Evidência visual: screenshot real do dashboard, legível, com dados demonstrativos
coerentes. Métricas decorativas de “prova social” não devem ser importadas da tela
de login atual sem evidência.

## 5. Problema

Título recomendado: `Seu fechamento mensal não precisa depender de várias planilhas.`

Situações a cobrir:

- informações espalhadas;
- contas esquecidas;
- dificuldade para calcular resultado líquido;
- comparação trabalhosa entre imóveis;
- fechamento mensal manual.

Evitar dramatização ou afirmação de que o produto elimina todo trabalho.

## 6. Benefícios

1. **Resultado mensal por imóvel**  
   Receitas, despesas e saldo organizados por período.
2. **Contas sob controle**  
   Itens pagos, pendentes e vencidos ficam visíveis.
3. **Comparação da carteira**  
   Veja quais imóveis tiveram melhor e pior resultado no período.

“Rentabilidade” só deve ser usada quando a métrica exibida corresponder ao
cálculo real do app e sua definição estiver clara.

## 7. Como funciona

1. **Cadastre seus imóveis.**
2. **Registre receitas e despesas.**
3. **Acompanhe o resultado de cada mês.**

Cada passo deve ter título, explicação curta e evidência visual ou ícone que não
seja a única forma de comunicar o significado.

## 8. Demonstração do produto

Título recomendado: `Uma visão clara da sua carteira.`

Conjunto mínimo de evidências:

- dashboard com KPIs de receita, despesa, saldo e contas vencidas;
- gráfico de receitas versus despesas;
- visão/lista de imóveis;
- contas pendentes ou vencidas.

Regras dos ativos:

- dados 100% fictícios e coerentes entre capturas;
- nenhum nome, e-mail, endereço ou identificador real;
- produto e tradução atualizados;
- recorte legível e sem UI inexistente;
- alt text descreve a informação demonstrada, não “imagem do dashboard”.

## 9. Para quem

Título recomendado: `Feito para quem administra a própria carteira.`

Incluir:

- proprietários de imóveis;
- pequenos investidores;
- pessoas substituindo planilhas por uma visão centralizada.

Limite explícito:

> O FinnTrack Home é um painel financeiro para carteiras pequenas. Não é um
> sistema operacional completo para grandes imobiliárias.

## 10. FAQ inicial

As respostas abaixo foram verificadas contra o repositório local do app em
2026-07-21. Devem ser verificadas novamente contra a versão efetivamente
publicada antes do lançamento.

### Preciso instalar alguma coisa?

Não. O FinnTrack Home funciona pela web e pode ser acessado diretamente pelo
navegador.

### Posso acompanhar vários imóveis?

Sim. Atualmente, uma conta pode cadastrar até três imóveis e acompanhar
receitas, despesas e resultado por imóvel e período.

### Quais informações consigo controlar?

Imóveis, receitas, despesas, contas pagas, pendentes e vencidas, resultados
mensais e comparações da carteira.

### Meus dados ficam protegidos?

O app usa autenticação e regras de acesso por usuário. Nenhum sistema elimina
todos os riscos; consulte a Política de Privacidade para entender como os dados
são tratados.

### O FinnTrack substitui uma imobiliária ou um contador?

Não. Ele organiza e apresenta informações financeiras da carteira; não substitui
serviços contábeis, jurídicos ou operacionais.

### Posso usar no celular?

Sim. O app funciona pelo navegador e sua interface se adapta a telas menores.

Evidência da validação: `README.md`, `src/App.tsx`,
`src/application/entitlements.ts`, `src/app/i18n/translations.ts`,
`src/infrastructure/*` e testes do repositório local `FinntrackHome`. A landing
foi validada em 360×800 e 1440×900 durante `WEB-005`.

## 11. CTA final

Título:

> Descubra quais imóveis realmente dão resultado.

Ação: `Criar conta`.

Conforme `DEC-005`, não publicar alegação de gratuidade, preço ou beta. Todos os
CTAs usam esta copy por fonte de conteúdo única.

## 12. Rodapé

- Marca e uma frase de posicionamento.
- `Entrar`, `Privacidade`, `Termos`.
- Canal de suporte real (`DEC-011`).
- Copyright com ano dinâmico.
- Nenhum link de rede social sem perfil ativo e aprovado.

## 13. Direção visual

- Moderna, limpa, profissional e coerente com o produto.
- Espaço em branco generoso, cards arredondados, bordas e sombras discretas.
- Verde como acento, não como preenchimento dominante de toda a página.
- Screenshots como principal evidência visual.
- Hierarquia tipográfica forte e motion discreto.

### Tokens de origem

| Papel | Valor inicial |
|---|---|
| primário | `#16A34A` |
| sucesso | `#22C55E` |
| perigo | `#DC2626` |
| alerta | `#F59E0B` |
| texto principal | `#0F172A` |
| texto secundário | `#64748B` |
| fundo | `#F8FAFC` |
| borda | `#E5E7EB` |
| fonte | Inter, com fallback de sistema |

Os valores são sementes para tokens semânticos. Contraste deve ser testado em
cada combinação; cor da marca não autoriza automaticamente seu uso como texto.

## 14. Responsividade

- Mobile-first.
- Validação visual mínima: 320, 360, 390, 768, 1024 e 1440 px.
- Conteúdo em coluna única no mobile quando necessário.
- Screenshots podem usar recorte responsivo, zoom controlado ou agrupamento, mas
  não podem ficar ilegíveis.
- Header, CTA e foco não se sobrepõem.
- Nenhum carrossel é necessário para o MVP.

## 15. Estados de conteúdo

- Sem JavaScript: conteúdo e links funcionam; analytics/UTMs podem degradar.
- Imagem indisponível: layout permanece estável e texto não promete evidência
  ausente; produção deve falhar antes desse estado.
- Analytics bloqueado: nenhuma mensagem ao usuário é necessária.
- URL do app inválida: build de produção falha; não publicar CTA quebrado.

## 16. Conteúdo `en-US`

O conteúdo inglês é transcriação da mesma proposta e não autoriza alegações
novas. O catálogo abaixo foi revisado e aprovado por Produto/Conteúdo em
2026-07-30, com paridade verificada contra a home `pt-BR` e os fatos do app no
commit `2e401fb061d452aff36200b50b19425f252a2e07`.

Estado do catálogo: **approved-for-implementation**. A aprovação não inclui
traduções jurídicas, screenshot, social card ou release, tratados em
`I18N-002`, `I18N-004` e `I18N-006`.

### 16.1 Metadados e shell

- Title: `Rental Property Financial Tracking | FinnTrack Home`
- Meta description: `Track rental income, expenses, and overdue bills. Review each property's monthly results in one place with FinnTrack Home.`
- H1: `See how each property performs month by month.`
- Social image alt: `FinnTrack Home — financial tracking for rental property owners.`
- Skip link: `Skip to content`
- Home link accessible name: `FinnTrack Home — home`
- Primary navigation accessible name: `Primary navigation`
- Mobile menu trigger: `Menu`; complementary screen-reader text: `navigation`
- Mobile navigation accessible name: `Mobile navigation`
- Language selector accessible name: `Language`
- Locale names: `Português (Brasil)` and `English (US)`

### 16.2 Header e Hero

- Navigation: `Features`, `How it works`, `Who it's for`
- Secondary link: `Log in`
- Primary CTA: `Create account`
- Eyebrow: `Financial tracking for rental property owners`
- H1: `See how each property performs month by month.`
- Supporting copy: `Organize rental income, expenses, and overdue bills. Track each property's monthly results in one place.`
- Secondary CTA: `See how it works`
- Dashboard alt text: `FinnTrack Home dashboard showing rental income, expenses, monthly balance, overdue bills, period charts, and a property overview.`
- Hero caption: `Actual product interface with synthetic data for June 2026.`

### 16.3 Problema

- Eyebrow: `The challenge`
- Title: `Month-end reporting shouldn't depend on multiple spreadsheets.`
- Description: `When information is scattered, understanding how each property performed requires repetitive manual checks.`
- Situations:
  - `Information spread across different tools.`
  - `Bills that can slip through the cracks.`
  - `Difficulty calculating net results.`
  - `Time-consuming comparisons across properties.`
  - `Monthly reporting completed by hand.`

### 16.4 Benefícios

- Eyebrow: `Benefits`
- Title: `The essentials for tracking your portfolio.`
- Description: `Organized financial information to help you understand each property and compare results for the period.`
- `Monthly results by property` — `Income, expenses, and balance organized by period.`
- `Bills under control` — `Paid, pending, and overdue items stay visible.`
- `Portfolio comparison` — `See which properties performed better or worse during the period.`

### 16.5 Como funciona

- Eyebrow: `How it works`
- Title: `From setup to monthly review.`
- Description: `A simple routine to keep transactions organized and review the results for each period.`
- Step label: `Step {NN}`
- `Add your properties.` — `Keep the properties you track together in one portfolio.`
- `Track income and expenses.` — `Organize each property's income and bills throughout the month.`
- `Review each month's results.` — `Review income, expenses, and balance by property and period.`

### 16.6 Demonstração do produto

- Eyebrow: `Product demo`
- Title: `A clear view of your rental portfolio.`
- Description: `Period KPIs, income and expense charts, and a property overview in one dashboard.`
- Badge: `Product screenshot · synthetic data`
- Dashboard alt text: `FinnTrack Home dashboard showing rental income, expenses, monthly balance, overdue bills, period charts, and a property overview.`
- Caption: `Dashboard from the demo environment for June 2026; all displayed data is synthetic.`

O mês visível usa `Month YYYY`. Qualquer valor futuro deve manter a moeda de
origem explicitamente identificada; a localização não autoriza conversão.

### 16.7 Para quem

- Eyebrow: `Who it's for`
- Title: `Built for owners who manage their own portfolios.`
- Description: `A centralized financial view for tracking small portfolios without relying on scattered tools.`
- `Rental property owners` — `For people who track income, expenses, and bills for their own properties.`
- `Small-scale real estate investors` — `For people who need to compare property results over time.`
- `Anyone moving beyond spreadsheets` — `Bring your portfolio's financial view together in one dashboard.`
- Scope label: `Scope limitation:`
- Limitation: `FinnTrack Home is a financial dashboard for small portfolios. It is not a full property management system for large companies.`

### 16.8 FAQ

- Eyebrow: `Frequently asked questions`
- Title: `Common questions, straightforward answers.`
- Description: `See how FinnTrack Home fits the routine of people who manage a small portfolio.`

**Do I need to install anything?**

No. FinnTrack Home works on the web and can be accessed directly from your
browser.

**Can I track multiple properties?**

Yes. An account can currently add up to three properties and track income,
expenses, and monthly results by property and period.

**What information can I track?**

Properties, income, expenses, paid, pending, and overdue bills, monthly results,
and portfolio comparisons.

**How is my data protected?**

The app uses authentication and user-level access rules. No system eliminates
all risks; review the Privacy Policy to understand how data is handled.

**Does FinnTrack Home replace a property manager or accountant?**

No. It organizes and presents your portfolio's financial information; it does
not replace accounting, legal, or property management services.

**Can I use it on my phone?**

Yes. The app works in a browser and adapts to smaller screens.

### 16.9 CTA final

- Eyebrow: `Start organizing your portfolio`
- Title: `See how each property performs.`
- Description: `Bring income, expenses, and bills together to review each month more clearly.`
- Action: `Create account`

### 16.10 Footer

- Accessible name: `Footer`
- Description: `Financial tracking for rental property owners and small portfolios.`
- Navigation accessible name: `Footer navigation`
- Links: `Log in`, `Privacy`, `Terms`, `Support`
- Copyright: `© {year} FinnTrack Home. All rights reserved.`
- Support label: `Support:`

Screenshot e social card devem usar a copy aprovada correspondente, dados
sintéticos, moeda explícita e aprovações próprias antes da integração.
