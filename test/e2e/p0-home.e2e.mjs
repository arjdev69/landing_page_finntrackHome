import { expect, test } from '@playwright/test';
import { URL } from 'node:url';

const signupPath = 'https://finntrackhome.app/cadastro';
const loginPath = 'https://finntrackhome.app/entrar';

function collectRuntimeErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test('T-ROUTE-001/T-HOME-001 serves the complete home with one H1', async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/FinnTrack Home/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Saiba quais imóveis realmente dão lucro.',
  );
  await expect(page.locator('main#main-content')).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('#recursos')).toBeAttached();
  await expect(page.locator('#como-funciona')).toBeAttached();
  await expect(page.locator('#demonstracao')).toBeAttached();
  await expect(page.locator('#para-quem')).toBeAttached();
  expect(errors).toEqual([]);
});

test('T-ASSET-001 renders the approved, contextual product assets', async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  await page.goto('/');

  const approvedAsset = page.locator('[data-asset-role="final-dashboard-preview"]');
  await expect(approvedAsset).toHaveAttribute('data-asset-status', 'final-approved');

  const dashboardImages = page.getByRole('img', {
    name: /Dashboard do FinnTrack Home com receitas, despesas, saldo mensal/,
  });
  await expect(dashboardImages).toHaveCount(2);
  for (const image of await dashboardImages.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() => image.evaluate((element) => element.naturalWidth), { timeout: 10_000 })
      .toBeGreaterThan(0);
  }

  await expect(page.getByText('Captura do produto · dados demonstrativos')).toBeVisible();
  await expect(page.getByText(/os dados exibidos são sintéticos/i)).toBeAttached();
  expect(errors).toEqual([]);
});

test('T-I18N-CONT-002 renders the localized en-US product images', async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  const response = await page.goto('/en/');

  expect(response?.status()).toBe(200);
  const approvedAsset = page.locator('[data-asset-role="final-dashboard-preview"]');
  await expect(approvedAsset).toHaveAttribute('data-asset-status', 'final-approved');

  const dashboardImages = page.getByRole('img', {
    name: /FinnTrack Home dashboard showing rental income, expenses, monthly balance/,
  });
  await expect(dashboardImages).toHaveCount(2);
  for (const image of await dashboardImages.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() => image.evaluate((element) => element.naturalWidth), { timeout: 10_000 })
      .toBeGreaterThan(0);
  }

  await expect(page.getByText('Product screenshot · synthetic data')).toBeVisible();
  await expect(page.getByText(/all displayed data is synthetic/i)).toBeAttached();
  expect(errors).toEqual([]);
});

test('T-CONTENT-001 exposes approved audience, FAQ, footer and support content', async ({
  page,
}) => {
  const errors = collectRuntimeErrors(page);
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Feito para quem administra a própria carteira.' }),
  ).toBeVisible();
  await expect(page.locator('#para-quem li')).toHaveCount(3);

  const faqItems = page.locator('[data-faq-id]');
  await expect(faqItems).toHaveCount(6);
  const firstFaq = faqItems.first();
  await firstFaq.locator('summary').click();
  await expect(firstFaq).toHaveAttribute('open', '');
  await expect(firstFaq.locator('p')).toBeVisible();

  const footer = page.getByRole('contentinfo', { name: 'Rodapé' });
  await expect(footer.getByRole('link', { name: 'Privacidade' })).toHaveAttribute(
    'href',
    '/privacidade',
  );
  await expect(footer.getByRole('link', { name: 'Termos' })).toHaveAttribute('href', '/termos');
  await expect(footer.getByRole('link', { name: 'Suporte' })).toHaveAttribute(
    'href',
    'mailto:jobslens.ia@gmail.com',
  );
  await expect(footer).toContainText('Controle financeiro de imóveis');

  const homeText = await page.locator('main').innerText();
  expect(homeText).not.toMatch(/beta|preço|assinatura|cobrança automática/i);
  expect(errors).toEqual([]);
});

test('T-NAV-001 operates the responsive navigation from keyboard', async ({ page }, testInfo) => {
  const errors = collectRuntimeErrors(page);
  await page.goto('/');

  if (testInfo.project.name === 'desktop-chromium') {
    const resources = page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Recursos' });
    await expect(resources).toHaveAttribute('href', '#recursos');
    await resources.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#recursos$/);
    await expect(page.locator('#recursos')).toBeInViewport();
  } else {
    const navigation = page.locator('[data-mobile-navigation]');
    const summary = navigation.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(navigation).toHaveAttribute('open', '');
    await expect(page.getByRole('navigation', { name: 'Navegação móvel' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(navigation).not.toHaveAttribute('open', '');
    await expect(summary).toBeFocused();
  }

  expect(errors).toEqual([]);
});

test('T-CTA-002 reaches the published signup and login routes', async ({ page, request }) => {
  const errors = collectRuntimeErrors(page);
  await page.goto('/');

  await expect(
    page.locator('a[data-app-link][data-destination-type="signup"]').first(),
  ).toHaveAttribute('href', signupPath);
  await expect(
    page.locator('a[data-app-link][data-destination-type="login"]').first(),
  ).toHaveAttribute('href', loginPath);

  for (const destination of [signupPath, loginPath]) {
    const response = await request.get(destination);
    expect(response.status(), `${destination} deve responder HTTP 200`).toBe(200);
    const finalUrl = new URL(response.url());
    expect(`${finalUrl.origin}${finalUrl.pathname}`).toBe(destination);
  }

  expect(errors).toEqual([]);
});

test('T-CTA-001 exposes configured signup/login destinations without blocking navigation', async ({
  page,
}) => {
  const errors = collectRuntimeErrors(page);
  await page.goto('/');

  const signupLinks = page.locator('a[data-app-link][data-destination-type="signup"]');
  const loginLinks = page.locator('a[data-app-link][data-destination-type="login"]');
  await expect(signupLinks).toHaveCount(4);
  await expect(loginLinks).toHaveCount(3);

  for (const link of await signupLinks.all())
    await expect(link).toHaveAttribute('href', signupPath);
  for (const link of await loginLinks.all()) await expect(link).toHaveAttribute('href', loginPath);

  const secondary = page.getByRole('link', { name: 'Ver como funciona' });
  await expect(secondary).toHaveAttribute('href', '#demonstracao');
  await secondary.click();
  await expect(page).toHaveURL(/#demonstracao$/);
  expect(errors).toEqual([]);
});

test('T-UTM-001 enriches app links with the allowlist and discards sensitive query keys', async ({
  page,
}) => {
  const errors = collectRuntimeErrors(page);
  await page.goto(
    '/?utm_source=google&utm_medium=paid%20social&utm_campaign=im%C3%B3veis&email=pessoa%40example.com&redirect=https%3A%2F%2Fevil.invalid%2F#private',
  );

  const signup = page.locator('a[data-app-link][data-destination-type="signup"]').first();
  await expect.poll(async () => signup.getAttribute('href')).toContain('utm_campaign=im%C3%B3veis');

  const destination = new URL(await signup.getAttribute('href'));
  expect(destination.searchParams.get('utm_source')).toBe('google');
  expect(destination.searchParams.get('utm_medium')).toBe('paid social');
  expect(destination.searchParams.get('utm_campaign')).toBe('imóveis');
  expect(destination.searchParams.has('email')).toBe(false);
  expect(destination.searchParams.has('redirect')).toBe(false);
  expect(destination.hash).toBe('');
  expect(errors).toEqual([]);
});

test('T-UTM-003 keeps /entrar functional and forwards only allowed UTMs', async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  const response = await page.goto(
    '/entrar?utm_source=google&utm_medium=cpc&utm_term=alugu%C3%A9is&email=pessoa%40example.com&redirect=https%3A%2F%2Fevil.invalid%2F#private',
  );

  expect(response?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Entrar no FinnTrack Home');

  const login = page.getByRole('link', { name: 'Continuar para entrar' });
  await expect.poll(async () => login.getAttribute('href')).toContain('utm_term=alugu%C3%A9is');

  const destination = new URL(await login.getAttribute('href'));
  expect(destination.origin + destination.pathname).toBe(loginPath);
  expect(destination.searchParams.get('utm_source')).toBe('google');
  expect(destination.searchParams.get('utm_medium')).toBe('cpc');
  expect(destination.searchParams.get('utm_term')).toBe('aluguéis');
  expect(destination.searchParams.has('email')).toBe(false);
  expect(destination.searchParams.has('redirect')).toBe(false);
  expect(destination.hash).toBe('');
  expect(errors).toEqual([]);
});

test('T-LEGAL-001 serves approved legal routes without marketing analytics', async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  const legalRoutes = [
    {
      heading: 'Política de Privacidade',
      path: '/privacidade',
      version: 'Versão 1.2 · Vigente desde 29 de julho de 2026',
    },
    {
      heading: 'Termos de Uso',
      path: '/termos',
      version: 'Versão 1.0 · Vigente desde 27 de julho de 2026',
    },
  ];

  for (const route of legalRoutes) {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading);
    await expect(page.getByText(route.version)).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex,nofollow',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new URL(route.path, 'http://127.0.0.1:4321').href,
    );
    await expect(
      page.getByRole('link', { name: /jobslens\.ia@gmail\.com/ }).first(),
    ).toHaveAttribute('href', /^mailto:jobslens\.ia@gmail\.com/u);
    await expect(page.locator('[data-analytics-page], [data-analytics-event]')).toHaveCount(0);
    expect((await page.locator('body').innerText()).toLowerCase()).not.toMatch(
      /rascunho|não aprovado|lorem ipsum|\btodo\b|\btbd\b/u,
    );
  }

  expect(errors).toEqual([]);
});

test('T-ROUTE-001/T-404-001 serves the recovery page with a real 404 status', async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  const response = await page.goto('/rota-inexistente-e2e');

  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle('Página não encontrada | FinnTrack Home');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página não encontrada');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Voltar à página inicial' })).toHaveAttribute(
    'href',
    '/',
  );
  await expect(page.locator('[data-analytics-page], [data-analytics-event]')).toHaveCount(0);
  expect(await page.locator('body').textContent()).not.toContain('landing_view');
  expect(
    errors.filter(
      (error) =>
        error !== 'Failed to load resource: the server responded with a status of 404 (Not Found)',
    ),
  ).toEqual([]);
});
