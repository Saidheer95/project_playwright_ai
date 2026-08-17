// const{test,expect}=require('@playwright/test');
// const Approvals=require('../../pages/Approvals/approval.page');
// const {LoginPage,loadCredentials}=require('../../pages/Login/login.page');
// const testData=require('../../testdata.json');

// test.describe('Approval Flow',()=>{
//     test.beforeEach(async({page})=>{
//         const loginPage=new LoginPage(page);
//         const credentials = loadCredentials();
//         await page.goto(credentials.loginUrl);
//         await loginPage.login(credentials.approver.email, credentials.approver.password);
//     });

//     test('should navigate to approval request and search for the PR number',async({page})=>{
//         const approval_flow_page=new Approvals(page);
//         await approval_flow_page.navigateToApprovalRequest(testData);
//         console.log(`Searching for PR Number: ${testData.approvers.number}`);
//     });

// })
const { test, expect } = require('@playwright/test');

const ApprovalPage =
    require('../../pages/Approvals/approval.page');

const {
    LoginPage,
    loadCredentials
} = require('../../pages/Login/login.page');

const testData =
    require('../../testdata.json');


test.describe('Approval Flow', () => {

    test(
        'should approve PR through all approvers',
        async ({ browser }) => {

            // =====================================================
            // Load credentials
            // =====================================================

            const credentials =
                loadCredentials();

            const approvers =
                credentials.approvers;

            expect(approvers).toBeDefined();

            expect(approvers.length)
                .toBeGreaterThan(0);

            console.log(
                `Total approvers: ${approvers.length}`
            );


            // =====================================================
            // Process each approver separately
            // =====================================================

            for (
                let i = 0;
                i < approvers.length;
                i++
            ) {

                const approver =
                    approvers[i];

                const isFirstApprover =
                    i === 0;


                console.log('\n');
                console.log(
                    '=========================================='
                );

                console.log(
                    `Approver ${i + 1} of ${approvers.length}`
                );

                console.log(
                    `Name: ${approver.name}`
                );

                console.log(
                    `Email: ${approver.email}`
                );

                console.log(
                    `First Approver: ${isFirstApprover}`
                );

                console.log(
                    '=========================================='
                );


                // =================================================
                // NEW BROWSER CONTEXT
                // =================================================
                // This creates a completely new session.
                // Cookies/session/local storage from the previous
                // approver will NOT be reused.
                // =================================================

                const context =
                    await browser.newContext();


                const page =
                    await context.newPage();


                try {

                    // =============================================
                    // Login
                    // =============================================

                    const loginPage =
                        new LoginPage(page);


                    await page.goto(
                        credentials.loginUrl
                    );


                    await loginPage.login(
                        approver.email,
                        approver.password
                    );


                    console.log(
                        `Logged in as: ${approver.name}`
                    );


                    // =============================================
                    // Approval Page
                    // =============================================

                    const approvalPage =
                        new ApprovalPage(page);


                    // =============================================
                    // Navigate to approval request
                    // =============================================

                    await approvalPage
                        .navigateToApprovalRequest(
                            testData
                        );


                    // =============================================
                    // Approve PR
                    // =============================================

                    await approvalPage.approvePR(
                        testData,
                        isFirstApprover
                    );


                    console.log(
                        `${approver.name} completed approval`
                    );


                    // =============================================
                    // Wait for approval to complete
                    // =============================================

                    await page.waitForTimeout(1000);


                } finally {

                    // =============================================
                    // CLOSE CURRENT APPROVER SESSION
                    // =============================================

                    console.log(
                        `Closing session for ${approver.name}`
                    );


                    await context.close();


                    console.log(
                        `Session closed for ${approver.name}`
                    );
                }


                // ==============================================
                // Next approver
                // ==============================================

                if (
                    i < approvers.length - 1
                ) {

                    console.log(
                        `Preparing login for next approver: `
                        + `${approvers[i + 1].name}`
                    );


                    /*
                     * Small wait for backend approval workflow
                     * to update the next task.
                     */

                    await new Promise(
                        resolve =>
                            setTimeout(
                                resolve,
                                1000
                            )
                    );
                }
            }


            // =====================================================
            // Final Result
            // =====================================================

            console.log('\n');

            console.log(
                '=========================================='
            );

            console.log(
                `PR ${testData.approvers.number} `
                + 'completed approval flow'
            );

            console.log(
                `Total approvers processed: `
                + `${approvers.length}`
            );

            console.log(
                '=========================================='
            );
        }
    );
});