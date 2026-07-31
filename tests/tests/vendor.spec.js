const { test }             = require('@playwright/test');
const { vendorpage }       = require('./pages/vendorpage');
const { SignInVendorData } = require('./data/vendordata');

test('Vendor Registration - End to End', async ({ page }) => {

    const vendor = new vendorpage(page);

    await vendor.goto();
    await vendor.login(
        SignInVendorData.validUser.email,
        SignInVendorData.validUser.password
    );
    await vendor.companyDetails(
        SignInVendorData.companydetails.address1,
        SignInVendorData.companydetails.address2,
        SignInVendorData.companydetails.city,
        SignInVendorData.companydetails.state,
        SignInVendorData.companydetails.country,
        SignInVendorData.companydetails.zipCode,
        SignInVendorData.companydetails.website,
        SignInVendorData.companydetails.legalEntity,
        SignInVendorData.companydetails.PAN,
        SignInVendorData.companydetails.IncorporationDate,
        SignInVendorData.companydetails.LicenseNumber,
        SignInVendorData.companydetails.licenseExpiryDate,
        SignInVendorData.companydetails.licenceplaceofissue,
        SignInVendorData.companydetails.workWeekFrom,
        SignInVendorData.companydetails.workWeekTo,
        SignInVendorData.companydetails.AnnualTurnover,
        SignInVendorData.companydetails.TurnoverCurrency,
        SignInVendorData.companydetails.opentime,
        SignInVendorData.companydetails.closetime,
        SignInVendorData.companydetails.GSTRegistrationNumber,
        SignInVendorData.companydetails.PaymentTerms,
        SignInVendorData.companydetails.TIN,
        SignInVendorData.companydetails.TaxEffectiveDate
    );
    await page.waitForTimeout(7000);

    for (const contact of SignInVendorData.contactdetails) {
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
        SignInVendorData.scopeOfSupply.parentCategory,
        SignInVendorData.scopeOfSupply.subCategory,
        SignInVendorData.scopeOfSupply.categoryType,
        SignInVendorData.scopeOfSupply.serviceDescription,
        SignInVendorData.scopeOfSupply.domesticExperience,
        SignInVendorData.scopeOfSupply.internationalExperience
    );
    await page.waitForTimeout(3000);

    await vendor.bankingDetails(
        SignInVendorData.bankingDetails.bankDocumentType,
        SignInVendorData.bankingDetails.docFilePath,
        SignInVendorData.bankingDetails.bankName,
        SignInVendorData.bankingDetails.bankBranchName,
        SignInVendorData.bankingDetails.SWIFTCode,
        SignInVendorData.bankingDetails.ABARoutingNumber,
        SignInVendorData.bankingDetails.IFSCCode,
        SignInVendorData.bankingDetails.bankAddress,
        SignInVendorData.bankingDetails.beneficiaryName,
        SignInVendorData.bankingDetails.bankAccountNumber,
        SignInVendorData.bankingDetails.bankAccountNumber, 
        SignInVendorData.bankingDetails.bankAccountType,
        SignInVendorData.bankingDetails.street,
        SignInVendorData.bankingDetails.beneficiaryAddress,
        SignInVendorData.bankingDetails.bankCity,
        SignInVendorData.bankingDetails.bankRegion,
        SignInVendorData.bankingDetails.IBAN,
        SignInVendorData.bankingDetails.bankPostalCode,
        SignInVendorData.bankingDetails.bankCountry,
        SignInVendorData.bankingDetails.bankCurrency
    );
    await page.waitForTimeout(5000);

    await vendor.certificateDetails(

        SignInVendorData.certifications.docType,
        SignInVendorData.certifications.expiryRequired,
        SignInVendorData.certifications.docExpiry,
        SignInVendorData.certifications.docRemarks,
        SignInVendorData.bankingDetails.docFilePath     
    );
    await page.waitForTimeout(3000);

});