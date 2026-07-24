import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import { expect, test } from '@playwright/test';

const viewports = [
  { width: 320, height: 800 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

function collectRuntimeErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

for (const viewport of viewports) {
  test(`T-RWD-001..003 validates ${viewport.width}x${viewport.height}`, async ({
    browser,
    page,
  }, testInfo) => {
    const errors = collectRuntimeErrors(page);
    testInfo.annotations.push({ type: 'browser-version', description: browser.version() });
    await page.setViewportSize(viewport);

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('[data-asset-role="final-dashboard-preview"] img')).toBeVisible();

    const lazyProductImage = page.locator('#demonstracao img');
    await lazyProductImage.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        lazyProductImage.evaluate(
          (image) =>
            image instanceof globalThis.HTMLImageElement &&
            image.complete &&
            image.naturalWidth > 0,
        ),
      )
      .toBe(true);

    const dimensions = await page.evaluate(() => ({
      clientWidth: globalThis.document.documentElement.clientWidth,
      scrollWidth: globalThis.document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

    const mobileNavigation = page.locator('[data-mobile-navigation]');
    if (viewport.width < 1024) {
      const trigger = mobileNavigation.locator('summary');
      await expect(trigger).toBeVisible();
      await trigger.focus();
      await page.keyboard.press('Enter');
      await expect(mobileNavigation).toHaveAttribute('open', '');
      await page.keyboard.press('Escape');
      await expect(mobileNavigation).not.toHaveAttribute('open', '');
      await expect(trigger).toBeFocused();
    } else {
      await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
      await expect(mobileNavigation).toBeHidden();
    }

    const faq = page.locator('[data-faq-id]').first();
    await faq.locator('summary').click();
    await expect(faq).toHaveAttribute('open', '');
    await expect(
      page.locator('a[data-app-link][data-destination-type="signup"]:visible'),
    ).not.toHaveCount(0);
    expect(errors).toEqual([]);

    const screenshotDirectory = path.resolve('artifacts/compatibility');
    await mkdir(screenshotDirectory, { recursive: true });
    await page.screenshot({
      fullPage: true,
      path: path.join(screenshotDirectory, `${testInfo.project.name}-${viewport.width}.png`),
    });
  });
}
