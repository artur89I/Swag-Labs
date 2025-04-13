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
} 