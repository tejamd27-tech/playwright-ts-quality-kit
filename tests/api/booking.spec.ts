import { test, expect } from '@playwright/test';
import { BookingClient, sampleBooking } from '../../src/api/BookingClient';

test.describe('Booking API', () => {
  test('creates and reads back a booking @smoke', async ({ request }) => {
    const api = new BookingClient(request);
    const payload = sampleBooking();

    const created = await api.create(payload);
    expect(created.status()).toBe(200);
    const { bookingid, booking } = await created.json();
    expect(typeof bookingid).toBe('number');
    expect(booking).toMatchObject(payload);

    const fetched = await api.get(bookingid);
    expect(fetched.status()).toBe(200);
    expect(await fetched.json()).toMatchObject(payload);
  });

  test('updates a booking with an auth token @regression', async ({ request }) => {
    const api = new BookingClient(request);
    const { bookingid } = await (await api.create(sampleBooking())).json();

    const res = await api.update(bookingid, { totalprice: 300, additionalneeds: 'Late checkout' });
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject({ totalprice: 300, additionalneeds: 'Late checkout' });
  });

  test('rejects an update without a token @regression', async ({ request }) => {
    const api = new BookingClient(request);
    const { bookingid } = await (await api.create(sampleBooking())).json();

    const res = await request.patch(`/booking/${bookingid}`, { data: { totalprice: 1 } });
    expect(res.status()).toBe(403);
  });

  test('deletes a booking and it is gone @regression', async ({ request }) => {
    const api = new BookingClient(request);
    const { bookingid } = await (await api.create(sampleBooking())).json();

    expect((await api.remove(bookingid)).status()).toBe(201);
    expect((await api.get(bookingid)).status()).toBe(404);
  });
});
