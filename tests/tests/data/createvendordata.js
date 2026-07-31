const { faker } = require('@faker-js/faker');

const validLegalEntities = [
    'CO-Op Society', 'Freelance', 'Freelancer',
    'HUF', 'Individual',
    'Limited Liability', 'Others', 'Partnership',
    'Proprietorship', 'PSU',
    'Public Limited', 'Public Sector Companies', 'Pvt Limited', 'Trust'
];

const validCountries = [
    'India', 'United States', 'United Kingdom',
    'Saudi Arabia', 'Australia', 'Canada', 'Germany', 'Singapore', 'Qatar'
];

const mobileCountries = [
    'India', 'USA', 'United Arab Emirates', 'Saudi Arabia',
    'Australia', 'Canada', 'Germany', 'Singapore', 'Qatar'
];

const bankCountries = [
    'India', 'United States', 'United Kingdom',
    'Saudi Arabia', 'Australia', 'Canada', 'Germany', 'Singapore', 'Qatar'
];

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const randomLegalEntity  = pick(validLegalEntities);
const randomCountry      = pick(validCountries);
const randomMobileCountry = pick(mobileCountries);
const randomBankCountry  = pick(bankCountries);

const sharedAccountNumber = faker.string.numeric(10);

exports.createVendorData = {

    validLogin: {
        email:    'abhilash.gundapuneni@prokraya.com',
        password: 'Test@123'
    },

    companyDetails: {
        companyName:        faker.company.name(),
        legalEntity:         randomLegalEntity,
        address:             faker.location.streetAddress(),
        city:                faker.location.city(),
        state:               faker.location.state(),
        country:             randomCountry,
        postalCode:          faker.location.zipCode(),
        licenseNo:           'LIC' + faker.string.numeric(6),
        placeOfIssue:        faker.location.city(),
        incorporationDate:   faker.date.past({ years: 10 }).toISOString().split('T')[0],
        contactName:         faker.person.fullName(),
        designation:         faker.person.jobTitle(),
        email:               faker.internet.email(),
        mobileCountry:       randomMobileCountry,
        mobile:              faker.string.numeric(10),
    },

    bankDetails: {
        bankName:            faker.company.name() + ' Bank',
        beneficiaryName:     faker.person.fullName(),
        bankAddress:         faker.location.streetAddress(),
        bankCity:            faker.location.city(),
        bankState:           faker.location.state(),
        accountNo:           sharedAccountNumber,
        confirmAccountNo:    sharedAccountNumber,
        ifscCode:            'CNRB0003175',
        swiftCode:           'SBININBB345',
        bankCountry:         randomBankCountry,
        bankPostalCode:      faker.location.zipCode(),
    }
};