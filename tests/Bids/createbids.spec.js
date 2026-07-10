const{test,expect}=require('@playwright/test');
const Create_Bid=require('../../pages/PR_BID/bids.page');
const {LoginPage,loadCredentials}=require('../../pages/Login/login.page');
const testData=require('../../testdata.json');
test.describe('Create Bid Flow',()=>{
    test.beforeEach(async({page})=>{
        const loginPage=new LoginPage(page); 
        const credentials = loadCredentials();
        await page.goto(credentials.loginUrl);
        await loginPage.login(credentials.buyer.email, credentials.buyer.password);
    });

    test('should navigate to create bid and search for the PR number',async({page})=>{
        const create_bid_page=new Create_Bid(page);
        await create_bid_page.createBid(testData);
        console.log(`Searching for PR Number: ${testData.addLine.prNumber}`);
        console.log(`Creating Bid of type: ${testData.createBid.type} with name: ${testData.createBid.bidname}`);
    });
})