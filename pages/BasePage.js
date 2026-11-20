class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('input[value="Search"]');
    this.cartLink = page.locator('#topcartlink a, a[href="/cart"]').first();
    this.logoutLink = page.locator('a[href="/logout"]');
    this.accountLink = page.locator('a.account');
    this.loginLink = page.locator('a[href="/login"]');
    this.registerLink = page.locator('a[href="/register"]');
  }

  async open(path = '/') {
    await this.page.goto(path);
  }

  async search(term) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }

  async goToCart() {
    await this.page.goto('/cart');
  }

  async isLoggedIn() {
    return this.logoutLink.isVisible();
  }
}

module.exports = { BasePage };
