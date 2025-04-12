import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Swag Labs Sorting Tests (POM)', () => {
  let loginPage, inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Sort by Name: A to Z', async ({ page }) => {
    await inventoryPage.sortBy('az');
    const names = await page.$$eval('.inventory_item_name', els => els.map(el => el.textContent));
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('Sort by Name: Z to A', async ({ page }) => {
    await inventoryPage.sortBy('za');
    const names = await page.$$eval('.inventory_item_name', els => els.map(el => el.textContent));
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('Sort by Price: Low to High', async ({ page }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await page.$$eval('.inventory_item_price', els => els.map(el => parseFloat(el.textContent.replace('$', ''))));
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Sort by Price: High to Low', async ({ page }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await page.$$eval('.inventory_item_price', els => els.map(el => parseFloat(el.textContent.replace('$', ''))));
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
