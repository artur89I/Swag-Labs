export class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    async waitForLoaded() {
        await this.page.waitForSelector('.inventory_list');
    }

    async sortBy(option) {
        await this.page.selectOption('.product_sort_container', option);
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }

    async addAllItems() {
        const addButtons = await this.page.$$('[data-test^="add-to-cart"]');
        for (const button of addButtons) {
            await button.click();
        }
    }

    async addItemByName(itemName) {
        const itemLocator = this.page.locator(`.inventory_item_name:has-text("${itemName}")`);
        const itemContainer = itemLocator.locator('xpath=ancestor::div[contains(@class, "inventory_item")]');
        const addButton = itemContainer.locator('[data-test^="add-to-cart"]');
        await addButton.click();
    }
} 