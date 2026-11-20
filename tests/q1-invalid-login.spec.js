const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { invalidUser } = require('../utils/testData');

test.describe('Q1 — Invalid Login', () => {
  test('shows error and does not log in with invalid credentials', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Attempt login with invalid email/password', async () => {
      await loginPage.login(invalidUser.email, invalidUser.password);
    });

    await test.step('Verify error message and user is not logged in', async () => {
      await expect(page).toHaveURL(/\/login/);
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toMatch(/Login was unsuccessful/i);
      expect(
        /credentials provided are incorrect|No customer account found/i.test(errorText)
      ).toBe(true);
      expect(await loginPage.isLoggedIn()).toBe(false);

      const shot = await page.screenshot({ path: 'screenshots/q1-invalid-login.png', fullPage: true });
      await testInfo.attach('Q1 Invalid Login Screenshot', { body: shot, contentType: 'image/png' });
    });
  });
});
