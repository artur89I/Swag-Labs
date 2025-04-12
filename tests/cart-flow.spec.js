import { test, expect } from '@playwright/test';

test.describe('Swag Labs Shopping Cart Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Add a random item to the cart', async ({ page }) => {
    const addButtons = await page.$$('[data-test^="add-to-cart"]');
    const randomIndex = Math.floor(Math.random() * addButtons.length);
    await addButtons[randomIndex].click();

    await page.click('.shopping_cart_link');
    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(1);
  });

  test('Add all items, then remove all but one', async ({ page }) => {
    const addButtons = await page.$$('[data-test^="add-to-cart"]');
    for (const btn of addButtons) {
      await btn.click();
    }

    await page.click('.shopping_cart_link');
    const removeButtons = await page.$$('[data-test^="remove"]');
    for (let i = 0; i < removeButtons.length - 1; i++) {
      await removeButtons[i].click();
    }

    const remainingItems = await page.$$('.cart_item');
    expect(remainingItems.length).toBe(1);
  });
});
