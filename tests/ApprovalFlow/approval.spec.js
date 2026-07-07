const{test,expect}=require('@playwright/test');
const Approvals=require('../../pages/Approvals/approval.page');
const {LoginPage,loadCredentials}=require('../../pages/Login/login.page');
const testData=require('../../testdata.json');

test.describe('Approval Flow',()=>{
    test.beforeEach(async({page})=>{
        const loginPage=new LoginPage(page);
        const credentials = loadCredentials();
        await page.goto(credentials.loginUrl);
        await loginPage.login(credentials.approver.email, credentials.approver.password);
    });

    test('should navigate to approval request and search for the PR number',async({page})=>{
        const approval_flow_page=new Approvals(page);
        await approval_flow_page.navigateToApprovalRequest(testData);
        console.log(`Searching for PR Number: ${testData.approver.number}`);
    });

})