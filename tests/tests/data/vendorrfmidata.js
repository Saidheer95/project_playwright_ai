const { faker } = require('@faker-js/faker');

const validCountries = [
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Afghanistan',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria'
];

const validLegalEntities = [
    'CO-Op Society', 'Freelance', 'Freelancer',
    'HUF', 'Individual',
    'Limited Liability', 'Others', 'Partnership',
    'Proprietorship', 'PSU',
    'Public Limited', 'Public Sector Companies', 'Pvt Limited', 'Trust'
];
const validPaymentTerms = [
    '30 Days',
    '45 Days',
    'short payments',
    '60 Days',
    '90 Days',
    'Immediate'
];

const validWorkDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const validCurrencies = ['USD', 'INR', 'AED', 'EUR'];
const validOpenTimes = ['08:00', '09:00', '10:00'];
const validCloseTimes = ['17:00', '18:00', '19:00'];
const mobileCountry = ['India', 'USA', 'UAE', 'Saudi Arabia', 'UK', 'Australia', 'Germany', 'Singapore', 'Qatar'];
const parentCategories = ['bikes'];
const subCategories = ['tvs'];
const parentCategoryTypes = ['Primary producer/Manufacturer', 'Distributor / Dealer'];
const bankcountries = ['India', 'United States', 'United Kingdom', 'Saudi Arabia', 'Australia', 'Canada', 'Germany', 'Singapore', 'Qatar'];
const bankcurrencies = ['USD', 'INR', 'AED', 'EUR'];
const bankAccountTypes = ['Current Account', 'Savings Account'];
const bankDocumentTypes = ['BANK_DOCUMENT', 'Cancelled Cheque'];
const typeOfDocument = ['Trade License', 'Chamber of Commerce Membership', 'VAT Certificate', 'Company Profile', 'Memorandum of Association', 'List of Employees'];
function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const randomCountry = pick(validCountries);
const randomLegalEntity = pick(validLegalEntities);
const randomCurrency = pick(validCurrencies);
const randomWorkFrom = pick(validWorkDays);
const randomWorkTo = pick(validWorkDays);
const randomOpenTime = pick(validOpenTimes);
const randomCloseTime = pick(validCloseTimes);
const randomPaymentTerms = pick(validPaymentTerms);
const randomMobileCountry = pick(mobileCountry);
const randomParentCategory = pick(parentCategories);
const randomSubCategory = pick(subCategories);
const randomCategoryType = pick(parentCategoryTypes);
const randomBankCountry = pick(bankcountries);
const randomBankCurrency = pick(bankcurrencies);
const randomBankAccountType = pick(bankAccountTypes);
const randomBankDocumentType = pick(bankDocumentTypes);
const randomTypeOfDocument = pick(typeOfDocument);
exports.VendorRfmiData = {

    validUser: {
        email: 'Yoshiko_Lowe@hotmail.com',
        password: 'Test@123',
    },

    companydetails: {
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: randomCountry,
        zipCode: faker.location.zipCode(),
        website: faker.internet.url(),
        legalEntity: randomLegalEntity,
        PAN: 'ABCDE1234F',

        IncorporationDate: faker.date.past({ years: 10 })
            .toISOString().split('T')[0],

        LicenseNumber: 'LIC123456',

        licenseExpiryDate: faker.date.future({ years: 2 })
            .toISOString().split('T')[0],

        licenceplaceofissue: faker.location.city(),
        workWeekFrom: randomWorkFrom,
        workWeekTo: randomWorkTo,
        AnnualTurnover: faker.finance.amount({ min: 100000, max: 9999999, dec: 0 }),
        TurnoverCurrency: randomCurrency,
        opentime: randomOpenTime,
        closetime: randomCloseTime,
        GSTRegistrationNumber: faker.string.alphanumeric(15).toUpperCase(),
        PaymentTerms: randomPaymentTerms,
        TIN: faker.string.alphanumeric(10).toUpperCase(),
        TaxEffectiveDate: faker.date.past({ years: 10 })
            .toISOString().split('T')[0],
    },

    contactdetails: [
        {
            contactName: faker.person.fullName(),
            category: 'Sales Services',
            Email: faker.internet.email(),
            department: faker.commerce.department(),
            designation: faker.person.jobTitle(),
            mobileCountry: randomMobileCountry,
            mobileNumber: faker.string.numeric(10),
            isPrimary: 'Yes',
            authorizedSignatory: 'Yes',
        },
        {
            contactName: faker.person.fullName(),
            category: 'Finance',
            Email: faker.internet.email(),
            department: faker.commerce.department(),
            designation: faker.person.jobTitle(),
            mobileCountry: randomMobileCountry,
            mobileNumber: faker.string.numeric(10),
            isPrimary: 'No',
            authorizedSignatory: 'No',
        }
    ],

    scopeOfSupply: {
        parentCategory: randomParentCategory,
        subCategory: randomSubCategory,
        categoryType: randomCategoryType,
        serviceDescription: faker.commerce.productDescription(),
        domesticExperience: '5',
        internationalExperience: '3',
    },

    bankingDetails: {
        bankCountry: randomBankCountry,
        bankCurrency: randomBankCurrency,
        bankName: faker.company.name() + ' Bank',
        bankBranchName: faker.location.city() + ' Branch',
        SWIFTCode: 'SBININBB345',
        ABARoutingNumber: faker.string.numeric(9),
        IFSCCode: 'CNRB0003175',
        bankAddress: faker.location.streetAddress(),
        beneficiaryName: faker.person.fullName(),
        bankAccountNumber: faker.string.numeric(10),
        confirmAccountNumber: faker.string.numeric(10),
        bankAccountType: randomBankAccountType,
        street: faker.location.street(),
        beneficiaryAddress: faker.location.streetAddress(),
        bankCity: faker.location.city(),
        bankRegion: faker.location.state(),
        IBAN: 'GB29NWBK60161331926819',
        bankPostalCode: faker.location.zipCode(),
        bankDocumentType: randomBankDocumentType,

        docFilePath: './tests/Files/Bank_Letter_NovaSpark 1.pdf',
    },

    certifications: {
        docType: randomTypeOfDocument,
        expiryRequired: true,

        docExpiry: faker.date.future({ years: 1 })
            .toISOString().split('T')[0],

        docRemarks: 'Certified for quality management systems',
    },

    approvers: {
        email1: 'ashok.reddy@prokraya.com',
        password1: 'Test@123',
    },

    vendorRfmi: {
        comments: 'RequestForMoreInfo'
    },
    vendorApproved:{
        comments:'VendorApproved'
    }
}