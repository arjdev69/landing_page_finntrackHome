# Especificação de UX e conteúdo

Versão: 0.1.1  
Status: approved — copy comercial, FAQ e ativos finais permanecem condicionados às decisões registradas  
Data: 2026-07-15

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

## 3. Cabeçalho

- Marca: `FinnTrack Home` e logotipo aprovado.
- Âncoras: `Recursos`, `Como funciona`, `Para quem`.
- Link secundário: `Entrar`.
- CTA principal: `Começar gratuitamente`.
- Em mobile, o CTA principal continua visível ou permanece acessível no primeiro
  nível do menu.

## 4. Hero

Eyebrow:

> Controle financeiro para proprietários

Título:

> Saiba quais imóveis realmente dão lucro.

Descrição:

> Organize receitas, despesas e contas vencidas. Veja o resultado mensal de cada
> imóvel em um só lugar.

Ações:

- `Começar gratuitamente` → cadastro no app.
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

As respostas abaixo são rascunhos verificáveis, não aprovação jurídica/comercial.

### Preciso instalar alguma coisa?

Não. O FinnTrack Home funciona pela web. A possibilidade de instalação como PWA
pertence ao app e só deve ser mencionada se estiver validada em produção.

### Posso acompanhar vários imóveis?

Sim. O app permite cadastrar imóveis e acompanhar receitas, despesas e resultado
por imóvel e período.

### Quais informações consigo controlar?

Imóveis, receitas, despesas, contas pagas, pendentes e vencidas, resultados
mensais e comparações da carteira, conforme as funções disponíveis no app.

### Meus dados ficam protegidos?

O app usa autenticação e regras de acesso por usuário. A resposta final deve
referenciar a política publicada e evitar garantia absoluta de segurança.

### O FinnTrack substitui uma imobiliária ou um contador?

Não. Ele organiza e apresenta informações financeiras da carteira; não substitui
serviços contábeis, jurídicos ou operacionais.

### Posso usar no celular?

Sim. O app e a landing são responsivos. A afirmação deve ser confirmada pelos
testes de produção antes da publicação.

### O acesso é gratuito durante a fase beta?

**PENDENTE (`DEC-005`)**. Não publicar resposta até a decisão comercial.

## 11. CTA final

Título:

> Descubra quais imóveis realmente dão resultado.

Ação: `Começar gratuitamente`.

O adjetivo “gratuitamente” depende da decisão comercial sobre o beta; se essa
decisão mudar, todos os CTAs devem ser alterados por fonte de conteúdo única.

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
