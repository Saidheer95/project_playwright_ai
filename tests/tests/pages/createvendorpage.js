const { expect } = require('@playwright/test');

exports.createVendor =
class createVendor{

  constructor(page) {

      this.page = page;
       this.url = 'https://qa.prokraya.ai/signin';
       this.emailInput = 'input-email';
      this.passwordInput = 'input-password';
      this.loginButton = 'button-login';


this.navToSuppliers='nav-suppliers';
this.createSupplierbutton='button-create-supplier';


this.companyName = 'input-create-company-name';
this.legalEntity = 'select-create-legal-entity';
this.address = 'input-create-address';
this.city = 'input-create-city';
this.state = 'input-create-state';
this.country = 'select-create-country';
this.postalCode = 'input-create-postal-code';
this.licenseNo = 'input-create-license-no';
this.placeOfIssue = 'input-create-place-of-issue';
this.incorporationDate = 'input-create-incorporation-date';
this.contactName = 'input-create-contact-name';
this.designation = 'input-create-designation';
this.email = 'input-create-email';
this.mobileCountry = 'input-create-mobile-country';
this.mobile = 'input-create-mobile';


this.bankName = 'input-create-bank-name';
this.beneficiaryName = 'input-create-beneficiary-name';
this.bankAddress = 'input-create-bank-address';
this.bankCity = 'input-create-bank-city';
this.bankState = 'input-create-bank-state';
this.accountNo = 'input-create-account-no';
this.confirmAccountNo = 'input-create-confirm-account-no';
this.ifscCode = 'input-create-ifsc-code';
this.swiftCode = 'input-create-swift-code';
this.bankCountry = 'select-create-bank-country';
this.bankPostalCode = 'input-create-bank-postal-code';

this.submitButton = 'button-submit-create';

  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(email, password) {
    await this.page.getByTestId(this.emailInput).fill(email);
    await this.page.getByTestId(this.passwordInput).fill(password);
    await this.page.getByTestId(this.loginButton).click();
  }

  async companyDetails(
  companyName,legalEntity,address,city,state,country,postalCode,licenseNo,placeOfIssue,incorporationDate,contactName,designation,email,mobileCountry,mobile)
{
  await this.page.getByTestId(this.navToSuppliers).click();
  await this.page.getByTestId(this.createSupplierbutton).click();
  await this.page.waitForTimeout(2000);
  await this.page.getByTestId(this.companyName).fill(companyName);

  await this.page.getByTestId(this.legalEntity).click();
  await this.page.getByRole('option', {name: new RegExp(legalEntity)}).click();

  await this.page.getByTestId(this.address).fill(address);
  await this.page.getByTestId(this.city).fill(city);
  await this.page.getByTestId(this.state).fill(state);

  await this.page.getByTestId(this.country).click();
  await this.page.getByRole('option', {name: new RegExp(country)}).click();

  await this.page.getByTestId(this.postalCode).fill(postalCode);
  await this.page.getByTestId(this.licenseNo).fill(licenseNo);
  await this.page.getByTestId(this.placeOfIssue).fill(placeOfIssue);
  await this.page.getByTestId(this.incorporationDate).fill(incorporationDate);

  await this.page.getByTestId(this.contactName).fill(contactName);
  await this.page.getByTestId(this.designation).fill(designation);
  await this.page.getByTestId(this.email).fill(email);

  await this.page.getByTestId(this.mobileCountry).click();
  await this.page.getByPlaceholder('Search country...').fill(mobileCountry);
  await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  await this.page.getByRole('option', {name: new RegExp(mobileCountry)}).click();

  await this.page.getByTestId(this.mobile).fill(mobile);
}
  async bankDetails(bankName,beneficiaryName,bankAddress,bankCity,bankState,accountNo,confirmAccountNo,ifscCode,swiftCode,bankCountry,bankPostalCode
) {
  await this.page.getByTestId(this.bankName).fill(bankName);
  await this.page.getByTestId(this.beneficiaryName).fill(beneficiaryName);
  await this.page.getByTestId(this.bankAddress).fill(bankAddress);
  await this.page.getByTestId(this.bankCity).fill(bankCity);
  await this.page.getByTestId(this.bankState).fill(bankState);

  await this.page.getByTestId(this.accountNo).fill(accountNo);
  await this.page.getByTestId(this.confirmAccountNo).fill(confirmAccountNo);

  await this.page.getByTestId(this.ifscCode).fill(ifscCode);
  await this.page.getByTestId(this.swiftCode).fill(swiftCode);

  await this.page.getByTestId(this.bankCountry).click();
  await this.page.getByRole('option', {name: new RegExp(bankCountry)}).click();

  await this.page.getByTestId(this.bankPostalCode).fill(bankPostalCode);

  await this.page.getByTestId(this.submitButton).click();

}

}
