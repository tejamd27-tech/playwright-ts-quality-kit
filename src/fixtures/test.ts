import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { env } from '../config/env';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  checkoutPage: CheckoutPage;
  /** Inventory page with a user already signed in. */
  signedIn: InventoryPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  signedIn: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(env.uiUser, env.uiPassword);
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
    await use(inventory);
  },
});

export { expect };
