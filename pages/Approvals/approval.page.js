const {
  assertVisible,
  assertEnabled,
  assertHasValue,
  assertHasAttribute
} = require('../../utils/assertions');


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
      '[data-testid="task-entity-0"]';


   

    this.clickApprovalsDropdown =
      '[data-testid="button-approve"]';


   
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


    await assertVisible(notification, 30000);


    await assertEnabled(notification, 30000);


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


    await assertVisible(approvalRequest, 30000);


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


    await assertVisible(searchBox, 30000);


    await searchBox.fill(
      prNumber
    );


    console.log(
      `Searching for PR Number: ${prNumber}`
    );


    // =========================================================
    // Wait for task
    //
    // This is important for second/subsequent approvers.
    // The task may take a few seconds to be created.
    // =========================================================

    const task =
      this.page.locator(
        this.clickTask
      );


    console.log(
      `Waiting for approval task for ${prNumber}...`
    );


    await assertVisible(task, 30000);


    await assertEnabled(task, 30000);


    await task.click();


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


    await assertVisible(dropdown, 30000);


    await assertEnabled(dropdown, 30000);


    await dropdown.click();


    console.log(
      `Approval dropdown opened`
    );


    const approvalAction =
      this.page.getByRole(
        'menuitem',
        {
          name: action,
          exact: true
        }
      );


    await assertVisible(approvalAction, 10000);


    await assertEnabled(approvalAction, 10000);


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


    await assertVisible(checklistRows.first(), 30000);


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


      await assertVisible(checkbox, 10000);


      const currentState =
        await checkbox.getAttribute(
          'aria-checked'
        );


      if (
        currentState !== 'true'
      ) {

        await checkbox.click();


        await assertHasAttribute(
          checkbox,
          'aria-checked',
          'true'
        );
      }


      // =======================================================
      // Mandatory Remark
      // =======================================================

      await assertVisible(mandatoryRemark, 10000);


      await mandatoryRemark.fill(
        'Verified and approved'
      );


      await assertHasValue(
        mandatoryRemark,
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


  async enterChecklistComments(comments) {

    const commentsBox =
      this.page.locator(
        this.checklistComments
      );


    await assertVisible(commentsBox, 10000);


    await commentsBox.fill(
      comments
    );


    await assertHasValue(commentsBox, comments);


    console.log(
      `Checklist comment entered: "${comments}"`
    );
  }

 
  async enterApprovalComments(comments) {

    const commentsBox =
      this.page.locator(
        this.approvalComments
      );


    await assertVisible(commentsBox, 10000);


    await commentsBox.fill(
      comments
    );


    await assertHasValue(commentsBox, comments);


    console.log(
      `Approval comment entered: "${comments}"`
    );
  }


  async clickApproveButton() {

    const approveButton =
      this.page.locator(
        this.approveButton
      );


    await assertVisible(approveButton, 30000);


    await assertEnabled(approveButton, 30000);


    await approveButton.click();


    console.log(
      'Approve button clicked successfully'
    );
  }

  async clickApprovalConfirmButton(action) {

    const confirmButton =
      this.page.locator(
        this.approvalActionButton
      );


    await assertVisible(confirmButton, 30000);


    await assertEnabled(confirmButton, 30000);


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
    // First approver
    //
    // Complete checklist only for first approver.
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


