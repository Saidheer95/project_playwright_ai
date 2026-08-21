const fs = require('fs');
const path = require('path');
const { assertVisible } = require('../../utils/assertions');

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
    await assertVisible(this.emailID);
    await this.emailID.fill(email);

    await assertVisible(this.passwordInput);
    await this.passwordInput.fill(password);

    await assertVisible(this.signIn);
    await this.signIn.click();

    // await this.page.click(this.clickUser);
    // await this.page.click(this.signOut);
  }




}

module.exports = { LoginPage, loadCredentials };
