const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input[value="Log in"]');
    this.errorMessage = page.locator('.validation-summary-errors');
  }

  async open() {
    await this.page.goto('/login');
  }

  /**
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return (await this.errorMessage.innerText()).trim();
  }
}

module.exports = { LoginPage };
