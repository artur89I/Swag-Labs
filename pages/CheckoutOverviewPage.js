export class CheckoutOverviewPage {
    constructor(page) {
      this.page = page;
      this.finishButton = page.locator('[data-test="finish"]');
      this.completeHeader = page.locator('.complete-header');
      this.itemPrices = page.locator('.inventory_item_price');
      this.subtotal = page.locator('.summary_subtotal_label');
      this.tax = page.locator('.summary_tax_label');
      this.total = page.locator('.summary_total_label');
    }
  
    async finish() {
      await this.finishButton.click();
    }
  }
  