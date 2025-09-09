QA Automation Framework – Playwright Overview This framework is built to automate UI and API testing for the practicesoftwaretesting.com website. It uses Playwright for browser automation and follows the Page Object Model (POM) design pattern for maintainability and scalability. The framework includes wrapper classes, helpers, and reusable page objects to handle future growth and additional test cases.

Key Design Choices

Page Object Model (POM) Each page has its own class representing elements and actions. Keeps locators, actions, and validations separated from tests.

Wrapper Class The WrapperClass centralizes common UI actions like: click(locator) typeText(locator, text) getText(locator) verifyText(locator, expected) to avoid duplicating waitFor or Playwright boilerplate code in every page class.

Helper Classes TestData generates pre-defined data like names, emails, or messages. Keeps test data separate from test logic.

Assertions Assertions are done mostly in the test files. Page classes should represent the page, not enforce test logic.

Scalability & Maintenance New pages can be added simply by creating a new Page Object class. Common actions or utilities can be extended in WrapperClass or Helper classes.

Running the Tests: Install dependencies npm install

Run all tests: npx playwright test

Generate HTML report: npx playwright show-report

Example Test Flow Form Submission Test: Navigate to the Contact page. Submit an empty form → verify error messages for each field. Fill form with valid data → submit → verify success message.

Cart Test: Navigate to a product page. Click “Add to Cart” → verify success toast. Go to Cart page → verify product name matches selection. Update product quantity

Notes

All locators use data-test attributes whenever possible to reduce flakiness waitForTimeout is avoided mostly for Playwright’s automatic waiting.
