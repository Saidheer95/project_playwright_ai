const { expect } = require('@playwright/test');

exports.vendorRfmiPage =

    class VendorRfmiPage {

        constructor(page) {
            this.page = page;
            this.url = 'https://qa.prokraya.ai/signin';
            this.emailInput = 'input-email';
            this.passwordInput = 'input-password';
            this.loginButton = 'button-login';
            this.organizationDetailsHeading = 'Organization Details';

            this.companyWelcomeText = 'text-company-welcome';

            this.address1 = 'input-address-1';
            this.address2 = 'input-address-2';
            this.city = 'input-city';
            this.state = 'input-state';
            this.countryInput = 'select-country';
            this.zipCode = 'input-postalcode';
            this.website = 'input-website';
            this.legalEntity = 'select-legal-entity';
            this.PAN = 'input-pan';
            this.IncorporationDate = 'input-incorporation-date';
            this.LicenseNumber = 'input-license-number';
            this.licenseExpiryDate = 'input-license-expiry';
            this.licenceplaceofissue = 'input-place-of-issue';
            this.workWeekFrom = 'select-workweek-from';
            this.workWeekTo = 'select-workweek-to';
            this.AnnualTurnover = 'input-annual-turnover';
            this.TurnoverCurrency = 'select-turnover-currency';
            this.opentime = 'select-open-time';
            this.closetime = 'select-close-time';
            this.GSTRegistrationNumber = 'input-tax-reg';
            this.PaymentTerms = 'select-payment-terms';
            this.TIN = 'input-tin';
            this.TaxEffectiveDate = 'input-tax-effective-date';
            this.saveButton = 'button-save-continue';

            this.contactsmodule = 'Contacts';
            this.addContactButton = 'button-add-contact';
            this.contactName = 'input-contact-name';
            this.category = 'select-contact-category';
            this.Email = 'input-contact-email';
            this.department = 'input-contact-department';
            this.designation = 'input-contact-designation';
            this.mobileCountry = 'input-contact-mobile-country';
            this.mobileNumber = 'input-contact-mobile';
            this.isPrimary = 'select-is-primary';
            this.authorizedSignatory = 'select-auth-signatory';
            this.buttonSaveContact = 'button-save-contact';
            this.saveContactButton = 'button-save-continue';

            this.scopeOfSupplyNav = 'nav-step-scope-of-supply';
            this.parentCategory = 'select-parent-category';
            this.subCategory = 'select-sub-category';
            this.categorytype = 'select-category-type';
            this.buttonAddCategory = 'button-add-category';
            this.serviceDescription = 'input-service-description';
            this.domesticExperience = 'input-domestic-experience';
            this.internationalExperience = 'input-international-experience';
            this.saveScopeButton = 'button-save-continue';

            this.banking = 'nav-step-banking'
            this.addBankButton = 'button-add-bank';
            this.bankCountry = 'select-bank-country';
            this.bankCurrency = 'select-currency';
            this.bankName = 'input-bank-name';
            this.bankBranchName = 'input-branch-name';
            this.SWIFTCode = 'input-swift';
            this.ABARoutingNumber = 'input-aba-routing';
            this.IFSCCode = 'input-ifsc';
            this.bankAddress = 'input-bank-address';
            this.beneficiaryName = 'input-beneficiary-name';
            this.bankAccountNumber = 'input-account-no';
            this.confirmAccountNumber = 'input-confirm-account-no';
            this.bankAccountType = 'select-account-type';
            this.street = 'input-street';
            this.beneficiaryAddress = 'input-beneficiary-address';
            this.bankCity = 'input-bank-city';
            this.bankRegion = 'input-bank-region';
            this.IBAN = 'input-iban';
            this.bankPostalCode = 'input-bank-postal';
            this.radiobuttonYes = 'radio-primary-account';
            this.bankDocumentType = 'select-doc-type';
            this.inputFileUpload = 'input[type="file"]';
            this.buttonSaveBank = 'button-save-bank';
            this.saveBankButton = 'button-save-continue';

            this.certificates = 'nav-step-certificates';
            this.docType = 'select-doc-type';
            this.expiryRequired = 'checkbox-expiry-required';
            this.docExpiry = 'input-doc-expiry';
            this.docRemarks = 'input-doc-remarks';
            this.certificateDetailsUpload = 'input-file-upload';
            this.saveDocumentButton = 'button-save-document';
            this.saveCertificateButton = 'button-save-continue';

            this.reviewProfile = 'nav-step-review-profile';
            this.agreeTerms = 'checkbox-agree-terms';
            this.uploadSignButton = 'button-upload-doc';
            this.confirmSubmitButton = 'button-confirm-submit';
            this.menuprofile = 'button-user-menu';
            this.signOut = 'button-logout';
            this.viewAll = 'link-view-all-tasks';
            this.searchId = 'input-search-tasks';
            this.approveButtons = 'button-actions';
            this.moreInfoButton = 'button-more-info';
            this.approved1 = 'button-approve';
            this.comments = 'input-approval-comments';
            this.yesButton = 'button-approval-yes';
        }

        async goto() {
            await this.page.goto(this.url);
        }

        async login(email, password) {
            await this.page.getByTestId(this.emailInput).fill(email);
            await this.page.getByTestId(this.passwordInput).fill(password);
            await this.page.getByTestId(this.loginButton).click();
        }

        async companyDetails(address1, address2, city, state, country, zipCode, website, legalEntity, PAN, IncorporationDate, LicenseNumber, licenseExpiryDate, licenceplaceofissue, workWeekFrom, workWeekTo, AnnualTurnover, TurnoverCurrency, opentime, closetime, GSTRegistrationNumber, PaymentTerms, TIN, TaxEffectiveDate) {
            await this.page.getByTestId(this.address1).fill(address1);
            await this.page.getByTestId(this.address2).fill(address2);
            await this.page.getByTestId(this.city).fill(city);
            await this.page.getByTestId(this.state).fill(state);
            await this.page.getByTestId(this.countryInput).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(country) }).click();
            await this.page.getByTestId(this.zipCode).fill(zipCode);
            await this.page.getByTestId(this.website).fill(website);
            await this.page.getByTestId(this.legalEntity).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(legalEntity) }).click();
            await this.page.getByTestId(this.PAN).fill(PAN);
            await this.page.getByTestId(this.IncorporationDate).fill(IncorporationDate);
            await this.page.getByTestId(this.LicenseNumber).fill(LicenseNumber);
            await this.page.getByTestId(this.licenseExpiryDate).fill(licenseExpiryDate);
            await this.page.getByTestId(this.licenceplaceofissue).fill(licenceplaceofissue);
            await this.page.getByTestId(this.workWeekFrom).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(workWeekFrom) }).click();
            await this.page.getByTestId(this.workWeekTo).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(workWeekTo) }).click();
            await this.page.getByTestId(this.AnnualTurnover).fill(AnnualTurnover);
            await this.page.getByTestId(this.TurnoverCurrency).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(TurnoverCurrency) }).click();
            await this.page.getByTestId(this.opentime).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(opentime) }).click();
            await this.page.getByTestId(this.closetime).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(closetime) }).click();
            await this.page.getByTestId(this.GSTRegistrationNumber).fill(GSTRegistrationNumber);
            await this.page.getByTestId(this.PaymentTerms).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(PaymentTerms) }).click();
            await this.page.getByTestId(this.TIN).fill(TIN);
            await this.page.getByTestId(this.TaxEffectiveDate).fill(TaxEffectiveDate);
            await this.page.getByTestId(this.saveButton).click();
        }

        async contactDetails(contactName, category, Email, department, designation, mobileCountry, mobileNumber, isPrimary, authorizedSignatory) {
            await this.page.getByTestId(this.addContactButton).click();
            await this.page.getByTestId(this.contactName).fill(contactName);
            await this.page.getByTestId(this.category).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(category) }).click();
            await this.page.getByTestId(this.Email).fill(Email);
            await this.page.getByTestId(this.department).fill(department);
            await this.page.getByTestId(this.designation).fill(designation);
            await this.page.getByTestId(this.mobileCountry).click();
            await this.page.getByPlaceholder('Search country...').fill(mobileCountry);
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(mobileCountry) }).click();
            await this.page.getByTestId(this.mobileNumber).fill(mobileNumber);
            await this.page.getByTestId(this.isPrimary).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: isPrimary }).click();
            await this.page.getByTestId(this.authorizedSignatory).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: authorizedSignatory }).click();
            await this.page.getByTestId(this.buttonSaveContact).click();
        }

        async saveAndContinueContacts() {
            await this.page.getByTestId(this.saveContactButton).click();
        }

        async scopeOfSupply(parentCategory, subCategory, parentCategoryType, serviceDescription, domesticExperience, internationalExperience) {
            await this.page.getByTestId(this.scopeOfSupplyNav).click();
            await this.page.getByTestId(this.parentCategory).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(parentCategory) }).click();
            await this.page.getByTestId(this.subCategory).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(subCategory) }).click();
            await this.page.getByTestId(this.categorytype).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(parentCategoryType) }).click();
            await this.page.getByTestId(this.buttonAddCategory).click();
            await this.page.waitForTimeout(2000);
            await this.page.getByTestId(this.serviceDescription).fill(serviceDescription);
            await this.page.getByTestId(this.domesticExperience).fill(domesticExperience);
            await this.page.getByTestId(this.internationalExperience).fill(internationalExperience);
            await this.page.getByTestId(this.saveScopeButton).click();
        }

        async bankingDetails(bankDocumentType, docFilePath, bankName, bankBranchName, SWIFTCode, ABARoutingNumber, IFSCCode, bankAddress, beneficiaryName, bankAccountNumber, confirmAccountNumber, bankAccountType, street, beneficiaryAddress, bankCity, bankRegion, IBAN, bankPostalCode, bankCountry, bankCurrency) {
            await this.page.getByTestId(this.banking).click()
            await this.page.getByTestId(this.addBankButton).click();
            await this.page.getByTestId(this.bankDocumentType).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(bankDocumentType) }).click();

            await this.page.locator(this.inputFileUpload).setInputFiles('tests/Files/Bank_Letter_NovaSpark 1.pdf');
            await this.page.waitForTimeout(5000);

            await this.page.getByTestId(this.bankName).fill(bankName);
            await this.page.getByTestId(this.bankBranchName).fill(bankBranchName);
            await this.page.getByTestId(this.SWIFTCode).fill(SWIFTCode);
            await this.page.getByTestId(this.ABARoutingNumber).fill(ABARoutingNumber);
            await this.page.getByTestId(this.IFSCCode).fill(IFSCCode);
            await this.page.getByTestId(this.bankAddress).fill(bankAddress);
            await this.page.getByTestId(this.beneficiaryName).fill(beneficiaryName);
            await this.page.getByTestId(this.bankAccountNumber).fill(bankAccountNumber);
            await this.page.getByTestId(this.confirmAccountNumber).fill(confirmAccountNumber);
            await this.page.getByTestId(this.bankAccountType).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(bankAccountType) }).click();
            await this.page.getByTestId(this.street).fill(street);
            await this.page.getByTestId(this.beneficiaryAddress).fill(beneficiaryAddress);
            await this.page.getByTestId(this.bankCity).fill(bankCity);
            await this.page.getByTestId(this.bankRegion).fill(bankRegion);
            await this.page.getByTestId(this.IBAN).fill(IBAN);
            await this.page.getByTestId(this.bankPostalCode).fill(bankPostalCode);
            await this.page.getByTestId(this.radiobuttonYes).getByRole('radio', { name: 'Yes' }).click();

            await this.page.waitForTimeout(5000);
            await this.page.getByTestId(this.bankCountry).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(bankCountry) }).click();
            await this.page.getByTestId(this.bankCurrency).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(bankCurrency) }).click();
            await this.page.getByTestId(this.buttonSaveBank).click();
            await this.page.getByTestId(this.saveBankButton).click();
        }

        async certificateDetails(docType, expiryRequired, docExpiry, docRemarks, docFilePath) {
            await this.page.getByTestId(this.certificates).click();
            await this.page.getByTestId(this.docType).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(docType) }).click();
            if (expiryRequired) {
                await this.page.getByTestId(this.expiryRequired).check();
                await this.page.getByTestId(this.docExpiry).fill(docExpiry);
            }

            await this.page.getByTestId(this.certificateDetailsUpload).setInputFiles('tests/Files/GST_Certificate_NovaSpark 1.pdf');
            await this.page.waitForTimeout(5000);
            await this.page.getByTestId(this.docRemarks).fill(docRemarks);
            await this.page.getByTestId(this.saveDocumentButton).click();
            await this.page.waitForTimeout(5000);
            await this.page.getByTestId(this.saveCertificateButton).click();
        }

        async reviewAndSubmitRegistration(docFilePath) {
            await this.page.getByTestId(this.reviewProfile).click();
            await this.page.getByRole('button', { name: 'Review Profile' }).click();
            await this.page.waitForTimeout(5000);
            await this.page.locator('[data-testid="button-upload-doc"] + input[type="file"]').setInputFiles('tests/Files/Review-Sign-Document (25).pdf');
            await this.page.getByTestId(this.agreeTerms).check();
            await this.page.getByRole('button', { name: 'Submit for Approval' }).click();
            await this.page.getByTestId(this.confirmSubmitButton).click();
        }

        async signOutAndSignIn(email1, password1) {
            await this.page.getByTestId(this.menuprofile).click();
            await this.page.getByTestId(this.signOut).click();
            await this.page.getByTestId(this.emailInput).fill(email1);
            await this.page.getByTestId(this.passwordInput).fill(password1);
            await this.page.getByTestId(this.loginButton).click();
        }

        async rfmi(searchId, comments) {
            await this.page.getByTestId(this.viewAll).click();
            await this.page.getByTestId(this.searchId).click();
            await this.page.getByPlaceholder('Search by Entity ID, Subject, Submitter...').fill(searchId);
            await this.page.waitForTimeout(1000);
            await this.page.locator('[data-testid^="task-subject-"]', { hasText: searchId }).click();
            await this.page.getByTestId(this.approveButtons).click();

            await this.page.getByRole('menuitem', { name: 'More Info Requested' }).click();
            await this.page.getByTestId(this.comments).fill(comments);

            await this.page.getByTestId(this.yesButton).click();
            
        }

        async resubmitAfterRfmi(email, password) {
            await this.page.getByTestId(this.menuprofile).click();
            await this.page.getByTestId(this.signOut).click();
            await this.page.getByTestId(this.emailInput).fill(email);
            await this.page.getByTestId(this.passwordInput).fill(password);
            await this.page.getByTestId(this.loginButton).click();
            await this.page.getByTestId(this.reviewProfile).click();
            await this.page.getByRole('button', { name: 'Review Profile' }).click();
            await this.page.waitForTimeout(5000);
            await this.page.locator('[data-testid="button-upload-doc"] + input[type="file"]').setInputFiles('tests/Files/Review-Sign-Document (25).pdf');
            await this.page.getByTestId(this.agreeTerms).check();
            await this.page.getByRole('button', { name: 'Submit for Approval' }).click();
            await this.page.getByTestId(this.confirmSubmitButton).click();
            
        }

        async approved(searchId, comments) {
            await this.page.getByTestId(this.viewAll).click();
            await this.page.getByTestId(this.searchId).click();
            await this.page.getByPlaceholder('Search by Entity ID, Subject, Submitter...').fill(searchId);
            await this.page.waitForTimeout(1000);
            await this.page.locator('[data-testid^="task-subject-"]', { hasText: searchId }).click();
            await this.page.getByTestId(this.approveButtons).click();

            await this.page.getByTestId(this.approved1).click();
            await this.page.getByTestId(this.comments).fill(comments);

            await this.page.getByTestId(this.yesButton).click();
        }
    }