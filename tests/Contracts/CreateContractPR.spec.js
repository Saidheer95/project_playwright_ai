const { test } = require('@playwright/test');
const Create_Contract_PR=require('../../pages/PR_BID/contract.page');
const {LoginPage,loadCredentials}=require('../../pages/Login/login.page');
const testdata=require('../../testdata.json');
const JsonWriter = require('../../utils/JsonWriter');

test.describe('Create Contract Flow',()=>{
    test.beforeEach(async({page})=>{
        const loginPage=new LoginPage(page); 
        const credentials = loadCredentials();
        await page.goto(credentials.loginUrl);
        await loginPage.login(credentials.buyer.email, credentials.buyer.password);
    });
    
    test('should navigate to create contract and search for the PR number',async({page})=>{
        const create_contract_page=new Create_Contract_PR(page);
        await create_contract_page.createContractPR(testdata);
        console.log(`Searching for PR Number: ${testdata.addLine.prNumber}`);

        const contractNumber = await create_contract_page.getContractNumber();

        console.log(`Contract Number Saved: ${contractNumber}`);

    });
})

