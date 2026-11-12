/**
 * Environment configuration. Override any value with an environment variable,
 * e.g. UI_BASE_URL=https://staging.example.com npm test
 *
 * Defaults point at public demo applications built for automation practice.
 */
export const env = {
  uiBaseUrl: process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com',
  // Public demo credentials published by the demo site itself.
  uiUser: process.env.UI_USER ?? 'standard_user',
  uiPassword: process.env.UI_PASSWORD ?? 'secret_sauce',
  apiUser: process.env.API_USER ?? 'admin',
  apiPassword: process.env.API_PASSWORD ?? 'password123',
};
