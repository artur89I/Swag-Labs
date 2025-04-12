import { test, expect } from '@playwright/test';

test.describe('Swag Labs Sorting Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Sort by Name: A to Z', async ({ page }) => {
    await page.selectOption('[data-test="product_sort_container"]', 'az');
    const itemNames = await page.$$eval('.inventory_item_name', nodes => nodes.map(n => n.textContent));
    const sorted = [...itemNames].sort((a, b) => a.localeCompare(b));
    expect(itemNames).toEqual(sorted);
  });

  test('Sort by Name: Z to A', async ({ page }) => {
    await page.selectOption('[data-test="product_sort_container"]', 'za');
    const itemNames = await page.$$eval('.inventory_item_name', nodes => nodes.map(n => n.textContent));
    const sorted = [...itemNames].sort((a, b) => b.localeCompare(a));
    expect(itemNames).toEqual(sorted);
  });

  test('Sort by Price: Low to High', async ({ page }) => {
    await page.selectOption('[data-test="product_sort_container"]', 'lohi');
    const prices = await page.$$eval('.inventory_item_price', nodes =>
      nodes.map(n => parseFloat(n.textContent.replace('$', '')))
    );
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Sort by Price: High to Low', async ({ page }) => {
    await page.selectOption('[data-test="product_sort_container"]', 'hilo');
    const prices = await page.$$eval('.inventory_item_price', nodes =>
      nodes.map(n => parseFloat(n.textContent.replace('$', '')))
    );
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
