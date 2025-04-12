import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Swag Labs Cart Flow (POM)', () => {
  let loginPage, inventoryPage, cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add a random item to the cart', async ({ page }) => {
    const buttons = await page.$$('[data-test^="add-to-cart"]');
    await buttons[Math.floor(Math.random() * buttons.length)].click();

    await inventoryPage.goToCart();
    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(1);
  });

  test('Add all items, remove all but one', async ({ page }) => {
    await inventoryPage.addAllItems();
    await inventoryPage.goToCart();
    await cartPage.removeAllButOne();

    const remaining = await page.$$('.cart_item');
    expect(remaining.length).toBe(1);
  });
});
