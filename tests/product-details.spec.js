import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Swag Labs Product Info Checks (POM)', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForSelector('.inventory_item');
  });

  test('Each product shows name, price, and image', async ({ page }) => {
    const items = page.locator('.inventory_item');
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      await expect(item.locator('.inventory_item_name')).toBeVisible();
      await expect(item.locator('.inventory_item_price')).toBeVisible();
      const imgSrc = await item.locator('img.inventory_item_img').getAttribute('src');
      expect(imgSrc).not.toBeNull();
    }
  });
});
