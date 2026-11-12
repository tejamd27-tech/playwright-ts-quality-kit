import { type APIRequestContext, expect } from '@playwright/test';
import { env } from '../config/env';

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds?: string;
}

/** Thin typed client so tests read as behaviour, not HTTP plumbing. */
export class BookingClient {
  constructor(private readonly request: APIRequestContext) {}

  async token(): Promise<string> {
    const res = await this.request.post('/auth', {
      data: { username: env.apiUser, password: env.apiPassword },
    });
    expect(res.ok()).toBeTruthy();
    return (await res.json()).token;
  }

  create(booking: Booking) {
    return this.request.post('/booking', { data: booking });
  }

  get(id: number) {
    return this.request.get(`/booking/${id}`);
  }

  async update(id: number, patch: Partial<Booking>) {
    return this.request.patch(`/booking/${id}`, {
      data: patch,
      headers: { Cookie: `token=${await this.token()}` },
    });
  }

  async remove(id: number) {
    return this.request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${await this.token()}` },
    });
  }
}

export const sampleBooking = (overrides: Partial<Booking> = {}): Booking => ({
  firstname: 'Quality',
  lastname: 'Kit',
  totalprice: 250,
  depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
  additionalneeds: 'Breakfast',
  ...overrides,
});
