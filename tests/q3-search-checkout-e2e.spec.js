const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { registerUser, product, address, uniqueEmail } = require('../utils/testData');

test.describe('Q3 — Product Search to Order Confirm (E2E)', () => {
  test('search product, increase qty, checkout and view order details', async ({ page }, testInfo) => {
    const email = uniqueEmail('q3');
    const registerPage = new RegisterPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Register new user for checkout', async () => {
      await registerPage.open();
      await registerPage.register({
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        email,
        password: registerUser.password,
      });
      await expect(registerPage.resultMessage).toContainText('Your registration completed');
      await registerPage.continueAfterSuccess();
    });

    await test.step('Search product and verify it appears in results', async () => {
      await productPage.open('/');
      await productPage.search(product.searchTerm);
      await expect(page).toHaveURL(/search\?q=/);
      const results = await productPage.searchResults.allTextContents();
      expect(results.some((t) => t.includes(product.name))).toBe(true);
    });

    await test.step('Open product, increase quantity, add to cart', async () => {
      await productPage.selectProductByName(product.name);
      await expect(productPage.productTitle).toContainText(product.name);
      await productPage.setQuantity(product.quantity);
      await productPage.addToCart();
    });

    await test.step('Agree to terms and checkout', async () => {
      await cartPage.open();
      const qtys = await cartPage.getQuantities();
      expect(qtys[0]).toBe(product.quantity);
      await cartPage.agreeAndCheckout();
    });

    await test.step('Complete order confirmation', async () => {
      await checkoutPage.completeCheckout(address);
      await expect(checkoutPage.orderCompletedTitle).toContainText('Thank you');
      await expect(page.locator('.section.order-completed')).toContainText('successfully processed');
      await expect(checkoutPage.orderDetailsLink).toBeVisible();
    });

    await test.step('Open and verify order details', async () => {
      await checkoutPage.openOrderDetails();
      await expect(page).toHaveURL(/\/orderdetails\//);
      await expect(page.locator('.page')).toContainText(product.name);
      await expect(page.locator('.page')).toContainText(product.quantity);

      const shot = await page.screenshot({ path: 'screenshots/q3-order-details.png', fullPage: true });
      await testInfo.attach('Q3 Order Details Screenshot', { body: shot, contentType: 'image/png' });
    });
  });
});
