const { test } = require('@playwright/test');
const Purchase_Requisitions = require('../../pages/PurchaseRequisition/purchaserequisition.page');
const Add_Pr_Line = require('../../pages/PurchaseRequisition/addPrLine.page');
const Submit_Approval = require('../../pages/PurchaseRequisition/purchasesubmit_approval.page');
const { LoginPage, loadCredentials } = require('../../pages/Login/login.page');
const JsonWriter = require('../../utils/JsonWriter');
const testData = require('../../testdata.json');

test.describe('Purchase Requisition Page', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);      
        const credentials = loadCredentials();
        await page.goto(credentials.loginUrl);
        await loginPage.login(credentials.requestor.email, credentials.requestor.password);
    });

    test('should create a new purchase requisition', async ({ page }) => {
        const purchase_requisition_page = new Purchase_Requisitions(page);
        await purchase_requisition_page.createPurchaseRequisitionPage(testData);

        console.log("Purchase Requisition created successfully with the following details:");
        console.log(`Description: ${testData.createPurchaseRequisition.prDescription}`);
        console.log(`Delivery Location: ${testData.createPurchaseRequisition.deliveryLocation}`);

        const add_pr_line_page = new Add_Pr_Line(page);
        for (let i = 0; i < 3; i++) {
            console.log(`Adding line ${i + 1}`);
            await add_pr_line_page.addPurchaseRequisitionLine(testData);
            console.log(`Line ${i + 1} added`);
        }
        console.log("Purchase Requisition Line added successfully with the following details:");
        console.log(`Quantity: ${testData.createPurchaseRequisition.quantity}`);
        console.log(`Price: ${testData.createPurchaseRequisition.price}`);

        const submit_approval_page = new Submit_Approval(page);
        await submit_approval_page.submitForApproval();


        // Read PR Number and save to JSON
        const prNumber = await purchase_requisition_page.getPRNumber();

        console.log(`PR Number Saved: ${prNumber}`);


    });
})
