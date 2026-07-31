const { faker } = require('@faker-js/faker');

const validCountries = [
    'India',
    'United States',
    'USA',
    'UAE',
    'Saudi Arabia',
    'Australia',
    'Canada',
    'Germany',
    'Singapore',
    'Qatar'
];


const randomCountry = validCountries[Math.floor(Math.random() * validCountries.length)];
const Countries = [
    'India',
    'United States',
    'USA',
    'UAE',
    'Saudi Arabia',
    'Australia',
    'Canada',
    'Germany',
    'Singapore',
    'Qatar'
];
const randomC = Countries[Math.floor(Math.random() * Countries.length)];
exports.signUpRandomData = {
    validUser: {
        organizationName: faker.company.name(),
        contactName:      faker.person.fullName(),
        emailId:          faker.internet.email(),
        mobileCountry:    randomCountry,
        mobileNumber:     faker.string.numeric(10),
        country:          randomC,
        designation:      faker.person.jobTitle(),
        department:       faker.commerce.department(),
        password:         'Test@123',
        confirmPassword:  'Test@123',
    }
}