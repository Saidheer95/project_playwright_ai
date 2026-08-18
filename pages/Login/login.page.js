const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');

const defaultCredentialsPath = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'credentials.json'
);

function loadCredentials(filePath = defaultCredentialsPath) {
  const raw = fs.readFileSync(filePath, 'utf8');

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Unable to parse credentials file at ${filePath}: ${error.message}`
    );
  }
}

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.emailID =page.locator('[data-testid="input-email"]') ;
    this.passwordInput = page.locator('[data-testid="input-password"]');
    this.signIn = page.locator('[data-testid="button-login"]');
    this.clickUser=page.locator('[data-testid="button-user-menu"]');
    this.signOut=page.locator('[data-testid="button-logout"]');
  }

  async login(email, password) {
    await expect(this.emailID).toBeVisible();
    await this.emailID.fill(email);

    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);

    await expect(this.signIn).toBeVisible();
    await this.signIn.click();

    // await this.page.click(this.clickUser);
    // await this.page.click(this.signOut);
  }




}

module.exports = { LoginPage, loadCredentials };
