export class CartPage {
    constructor(page) {
      this.page = page;
      this.checkoutButton = page.locator('[data-test="checkout"]');
      this.removeButtons = page.locator('[data-test^="remove"]');
    }
  
    async removeAllButOne() {
      const count = await this.removeButtons.count();
      for (let i = 0; i < count - 1; i++) {
        await this.removeButtons.nth(i).click();
      }
    }
  
    async checkout() {
      await this.checkoutButton.click();
    }
  }
  