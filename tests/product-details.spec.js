import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Swag Labs Product Info Checks (POM)', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Each product shows name, price, and image', async ({ page }) => {
    const items = await page.$$('.inventory_item');

    for (const item of items) {
      expect(await item.locator('.inventory_item_name').isVisible()).toBe(true);
      expect(await item.locator('.inventory_item_price').isVisible()).toBe(true);
      expect(await item.locator('img.inventory_item_img').getAttribute('src')).not.toBeNull();
    }
  });
});
