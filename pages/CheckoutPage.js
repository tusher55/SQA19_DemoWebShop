const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.billingCountry = page.locator('#BillingNewAddress_CountryId');
    this.billingState = page.locator('#BillingNewAddress_StateProvinceId');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingZip = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinue = page.locator('#billing-buttons-container input.button-1');
    this.shippingContinue = page.locator('#shipping-buttons-container input.button-1');
    this.shippingMethodContinue = page.locator('#shipping-method-buttons-container input.button-1');
    this.paymentMethodContinue = page.locator('#payment-method-buttons-container input.button-1');
    this.paymentInfoContinue = page.locator('#payment-info-buttons-container input.button-1');
    this.confirmOrder = page.locator('#confirm-order-buttons-container input.button-1');
    this.orderCompletedTitle = page.locator('h1');
    this.orderDetailsLink = page.locator('a[href*="/orderdetails/"]');
  }

  /**
   * @param {{ country: string, state: string, city: string, address1: string, zip: string, phone: string }} address
   */
  async fillBillingAddress(address) {
    await this.billingContinue.waitFor({ state: 'visible', timeout: 20_000 });

    // New customer: fill the new-address form when country dropdown is present
    if (await this.billingCountry.count()) {
      await this.billingCountry.waitFor({ state: 'visible', timeout: 10_000 });
      await this.billingCountry.selectOption({ label: address.country });
      await this.page.waitForTimeout(700);
      await this.billingState.selectOption({ label: address.state });
      await this.billingCity.fill(address.city);
      await this.billingAddress1.fill(address.address1);
      await this.billingZip.fill(address.zip);
      await this.billingPhone.fill(address.phone);
    }
  }

  /**
   * Click a checkout step Continue/Confirm when that step becomes visible.
   * Skip quietly if the step is not shown (already completed / not applicable).
   * @param {import('@playwright/test').Locator} locator
   */
  async clickStepIfVisible(locator, timeout = 12_000) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.click();
      await this.page.waitForTimeout(1000);
      return true;
    } catch {
      return false;
    }
  }

  async completeCheckout(address) {
    await this.fillBillingAddress(address);
    await this.billingContinue.click();
    await this.page.waitForTimeout(1200);

    await this.clickStepIfVisible(this.shippingContinue);
    await this.clickStepIfVisible(this.shippingMethodContinue);
    await this.clickStepIfVisible(this.paymentMethodContinue);
    await this.clickStepIfVisible(this.paymentInfoContinue);
    await this.clickStepIfVisible(this.confirmOrder, 20_000);

    await this.page.waitForURL(/\/checkout\/completed/, { timeout: 30_000 });
  }

  async openOrderDetails() {
    await this.orderDetailsLink.click();
    await this.page.waitForURL(/\/orderdetails\//);
  }
}

module.exports = { CheckoutPage };
