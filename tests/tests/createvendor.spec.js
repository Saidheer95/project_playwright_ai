const { test, expect } = require('@playwright/test');
const { createVendor } = require('./pages/createvendorpage');
const { createVendorData } = require('./data/createvendordata');

test('Create Vendor - End to End', async ({ page }) => {
    const createvendorflow = new createVendor(page);

    await createvendorflow.goto();

    await createvendorflow.login(
        createVendorData.validLogin.email,
        createVendorData.validLogin.password
    );
    await page.waitForTimeout(5000);

    await createvendorflow.companyDetails(
        createVendorData.companyDetails.companyName,
        createVendorData.companyDetails.legalEntity,
        createVendorData.companyDetails.address,
        createVendorData.companyDetails.city,
        createVendorData.companyDetails.state,
        createVendorData.companyDetails.country,
        createVendorData.companyDetails.postalCode,
        createVendorData.companyDetails.licenseNo,
        createVendorData.companyDetails.placeOfIssue,
        createVendorData.companyDetails.incorporationDate,
        createVendorData.companyDetails.contactName,
        createVendorData.companyDetails.designation,
        createVendorData.companyDetails.email,
        createVendorData.companyDetails.mobileCountry,
        createVendorData.companyDetails.mobile
    );
    await page.waitForTimeout(2000);

    await createvendorflow.bankDetails(
        createVendorData.bankDetails.bankName,
        createVendorData.bankDetails.beneficiaryName,
        createVendorData.bankDetails.bankAddress,
        createVendorData.bankDetails.bankCity,
        createVendorData.bankDetails.bankState,
        createVendorData.bankDetails.accountNo,
        createVendorData.bankDetails.confirmAccountNo,
        createVendorData.bankDetails.ifscCode,
        createVendorData.bankDetails.swiftCode,
        createVendorData.bankDetails.bankCountry,
        createVendorData.bankDetails.bankPostalCode
    );
    await page.waitForTimeout(4000);
});