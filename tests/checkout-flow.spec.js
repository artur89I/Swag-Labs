import { test, expect } from '@playwright/test';

test.describe('Swag Labs Checkout Flow and Validation', () => {
  const baseURL = 'https://www.saucedemo.com/';

  const login = async (page) => {
    await page.goto(baseURL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory/);
  };

  const startCheckout = async (page) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
  };

  test.beforeEach(async ({ page }) => {
    await login(page);
    await startCheckout(page);
  });

  test('Missing first name', async ({ page }) => {
    await page.fill('[data-test="lastName"]', 'Bag');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('Missing last name', async ({ page }) => {
    await page.fill('[data-test="firstName"]', 'Natasha');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
  });

  test('Missing postal code', async ({ page }) => {
    await page.fill('[data-test="firstName"]', 'Natasha');
    await page.fill('[data-test="lastName"]', 'Bag');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('Successful checkout and confirmation', async ({ page }) => {
    await page.fill('[data-test="firstName"]', 'Natasha');
    await page.fill('[data-test="lastName"]', 'Bag');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
