const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { registerUser, product, uniqueEmail } = require('../utils/testData');

test.describe('Q2 — Register + Add Product to Cart', () => {
  test('register, login, add product and verify cart', async ({ page }, testInfo) => {
    const email = uniqueEmail('q2');
    const password = registerUser.password;
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Register a new customer', async () => {
      await registerPage.open();
      await registerPage.register({
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        email,
        password,
      });
      await expect(registerPage.resultMessage).toContainText('Your registration completed');
      await registerPage.continueAfterSuccess();
    });

    await test.step('Ensure logged in (logout then login if needed)', async () => {
      if (await loginPage.isLoggedIn()) {
        await loginPage.logoutLink.click();
      }
      await loginPage.open();
      await loginPage.login(email, password);
      await expect(loginPage.logoutLink).toBeVisible();
    });

    await test.step('Navigate to category, select product, add to cart', async () => {
      await productPage.openCategory(product.categoryPath);
      await productPage.selectProductByName(product.name);
      await expect(productPage.productTitle).toContainText(product.name);
      await productPage.setQuantity('1');
      await productPage.addToCart();
    });

    await test.step('Verify product and quantity in cart', async () => {
      await cartPage.open();
      const names = await cartPage.getProductNames();
      const qtys = await cartPage.getQuantities();
      expect(names.join(' ')).toContain(product.name);
      expect(qtys[0]).toBe('1');

      const shot = await page.screenshot({ path: 'screenshots/q2-cart.png', fullPage: true });
      await testInfo.attach('Q2 Cart Screenshot', { body: shot, contentType: 'image/png' });
    });
  });
});
