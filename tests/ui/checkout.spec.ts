import { test, expect } from '../../src/fixtures/test';

test.describe('Cart and checkout', () => {
  test('buys two items and the subtotal matches the item prices @smoke', async ({ signedIn, checkoutPage }) => {
    const picks = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    for (const p of picks) await signedIn.addToCart(p);
    await expect(signedIn.cartBadge).toHaveText(String(picks.length));

    const expected = await Promise.all(
      picks.map(async (p) =>
        Number((await signedIn.item(p).getByTestId('inventory-item-price').textContent())!.replace('$', '')),
      ),
    );

    await signedIn.openCart();
    await checkoutPage.start();
    await checkoutPage.fillCustomer('Test', 'User', '500081');
    expect(await checkoutPage.itemTotal()).toBeCloseTo(expected.reduce((a, b) => a + b, 0), 2);
    await checkoutPage.finish();
  });

  test('sorts products by price, low to high @regression', async ({ signedIn }) => {
    await signedIn.sortBy('lohi');
    const prices = await signedIn.prices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('checkout requires customer details @regression', async ({ signedIn, page }) => {
    await signedIn.addToCart('Sauce Labs Onesie');
    await signedIn.openCart();
    await page.getByTestId('checkout').click();
    await page.getByTestId('continue').click();
    await expect(page.getByTestId('error')).toContainText('First Name is required');
  });
});
