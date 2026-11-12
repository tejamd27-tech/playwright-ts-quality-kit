import { test, expect } from '../../src/fixtures/test';
import { env } from '../../src/config/env';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('valid user reaches the product list @smoke', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(env.uiUser, env.uiPassword);
    await inventoryPage.expectLoaded();
  });

  const invalid = [
    { name: 'locked-out user', user: 'locked_out_user', pass: env.uiPassword, msg: 'locked out' },
    { name: 'wrong password', user: env.uiUser, pass: 'wrong', msg: 'do not match' },
    { name: 'empty username', user: '', pass: env.uiPassword, msg: 'Username is required' },
  ];

  for (const c of invalid) {
    test(`shows an error for ${c.name} @regression`, async ({ loginPage, page }) => {
      await loginPage.login(c.user, c.pass);
      await expect(loginPage.error).toContainText(c.msg);
      await expect(page).not.toHaveURL(/inventory/);
    });
  }
});
