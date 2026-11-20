const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.productNames = page.locator('.cart .product-name');
    this.qtyInputs = page.locator('.cart .qty-input');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async open() {
    await this.page.goto('/cart');
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async getQuantities() {
    return this.qtyInputs.evaluateAll((els) => els.map((el) => el.value));
  }

  async agreeAndCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
