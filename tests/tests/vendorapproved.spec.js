const { test } = require('@playwright/test');
const { vendorApprovedPage } = require('./pages/vendorapprovedpage');
const { VendorApprovedData } = require('./data/vendorapproveddata');

let vendor;
let companyName;

test.beforeEach('Setup - Login and get company name', async ({ page }) => {   
    vendor = new vendorApprovedPage(page);
    await vendor.goto();
    await vendor.login(
        VendorApprovedData.validUser.email,
        VendorApprovedData.validUser.password
    );
});

test('Vendor Registration - Company Details', async () => {
    companyName = (await vendor.page.getByTestId('text-company-welcome').textContent())?.trim() ?? '';
    console.log('Captured company name:', companyName);

    await vendor.companyDetails(
        VendorApprovedData.companydetails.address1,
        VendorApprovedData.companydetails.address2,
        VendorApprovedData.companydetails.city,
        VendorApprovedData.companydetails.state,
        VendorApprovedData.companydetails.country,
        VendorApprovedData.companydetails.zipCode,
        VendorApprovedData.companydetails.website,
        VendorApprovedData.companydetails.legalEntity,
        VendorApprovedData.companydetails.PAN,
        VendorApprovedData.companydetails.IncorporationDate,
        VendorApprovedData.companydetails.LicenseNumber,
        VendorApprovedData.companydetails.licenseExpiryDate,
        VendorApprovedData.companydetails.licenceplaceofissue,
        VendorApprovedData.companydetails.workWeekFrom,
        VendorApprovedData.companydetails.workWeekTo,
        VendorApprovedData.companydetails.AnnualTurnover,
        VendorApprovedData.companydetails.TurnoverCurrency,
        VendorApprovedData.companydetails.opentime,
        VendorApprovedData.companydetails.closetime,
        VendorApprovedData.companydetails.GSTRegistrationNumber,
        VendorApprovedData.companydetails.PaymentTerms,
        VendorApprovedData.companydetails.TIN,
        VendorApprovedData.companydetails.TaxEffectiveDate
    );

});

test('Vendor Registration - Contacts Details', async () => {
    for (const contact of VendorApprovedData.contactdetails) {
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
        VendorApprovedData.scopeOfSupply.parentCategory,
        VendorApprovedData.scopeOfSupply.subCategory,
        VendorApprovedData.scopeOfSupply.categoryType,
        VendorApprovedData.scopeOfSupply.serviceDescription,
        VendorApprovedData.scopeOfSupply.domesticExperience,
        VendorApprovedData.scopeOfSupply.internationalExperience
    );

});

test('Vendor Registration - Banking Details', async () => {
    await vendor.bankingDetails(
        VendorApprovedData.bankingDetails.bankDocumentType,
        VendorApprovedData.bankingDetails.docFilePath,
        VendorApprovedData.bankingDetails.bankName,
        VendorApprovedData.bankingDetails.bankBranchName,
        VendorApprovedData.bankingDetails.SWIFTCode,
        VendorApprovedData.bankingDetails.ABARoutingNumber,
        VendorApprovedData.bankingDetails.IFSCCode,
        VendorApprovedData.bankingDetails.bankAddress,
        VendorApprovedData.bankingDetails.beneficiaryName,
        VendorApprovedData.bankingDetails.bankAccountNumber,
        VendorApprovedData.bankingDetails.bankAccountNumber,
        VendorApprovedData.bankingDetails.bankAccountType,
        VendorApprovedData.bankingDetails.street,
        VendorApprovedData.bankingDetails.beneficiaryAddress,
        VendorApprovedData.bankingDetails.bankCity,
        VendorApprovedData.bankingDetails.bankRegion,
        VendorApprovedData.bankingDetails.IBAN,
        VendorApprovedData.bankingDetails.bankPostalCode,
        VendorApprovedData.bankingDetails.bankCountry,
        VendorApprovedData.bankingDetails.bankCurrency
    );
});

test('Vendor Registration - Certificates', async () => {
    await vendor.certificateDetails(
        VendorApprovedData.certifications.docType,
        VendorApprovedData.certifications.expiryRequired,
        VendorApprovedData.certifications.docExpiry,
        VendorApprovedData.certifications.docRemarks,
        VendorApprovedData.certifications.docFilePath
    );

});

test('Vendor Registration - Review and Submit', async () => {
    await vendor.reviewAndSubmitRegistration();
});

test('Vendor Registration - Approval Workflow', async () => {
    companyName = (await vendor.page.getByTestId('text-company-welcome').textContent())?.trim() ?? '';
    console.log('Captured company name:', companyName);

    await vendor.signOutAndSignIn(
        VendorApprovedData.approvers.email1,
        VendorApprovedData.approvers.password1
    );
   

    await vendor.approved(
        companyName,
        VendorApprovedData.vendorApproved.comments
    );
});