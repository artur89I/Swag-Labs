import { test, expect } from '@playwright/test';

test.describe('Swag Labs Login Tests', () => {
  const baseURL = 'https://www.saucedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('Valid login', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory/);
  });

  test('Locked out user', async ({ page }) => {
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('Missing password', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
  });

  test('Missing username', async ({ page }) => {
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });

  test('Invalid credentials', async ({ page }) => {
    await page.fill('[data-test="username"]', 'invalid_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });
});
