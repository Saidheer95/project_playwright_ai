const { test } = require('@playwright/test');
const Purchase_Requisitions = require('../../pages/PurchaseRequisition/purchaserequisition.page');
const Add_Pr_Line = require('../../pages/PurchaseRequisition/addPrLine.page');
const Submit_Approval = require('../../pages/PurchaseRequisition/purchasesubmit_approval.page');
const Create_Bid = require('../../pages/PR_BID/bidsRFQ.page');
const Approvals = require('../../pages/Approvals/approval.page');
const { LoginPage, loadCredentials } = require('../../pages/Login/login.page');
const testData = require('../../testdata.json');

test.describe('End to End Flow', () => {

    test('Create PR -> Approve PR -> Create Bid', async ({ browser }) => {

        const credentials = loadCredentials();

        //=====================================================
        // USER 1 - REQUESTOR
        //=====================================================

        const requestorContext = await browser.newContext();
        const requestorPage = await requestorContext.newPage();

        const requestorLogin = new LoginPage(requestorPage);

        await requestorPage.goto(credentials.loginUrl);

        await requestorLogin.login(
            credentials.requestor.email,
            credentials.requestor.password
        );

        const purchaseRequisitionPage = new Purchase_Requisitions(requestorPage);

        await purchaseRequisitionPage.createPurchaseRequisitionPage(testData);

        const addPrLinePage = new Add_Pr_Line(requestorPage);
        await addPrLinePage.addPurchaseRequisitionLine(testData);

        const submitApprovalPage = new Submit_Approval(requestorPage);
        await submitApprovalPage.submitForApproval();

        const prNumber = await purchaseRequisitionPage.getPRNumber();

        console.log("Generated PR Number:", prNumber);

        await requestorContext.close();

        //=====================================================
        // USER 2 - APPROVER
        //=====================================================

        const approverContext = await browser.newContext();
        const approverPage = await approverContext.newPage();

        const approverLogin = new LoginPage(approverPage);

        await approverPage.goto(credentials.loginUrl);

        await approverLogin.login(
            credentials.approver.email,
            credentials.approver.password
        );

        const approval_flow_page = new Approvals(approverPage);
        await approval_flow_page.navigateToApprovalRequest(testData);
        console.log(`Searching for PR Number: ${testData.approvers.number}`);

        console.log("PR Approved");

        await approverContext.close();

        //=====================================================
        // USER 3 - BUYER
        //=====================================================

        const buyerContext = await browser.newContext();
        const buyerPage = await buyerContext.newPage();

        const buyerLogin = new LoginPage(buyerPage);

        await buyerPage.goto(credentials.loginUrl);

        await buyerLogin.login(
            credentials.buyer.email,
            credentials.buyer.password
        );

        const createBidPage = new Create_Bid(buyerPage);

        await createBidPage.createBid(testData);
        console.log(`Searching for PR Number: ${testData.addLine.prNumber}`);


        console.log("Bid Created Successfully");


        await buyerContext.close();

    });

});