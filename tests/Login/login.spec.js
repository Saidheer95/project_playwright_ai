const { test } = require('@playwright/test');
const { LoginPage, loadCredentials } = require('../../pages/Login/login.page');

test.describe('Login page', () => {
  test('should login with credentials from file', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { loginUrl } = loadCredentials();

    await page.goto(loginUrl);
    await loginPage.loginByRole('requestor');

    // Add assertions for a successful login here.
    await page.waitForURL('**/dashboard');
  });
});
