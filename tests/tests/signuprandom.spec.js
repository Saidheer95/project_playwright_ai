const { test, expect }      = require('@playwright/test');
const { signUpRandom }      = require('./pages/signuprandompage');
const { signUpRandomData }  = require('./data/signuprandomdata');

test('Signup with random faker data', async ({ page }) => {

    // // ✅ Print generated data in terminal
    // console.log('========= Random Test Data =========');
    // console.log('Org Name   :', signUpRandomData.validUser.organizationName);
    // console.log('Name       :', signUpRandomData.validUser.contactName);
     console.log('Email      :', signUpRandomData.validUser.emailId);
    // console.log('Mob Country:', signUpRandomData.validUser.mobileCountry);
    // console.log('Mobile     :', signUpRandomData.validUser.mobileNumber);
    // console.log('Country    :', signUpRandomData.validUser.country);
    // console.log('Designation:', signUpRandomData.validUser.designation);
    // console.log('Department :', signUpRandomData.validUser.department);
    // console.log('====================================');

    const signUpRandomPage = new signUpRandom(page);
    await signUpRandomPage.goto();
    await signUpRandomPage.signup(
        signUpRandomData.validUser.organizationName,
        signUpRandomData.validUser.contactName,
        signUpRandomData.validUser.emailId,
        signUpRandomData.validUser.mobileCountry,
        signUpRandomData.validUser.mobileNumber,
        signUpRandomData.validUser.country,
        signUpRandomData.validUser.designation,
        signUpRandomData.validUser.department,
        signUpRandomData.validUser.password,
        signUpRandomData.validUser.confirmPassword
    );
    await page.waitForTimeout(5000);
});