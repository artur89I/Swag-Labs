export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  // Ensure the inventory page has fully loaded before interaction
  async waitForLoaded() {
    await this.page.waitForSelector('.inventory_list', { state: 'visible' });
    await this.page.waitForSelector('[data-test="product_sort_container"]', { state: 'visible' });
  }

  // Select sorting option from dropdown
  async sortBy(value) {
    await this.page.waitForSelector('[data-test="product_sort_container"]', { state: 'visible' });
    await this.sortDropdown.selectOption(value);
  }

  // Add a specific item to cart using visible name
  async addItemByName(name) {
    const button = this.page.locator(`.inventory_item:has-text("${name}") >> button`);
    await button.click();
  }

  // Add all items to the cart
  async addAllItems() {
    await this.page.waitForSelector('[data-test^="add-to-cart"]');
    const addButtons = await this.page.$$('[data-test^="add-to-cart"]');
    for (const btn of addButtons) {
      await btn.click();
    }
  }

  // Go to the cart page
  async goToCart() {
    await this.cartLink.click();
  }
}
