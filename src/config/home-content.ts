export const heroContent = Object.freeze({
  eyebrow: 'Controle financeiro para proprietários',
  title: 'Saiba quais imóveis realmente dão lucro.',
  description:
    'Organize receitas, despesas e contas vencidas. Veja o resultado mensal de cada imóvel em um só lugar.',
  secondaryCtaLabel: 'Ver como funciona',
});

export const problemContent = Object.freeze({
  eyebrow: 'O problema',
  title: 'Seu fechamento mensal não precisa depender de várias planilhas.',
  description:
    'Quando a informação fica espalhada, entender o resultado de cada imóvel exige conferências manuais e repetitivas.',
  situations: [
    'Informações espalhadas em diferentes controles.',
    'Contas que podem passar despercebidas.',
    'Dificuldade para calcular o resultado líquido.',
    'Comparação trabalhosa entre imóveis.',
    'Fechamento mensal feito manualmente.',
  ],
});

export type BenefitIcon = 'monthly-result' | 'accounts' | 'comparison';

export const benefits = Object.freeze([
  {
    title: 'Resultado mensal por imóvel',
    description: 'Receitas, despesas e saldo organizados por período.',
    icon: 'monthly-result',
  },
  {
    title: 'Contas sob controle',
    description: 'Itens pagos, pendentes e vencidos ficam visíveis.',
    icon: 'accounts',
  },
  {
    title: 'Comparação da carteira',
    description: 'Veja quais imóveis tiveram melhor e pior resultado no período.',
    icon: 'comparison',
  },
] satisfies ReadonlyArray<{
  title: string;
  description: string;
  icon: BenefitIcon;
}>);

export const howItWorksSteps = Object.freeze([
  {
    title: 'Cadastre seus imóveis.',
    description: 'Reúna os imóveis que você acompanha em uma única carteira.',
  },
  {
    title: 'Registre receitas e despesas.',
    description: 'Organize as entradas e as contas de cada imóvel ao longo do mês.',
  },
  {
    title: 'Acompanhe o resultado de cada mês.',
    description: 'Consulte receitas, despesas e saldo por imóvel e por período.',
  },
]);

export const audienceContent = Object.freeze({
  eyebrow: 'Para quem',
  title: 'Feito para quem administra a própria carteira.',
  description:
    'Uma visão financeira centralizada para acompanhar carteiras pequenas sem depender de controles espalhados.',
  profiles: [
    {
      title: 'Proprietários de imóveis',
      description: 'Para quem acompanha receitas, despesas e contas dos próprios imóveis.',
    },
    {
      title: 'Pequenos investidores',
      description: 'Para quem precisa comparar o resultado dos imóveis ao longo dos meses.',
    },
    {
      title: 'Quem quer deixar as planilhas',
      description: 'Para reunir a visão financeira da carteira em um único painel.',
    },
  ],
  limitation:
    'O FinnTrack Home é um painel financeiro para carteiras pequenas. Não é um sistema operacional completo para grandes imobiliárias.',
});

export const faqItems = Object.freeze([
  {
    id: 'instalacao',
    question: 'Preciso instalar alguma coisa?',
    answer:
      'Não. O FinnTrack Home funciona pela web e pode ser acessado diretamente pelo navegador.',
  },
  {
    id: 'varios-imoveis',
    question: 'Posso acompanhar vários imóveis?',
    answer:
      'Sim. Atualmente, uma conta pode cadastrar até três imóveis e acompanhar receitas, despesas e resultado por imóvel e período.',
  },
  {
    id: 'informacoes-controladas',
    question: 'Quais informações consigo controlar?',
    answer:
      'Imóveis, receitas, despesas, contas pagas, pendentes e vencidas, resultados mensais e comparações da carteira.',
  },
  {
    id: 'protecao-dados',
    question: 'Meus dados ficam protegidos?',
    answer:
      'O app usa autenticação e regras de acesso por usuário. Nenhum sistema elimina todos os riscos; consulte a Política de Privacidade para entender como os dados são tratados.',
  },
  {
    id: 'escopo-profissional',
    question: 'O FinnTrack substitui uma imobiliária ou um contador?',
    answer:
      'Não. Ele organiza e apresenta informações financeiras da carteira; não substitui serviços contábeis, jurídicos ou operacionais.',
  },
  {
    id: 'uso-celular',
    question: 'Posso usar no celular?',
    answer: 'Sim. O app funciona pelo navegador e sua interface se adapta a telas menores.',
  },
]);

export const finalCtaContent = Object.freeze({
  eyebrow: 'Comece a organizar sua carteira',
  title: 'Descubra quais imóveis realmente dão resultado.',
  description: 'Centralize receitas, despesas e contas para acompanhar cada mês com mais clareza.',
});

export const footerContent = Object.freeze({
  description: 'Controle financeiro de imóveis para proprietários e pequenas carteiras.',
  supportEmail: 'jobslens.ia@gmail.com',
});
