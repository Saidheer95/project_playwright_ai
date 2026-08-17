const { expect } = require('@playwright/test');

class ApprovalPage {

    constructor(page) {

        this.page = page;

        // =========================================================
        // Approval Navigation
        // =========================================================

        this.approvalLink =
            '[data-testid="button-notifications"]';

        this.approvalRequest =
            '[data-testid="link-view-all-notifications"]';

        this.searchTasks =
            '[data-testid="input-search-tasks"]';

        this.clickTask =
            '[data-testid="task-entity-0"]';


        // =========================================================
        // Approval Dropdown
        // =========================================================

        this.clickApprovalsDropdown =
            '[data-testid="button-approve"]';


        // =========================================================
        // Checklist
        // =========================================================

        /*
         * We intentionally don't use:
         *
         * checkbox-checklist-item-14
         * checkbox-checklist-item-15
         * checkbox-checklist-item-16
         *
         * because those IDs can change.
         */

        this.checklistRows =
            '[data-testid^="row-approval-checklist-"]';


        /*
         * Mandatory checklist remark.
         *
         * Mandatory:
         *      placeholder="Remarks (required)"
         *
         * Optional:
         *      placeholder="Remarks, if any"
         */

        this.mandatoryRemarkInput =
            'input[placeholder="Remarks (required)"]';


        // =========================================================
        // Approval Comments
        // =========================================================

        /*
         * IMPORTANT:
         *
         * This is NOT the checklist remark.
         *
         * This is the final approval Comments textarea.
         */

        this.approvalComments =
            'textarea[data-testid="input-checklist-comments"]';


        // =========================================================
        // Final Approve Button
        // =========================================================

        this.finalApproveButton =
            'button';
    }


    // =============================================================
    // Navigate to Approval Request
    // =============================================================

    async navigateToApprovalRequest(testData) {

        console.log('');
        console.log('==========================================');
        console.log('Opening Approval Requests');
        console.log('==========================================');


        // ---------------------------------------------------------
        // Notification
        // ---------------------------------------------------------

        const notification =
            this.page.locator(
                this.approvalLink
            );

        await notification.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await notification.click();


        // ---------------------------------------------------------
        // View All Approval Requests
        // ---------------------------------------------------------

        const approvalRequest =
            this.page.locator(
                this.approvalRequest
            );

        await approvalRequest.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await approvalRequest.click();


        // ---------------------------------------------------------
        // Search PR
        // ---------------------------------------------------------

        const searchBox =
            this.page.locator(
                this.searchTasks
            );

        await searchBox.waitFor({
            state: 'visible',
            timeout: 15000
        });


        await searchBox.fill(
            testData.approvers.number
        );


        console.log(
            `Searching for PR Number: ${testData.approvers.number}`
        );


        // ---------------------------------------------------------
        // Open PR Task
        // ---------------------------------------------------------

        const task =
            this.page.locator(
                this.clickTask
            );


        await task.waitFor({
            state: 'visible',
            timeout: 15000
        });


        await task.click();


        console.log(
            `PR ${testData.approvers.number} opened`
        );
    }


    // =============================================================
    // Open Approval Action
    // =============================================================

    async openApprovalAction(action) {

        console.log('');
        console.log(
            `Opening approval action dropdown: ${action}`
        );


        const dropdown =
            this.page.locator(
                this.clickApprovalsDropdown
            );


        await dropdown.waitFor({
            state: 'visible',
            timeout: 15000
        });


        await dropdown.click();


        // ---------------------------------------------------------
        // Select action from menu
        // ---------------------------------------------------------

        const approvalAction =
            this.page.getByRole(
                'menuitem',
                {
                    name: action,
                    exact: true
                }
            );


        await approvalAction.waitFor({
            state: 'visible',
            timeout: 10000
        });


        await approvalAction.click();


        console.log(
            `Approval Action Selected: ${action}`
        );
    }


    // =============================================================
    // Complete Mandatory Checklist
    // =============================================================

    async completeMandatoryChecklist() {

        console.log('');
        console.log('==========================================');
        console.log('Completing Mandatory Checklist');
        console.log('==========================================');


        // ---------------------------------------------------------
        // Find all checklist rows
        // ---------------------------------------------------------

        const checklistRows =
            this.page.locator(
                this.checklistRows
            );


        await checklistRows
            .first()
            .waitFor({
                state: 'visible',
                timeout: 15000
            });


        const rowCount =
            await checklistRows.count();


        console.log(
            `Total checklist rows: ${rowCount}`
        );


        let mandatoryCount = 0;


        // =========================================================
        // Process each row
        // =========================================================

        for (
            let i = 0;
            i < rowCount;
            i++
        ) {

            const row =
                checklistRows.nth(i);


            // -----------------------------------------------------
            // Find mandatory remark inside current row
            // -----------------------------------------------------

            const mandatoryRemark =
                row.locator(
                    this.mandatoryRemarkInput
                );


            /*
             * Mandatory detection:
             *
             * If this selector exists inside the row:
             *
             * input[placeholder="Remarks (required)"]
             *
             * then the checklist item is mandatory.
             */

            const isMandatory =
                await mandatoryRemark.count() > 0;


            // -----------------------------------------------------
            // Optional checklist item
            // -----------------------------------------------------

            if (!isMandatory) {

                console.log(
                    `Checklist row ${i + 1}: OPTIONAL -> SKIPPED`
                );

                continue;
            }


            // -----------------------------------------------------
            // Mandatory checklist item
            // -----------------------------------------------------

            mandatoryCount++;


            console.log('');
            console.log(
                `Checklist row ${i + 1}: MANDATORY`
            );


            // =====================================================
            // Checkbox
            // =====================================================

            const checkbox =
                row.getByRole(
                    'checkbox'
                );


            await checkbox.waitFor({
                state: 'visible',
                timeout: 10000
            });


            const currentState =
                await checkbox.getAttribute(
                    'aria-checked'
                );


            console.log(
                `Current checkbox state: ${currentState}`
            );


            /*
             * Only click if not already checked.
             */

            if (currentState !== 'true') {

                await checkbox.scrollIntoViewIfNeeded();


                await checkbox.click();


                await expect(
                    checkbox
                ).toHaveAttribute(
                    'aria-checked',
                    'true'
                );


                console.log(
                    'Checkbox selected successfully'
                );
            }
            else {

                console.log(
                    'Checkbox already selected'
                );
            }


            // =====================================================
            // Mandatory Checklist Remark
            // =====================================================

            await mandatoryRemark
                .scrollIntoViewIfNeeded();


            await mandatoryRemark.waitFor({
                state: 'visible',
                timeout: 10000
            });


            /*
             * This is the remark for the checklist item.
             *
             * It is NOT the final approval comment.
             */

            const checklistRemark =
                'Verified and approved';


            await mandatoryRemark.fill(
                checklistRemark
            );


            // -----------------------------------------------------
            // Verify actual input value
            // -----------------------------------------------------

            const actualRemark =
                await mandatoryRemark.inputValue();


            console.log(
                `Checklist remark entered: "${actualRemark}"`
            );


            expect(
                actualRemark.trim()
            ).toBe(
                checklistRemark
            );
        }


        // =========================================================
        // Mandatory Count Validation
        // =========================================================

        console.log('');
        console.log(
            `Mandatory checklist items found: ${mandatoryCount}`
        );


        expect(
            mandatoryCount
        ).toBeGreaterThan(0);


        // =========================================================
        // Final Validation
        // =========================================================

        for (
            let i = 0;
            i < rowCount;
            i++
        ) {

            const row =
                checklistRows.nth(i);


            const mandatoryRemark =
                row.locator(
                    this.mandatoryRemarkInput
                );


            /*
             * Optional row.
             */

            if (
                await mandatoryRemark.count() === 0
            ) {
                continue;
            }


            const checkbox =
                row.getByRole(
                    'checkbox'
                );


            const checkboxState =
                await checkbox.getAttribute(
                    'aria-checked'
                );


            const remarkValue =
                await mandatoryRemark.inputValue();


            console.log(
                `Validation row ${i + 1}: `
                + `checkbox=${checkboxState}, `
                + `remark="${remarkValue}"`
            );


            expect(
                checkboxState
            ).toBe('true');


            expect(
                remarkValue.trim()
            ).not.toBe('');
        }


        console.log('');
        console.log(
            'All mandatory checklist items completed successfully'
        );
    }


    // =============================================================
    // Enter Approval Comments
    // =============================================================

    async enterApprovalComments(comments) {

        console.log('');
        console.log('==========================================');
        console.log('Entering Approval Comments');
        console.log('==========================================');


        /*
         * IMPORTANT:
         *
         * We are NOT looking for:
         *
         * input[placeholder="Remarks (required)"]
         *
         * We are looking for:
         *
         * <textarea
         *     data-testid="input-checklist-comments"
         * >
         *
         * This is the final approval comment.
         */


        const commentsBox =
            this.page.locator(
                this.approvalComments
            );


        // ---------------------------------------------------------
        // Wait for textarea
        // ---------------------------------------------------------

        await commentsBox.waitFor({
            state: 'visible',
            timeout: 15000
        });


        // ---------------------------------------------------------
        // Scroll page/modal to Comments
        // ---------------------------------------------------------

        console.log(
            'Scrolling to Approval Comments...'
        );


        await commentsBox.scrollIntoViewIfNeeded();


        // ---------------------------------------------------------
        // Click textarea
        // ---------------------------------------------------------

        await commentsBox.click();


        // ---------------------------------------------------------
        // Clear existing value
        // ---------------------------------------------------------

        await commentsBox.fill('');


        // ---------------------------------------------------------
        // Enter approval comment
        // ---------------------------------------------------------

        console.log(
            `Entering approval comment: "${comments}"`
        );


        await commentsBox.fill(
            comments
        );


        // ---------------------------------------------------------
        // Verify
        // ---------------------------------------------------------

        const actualValue =
            await commentsBox.inputValue();


        console.log(
            `Actual approval comment: "${actualValue}"`
        );


        expect(
            actualValue.trim()
        ).toBe(
            comments.trim()
        );


        console.log(
            'Approval comment entered successfully'
        );
    }


    // =============================================================
    // Click Final Approve
    // =============================================================

    async clickFinalApprove() {

        console.log('');
        console.log(
            'Looking for final Approve button...'
        );


        /*
         * There can be multiple Approve buttons.
         *
         * We get all exact "Approve" buttons and
         * click the last visible one.
         */

        const approveButtons =
            this.page.getByRole(
                'button',
                {
                    name: 'Approve',
                    exact: true
                }
            );


        const count =
            await approveButtons.count();


        console.log(
            `Approve buttons found: ${count}`
        );


        if (count === 0) {

            throw new Error(
                'No Approve button found'
            );
        }


        // ---------------------------------------------------------
        // Search from last button
        // ---------------------------------------------------------

        for (
            let i = count - 1;
            i >= 0;
            i--
        ) {

            const button =
                approveButtons.nth(i);


            if (
                await button.isVisible()
            ) {

                await button.scrollIntoViewIfNeeded();


                await button.click();


                console.log(
                    'Final Approve button clicked successfully'
                );


                return;
            }
        }


        throw new Error(
            'Visible final Approve button was not found'
        );
    }


    // =============================================================
    // Complete Approval
    // =============================================================

    async approvePR(
        testData,
        isFirstApprover
    ) {

        const action =
            testData.approvers.action;


        const comments =
            testData.approvers.comments;


        console.log('');
        console.log('==========================================');
        console.log(
            `Starting Approval: ${action}`
        );
        console.log(
            `First Approver: ${isFirstApprover}`
        );
        console.log(
            `Approval Comment: ${comments}`
        );
        console.log('==========================================');


        // =========================================================
        // Open Approve Dropdown
        // =========================================================

        await this.openApprovalAction(
            action
        );


        // =========================================================
        // APPROVE
        // =========================================================

        if (action === 'Approve') {


            // =====================================================
            // FIRST APPROVER
            // =====================================================

            if (isFirstApprover) {

                console.log('');
                console.log(
                    'FIRST APPROVER'
                );


                console.log(
                    'Completing mandatory checklist...'
                );


                /*
                 * Automatically finds:
                 *
                 * Remarks (required)
                 *
                 * No hard-coded IDs.
                 */

                await this.completeMandatoryChecklist();
            }


            // =====================================================
            // SECOND / SUBSEQUENT APPROVER
            // =====================================================

            else {

                console.log('');
                console.log(
                    'SUBSEQUENT APPROVER'
                );


                console.log(
                    'Checklist already completed by first approver.'
                );


                console.log(
                    'Skipping checklist fields.'
                );
            }


            // =====================================================
            // BOTH APPROVERS
            // =====================================================

            /*
             * IMPORTANT:
             *
             * Both first and subsequent approvers
             * enter the FINAL APPROVAL COMMENTS.
             *
             * This is the textarea:
             *
             * input-checklist-comments
             */

            await this.enterApprovalComments(
                comments
            );


            // =====================================================
            // Final Approve
            // =====================================================

            await this.clickFinalApprove();


            console.log('');
            console.log(
                `Approval completed successfully for ${action}`
            );
        }


        // =========================================================
        // Other Actions
        // =========================================================

        else {

            console.log(
                `Action "${action}" selected`
            );


            /*
             * Reject / More Info / Delegate can be
             * implemented separately later.
             */
        }
    }
}


module.exports = ApprovalPage;