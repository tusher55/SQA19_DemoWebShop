const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.productTitle = page.locator('h1');
    this.quantityInput = page.locator('input.qty-input');
    this.addToCartButton = page.locator('input[value="Add to cart"]').first();
    this.successBar = page.locator('.bar-notification.success');
    this.categoryProducts = page.locator('.product-item');
    this.searchResults = page.locator('.product-item .product-title a');
  }

  async openCategory(path) {
    await this.page.goto(path);
  }

  async openProduct(path) {
    await this.page.goto(path);
  }

  async selectProductByName(name) {
    await this.page.locator('.product-item .product-title a', { hasText: name }).first().click();
  }

  async setQuantity(qty) {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.successBar.waitFor({ state: 'visible', timeout: 10_000 }).catch(() => {});
  }
}

module.exports = { ProductPage };
