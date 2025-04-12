export class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstName = page.locator('[data-test="firstName"]');
      this.lastName = page.locator('[data-test="lastName"]');
      this.zipCode = page.locator('[data-test="postalCode"]');
      this.continueButton = page.locator('[data-test="continue"]');
      this.errorMsg = page.locator('[data-test="error"]');
    }
  
    async fillDetails(first, last, zip) {
      await this.firstName.fill(first);
      await this.lastName.fill(last);
      await this.zipCode.fill(zip);
    }
  
    async continue() {
      await this.continueButton.click();
    }
  }
  