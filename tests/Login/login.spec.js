const { test } = require('@playwright/test');
const { LoginPage, loadCredentials } = require('tests/Login/login.page');

test.describe('Login page', () => {
  test('should login with credentials from file', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { loginUrl, email, password } = loadCredentials();

    await page.goto(loginUrl);
    await loginPage.login(email, password);

    // Add assertions for a successful login here.
    await page.waitForURL('**/dashboard');
  });
});
