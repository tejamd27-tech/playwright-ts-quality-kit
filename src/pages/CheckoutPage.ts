import { type Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async start() {
    await this.page.getByTestId('checkout').click();
  }

  async fillCustomer(first: string, last: string, postcode: string) {
    await this.page.getByTestId('firstName').fill(first);
    await this.page.getByTestId('lastName').fill(last);
    await this.page.getByTestId('postalCode').fill(postcode);
    await this.page.getByTestId('continue').click();
  }

  async itemTotal(): Promise<number> {
    const text = await this.page.getByTestId('subtotal-label').textContent();
    return Number((text ?? '').replace(/[^0-9.]/g, ''));
  }

  async finish() {
    await this.page.getByTestId('finish').click();
    await expect(this.page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  }
}
