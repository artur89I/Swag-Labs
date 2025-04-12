import { test, expect } from '@playwright/test';

test.describe('Swag Labs Product Page Checks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Each product has name, price, and image', async ({ page }) => {
    const items = await page.$$('.inventory_item');
    expect(items.length).toBeGreaterThan(0);

    for (const item of items) {
      const name = await item.$('.inventory_item_name');
      const price = await item.$('.inventory_item_price');
      const image = await item.$('img.inventory_item_img');

      expect(await name?.isVisible()).toBe(true);
      expect(await price?.isVisible()).toBe(true);
      expect(await image?.getAttribute('src')).not.toBeNull();
    }
  });
});
