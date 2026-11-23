const { test } = require('@playwright/test');
const Create_Bid=require('../../pages/PR_BID/bidsRFQ.page');
const {LoginPage,loadCredentials}=require('../../pages/Login/login.page');
const JsonWriter = require('../../utils/JsonWriter');

const testData=require('../../testdata.json');
test.describe('Create Bid Flow',()=>{
    test.beforeEach(async({page})=>{
        const loginPage=new LoginPage(page); 
        const credentials = loadCredentials();
        await page.goto(credentials.loginUrl);
        await loginPage.login(credentials.buyer.email, credentials.buyer.password);
    });

      test('RFP-REG-001 - should add RFP line items', async ({ page }) => {
        const rfqPage = new Create_Bid(page);

        await rfqPage.addRFQLineItems(testData);

        console.log('RFQ line items added successfully');
    });

    test('RFP-REG-002 - should add suppliers', async ({ page }) => {
        const rfqPage = new Create_Bid(page);

        await rfqPage.addRFQLineItems(testData);
        await rfqPage.addSuppliers(testData);

        console.log('Suppliers added successfully');
    });

    test('RFP-REG-003 - should add terms and conditions', async ({ page }) => {
        const rfqPage = new Create_Bid(page);

        await rfqPage.addRFPLineItems(testData);
        await rfqPage.addSuppliers(testData);
        await rfqPage.addEvaluationTeam(testData);
        await rfqPage.addTerms(testData);

        console.log('Terms and conditions added successfully');
    });

    test('RFP-REG-004 - should publish RFQ successfully', async ({ page }) => {
        const rfqPage = new Create_Bid(page);

        await rfqPage.addRFPLineItems(testData);
        await rfqPage.addSuppliers(testData);
        await rfqPage.addTerms(testData);
        await rfqPage.publishRFP();

        console.log('RFQ published successfully');
    });

    
    


})