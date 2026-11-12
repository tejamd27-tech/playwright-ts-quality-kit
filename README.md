# Playwright + TypeScript Quality Kit

A reference test automation framework by **Boddu Dharma Teja** (Senior QA Lead, Hyderabad). It shows how I structure UI and API automation for a product team: readable tests, page objects, typed API clients, tagged runs, and CI that gates pull requests and runs nightly regression.

My client and employer code is private, so this repository applies the same patterns to public demo applications built for automation practice:

- UI: [Sauce Demo](https://www.saucedemo.com)
- API: [Restful Booker](https://restful-booker.herokuapp.com)

## What's inside

```
src/
  config/env.ts          environment config, overridable with env vars
  pages/                 page objects (LoginPage, InventoryPage, CheckoutPage)
  api/BookingClient.ts   typed API client + test data builder
  fixtures/test.ts       custom fixtures, including a signed-in session
tests/
  ui/                    login and checkout journeys
  api/                   booking CRUD, auth and negative cases
.github/workflows/       GitHub Actions: smoke gate on PRs, nightly regression
azure-pipelines.yml      the same pipeline for Azure DevOps
```

## Design choices

- **Page objects with role and test-id locators.** No CSS chains or XPath, so tests survive layout changes.
- **Custom fixtures** give each test the pages it needs and a ready signed-in state, keeping test bodies short.
- **UI and API in one suite** as separate Playwright projects, so each layer runs and reports independently.
- **Tags instead of folders for scope.** `@smoke` runs on every pull request; `@regression` runs on main and nightly.
- **Data-driven negative cases** for login, and assertions on computed values (cart subtotal equals the sum of item prices).
- **Failure evidence by default:** trace, screenshot and video are kept only for failed tests; JUnit XML feeds CI dashboards.

## Run it

```bash
npm install
npx playwright install
npm run test:smoke        # fast gate
npm test                  # everything
npm run test:api          # API layer only
npm run report            # open the HTML report
```

Point it at another environment:

```bash
UI_BASE_URL=https://staging.example.com npm run test:smoke
```

## Contact

teja.md27@gmail.com · [LinkedIn](https://linkedin.com/in/dharma-teja-m-7068b162)
