import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

function collectRuntimeErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test('T-A11Y-001/T-A11Y-002 has no detectable WCAG 2.2 A/AA violations', async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  for (const route of ['/', '/en/']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations, route).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('T-I18N-A11Y-001/T-I18N-A11Y-002 exposes real locale links and the current language', async ({
  page,
}, testInfo) => {
  await page.goto('/en/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  if (testInfo.project.name === 'mobile-chromium') {
    await page.locator('[data-mobile-navigation] summary').click();
  }
  const selector = page.getByRole('group', { name: 'Language' }).first();
  const portuguese = selector.getByRole('link', { name: 'Switch language to Português (Brasil)' });
  const english = selector.getByRole('link', { name: 'English (US) — current language' });

  await expect(portuguese).toHaveAttribute('href', '/');
  await expect(portuguese).toHaveAttribute('hreflang', 'pt-BR');
  await expect(english).toHaveAttribute('href', '/en/');
  await expect(english).toHaveAttribute('hreflang', 'en-US');
  await expect(english).toHaveAttribute('aria-current', 'page');
  if (testInfo.project.name === 'mobile-chromium') {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      if (await portuguese.evaluate((element) => element === globalThis.document.activeElement))
        break;
      await page.keyboard.press('Tab');
    }
  } else {
    await portuguese.focus();
  }
  await expect(portuguese).toBeFocused();
  await expect(portuguese).toHaveCSS('outline-style', 'solid');
});

test('T-A11Y-001/T-A11Y-006 exposes logical keyboard navigation and landmarks', async ({
  page,
}, testInfo) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.locator('main#main-content')).toBeFocused();

  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  expect(await page.locator('h1, h2, h3').allTextContents()).not.toEqual([]);

  if (testInfo.project.name === 'mobile-chromium') {
    const menu = page.locator('[data-mobile-navigation]');
    const trigger = menu.locator('summary');
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('open', '');
    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveAttribute('open', '');
    await expect(trigger).toBeFocused();
  } else {
    const resources = page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Recursos' });
    await resources.focus();
    await expect(resources).toHaveCSS('outline-style', 'solid');
  }
});

test('T-A11Y-003 supports 200% text resize and 320 CSS px reflow', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 800 });
  await page.goto('/');
  await page.addStyleTag({ content: ':root { font-size: 200% !important; }' });

  const resizedDimensions = await page.evaluate(() => ({
    clientWidth: globalThis.document.documentElement.clientWidth,
    offenders: [...globalThis.document.querySelectorAll('body *')]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          className: element.getAttribute('class'),
          right: Math.round(rect.right),
          tagName: element.tagName,
          text: element.textContent?.trim().slice(0, 80),
        };
      })
      .filter(({ right }) => right > globalThis.document.documentElement.clientWidth),
    scrollWidth: globalThis.document.documentElement.scrollWidth,
  }));

  expect(
    resizedDimensions.scrollWidth,
    JSON.stringify(resizedDimensions.offenders.slice(0, 10), null, 2),
  ).toBeLessThanOrEqual(resizedDimensions.clientWidth);

  await page.setViewportSize({ width: 320, height: 800 });
  await page.reload();
  const reflowDimensions = await page.evaluate(() => ({
    clientWidth: globalThis.document.documentElement.clientWidth,
    scrollWidth: globalThis.document.documentElement.scrollWidth,
  }));

  expect(reflowDimensions.scrollWidth).toBeLessThanOrEqual(reflowDimensions.clientWidth);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#demonstracao')).toBeAttached();
  await expect(page.locator('#faq-heading')).toBeAttached();
});

test('T-A11Y-004/T-A11Y-005 honors reduced motion and minimum target size', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  expect(
    await page
      .locator('html')
      .evaluate((element) => globalThis.getComputedStyle(element).scrollBehavior),
  ).toBe('auto');

  const targets = await page
    .locator('a:visible:not(p a), button:visible, summary:visible')
    .evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        const styles = globalThis.getComputedStyle(element);
        return {
          height: rect.height,
          label:
            element.getAttribute('aria-label') ?? element.textContent?.trim() ?? element.tagName,
          transitionDurationSeconds: Number.parseFloat(styles.transitionDuration),
          width: rect.width,
        };
      }),
    );

  expect(targets.length).toBeGreaterThan(0);
  for (const target of targets) {
    expect.soft(target.width, `${target.label}: largura`).toBeGreaterThanOrEqual(24);
    expect.soft(target.height, `${target.label}: altura`).toBeGreaterThanOrEqual(24);
    expect
      .soft(target.transitionDurationSeconds, `${target.label}: movimento reduzido`)
      .toBeLessThanOrEqual(0.001);
  }
});
