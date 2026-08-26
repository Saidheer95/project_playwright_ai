const { test } = require('@playwright/test');
const Supplier_Response_Page=require('../../pages/SupplierSideResponse/supplierResponse.page');
const {LoginPage,loadCredentials}=require('../../pages/Login/login.page');
const testData=require('../../testdata.json');
test.describe('Create Bid Flow',()=>{
    test.beforeEach(async({page})=>{
        const loginPage=new LoginPage(page); 
        const credentials = loadCredentials();
        await page.goto(credentials.loginUrl);
        await loginPage.login(credentials.supplier.email, credentials.supplier.password);
    });
    
    test('should navigate to create bid and search for the PR number',async({page})=>{
        const Supplier_Resp=new Supplier_Response_Page(page);
        await Supplier_Resp.SupplierResponse(testData);
        console.log(`Searching for PR Number: ${testData.supplierBid.bidNumber}`);
    });
})

