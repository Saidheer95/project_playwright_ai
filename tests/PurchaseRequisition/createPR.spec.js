const { test } = require('@playwright/test');
const Purchase_Requisitions = require('../../pages/PurchaseRequisition/purchaserequisition.page');
const Add_Pr_Line = require('../../pages/PurchaseRequisition/addPrLine.page');
const Submit_Approval = require('../../pages/PurchaseRequisition/purchasesubmit_approval.page');
const { LoginPage, loadCredentials } = require('../../pages/Login/login.page');
const testData = require('../../testdata.json');

test.describe('Purchase Requisition Page', () => {
    test('should create a new purchase requisition', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const credentials = loadCredentials();
        let loggedIn = false;

        try {
            console.log('========================================');
            console.log('        PR CREATION STARTED');
            console.log('========================================');
            console.log(`Opening login URL: ${credentials.loginUrl}`);

            await page.goto(credentials.loginUrl);

            await loginPage.login(
                credentials.requestor.email,
                credentials.requestor.password
            );

            loggedIn = true;
            console.log('Requestor login successful.');

            const purchaseRequisitionPage = new Purchase_Requisitions(page);
            const addPrLinePage = new Add_Pr_Line(page);
            const submitApprovalPage = new Submit_Approval(page);

            console.log('Creating Purchase Requisition...');

            await purchaseRequisitionPage.createPurchaseRequisitionPage(testData);

            console.log('Purchase Requisition created successfully.');

            for (let i = 0; i < 3; i++) {
                console.log(`Adding line ${i + 1}...`);

                await addPrLinePage.addPurchaseRequisitionLine(testData);

                console.log(`Line ${i + 1} added successfully.`);
            }

            console.log('All PR lines added successfully.');
            console.log('Submitting PR for approval...');

            await submitApprovalPage.submitForApproval();

            console.log('PR submitted for approval successfully.');

            const prNumber = await purchaseRequisitionPage.getPRNumber();

            console.log(`PR Number confirmed: ${prNumber}`);

            if (!prNumber) {
                throw new Error('PR Number was not generated.');
            }

            console.log(`Valid PR Number received: ${prNumber}`);
            console.log(`PR ${prNumber} is ready for approval flow.`);

            console.log('========================================');
            console.log(`PR CREATION COMPLETED: ${prNumber}`);
            console.log('========================================');

        } finally {
            if (loggedIn) {
                console.log('Logging out requestor...');

                try {
                    await loginPage.logout();
                    console.log('Requestor logged out successfully.');
                } catch (logoutError) {
                    console.error(`Logout failed: ${logoutError.message}`);
                }
            }
        }
    });
});