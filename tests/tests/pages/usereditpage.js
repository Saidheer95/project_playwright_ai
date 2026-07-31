const { expect } = require('@playwright/test');

exports.userEditPage = class userEditPage {

  constructor(page) {
    this.page = page;
    this.url = 'https://qa.prokraya.ai/signin';

    // ============== LOGIN ==============
    this.emailInput = 'input-email';
    this.passwordInput = 'input-password';
    this.loginButton = 'button-login';

    // ============== NAVIGATION ==============
    this.navToUsermgmt = 'nav-usermgmt';
    this.navToManUser = 'nav-manage-users';

    // ============== USER SEARCH & EDIT ==============
    this.inputSearch = 'input-search-users';
    this.editButton = '[data-testid*="edit"]'

    // ============== USER EDIT FORM ==============
    this.fullName = 'input-edit-user-name';
    this.designationField = 'input-edit-user-designation';
    this.departmentField = 'select-edit-user-department';
    this.businessEntityField = 'select-edit-user-organization';
    this.country = 'input-edit-user-mobile-country';
    this.mobileInputField = 'input-edit-user-mobile';
    this.reporting = 'select-edit-user-reporting';
    this.assignRoleField = 'select-edit-user-role';
    this.updateButton = 'button-submit-edit-user';
  }

  // ============== NAVIGATION ==============
  async goto() {
    await this.page.goto(this.url);
  }

  // ============== LOGIN ==============
  async validLogin(email, password) {
    await this.page.getByTestId(this.emailInput).fill(email);
    await this.page.getByTestId(this.passwordInput).fill(password);
    await this.page.getByTestId(this.loginButton).click();
    await this.page.waitForTimeout(2000);
  }

  // ============== NAVIGATE TO USER MANAGEMENT ==============
  async navigateToUserManagement() {
    await this.page.getByTestId(this.navToUsermgmt).click();
    await this.page.getByTestId(this.navToManUser).click();
    await this.page.waitForTimeout(1000);
  }

  // ============== SEARCH USER ==============
  async searchUserByEmail(email) {
    await this.page.getByTestId(this.inputSearch).fill(email);
    await this.page.waitForTimeout(1000);
  }

  // ============== CLICK EDIT BUTTON ==============
  async clickEditUser() {
    await this.page.locator(this.editButton).click();

  }

  // ============== EDIT USER FORM ==============
  async editUser(fullName, designation, department, businessEntity, country, phone, reportingTo, role) {
    // Fill full name
    await this.page.getByTestId(this.fullName).clear();
    await this.page.getByTestId(this.fullName).fill(fullName);

    // Fill designation
    await this.page.getByTestId(this.designationField).clear();
    await this.page.getByTestId(this.designationField).fill(designation);

    // Select department dropdown
    await this.page.getByTestId(this.departmentField).click();
    await this.page.waitForSelector('[role="option"]', { state: 'visible' });
    await this.page.getByRole('option', { name: department, exact: true }).click();

    // Select business entity dropdown
    await this.page.getByTestId(this.businessEntityField).click();
    await this.page.waitForSelector('[role="option"]', { state: 'visible' });
    await this.page.getByRole('option', { name: businessEntity, exact: true }).click();

    // Fill country
    await this.page.getByTestId(this.country).click();
    await this.page.getByPlaceholder('Search country...').clear();
    await this.page.getByPlaceholder('Search country...').fill(country);
    await this.page.waitForSelector('[role="option"]', { state: 'visible' });
    await this.page.getByRole('option', { name: new RegExp(country) }).click();

    // Fill phone number
    await this.page.getByTestId(this.mobileInputField).clear();
    await this.page.getByTestId(this.mobileInputField).fill(phone);

    // Select reporting to dropdown
    await this.page.getByTestId(this.reporting).click();
    await this.page.waitForSelector('[role="option"]', { state: 'visible' });
    await this.page.getByRole('option', { name: reportingTo, exact: true }).click();

    // Click update button
    await this.page.getByTestId(this.updateButton).click();
    await this.page.waitForTimeout(2000);
  }
};