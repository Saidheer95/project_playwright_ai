const { test, expect } = require('@playwright/test');
const Purchase_Requisitions = require('../pages/purchaserequisition.page');
const Add_Pr_Line = require('../pages/addPrLine.page');
const Submit_Approval = require('../pages/purchasesubmit_approval.page');
const { LoginPage, loadCredentials } = require('../pages/login.page');
const testData = require('../testdata.json');

test.describe('Purchase Requisition Page', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const { loginUrl, email, password } = loadCredentials();
        await page.goto(loginUrl);
        await loginPage.login(email, password);
    });

    test('should create a new purchase requisition', async ({ page }) => {
        const purchase_requisition_page = new Purchase_Requisitions(page);
        await purchase_requisition_page.createPurchaseRequisitionPage(testData);

        console.log("Purchase Requisition created successfully with the following details:");
        console.log(`Description: ${testData.prDescription}`);
        console.log(`Delivery Location: ${testData.deliveryLocation}`);

        const add_pr_line_page = new Add_Pr_Line(page);
        for (let i = 0; i < 5; i++) {
            console.log(`Adding line ${i + 1}`);
            await add_pr_line_page.addPurchaseRequisitionLine(testData);
            console.log(`Line ${i + 1} added`);
        }
        console.log("Purchase Requisition Line added successfully with the following details:");
        console.log(`Quantity: ${testData.quantity}`);
        console.log(`Price: ${testData.price}`);

        const submit_approval_page = new Submit_Approval(page);
        await submit_approval_page.submitForApproval();

    });
})
