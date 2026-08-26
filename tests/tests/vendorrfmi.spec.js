const { test } = require('@playwright/test');
const { vendorRfmiPage } = require('./pages/vendorrfmipage');
const { VendorRfmiData } = require('./data/vendorrfmidata');

let vendor;
let companyName;

test.beforeEach('Setup - Login and get company name', async ({ page }) => {
    vendor = new vendorRfmiPage(page);
    await vendor.goto();
    await vendor.login(
        VendorRfmiData.validUser.email,
        VendorRfmiData.validUser.password
    );
});

test('Vendor Registration - Company Details', async () => {
    companyName = (await vendor.page.getByTestId('text-company-welcome').textContent())?.trim() ?? '';
    console.log('Captured company name:', companyName);

    await vendor.companyDetails(
        VendorRfmiData.companydetails.address1,
        VendorRfmiData.companydetails.address2,
        VendorRfmiData.companydetails.city,
        VendorRfmiData.companydetails.state,
        VendorRfmiData.companydetails.country,
        VendorRfmiData.companydetails.zipCode,
        VendorRfmiData.companydetails.website,
        VendorRfmiData.companydetails.legalEntity,
        VendorRfmiData.companydetails.PAN,
        VendorRfmiData.companydetails.IncorporationDate,
        VendorRfmiData.companydetails.LicenseNumber,
        VendorRfmiData.companydetails.licenseExpiryDate,
        VendorRfmiData.companydetails.licenceplaceofissue,
        VendorRfmiData.companydetails.workWeekFrom,
        VendorRfmiData.companydetails.workWeekTo,
        VendorRfmiData.companydetails.AnnualTurnover,
        VendorRfmiData.companydetails.TurnoverCurrency,
        VendorRfmiData.companydetails.opentime,
        VendorRfmiData.companydetails.closetime,
        VendorRfmiData.companydetails.GSTRegistrationNumber,
        VendorRfmiData.companydetails.PaymentTerms,
        VendorRfmiData.companydetails.TIN,
        VendorRfmiData.companydetails.TaxEffectiveDate
    );
});

test('Vendor Registration - Contacts Details', async () => {
    for (const contact of VendorRfmiData.contactdetails) {
        await vendor.contactDetails(
            contact.contactName,
            contact.category,
            contact.Email,
            contact.department,
            contact.designation,
            contact.mobileCountry,
            contact.mobileNumber,
            contact.isPrimary,
            contact.authorizedSignatory
        );
        await vendor.page.waitForTimeout(1000);
    }

    await vendor.saveAndContinueContacts();
});

test('Vendor Registration - Scope of Supply', async () => {
    await vendor.scopeOfSupply(
        VendorRfmiData.scopeOfSupply.parentCategory,
        VendorRfmiData.scopeOfSupply.subCategory,
        VendorRfmiData.scopeOfSupply.categoryType,
        VendorRfmiData.scopeOfSupply.serviceDescription,
        VendorRfmiData.scopeOfSupply.domesticExperience,
        VendorRfmiData.scopeOfSupply.internationalExperience
    );
});

test('Vendor Registration - Banking Details', async () => {
    await vendor.bankingDetails(
        VendorRfmiData.bankingDetails.bankDocumentType,
        VendorRfmiData.bankingDetails.docFilePath,
        VendorRfmiData.bankingDetails.bankName,
        VendorRfmiData.bankingDetails.bankBranchName,
        VendorRfmiData.bankingDetails.SWIFTCode,
        VendorRfmiData.bankingDetails.ABARoutingNumber,
        VendorRfmiData.bankingDetails.IFSCCode,
        VendorRfmiData.bankingDetails.bankAddress,
        VendorRfmiData.bankingDetails.beneficiaryName,
        VendorRfmiData.bankingDetails.bankAccountNumber,
        VendorRfmiData.bankingDetails.bankAccountNumber,
        VendorRfmiData.bankingDetails.bankAccountType,
        VendorRfmiData.bankingDetails.street,
        VendorRfmiData.bankingDetails.beneficiaryAddress,
        VendorRfmiData.bankingDetails.bankCity,
        VendorRfmiData.bankingDetails.bankRegion,
        VendorRfmiData.bankingDetails.IBAN,
        VendorRfmiData.bankingDetails.bankPostalCode,
        VendorRfmiData.bankingDetails.bankCountry,
        VendorRfmiData.bankingDetails.bankCurrency
    );
});

test('Vendor Registration - Certificates', async () => {
    await vendor.certificateDetails(
        VendorRfmiData.certifications.docType,
        VendorRfmiData.certifications.expiryRequired,
        VendorRfmiData.certifications.docExpiry,
        VendorRfmiData.certifications.docRemarks,
        VendorRfmiData.certifications.docFilePath
    );
});

test('Vendor Registration - Review and Submit', async () => {
    await vendor.reviewAndSubmitRegistration();
});

test('Vendor Registration - RFMI and Approval Workflow', async () => {

    await vendor.signOutAndSignIn(
        VendorRfmiData.approvers.email1,
        VendorRfmiData.approvers.password1
    );

    await vendor.rfmi(
        companyName,
        VendorRfmiData.vendorRfmi.comments
    );
});

test('Vendor Registration - Resubmit After RFMI', async () => {
    
    companyName = (await vendor.page.getByTestId('text-company-welcome').textContent())?.trim() ?? '';
    console.log('Captured company name:', companyName);

    await vendor.resubmitAfterRfmi(
        VendorRfmiData.validUser.email,
        VendorRfmiData.validUser.password
    );
    await vendor.signOutAndSignIn(
        VendorRfmiData.approvers.email1,
        VendorRfmiData.approvers.password1
    );

    await vendor.approved(
        companyName,
        VendorRfmiData.vendorApproved.comments
    );
});