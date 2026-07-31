exports.signUpRandom =
class signUpRandom {
    constructor(page) {
        this.page = page;
        this.url = 'https://qa.prokraya.ai/register';
        this.organizationNameInput = 'input-company-name';
        this.contactNameInput      = 'input-contact-name';
        this.emailInput            = 'input-email';
        this.mobileNumbercountry   = 'input-phone-country';
        this.mobileNumberInput     = 'input-phone';
        this.countryInput          = 'select-country';
        this.designationInput      = 'input-designation';
        this.departmentInput       = 'input-department';
        this.passwordInput         = 'input-password';
        this.confirmPasswordInput  = 'input-confirm-password';
        this.refreshCaptchaButton  = 'button-refresh-captcha';
        this.captchaInput          = 'input-captcha';
        this.termsCheckbox         = 'checkbox-terms';
        this.signupButton          = 'button-signup';
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async signup(organizationName, contactName, emailId, mobileCountry, mobileNumber, country, designation, department, password, confirmPassword) {
        await this.page.getByTestId(this.organizationNameInput).fill(organizationName);
        await this.page.getByTestId(this.contactNameInput).fill(contactName);
        await this.page.getByTestId(this.emailInput).fill(emailId);

        // Mobile country dropdown
        await this.page.getByTestId(this.mobileNumbercountry).click();
        await this.page.getByPlaceholder('Search country...').fill(mobileCountry);
        await this.page.getByRole('option', { name: new RegExp(mobileCountry) }).click();

        await this.page.getByTestId(this.mobileNumberInput).fill(mobileNumber);

        // Country dropdown
        await this.page.getByTestId(this.countryInput).click();
        await this.page.waitForSelector('[role="option"]', { state: 'visible' });
        await this.page.getByRole('option', { name: new RegExp(country) }).click();

        await this.page.getByTestId(this.designationInput).fill(designation);
        await this.page.getByTestId(this.departmentInput).fill(department);
        await this.page.getByTestId(this.passwordInput).fill(password);
        await this.page.getByTestId(this.confirmPasswordInput).fill(confirmPassword);
        await this.page.waitForTimeout(10000);
        await this.page.getByTestId(this.termsCheckbox).check();
        await this.page.getByTestId(this.signupButton).click();
    }
}