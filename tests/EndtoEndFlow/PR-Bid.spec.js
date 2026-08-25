const { test } = require('@playwright/test');

const Purchase_Requisitions =
    require('../../pages/PurchaseRequisition/purchaserequisition.page');

const Add_Pr_Line =
    require('../../pages/PurchaseRequisition/addPrLine.page');

const Submit_Approval =
    require('../../pages/PurchaseRequisition/purchasesubmit_approval.page');

const Create_Bid =
    require('../../pages/PR_BID/bidsRFQ.page');

const Approvals =
    require('../../pages/Approvals/approval.page');

const {
    LoginPage,
    loadCredentials
} = require('../../pages/Login/login.page');

const testData =
    require('../../testdata.json');


test.describe('End to End Flow', () => {

    // =========================================================
    // COMPLETE E2E FLOW TIMEOUT
    // =========================================================

    test.setTimeout(10 * 60 * 1000);


    test(
        'Create PR -> Approve PR -> Create Bid',
        async ({ browser }) => {

            const credentials =
                loadCredentials();

            let prNumber = null;
            let bidNumber = null;


            // =====================================================
            // VALIDATE CREDENTIALS
            // =====================================================

            console.log('');
            console.log('========================================');
            console.log('       VALIDATING TEST DATA');
            console.log('========================================');


            if (
                !credentials.loginUrl
            ) {
                throw new Error(
                    'loginUrl is missing in credentials.json'
                );
            }


            if (
                !credentials.requestor ||
                !credentials.requestor.email ||
                !credentials.requestor.password
            ) {
                throw new Error(
                    'Requestor credentials are missing in credentials.json'
                );
            }


            if (
                !Array.isArray(credentials.approvers) ||
                credentials.approvers.length === 0
            ) {
                throw new Error(
                    'Approvers must be configured as a non-empty array in credentials.json'
                );
            }


            for (
                let i = 0;
                i < credentials.approvers.length;
                i++
            ) {

                const approver =
                    credentials.approvers[i];


                if (
                    !approver ||
                    !approver.email ||
                    !approver.password
                ) {
                    throw new Error(
                        `Approver ${i + 1} credentials are missing in credentials.json`
                    );
                }
            }


            if (
                !credentials.buyer ||
                !credentials.buyer.email ||
                !credentials.buyer.password
            ) {
                throw new Error(
                    'Buyer credentials are missing in credentials.json'
                );
            }


            // =====================================================
            // VALIDATE TEST DATA STRUCTURE
            // =====================================================

            if (
                !testData.approvers
            ) {
                throw new Error(
                    'testData.approvers object is missing from testdata.json'
                );
            }


            if (
                !testData.approvers.number
            ) {
                console.log(
                    'Initial testData.approvers.number is empty or will be replaced with generated PR number.'
                );
            }


            if (
                !testData.addLine
            ) {
                throw new Error(
                    'testData.addLine object is missing from testdata.json'
                );
            }


            console.log(
                `Configured Approvers: ${credentials.approvers.length}`
            );


            // =====================================================
            // E2E START
            // =====================================================

            console.log('');
            console.log('========================================');
            console.log('       E2E FLOW STARTED');
            console.log('========================================');


            // =====================================================
            // USER 1
            // REQUESTOR
            // =====================================================

            console.log('');
            console.log('========================================');
            console.log('       REQUESTOR LOGIN');
            console.log('========================================');


            const requestorContext =
                await browser.newContext();


            const requestorPage =
                await requestorContext.newPage();


            const requestorLogin =
                new LoginPage(
                    requestorPage
                );


            try {

                // =================================================
                // OPEN LOGIN PAGE
                // =================================================

                console.log(
                    'Opening requestor login page...'
                );


                await requestorPage.goto(
                    credentials.loginUrl,
                    {
                        waitUntil: 'domcontentloaded',
                        timeout: 60000
                    }
                );


                console.log(
                    `Requestor login page opened: ${requestorPage.url()}`
                );


                // =================================================
                // LOGIN
                // =================================================

                console.log(
                    `Logging in as requestor: ${credentials.requestor.email}`
                );


                await requestorLogin.login(
                    credentials.requestor.email,
                    credentials.requestor.password
                );


                console.log(
                    `Requestor logged in: ${credentials.requestor.email}`
                );


                console.log(
                    `Requestor URL: ${requestorPage.url()}`
                );


                // =================================================
                // CREATE PR
                // =================================================

                console.log('');
                console.log('========================================');
                console.log('          CREATE PR');
                console.log('========================================');


                const purchaseRequisitionPage =
                    new Purchase_Requisitions(
                        requestorPage
                    );


                await purchaseRequisitionPage
                    .createPurchaseRequisitionPage(
                        testData
                    );


                // =================================================
                // ADD PR LINE
                // =================================================

                console.log('');
                console.log(
                    'Adding PR line...'
                );


                const addPrLinePage =
                    new Add_Pr_Line(
                        requestorPage
                    );


                await addPrLinePage
                    .addPurchaseRequisitionLine(
                        testData
                    );


                // =================================================
                // SUBMIT PR FOR APPROVAL
                // =================================================

                console.log('');
                console.log(
                    'Submitting PR for approval...'
                );


                const submitApprovalPage =
                    new Submit_Approval(
                        requestorPage
                    );


                await submitApprovalPage
                    .submitForApproval();


                // =================================================
                // GET GENERATED PR NUMBER
                // =================================================

                prNumber =
                    await purchaseRequisitionPage
                        .getPRNumber();


                if (
                    !prNumber
                ) {
                    throw new Error(
                        'PR number was not generated after PR creation.'
                    );
                }


                console.log('');
                console.log(
                    `Generated PR Number: ${prNumber}`
                );


                // =================================================
                // IMPORTANT
                // STORE GENERATED PR NUMBER IN testData.approvers.number
                // =================================================

                testData.approvers.number =
                    prNumber;


                console.log(
                    `Approver Number saved: ${testData.approvers.number}`
                );


                // =================================================
                // STORE SAME PR NUMBER FOR BID
                // =================================================

                testData.addLine.prNumber =
                    prNumber;


                console.log(
                    `Bid PR Number saved: ${testData.addLine.prNumber}`
                );


                // =================================================
                // VERIFY DATA BEFORE LOGOUT
                // =================================================

                if (
                    testData.approvers.number !== prNumber
                ) {
                    throw new Error(
                        `Approver PR number mismatch. Expected ${prNumber}, got ${testData.approvers.number}`
                    );
                }


                if (
                    testData.addLine.prNumber !== prNumber
                ) {
                    throw new Error(
                        `Bid PR number mismatch. Expected ${prNumber}, got ${testData.addLine.prNumber}`
                    );
                }


                console.log('');
                console.log(
                    'PR number successfully stored in testData.'
                );

                console.log(
                    `testData.approvers.number = ${testData.approvers.number}`
                );

                console.log(
                    `testData.addLine.prNumber = ${testData.addLine.prNumber}`
                );


                // =================================================
                // REQUESTOR LOGOUT
                // =================================================

                console.log('');
                console.log(
                    'Logging out requestor...'
                );


                await requestorLogin.logout();


                console.log(
                    'Requestor logout completed.'
                );

            } finally {

                // =================================================
                // CLOSE REQUESTOR CONTEXT
                // =================================================

                try {

                    await requestorContext.close();

                } catch (error) {

                    console.log(
                        `Requestor context close warning: ${error.message}`
                    );
                }
            }


            console.log(
                'Requestor browser context closed.'
            );


            // =====================================================
            // VERIFY PR NUMBER
            // =====================================================

            if (
                !prNumber
            ) {
                throw new Error(
                    'Cannot continue approval flow because PR number is missing.'
                );
            }


            // =====================================================
            // VERY IMPORTANT
            // VERIFY testData.approvers.number
            // =====================================================

            if (
                !testData.approvers ||
                !testData.approvers.number
            ) {
                throw new Error(
                    'Cannot continue approval flow because testData.approvers.number is missing.'
                );
            }


            console.log('');
            console.log('========================================');
            console.log('       APPROVAL FLOW');
            console.log('========================================');


            console.log(
                `PR Number from testData.approvers.number: ${testData.approvers.number}`
            );


            console.log(
                `Total approvers: ${credentials.approvers.length}`
            );


            // =====================================================
            // USER 2
            // APPROVERS
            // =====================================================

            for (
                let approverIndex = 0;
                approverIndex < credentials.approvers.length;
                approverIndex++
            ) {

                const approver =
                    credentials.approvers[
                        approverIndex
                    ];


                const approverNumber =
                    approverIndex + 1;


                // =================================================
                // APPROVER LOGIN HEADER
                // =================================================

                console.log('');
                console.log('========================================');
                console.log(
                    `       APPROVER ${approverNumber} LOGIN`
                );
                console.log('========================================');


                console.log(
                    `Approver ${approverNumber}: ${approver.email}`
                );


                // =================================================
                // NEW BROWSER CONTEXT FOR EACH APPROVER
                // =================================================

                const approverContext =
                    await browser.newContext();


                const approverPage =
                    await approverContext.newPage();


                const approverLogin =
                    new LoginPage(
                        approverPage
                    );


                try {

                    // =============================================
                    // OPEN LOGIN PAGE
                    // =============================================

                    console.log(
                        `Opening login page for Approver ${approverNumber}...`
                    );


                    await approverPage.goto(
                        credentials.loginUrl,
                        {
                            waitUntil: 'domcontentloaded',
                            timeout: 60000
                        }
                    );


                    console.log(
                        `Approver ${approverNumber} login page opened: ${approverPage.url()}`
                    );


                    // =============================================
                    // APPROVER LOGIN
                    // =============================================

                    console.log(
                        `Logging in Approver ${approverNumber}: ${approver.email}`
                    );


                    await approverLogin.login(
                        approver.email,
                        approver.password
                    );


                    console.log(
                        `Approver ${approverNumber} logged in successfully.`
                    );


                    console.log(
                        `Approver URL: ${approverPage.url()}`
                    );


                    // =============================================
                    // VERIFY APPROVER IS ACTUALLY LOGGED IN
                    // =============================================

                    if (
                        !approverPage.url().includes('/app/')
                    ) {
                        throw new Error(
                            `Approver ${approverNumber} login did not reach application. Current URL: ${approverPage.url()}`
                        );
                    }


                    // =============================================
                    // APPROVAL PAGE
                    // =============================================

                    console.log('');
                    console.log(
                        `Opening approval request for Approver ${approverNumber}...`
                    );


                    const approvalFlowPage =
                        new Approvals(
                            approverPage
                        );


                    // =============================================
                    // CRITICAL:
                    // ApprovalPage MUST receive testData
                    //
                    // It reads:
                    // testData.approvers.number
                    // =============================================

                    console.log(
                        `Searching PR from testData.approvers.number: ${testData.approvers.number}`
                    );


                    await approvalFlowPage
                        .navigateToApprovalRequest(
                            testData
                        );


                    // =============================================
                    // APPROVE PR
                    // =============================================

                    console.log('');
                    console.log(
                        `Approver ${approverNumber} approving PR ${testData.approvers.number}...`
                    );


                    const isFirstApprover =
                        approverIndex === 0;


                    await approvalFlowPage
                        .approvePR(
                            testData,
                            isFirstApprover
                        );


                    console.log('');
                    console.log(
                        `Approver ${approverNumber} approved PR ${testData.approvers.number} successfully.`
                    );


                    // =============================================
                    // LOGOUT APPROVER
                    // =============================================

                    console.log(
                        `Logging out Approver ${approverNumber}...`
                    );


                    await approverLogin.logout();


                    console.log(
                        `Approver ${approverNumber} logout completed.`
                    );

                } finally {

                    // =============================================
                    // ALWAYS CLOSE APPROVER CONTEXT
                    // =============================================

                    try {

                        await approverContext.close();

                    } catch (error) {

                        console.log(
                            `Approver ${approverNumber} context close warning: ${error.message}`
                        );
                    }
                }


                console.log(
                    `Approver ${approverNumber} browser context closed.`
                );


                // =================================================
                // WAIT BEFORE NEXT APPROVER
                // =================================================

                if (
                    approverIndex <
                    credentials.approvers.length - 1
                ) {

                    console.log('');
                    console.log(
                        'Waiting for next approver task to be generated...'
                    );


                    await new Promise(
                        resolve =>
                            setTimeout(
                                resolve,
                                5000
                            )
                    );


                    console.log(
                        'Continuing with next approver.'
                    );
                }
            }


            // =====================================================
            // ALL APPROVERS COMPLETED
            // =====================================================

            console.log('');
            console.log('========================================');
            console.log('       ALL APPROVERS COMPLETED');
            console.log('========================================');


            console.log(
                `PR ${testData.approvers.number} has been approved by all configured approvers.`
            );


            // =====================================================
            // USER 3
            // BUYER
            // =====================================================

            console.log('');
            console.log('========================================');
            console.log('          BUYER LOGIN');
            console.log('========================================');


            const buyerContext =
                await browser.newContext();


            const buyerPage =
                await buyerContext.newPage();


            const buyerLogin =
                new LoginPage(
                    buyerPage
                );


            try {

                // =================================================
                // BUYER LOGIN PAGE
                // =================================================

                console.log(
                    'Opening buyer login page...'
                );


                await buyerPage.goto(
                    credentials.loginUrl,
                    {
                        waitUntil: 'domcontentloaded',
                        timeout: 60000
                    }
                );


                console.log(
                    `Buyer login page opened: ${buyerPage.url()}`
                );


                // =================================================
                // BUYER LOGIN
                // =================================================

                console.log(
                    `Logging in buyer: ${credentials.buyer.email}`
                );


                await buyerLogin.login(
                    credentials.buyer.email,
                    credentials.buyer.password
                );


                console.log(
                    `Buyer logged in: ${credentials.buyer.email}`
                );


                console.log(
                    `Buyer URL: ${buyerPage.url()}`
                );


                // =================================================
                // VERIFY BUYER LOGIN
                // =================================================

                if (
                    !buyerPage.url().includes('/app/')
                ) {
                    throw new Error(
                        `Buyer login did not reach application. Current URL: ${buyerPage.url()}`
                    );
                }


                // =================================================
                // CREATE BID
                // =================================================

                console.log('');
                console.log('========================================');
                console.log('          CREATE BID');
                console.log('========================================');


                // =============================================
                // IMPORTANT:
                // BID USES testData.addLine.prNumber
                // =============================================

                testData.addLine.prNumber =
                    testData.approvers.number;


                console.log(
                    `Using approved PR for bid creation: ${testData.addLine.prNumber}`
                );


                // =============================================
                // CREATE BID PAGE
                // =============================================

                const createBidPage =
                    new Create_Bid(
                        buyerPage
                    );


                await createBidPage
                    .createBid(
                        testData
                    );


                              

              
                console.log('');
                console.log(
                    `Bid Created Successfully: ${bidNumber}`
                );


                // =================================================
                // BUYER LOGOUT
                // =================================================

                console.log(
                    'Logging out buyer...'
                );


                await buyerLogin.logout();


                console.log(
                    'Buyer logout completed.'
                );

            } finally {

                // =================================================
                // CLOSE BUYER CONTEXT
                // =================================================

                try {

                    await buyerContext.close();

                } catch (error) {

                    console.log(
                        `Buyer context close warning: ${error.message}`
                    );
                }
            }


            // =====================================================
            // FINAL VALIDATION
            // =====================================================

            if (
                !prNumber
            ) {
                throw new Error(
                    'Final validation failed: PR number is missing.'
                );
            }


            if (
                !testData.approvers.number
            ) {
                throw new Error(
                    'Final validation failed: testData.approvers.number is missing.'
                );
            }



            // =====================================================
            // E2E COMPLETED
            // =====================================================

            console.log('');
            console.log('========================================');
            console.log('       END TO END FLOW COMPLETED');
            console.log('========================================');


            console.log(
                `PR Number                 : ${prNumber}`
            );


            console.log(
                `testData.approvers.number : ${testData.approvers.number}`
            );


            console.log(
                `testData.addLine.prNumber : ${testData.addLine.prNumber}`
            );


            console.log(
                `Bid Number                : ${bidNumber}`
            );


            console.log('========================================');
        }
    );
});