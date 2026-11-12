import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    // Sauce Demo marks elements with data-test, not Playwright's default data-testid.
    testIdAttribute: 'data-test',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: env.uiBaseUrl },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      grep: /@smoke/,
      use: { ...devices['Desktop Firefox'], baseURL: env.uiBaseUrl },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: env.apiBaseUrl, extraHTTPHeaders: { Accept: 'application/json' } },
    },
  ],
});
