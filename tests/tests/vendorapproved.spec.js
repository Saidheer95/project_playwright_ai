const { test } = require('@playwright/test');
const { vendorApprovedPage } = require('./pages/vendorapprovedpage');
const { VendorApprovedData } = require('./data/vendorapproveddata');

test('Vendor Registration - End to End', async ({ page }) => {

    const vendor = new vendorApprovedPage(page);

    await vendor.goto();
    await vendor.login(
        VendorApprovedData.validUser.email,
        VendorApprovedData.validUser.password
    );

 const companyName = (await vendor.page.getByTestId('text-company-welcome').textContent()).trim();
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

    await page.waitForTimeout(7000);

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
        await page.waitForTimeout(1000);
    }

    await vendor.saveAndContinueContacts();
    
    await page.waitForTimeout(4000);
    
    await vendor.scopeOfSupply(
        VendorApprovedData.scopeOfSupply.parentCategory,
        VendorApprovedData.scopeOfSupply.subCategory,
        VendorApprovedData.scopeOfSupply.categoryType,
        VendorApprovedData.scopeOfSupply.serviceDescription,
        VendorApprovedData.scopeOfSupply.domesticExperience,
        VendorApprovedData.scopeOfSupply.internationalExperience
    );

    await page.waitForTimeout(3000);

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

    await page.waitForTimeout(5000);

    await vendor.certificateDetails(
        VendorApprovedData.certifications.docType,
        VendorApprovedData.certifications.expiryRequired,
        VendorApprovedData.certifications.docExpiry,
        VendorApprovedData.certifications.docRemarks,
        VendorApprovedData.bankingDetails.docFilePath
    );

    await page.waitForTimeout(3000);
  
    await vendor.signOutAndSignIn(
         VendorApprovedData.approvers.email1,
         VendorApprovedData.approvers.password1,

    );
   
    await page.waitForTimeout(3000);

    await vendor.approved(
        companyName,
        VendorApprovedData.vendorApproved.comments,
    );
});