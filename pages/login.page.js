const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');

const defaultCredentialsPath = path.join(__dirname, '..', 'fixtures', 'credentials.json');

function loadCredentials(filePath = defaultCredentialsPath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Unable to parse credentials file at ${filePath}: ${error.message}`);
  }
}

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailID='[data-testid="input-email"]';
    this.password='[data-testid="input-password"]';
    this.signIn='[data-testid="button-login"]';
  
  }

  async login(email, password) {
    await expect(this.page.locator(this.emailID)).toBeVisible();
    await this.page.fill(this.emailID, email);
    await expect(this.page.locator(this.password)).toBeVisible();
    await this.page.fill(this.password, password);
    await expect(this.page.locator(this.signIn)).toBeVisible();
    await this.page.click(this.signIn);
  }

  async loginFromFile(filePath) {
    const { email, password } = loadCredentials(filePath);
    await this.login(email, password);
  }
}

module.exports = { LoginPage, loadCredentials };