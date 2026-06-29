# Playwright Practice

This repository contains a Playwright test automation project using JavaScript and the Playwright Test runner.

## Project Structure

- `package.json` - Project dependencies and npm scripts.
- `playwright.config.js` - Playwright configuration for test directory, browser projects, and default settings.
- `config.json` - Environment configuration values such as `baseUrl`.
- `tests/` - Playwright test files.
- `pages/` - Page object classes encapsulating UI actions and locators.
- `utils/` - Utility helpers and test data generators.
- `test-results/` - Output directory for Playwright test artifacts such as screenshots, videos, and traces.
- `playwright-report/` - Generated Playwright HTML reports.
- `user_data.json` - Runtime data storage used by utility helpers.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Verify installation:

```bash
npx playwright install
```

## Running Tests

Run the full test suite:

```bash
npm test
```

Run only positive vendor tests:

```bash
npm run test:positive
```

Run only negative vendor tests:

```bash
npm run test:negative
```

Run tests and generate the Allure report (if Allure is set up):

```bash
npm run test:all
```

## Project Conventions

- Tests are located in the `tests/` folder and use the Playwright `test` API.
- Page objects live in the `pages/` folder and are imported using CommonJS `require()`.
- Shared runtime configuration is stored in `config.json`.
- The `utils/TestDataGenerator.js` helper provides random vendor, invoice, and receipt test data.

## Important Files

- `tests/createvendor.spec.js` - Positive vendor creation workflow.
- `tests/createvendor.negative.spec.js` - Negative vendor creation validations.
- `pages/loginPage.js` - Login page actions.
- `pages/createendor.js` - Vendor creation page actions.
- `playwright.config.js` - Sets Playwright test directory, browser capabilities, and report settings.

## Notes

- Base URL is configured through `config.json`.
- Playwright artifacts are stored under `test-results/`.
- HTML reports are generated in `playwright-report/`.

## Troubleshooting

- If tests fail due to missing browser dependencies, run `npx playwright install`.
- If environment values need updating, edit `config.json`.
- For debugging, open the Playwright report generated in `playwright-report/index.html`.
