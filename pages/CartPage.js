export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async removeAllButOne() {
    // Wait until the cart is loaded
    await this.page.waitForSelector('.cart_item');

    // Get all remove buttons
    const removeButtons = await this.page.$$('[data-test^="remove"]');
    const count = removeButtons.length;

    // If there's 0 or 1 item, skip
    if (count <= 1) return;

    for (let i = 0; i < count - 1; i++) {
      await removeButtons[i].click();
      await this.page.waitForTimeout(100); // Slight delay to prevent race conditions
    }
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
