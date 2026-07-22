const{test,expect}=require('@playwright/test');
const Create_Direct_Bid=require('../../pages/Bids/DirectBid.page');
const {LoginPage,loadCredentials}=require('../../pages/Login/login.page');
const testdata=require('../../testdata.json');
test.describe('Create Bid Flow',()=>{
    test.beforeEach(async({page})=>{
        const loginPage=new LoginPage(page); 
        const credentials = loadCredentials();
        await page.goto(credentials.loginUrl);
        await loginPage.login(credentials.buyer.email, credentials.buyer.password);
    });

    test('Direct Bid Creation',async({page})=>{
        const create_direct_bid_page=new Create_Direct_Bid(page);
        await create_direct_bid_page.bidDirectPage(testdata);
        // console.log(`Searching for PR Number: ${testData.addLine.prNumber}`);
    });
})