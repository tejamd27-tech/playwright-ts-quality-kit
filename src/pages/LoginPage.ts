import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly error: Locator;

  constructor(private readonly page: Page) {
    // Prefer stable test ids; fall back to role-based locators where none exist.
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.submit = page.getByRole('button', { name: 'Login' });
    this.error = page.getByTestId('error');
  }

  async open() {
    await this.page.goto('/');
    await expect(this.submit).toBeVisible();
  }

  async login(user: string, password: string) {
    await this.username.fill(user);
    await this.password.fill(password);
    await this.submit.click();
  }
}
