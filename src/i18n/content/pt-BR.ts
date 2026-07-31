import type { HomeContent } from './types';

export const ptBRHomeContent = Object.freeze({
  locale: 'pt-BR',
  governance: Object.freeze({
    reviewer: 'Produto/Conteúdo — Bruno Araujo',
    reviewedAt: '2026-07-21',
    status: 'approved',
  }),
  seo: Object.freeze({
    title: 'Controle Financeiro de Imóveis e Aluguéis | FinnTrack Home',
    description:
      'Organize receitas, despesas e contas vencidas dos seus imóveis. Acompanhe o resultado mensal de cada propriedade com o FinnTrack Home.',
    canonicalPath: '/',
    imagePath: '/social-card.png',
    heading: 'Saiba quais imóveis realmente dão lucro.',
    type: 'website',
    openGraphLocale: 'pt_BR',
    socialImageAlt: 'FinnTrack Home — controle financeiro para proprietários de imóveis.',
  }),
  shell: Object.freeze({
    skipLink: 'Pular para o conteúdo',
    homeLinkLabel: 'FinnTrack Home — página inicial',
    primaryNavigationLabel: 'Navegação principal',
    mobileNavigationLabel: 'Navegação móvel',
    mobileMenuLabel: 'Menu',
    mobileMenuSupplement: 'de navegação',
    languageSelectorLabel: 'Idioma',
    switchLanguageLabel: 'Alterar idioma para',
    currentLanguageLabel: 'idioma atual',
    footerLabel: 'Rodapé',
    footerNavigationLabel: 'Navegação do rodapé',
  }),
  header: Object.freeze({
    navigation: Object.freeze([
      Object.freeze({ anchor: 'features', label: 'Recursos' }),
      Object.freeze({ anchor: 'howItWorks', label: 'Como funciona' }),
      Object.freeze({ anchor: 'audience', label: 'Para quem' }),
    ]),
    loginLabel: 'Entrar',
    signupLabel: 'Criar conta',
  }),
  hero: Object.freeze({
    eyebrow: 'Controle financeiro para proprietários',
    title: 'Saiba quais imóveis realmente dão lucro.',
    description:
      'Organize receitas, despesas e contas vencidas. Veja o resultado mensal de cada imóvel em um só lugar.',
    secondaryCtaLabel: 'Ver como funciona',
    dashboardAltText:
      'Dashboard do FinnTrack Home com receitas, despesas, saldo mensal, contas vencidas, gráficos do período e visão dos imóveis.',
    figureCaption: 'Visão real do produto com dados demonstrativos de junho de 2026.',
  }),
  problem: Object.freeze({
    eyebrow: 'O problema',
    title: 'Seu fechamento mensal não precisa depender de várias planilhas.',
    description:
      'Quando a informação fica espalhada, entender o resultado de cada imóvel exige conferências manuais e repetitivas.',
    situations: Object.freeze([
      'Informações espalhadas em diferentes controles.',
      'Contas que podem passar despercebidas.',
      'Dificuldade para calcular o resultado líquido.',
      'Comparação trabalhosa entre imóveis.',
      'Fechamento mensal feito manualmente.',
    ]),
  }),
  benefits: Object.freeze({
    eyebrow: 'Benefícios',
    title: 'O essencial para acompanhar sua carteira.',
    description:
      'Informações financeiras organizadas para você entender cada imóvel e comparar os resultados do período.',
    items: Object.freeze([
      Object.freeze({
        title: 'Resultado mensal por imóvel',
        description: 'Receitas, despesas e saldo organizados por período.',
        icon: 'monthly-result',
      }),
      Object.freeze({
        title: 'Contas sob controle',
        description: 'Itens pagos, pendentes e vencidos ficam visíveis.',
        icon: 'accounts',
      }),
      Object.freeze({
        title: 'Comparação da carteira',
        description: 'Veja quais imóveis tiveram melhor e pior resultado no período.',
        icon: 'comparison',
      }),
    ]),
  }),
  howItWorks: Object.freeze({
    eyebrow: 'Como funciona',
    title: 'Do cadastro ao fechamento mensal.',
    description:
      'Uma rotina simples para manter as movimentações organizadas e acompanhar o resultado de cada período.',
    stepLabel: 'Passo',
    steps: Object.freeze([
      Object.freeze({
        title: 'Cadastre seus imóveis.',
        description: 'Reúna os imóveis que você acompanha em uma única carteira.',
      }),
      Object.freeze({
        title: 'Registre receitas e despesas.',
        description: 'Organize as entradas e as contas de cada imóvel ao longo do mês.',
      }),
      Object.freeze({
        title: 'Acompanhe o resultado de cada mês.',
        description: 'Consulte receitas, despesas e saldo por imóvel e por período.',
      }),
    ]),
  }),
  productPreview: Object.freeze({
    eyebrow: 'Demonstração do produto',
    title: 'Uma visão clara da sua carteira.',
    description:
      'KPIs do período, gráficos de receitas e despesas e a visão dos imóveis reunidos no mesmo painel.',
    badge: 'Captura do produto · dados demonstrativos',
    dashboardAltText:
      'Dashboard do FinnTrack Home com receitas, despesas, saldo mensal, contas vencidas, gráficos do período e visão dos imóveis.',
    caption:
      'Dashboard real do ambiente demonstrativo, período de junho de 2026; os dados exibidos são sintéticos.',
  }),
  audience: Object.freeze({
    eyebrow: 'Para quem',
    title: 'Feito para quem administra a própria carteira.',
    description:
      'Uma visão financeira centralizada para acompanhar carteiras pequenas sem depender de controles espalhados.',
    profiles: Object.freeze([
      Object.freeze({
        title: 'Proprietários de imóveis',
        description: 'Para quem acompanha receitas, despesas e contas dos próprios imóveis.',
      }),
      Object.freeze({
        title: 'Pequenos investidores',
        description: 'Para quem precisa comparar o resultado dos imóveis ao longo dos meses.',
      }),
      Object.freeze({
        title: 'Quem quer deixar as planilhas',
        description: 'Para reunir a visão financeira da carteira em um único painel.',
      }),
    ]),
    scopeLabel: 'Limite de escopo:',
    limitation:
      'O FinnTrack Home é um painel financeiro para carteiras pequenas. Não é um sistema operacional completo para grandes imobiliárias.',
  }),
  faq: Object.freeze({
    eyebrow: 'Perguntas frequentes',
    title: 'Dúvidas comuns, respostas diretas.',
    description:
      'Confira como o FinnTrack Home se encaixa na rotina de quem administra uma carteira pequena.',
    items: Object.freeze([
      Object.freeze({
        id: 'instalacao',
        question: 'Preciso instalar alguma coisa?',
        answer:
          'Não. O FinnTrack Home funciona pela web e pode ser acessado diretamente pelo navegador.',
      }),
      Object.freeze({
        id: 'varios-imoveis',
        question: 'Posso acompanhar vários imóveis?',
        answer:
          'Sim. Atualmente, uma conta pode cadastrar até três imóveis e acompanhar receitas, despesas e resultado por imóvel e período.',
      }),
      Object.freeze({
        id: 'informacoes-controladas',
        question: 'Quais informações consigo controlar?',
        answer:
          'Imóveis, receitas, despesas, contas pagas, pendentes e vencidas, resultados mensais e comparações da carteira.',
      }),
      Object.freeze({
        id: 'protecao-dados',
        question: 'Meus dados ficam protegidos?',
        answer:
          'O app usa autenticação e regras de acesso por usuário. Nenhum sistema elimina todos os riscos; consulte a Política de Privacidade para entender como os dados são tratados.',
      }),
      Object.freeze({
        id: 'escopo-profissional',
        question: 'O FinnTrack substitui uma imobiliária ou um contador?',
        answer:
          'Não. Ele organiza e apresenta informações financeiras da carteira; não substitui serviços contábeis, jurídicos ou operacionais.',
      }),
      Object.freeze({
        id: 'uso-celular',
        question: 'Posso usar no celular?',
        answer: 'Sim. O app funciona pelo navegador e sua interface se adapta a telas menores.',
      }),
    ]),
  }),
  finalCta: Object.freeze({
    eyebrow: 'Comece a organizar sua carteira',
    title: 'Descubra quais imóveis realmente dão resultado.',
    description:
      'Centralize receitas, despesas e contas para acompanhar cada mês com mais clareza.',
  }),
  footer: Object.freeze({
    description: 'Controle financeiro de imóveis para proprietários e pequenas carteiras.',
    loginLabel: 'Entrar',
    privacyLabel: 'Privacidade',
    termsLabel: 'Termos',
    supportLabel: 'Suporte',
    rightsLabel: 'Todos os direitos reservados.',
    supportEmail: 'jobslens.ia@gmail.com',
    legalLinksAvailable: true,
  }),
} satisfies HomeContent);
