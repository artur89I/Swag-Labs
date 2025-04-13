import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Swag Labs Product Sort Tests (Playwright)', () => {
  let loginPage, inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.waitForLoaded();
  });

  
  test('Products are sorted from low to high', async ({ page }) => {
    await inventoryPage.sortBy('lohi');

    const prices = await page.$$eval('.inventory_item_price', els =>
      els.map(el => parseFloat(el.textContent.replace('$', '')))
    );

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  
  test('Products are sorted from high to low', async ({ page }) => {
    await inventoryPage.sortBy('hilo');

    const prices = await page.$$eval('.inventory_item_price', els =>
      els.map(el => parseFloat(el.textContent.replace('$', '')))
    );

    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  
  test('Products are sorted from Z to A', async ({ page }) => {
    await inventoryPage.sortBy('za');

    const names = await page.$$eval('.inventory_item_name', els =>
      els.map(el => el.textContent.trim())
    );

    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedNames);
  });

  
  test('Products are sorted from A to Z by default', async ({ page }) => {
    const names = await page.$$eval('.inventory_item_name', els =>
      els.map(el => el.textContent.trim())
    );

    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
  });
});
