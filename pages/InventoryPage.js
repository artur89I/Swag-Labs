export class InventoryPage {
    constructor(page) {
      this.page = page;
      this.sortDropdown = page.locator('[data-test="product_sort_container"]');
      this.cartLink = page.locator('.shopping_cart_link');
    }
  
    async sortBy(value) {
      await this.sortDropdown.selectOption(value);
    }
  
    async addItemByName(name) {
      await this.page.locator(`text=${name}`).locator('..').locator('button').click();
    }
  
    async addAllItems() {
      const addButtons = await this.page.$$('[data-test^="add-to-cart"]');
      for (const button of addButtons) {
        await button.click();
      }
    }
  
    async goToCart() {
      await this.cartLink.click();
    }
  }
  