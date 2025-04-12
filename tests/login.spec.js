import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Swag Labs Login Tests (POM)', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Valid login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Locked out user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMsg).toContainText('locked out');
  });

  test('Missing password', async () => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMsg).toContainText('Password is required');
  });

  test('Missing username', async () => {
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMsg).toContainText('Username is required');
  });

  test('Invalid credentials', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMsg).toContainText('Username and password do not match');
  });
});
