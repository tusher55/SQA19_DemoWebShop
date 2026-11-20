const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.genderMale = page.locator('#gender-male');
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultMessage = page.locator('.result');
    this.continueButton = page.locator('input[value="Continue"]');
  }

  async open() {
    await this.page.goto('/register');
  }

  /**
   * @param {{ firstName: string, lastName: string, email: string, password: string }} user
   */
  async register(user) {
    await this.genderMale.check();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
    await this.registerButton.click();
  }

  async continueAfterSuccess() {
    if (await this.continueButton.isVisible()) {
      await this.continueButton.click();
    }
  }
}

module.exports = { RegisterPage };
