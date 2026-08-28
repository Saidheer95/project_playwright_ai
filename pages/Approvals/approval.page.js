const { expect } = require('@playwright/test');

class ApprovalPage {

  constructor(page) {

    this.page = page;

    // =========================================================
    // Navigation
    // =========================================================

    this.approvalLink =
      '[data-testid="button-notifications"]';

    this.approvalRequest =
      '[data-testid="link-view-all-notifications"]';

    this.searchTasks =
      '[data-testid="input-search-tasks"]';

    this.clickTask =
      '[data-testid^="task-entity-"]';


    // =========================================================
    // Approval Action
    // =========================================================

    this.clickApprovalsDropdown =
      '[data-testid="button-approve"]';




    // =========================================================
    // Checklist
    // =========================================================

    this.checklistRows =
      '[data-testid^="row-approval-checklist-"]';

    this.mandatoryRemarkInput =
      'input[placeholder="Remarks (required)"]';

    this.checklistComments =
      'textarea[data-testid^="input-checklist-comments"]';


    // =========================================================
    // Approval Buttons
    // =========================================================

    this.approveButton =
      '[data-testid="button-checklist-approve"]';

    this.approvalComments =
      'textarea[data-testid="input-approval-remarks"]';

    this.approvalActionButton =
      '[data-testid="button-approval-confirm"]';
  }


  // ===========================================================
  // NAVIGATE TO APPROVAL REQUEST
  // ===========================================================

  async navigateToApprovalRequest(testData) {

    const prNumber =
      testData.approvers.number;

    console.log(
      `Searching approval request for PR: ${prNumber}`
    );


    // =========================================================
    // Notification
    // =========================================================

    const notification =
      this.page.locator(
        this.approvalLink
      );

    console.log(
      'Waiting for notification button...'
    );

    await expect(notification).toBeVisible();

    await notification.click();

    console.log(
      'Notification button clicked'
    );


    // =========================================================
    // View All Approval Requests
    // =========================================================

    const approvalRequest =
      this.page.locator(
        this.approvalRequest
      );

    console.log(
      'Waiting for approval request link...'
    );

    await expect(approvalRequest).toBeVisible();

    await approvalRequest.click();

    console.log(
      'Approval request page opened'
    );


    // =========================================================
    // Search Box
    // =========================================================

    const searchBox =
      this.page.locator(
        this.searchTasks
      );

    await expect(searchBox).toBeVisible();

    await searchBox.fill(
      prNumber
    );

    console.log(
      `Searching for PR Number: ${prNumber}`
    );


    // =========================================================
    // Approval Task
    //
    // No setTimeout.
    // No waitForTimeout.
    //
    // Playwright waits for the actual task to appear.
    // =========================================================

    const tasks =
      this.page.locator(
        this.clickTask
      );

    const matchingTask =
      tasks.filter({
        hasText: prNumber
      }).first();

    console.log(
      `Waiting for approval task for ${prNumber}...`
    );


    // =========================================================
    // First try to find task containing PR number
    // =========================================================

    if (await matchingTask.count() > 0) {

      await expect(
        matchingTask
      ).toBeVisible();

      console.log(
        `Approval task found for PR ${prNumber}`
      );

      await matchingTask.click();

    } else {

      // =======================================================
      // Fallback
      //
      // If the task DOM does not contain the PR number,
      // wait for the first task after the search result updates.
      // =======================================================

      console.log(
        `PR number was not found directly in task locator.`
      );

      console.log(
        `Waiting for approval task result...`
      );

      const task =
        tasks.first();

      await expect(
        task
      ).toBeVisible();

      console.log(
        `Approval task result found for PR ${prNumber}`
      );

      await task.click();
    }


    console.log(
      `PR ${prNumber} opened successfully`
    );
  }


  // ===========================================================
  // OPEN APPROVAL ACTION
  // ===========================================================

  async openApprovalAction(action) {

    console.log(
      `Opening approval action: ${action}`
    );

    const dropdown =
      this.page.locator(
        this.clickApprovalsDropdown
      );

    await expect(
      dropdown
    ).toBeVisible();

    await dropdown.click();

    console.log(
      'Approval dropdown opened'
    );


    const approvalAction =
      this.page.getByRole(
        'menuitem',
        {
          name: action,
          exact: true
        }
      );

    await expect(
      approvalAction
    ).toBeVisible();

    await approvalAction.click();

    console.log(
      `Approval Action Selected: ${action}`
    );
  }


  // ===========================================================
  // COMPLETE MANDATORY CHECKLIST
  // ===========================================================

  async completeMandatoryChecklist() {

    const checklistRows =
      this.page.locator(
        this.checklistRows
      );

    await expect(
      checklistRows.first()
    ).toBeVisible();

    const rowCount =
      await checklistRows.count();

    console.log(
      `Total checklist rows: ${rowCount}`
    );

    let mandatoryCount = 0;


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


      // =======================================================
      // Not mandatory
      // =======================================================

      if (
        await mandatoryRemark.count() === 0
      ) {

        continue;
      }


      mandatoryCount++;

      console.log(
        `Processing mandatory checklist row ${i + 1}`
      );


      // =======================================================
      // Checkbox
      // =======================================================

      const checkbox =
        row.getByRole(
          'checkbox'
        );

      await expect(
        checkbox
      ).toBeVisible();

      const currentState =
        await checkbox.getAttribute(
          'aria-checked'
        );

      if (
        currentState !== 'true'
      ) {

        await checkbox.click();

        await expect(
          checkbox
        ).toHaveAttribute(
          'aria-checked',
          'true'
        );
      }


      // =======================================================
      // Mandatory Remark
      // =======================================================

      await expect(
        mandatoryRemark
      ).toBeVisible();

      await mandatoryRemark.fill(
        'Verified and approved'
      );

      await expect(
        mandatoryRemark
      ).toHaveValue(
        'Verified and approved'
      );
    }


    console.log(
      `Mandatory checklist items processed: ${mandatoryCount}`
    );

    console.log(
      'All mandatory checklist items completed successfully'
    );
  }


  // ===========================================================
  // ENTER CHECKLIST COMMENTS
  // ===========================================================

  async enterChecklistComments(comments) {

    const commentsBox =
      this.page.locator(
        this.checklistComments
      );

    await expect(
      commentsBox
    ).toBeVisible();

    await commentsBox.fill(
      comments
    );

    await expect(
      commentsBox
    ).toHaveValue(
      comments
    );

    console.log(
      `Checklist comment entered: "${comments}"`
    );
  }


  // ===========================================================
  // ENTER APPROVAL COMMENTS
  // ===========================================================

  async enterApprovalComments(comments) {

    const commentsBox =
      this.page.locator(
        this.approvalComments
      );

    await expect(
      commentsBox
    ).toBeVisible();

    await commentsBox.fill(
      comments
    );

    await expect(
      commentsBox
    ).toHaveValue(
      comments
    );

    console.log(
      `Approval comment entered: "${comments}"`
    );
  }


  // ===========================================================
  // CLICK APPROVE BUTTON
  // ===========================================================

  async clickApproveButton() {

    const approveButton =
      this.page.locator(
        this.approveButton
      );

    await expect(
      approveButton
    ).toBeVisible();

    await expect(
      approveButton
    ).toBeEnabled();

    await approveButton.click();

    console.log(
      'Approve button clicked successfully'
    );
  }


  // ===========================================================
  // CLICK APPROVAL CONFIRM BUTTON
  // ===========================================================

  async clickApprovalConfirmButton(action) {

    const confirmButton =
      this.page.locator(
        this.approvalActionButton
      );

    await expect(
      confirmButton
    ).toBeVisible();

    await expect(
      confirmButton
    ).toBeEnabled();

    await confirmButton.click();

    console.log(
      `${action} confirmation button clicked successfully`
    );
  }


  // ===========================================================
  // APPROVE PR
  // ===========================================================

  async approvePR(
    testData,
    isFirstApprover
  ) {

    const comments =
      testData.approvers.comments;

    console.log(
      `Processing Approve. First Approver: ${isFirstApprover}`
    );


    // =========================================================
    // Open Approve
    // =========================================================

    await this.openApprovalAction(
      'Approve'
    );


    // =========================================================
    // First Approver
    // =========================================================

    if (
      isFirstApprover
    ) {

      console.log(
        'First approver: completing checklist'
      );

      await this.completeMandatoryChecklist();

      await this.enterChecklistComments(
        comments
      );

    } else {

      console.log(
        'Subsequent approver: skipping checklist'
      );
    }


    // =========================================================
    // Approve
    // =========================================================

    await this.clickApproveButton();

    console.log(
      'Approval completed successfully'
    );
  }


  // ===========================================================
  // REJECT PR
  // ===========================================================

  async rejectPR(testData) {

    const comments =
      testData.approvers.comments;

    console.log(
      'Processing Reject'
    );


    // =========================================================
    // Open Reject
    // =========================================================

    await this.openApprovalAction(
      'Reject'
    );


    // =========================================================
    // Enter rejection reason
    // =========================================================

    await this.enterApprovalComments(
      comments
    );


    // =========================================================
    // Confirm
    // =========================================================

    await this.clickApprovalConfirmButton(
      'Reject'
    );

    console.log(
      'Rejection completed successfully'
    );
  }


  // ===========================================================
  // REQUEST FOR MORE INFO
  // ===========================================================

  async requestMoreInfo(testData) {

    const comments =
      testData.approvers.comments;

    console.log(
      'Processing Request For More Info'
    );


    // =========================================================
    // Open More Info
    // =========================================================

    await this.openApprovalAction(
      'Request For More Info'
    );


    // =========================================================
    // Enter comments
    // =========================================================

    await this.enterApprovalComments(
      comments
    );


    // =========================================================
    // Confirm
    // =========================================================

    await this.clickApprovalConfirmButton(
      'Request For More Info'
    );

    console.log(
      'Request for more information completed successfully'
    );
  }
}


module.exports = ApprovalPage;