import { expect, test } from '@playwright/test';
import { URL } from 'node:url';

const signupPath = 'https://app.finntrack-home.com.br/cadastro';
const loginPath = 'https://app.finntrack-home.com.br/entrar';

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
