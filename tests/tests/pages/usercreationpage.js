const { expect } = require('@playwright/test');

exports.userCreationPage =

    class userCreationPage {

        constructor(page) {
            this.page = page;
            this.url = 'https://qa.prokraya.ai/signin';
            this.emailInput = 'input-email';
            this.passwordInput = 'input-password';
            this.loginButton = 'button-login';
            this.navToUsermgmt = 'nav-usermgmt';
            this.navToManUser = 'nav-manage-users';
            this.createButton = 'button-create-user';
            this.inputEmail = 'input-new-user-email';
            this.fullName = 'input-new-user-name';
            this.designationField = 'input-new-user-designation';
            this.departmentField = 'select-new-user-department';
            this.businessEntityField = 'select-add-user-organization';
            this.country = 'input-new-user-mobile-country';
            this.mobileInputField = 'input-new-user-mobile';
            this.reporting = 'select-new-user-reporting';
            this.assignRoleField = 'select-new-user-role';
            this.addButton = 'button-submit-create-user';

            this.emailBox = 'button-email';
            this.viewAll = 'link-view-all-emails';
            this.inputSearch = 'input-search';
            this.verificationLink = 'a[href*="resetpassword"]';
            this.continueLinkButton = 'Sign out and continue with';
            this.newPasswordField = 'input[placeholder="Enter new password"]';
            this.confirmPasswordField = 'input[placeholder="Re-enter new password"]';
            this.submitButton = 'Submit';
        }

        async goto() {
            await this.page.goto(this.url);
        }

        async login(email, password) {
            await this.page.getByTestId(this.emailInput).fill(email);
            await this.page.getByTestId(this.passwordInput).fill(password);
            await this.page.getByTestId(this.loginButton).click();
        }

        async navigateToUserManagement() {
            await this.page.getByTestId(this.navToUsermgmt).click();
            await this.page.getByTestId(this.navToManUser).click();
            await this.page.getByTestId(this.createButton).click();
        }

        async createUser(email, fullName, designation, department, businessEntity, country, phone, reportingTo, role) {
            // Fill email
            await this.page.getByTestId(this.inputEmail).fill(email);

            // Fill full name
            await this.page.getByTestId(this.fullName).fill(fullName);

            // Fill designation
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
            await this.page.getByPlaceholder('Search country...').fill(country);
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(country) }).click();

            // Fill phone number
            await this.page.getByTestId(this.mobileInputField).fill(phone);

            // Select reporting to dropdown
            await this.page.getByTestId(this.reporting).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: reportingTo, exact: true }).click();

            // Select role dropdown
            await this.page.getByTestId(this.assignRoleField).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: role, exact: true }).click();

            // Click submit button
            await this.page.getByTestId(this.addButton).click();
        }

        async setPassword(createdUserEmail, newPasswordValue, confirmPasswordValue) {
            await this.page.getByTestId(this.emailBox).click();
            await this.page.getByTestId(this.viewAll).click();

            await this.page.getByTestId(this.inputSearch).fill(createdUserEmail);

            await this.page.locator(this.verificationLink).click();
            await this.page.waitForURL(/resetpassword/);
            await this.page.locator(this.newPasswordField).fill(newPasswordValue);
            await this.page.locator(this.confirmPasswordField).fill(confirmPasswordValue);
            await expect(this.page.locator(this.newPasswordField)).toHaveValue(newPasswordValue);
            await expect(this.page.locator(this.confirmPasswordField)).toHaveValue(confirmPasswordValue);
            await this.page.waitForTimeout(10000);
            

            // Click submit button
            await this.page.getByRole('button', { name: this.submitButton }).click();
        }

    };