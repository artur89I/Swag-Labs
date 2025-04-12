import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test.describe('Swag Labs Checkout Flow (POM)', () => {
  let loginPage, inventoryPage, cartPage, checkoutPage, overviewPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Wait for inventory page to load
    await page.waitForSelector('.inventory_item');

    // Add product by name using improved locator
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.checkout();
  });

  test('Missing first name', async () => {
    await checkoutPage.fillDetails('', 'Bag', '12345');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMsg).toContainText('First Name is required');
  });

  test('Missing last name', async () => {
    await checkoutPage.fillDetails('Natasha', '', '12345');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMsg).toContainText('Last Name is required');
  });

  test('Missing zip', async () => {
    await checkoutPage.fillDetails('Natasha', 'Bag', '');
    await checkoutPage.continue();
    await expect(checkoutPage.errorMsg).toContainText('Postal Code is required');
  });

  test('Complete checkout successfully', async () => {
    await checkoutPage.fillDetails('Natasha', 'Bag', '12345');
    await checkoutPage.continue();
    await overviewPage.finish();
    await expect(overviewPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
