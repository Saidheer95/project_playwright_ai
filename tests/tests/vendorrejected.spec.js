const { test } = require('@playwright/test');
const { vendorRejectedPage } = require('./pages/vendorrejectedpage');
const { VendorRejectedData } = require('./data/vendorrejecteddata');

test('Vendor Registration - Rejection Flow', async ({ page }) => {
    test.setTimeout(180000);

    const vendor = new vendorRejectedPage(page);

    await vendor.goto();
    await vendor.login(
        VendorRejectedData.validUser.email,
        VendorRejectedData.validUser.password
    );

    const companyName = (await vendor.page.getByTestId('text-company-welcome').textContent()).trim();
    console.log('Captured company name:', companyName);

    await vendor.companyDetails(
        VendorRejectedData.companydetails.address1,
        VendorRejectedData.companydetails.address2,
        VendorRejectedData.companydetails.city,
        VendorRejectedData.companydetails.state,
        VendorRejectedData.companydetails.country,
        VendorRejectedData.companydetails.zipCode,
        VendorRejectedData.companydetails.website,
        VendorRejectedData.companydetails.legalEntity,
        VendorRejectedData.companydetails.PAN,
        VendorRejectedData.companydetails.IncorporationDate,
        VendorRejectedData.companydetails.LicenseNumber,
        VendorRejectedData.companydetails.licenseExpiryDate,
        VendorRejectedData.companydetails.licenceplaceofissue,
        VendorRejectedData.companydetails.workWeekFrom,
        VendorRejectedData.companydetails.workWeekTo,
        VendorRejectedData.companydetails.AnnualTurnover,
        VendorRejectedData.companydetails.TurnoverCurrency,
        VendorRejectedData.companydetails.opentime,
        VendorRejectedData.companydetails.closetime,
        VendorRejectedData.companydetails.GSTRegistrationNumber,
        VendorRejectedData.companydetails.PaymentTerms,
        VendorRejectedData.companydetails.TIN,
        VendorRejectedData.companydetails.TaxEffectiveDate
    );

    await page.waitForTimeout(7000);

    for (const contact of VendorRejectedData.contactdetails) {
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
        await page.waitForTimeout(1000);
    }

    await vendor.saveAndContinueContacts();

    await page.waitForTimeout(4000);

    await vendor.scopeOfSupply(
        VendorRejectedData.scopeOfSupply.parentCategory,
        VendorRejectedData.scopeOfSupply.subCategory,
        VendorRejectedData.scopeOfSupply.categoryType,
        VendorRejectedData.scopeOfSupply.serviceDescription,
        VendorRejectedData.scopeOfSupply.domesticExperience,
        VendorRejectedData.scopeOfSupply.internationalExperience
    );

    await page.waitForTimeout(3000);

    await vendor.bankingDetails(
        VendorRejectedData.bankingDetails.bankDocumentType,
        VendorRejectedData.bankingDetails.docFilePath,
        VendorRejectedData.bankingDetails.bankName,
        VendorRejectedData.bankingDetails.bankBranchName,
        VendorRejectedData.bankingDetails.SWIFTCode,
        VendorRejectedData.bankingDetails.ABARoutingNumber,
        VendorRejectedData.bankingDetails.IFSCCode,
        VendorRejectedData.bankingDetails.bankAddress,
        VendorRejectedData.bankingDetails.beneficiaryName,
        VendorRejectedData.bankingDetails.bankAccountNumber,
        VendorRejectedData.bankingDetails.bankAccountNumber,
        VendorRejectedData.bankingDetails.bankAccountType,
        VendorRejectedData.bankingDetails.street,
        VendorRejectedData.bankingDetails.beneficiaryAddress,
        VendorRejectedData.bankingDetails.bankCity,
        VendorRejectedData.bankingDetails.bankRegion,
        VendorRejectedData.bankingDetails.IBAN,
        VendorRejectedData.bankingDetails.bankPostalCode,
        VendorRejectedData.bankingDetails.bankCountry,
        VendorRejectedData.bankingDetails.bankCurrency
    );

    await page.waitForTimeout(5000);

    await vendor.certificateDetails(
        VendorRejectedData.certifications.docType,
        VendorRejectedData.certifications.expiryRequired,
        VendorRejectedData.certifications.docExpiry,
        VendorRejectedData.certifications.docRemarks,
        VendorRejectedData.bankingDetails.docFilePath
    );

    await page.waitForTimeout(3000);

    await vendor.signOutAndSignIn(
        VendorRejectedData.approvers.email1,
        VendorRejectedData.approvers.password1
    );

    await page.waitForTimeout(3000);

    await vendor.rejectedFlow(
        companyName,
        VendorRejectedData.vendorRejected.comments
    );
});
