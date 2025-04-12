import { test, expect } from '@playwright/test';

test.describe('Swag Labs Price Calculation Check', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    // Add multiple items
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    // Fill form
    await page.fill('[data-test="firstName"]', 'Natasha');
    await page.fill('[data-test="lastName"]', 'Bag');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
  });

  test('Validate item total, tax, and final total', async ({ page }) => {
    // Extract item prices
    const prices = await page.$$eval('.inventory_item_price', els =>
      els.map(el => parseFloat(el.textContent.replace('$', '')))
    );
    const itemTotal = prices.reduce((acc, price) => acc + price, 0);

    // Get displayed totals
    const displayedItemTotalText = await page.locator('.summary_subtotal_label').textContent();
    const displayedTaxText = await page.locator('.summary_tax_label').textContent();
    const displayedTotalText = await page.locator('.summary_total_label').textContent();

    const displayedItemTotal = parseFloat(displayedItemTotalText.replace('Item total: $', ''));
    const displayedTax = parseFloat(displayedTaxText.replace('Tax: $', ''));
    const displayedTotal = parseFloat(displayedTotalText.replace('Total: $', ''));

    // Assertions
    expect(displayedItemTotal).toBeCloseTo(itemTotal, 2);
    expect(displayedTotal).toBeCloseTo(itemTotal + displayedTax, 2);
  });
});
