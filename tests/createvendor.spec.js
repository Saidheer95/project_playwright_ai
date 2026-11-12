
const { test, expect } = require('@playwright/test');
const { createVendor } = require('../pages/vendor/createvendorpage');
const { createVendorData } = require('../data/vendor/createvendordata');

test('Create Vendor - End to End', async ({ page }) => {
    const createvendorflow = new createVendor(page);

    console.log('Starting Create Vendor Test');

    await createvendorflow.goto();

    await createvendorflow.login(
        createVendorData.validLogin.email,
        createVendorData.validLogin.password
    );

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

    // Log vendor details after successful creation
    console.log('========== VENDOR CREATED SUCCESSFULLY ==========');
    console.log(`Company Name : ${createVendorData.companyDetails.companyName}`);
    console.log(`Contact Name : ${createVendorData.companyDetails.contactName}`);
    console.log(`Mobile Number: ${createVendorData.companyDetails.mobileCountry} ${createVendorData.companyDetails.mobile}`);
    console.log(`Email ID     : ${createVendorData.companyDetails.email}`);
    console.log('=================================================');
});
