export const dashboardPreview = Object.freeze({
  sourceRepository: 'FinntrackHome',
  sourceScreen: 'src/features/dashboard/DashboardScreen.tsx',
  capturedAt: '2026-07-21',
  capturedPeriod: 'junho de 2026',
  dataClassification: 'synthetic-demo',
  approvalStatus: 'final-approved',
  transformation:
    'Recorte da área principal, remoção da identidade demonstrativa e localização de dois rótulos genéricos.',
  altText:
    'Dashboard do FinnTrack Home com receitas, despesas, saldo mensal, contas vencidas, gráficos do período e visão dos imóveis.',
});

export const dashboardPreviewEnUS = Object.freeze({
  sourceRepository: 'FinntrackHome',
  sourceScreen: 'src/features/dashboard/DashboardScreen.tsx',
  capturedAt: '2026-07-31',
  capturedPeriod: 'June 2026',
  dataClassification: 'synthetic-demo',
  approvalStatus: 'final-approved',
  transformation:
    'Localized en-US variant of the approved synthetic dashboard; layout and values preserved, with BRL explicitly identified.',
  altText:
    'FinnTrack Home dashboard showing rental income, expenses, monthly balance, overdue bills, period charts, and a property overview.',
});

export const assetApprovals = Object.freeze({
  designBrand: 'approved-2026-07-21',
  technical: 'approved-2026-07-21',
  privacy: 'approved-independent-review-2026-07-21',
  product: 'approved-by-product-2026-07-21',
});

export const enUSAssetApprovals = Object.freeze({
  designBrand: 'approved-by-project-owner-2026-07-30',
  technical: 'validated-2026-07-31',
  privacy: 'approved-by-project-owner-2026-07-30',
  product: 'approved-by-project-owner-2026-07-30',
});

export const assetInventory = Object.freeze([
  {
    path: 'src/assets/brand/finntrack-home-logo.svg',
    purpose: 'Logo horizontal principal',
    origin: 'Criação vetorial própria para a landing',
    productReference: 'Identidade FinnTrack Home v1',
    createdAt: '2026-07-21',
    dimensions: '640x128',
    sha256: 'c31a5257fada9bd62a5ad115a85b552824db54a91a52413bdcaf9eb93c2d762c',
    dataClassification: 'brand-no-personal-data',
    approvals: assetApprovals,
  },
  {
    path: 'src/assets/brand/finntrack-home-mark.svg',
    purpose: 'Marca compacta',
    origin: 'Criação vetorial própria para a landing',
    productReference: 'Identidade FinnTrack Home v1',
    createdAt: '2026-07-21',
    dimensions: '128x128',
    sha256: '7152dbeda4ce257953e63c43230a20a05b879b2d10a4ef3b49986717256c1363',
    dataClassification: 'brand-no-personal-data',
    approvals: assetApprovals,
  },
  {
    path: 'public/favicon.png',
    purpose: 'Favicon PNG',
    origin: 'Exportação da marca compacta',
    productReference: 'Identidade FinnTrack Home v1',
    createdAt: '2026-07-21',
    dimensions: '64x64',
    sha256: '6edae6c2cb0395349c5388b1fa41e1d3fd5e1ab2ce3560f4a10619a508339a7d',
    dataClassification: 'brand-no-personal-data',
    approvals: assetApprovals,
  },
  {
    path: 'public/apple-touch-icon.png',
    purpose: 'Ícone Apple touch',
    origin: 'Exportação da marca compacta',
    productReference: 'Identidade FinnTrack Home v1',
    createdAt: '2026-07-21',
    dimensions: '180x180',
    sha256: '7c1ff8484e6d9ad2b8c0a810c9d89f6ef9b44921c852cb63ff6a8c0a44e25cf9',
    dataClassification: 'brand-no-personal-data',
    approvals: assetApprovals,
  },
  {
    path: 'public/social-card.png',
    purpose: 'Card social',
    origin: 'Composição própria baseada na identidade e copy aprovadas',
    productReference: 'Landing FinnTrack Home v1',
    createdAt: '2026-07-21',
    dimensions: '1200x630',
    sha256: '0eb9130b915a844f139a01da6970a07fb94d709682c7e4c1ed9e6afdfb9db6aa',
    dataClassification: 'brand-no-personal-data',
    approvals: assetApprovals,
  },
  {
    path: 'src/assets/product/dashboard-final-pt-br.png',
    purpose: 'Demonstração do dashboard no Hero e ProductPreview',
    origin: 'Captura real do repositório FinntrackHome, higienizada e reencodada',
    productReference: 'src/features/dashboard/DashboardScreen.tsx; período junho de 2026',
    createdAt: '2026-07-21',
    dimensions: '1160x716',
    sha256: '7181e747d9fe304dff5d550920f683e07dbd9befc4ebb4d282c4de63a2235588',
    dataClassification: 'synthetic-demo-no-identifiers',
    approvals: assetApprovals,
  },
  {
    path: 'src/assets/product/dashboard-final-en-us.png',
    purpose: 'en-US dashboard demonstration in Hero and ProductPreview',
    origin: 'Localized variant of the approved synthetic FinntrackHome dashboard',
    productReference:
      'src/features/dashboard/DashboardScreen.tsx; June 2026; locale en-US; currency BRL',
    createdAt: '2026-07-31',
    dimensions: '1160x716',
    sha256: '7e8e6403cfdc870dd53dfcf06cfa7cd947dcbc25a122e793507582038c9bc494',
    dataClassification: 'synthetic-demo-no-identifiers',
    locale: 'en-US',
    currency: 'BRL',
    approvals: enUSAssetApprovals,
  },
]);
