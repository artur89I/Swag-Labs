import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test.describe('Swag Labs Price Validation (POM)', () => {
  let loginPage, inventoryPage, cartPage, checkoutPage, overviewPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    overviewPage = new CheckoutOverviewPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await inventoryPage.addItemByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();
    await cartPage.checkout();

    await checkoutPage.fillDetails('Artur', 'Bag', '12345');
    await checkoutPage.continue();
  });

  test('Item total, tax, and final total are correct', async ({ page }) => {
    const prices = await page.$$eval('.inventory_item_price', els =>
      els.map(el => parseFloat(el.textContent.replace('$', '')))
    );
    const itemTotal = prices.reduce((sum, p) => sum + p, 0);

    const subtotal = parseFloat((await overviewPage.subtotal.textContent()).replace('Item total: $', ''));
    const tax = parseFloat((await overviewPage.tax.textContent()).replace('Tax: $', ''));
    const total = parseFloat((await overviewPage.total.textContent()).replace('Total: $', ''));

    expect(subtotal).toBeCloseTo(itemTotal, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });
});
