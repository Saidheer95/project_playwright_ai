const { expect } = require('@playwright/test');

class ApprovalPage {

  constructor(page) {
    this.page = page;

    // =========================================================
    // Navigation
    // =========================================================

    this.approvalLink = '[data-testid="button-notifications"]';
    this.approvalRequest = '[data-testid="link-view-all-notifications"]';
    this.searchTasks = '[data-testid="input-search-tasks"]';
    this.clickTask = '[data-testid^="task-entity-"]';

    // =========================================================
    // Approval Action
    // =========================================================

    this.clickApprovalsDropdown = '[data-testid="button-approve"]';

    // =========================================================
    // Checklist Locators
    // =========================================================

    this.checklistRows = '[data-testid^="row-approval-checklist-"]';
    this.mandatoryRemarkInput = 'input[placeholder="Remarks (required)"]';
    this.checklistComments = 'textarea[data-testid^="input-checklist-comments"]';
    this.approveButton = '[data-testid="button-checklist-approve"]';

    // =========================================================
    // Modal Approval Locators
    // =========================================================

    this.approvalComments = 'textarea[data-testid="input-approval-remarks"]';
    this.approvalActionButton = '[data-testid="button-approval-confirm"]';
  }

  // ===========================================================
  // NAVIGATE TO APPROVAL REQUEST
  // ===========================================================

  async navigateToApprovalRequest(testData) {
    const prNumber = testData.approvers.number;
    console.log(`Searching approval request for PR: ${prNumber}`);

    const notification = this.page.locator(this.approvalLink);
    await expect(notification).toBeVisible();
    await notification.click();

    const approvalRequest = this.page.locator(this.approvalRequest);
    await expect(approvalRequest).toBeVisible();
    await approvalRequest.click();

    const searchBox = this.page.locator(this.searchTasks);
    await expect(searchBox).toBeVisible();
    await searchBox.fill(prNumber);

    const tasks = this.page.locator(this.clickTask);
    const matchingTask = tasks.filter({ hasText: prNumber }).first();

    if (await matchingTask.count() > 0) {
      await expect(matchingTask).toBeVisible();
      await matchingTask.click();
    } else {
      const task = tasks.first();
      await expect(task).toBeVisible();
      await task.click();
    }

    console.log(`PR ${prNumber} opened successfully`);
  }

  // ===========================================================
  // OPEN APPROVAL ACTION
  // ===========================================================

  async openApprovalAction(action) {
    console.log(`Opening approval action: ${action}`);

    const dropdown = this.page.locator(this.clickApprovalsDropdown);
    await expect(dropdown).toBeVisible();
    await dropdown.click();

    const approvalAction = this.page.getByRole('menuitem', {
      name: action,
      exact: true
    });

    await expect(approvalAction).toBeVisible();
    await approvalAction.click();

    console.log(`Approval Action Selected: ${action}`);
  }

  // ===========================================================
  // COMPLETE MANDATORY CHECKLIST
  // ===========================================================

  async completeMandatoryChecklist() {
    const checklistRows = this.page.locator(this.checklistRows);
    const rowCount = await checklistRows.count();

    console.log(`Total checklist rows found: ${rowCount}`);

    for (let i = 0; i < rowCount; i++) {
      const row = checklistRows.nth(i);
      const mandatoryRemark = row.locator(this.mandatoryRemarkInput);

      if (await mandatoryRemark.count() === 0) continue;

      const checkbox = row.getByRole('checkbox');
      if (await checkbox.isVisible()) {
        const currentState = await checkbox.getAttribute('aria-checked');
        if (currentState !== 'true') {
          await checkbox.click();
          await expect(checkbox).toHaveAttribute('aria-checked', 'true');
        }
      }

      if (await mandatoryRemark.isVisible()) {
        await mandatoryRemark.fill('Verified and approved');
        await expect(mandatoryRemark).toHaveValue('Verified and approved');
      }
    }
  }

  // ===========================================================
  // ENTER CHECKLIST COMMENTS
  // ===========================================================

  async enterChecklistComments(comments) {
    if (!comments) return;

    const commentsBox = this.page.locator(this.checklistComments);
    if (await commentsBox.isVisible()) {
      await commentsBox.fill(comments);
      await expect(commentsBox).toHaveValue(comments);
      console.log(`Checklist comment entered: "${comments}"`);
    }
  }

  // ===========================================================
  // ENTER MODAL APPROVAL COMMENTS (Remarks)
  // ===========================================================

  async enterApprovalComments(comments) {
    if (!comments) return;

    const modalCommentsBox = this.page.locator(this.approvalComments);

    // Wait for the modal textarea to be visible before interacting
    await expect(modalCommentsBox).toBeVisible();
    await modalCommentsBox.fill(comments);
    await expect(modalCommentsBox).toHaveValue(comments);

    console.log(`Approval modal remark entered: "${comments}"`);
  }

  // ===========================================================
  // CLICK CHECKLIST APPROVE BUTTON
  // ===========================================================

  async clickChecklistApproveButton() {
    const approveButton = this.page.locator(this.approveButton);
    await expect(approveButton).toBeVisible();
    await expect(approveButton).toBeEnabled();
    await approveButton.click();
    console.log('Checklist approve button clicked');
  }

  // ===========================================================
  // CLICK MODAL ACTION CONFIRM BUTTON (Approve / Reject / Info)
  // ===========================================================

  async clickApprovalConfirmButton(action) {
    const confirmButton = this.page.locator(this.approvalActionButton);
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toBeEnabled();
    await confirmButton.click();
    console.log(`${action} modal action button clicked successfully`);
  }

  // ===========================================================
  // APPROVE PR (Branching Logic for Checklist vs Modal)
  // ===========================================================


  async approvePR(testData, isFirstApprover) {
    const comments = testData?.approvers?.comments;

    console.log(`Processing Approve. First Approver: ${isFirstApprover}`);

    // Step 1: Open Approve action
    await this.openApprovalAction('Approve');

    // Step 2: Wait for the approval UI to appear
    const checklistDialog = this.page.getByRole('dialog', {
      name: 'Purchase Request Approval Checklist'
    });

    const modalComments = this.page.locator(this.approvalComments);

    // Give the application time to render the correct approval UI
    await Promise.race([
      checklistDialog.waitFor({ state: 'visible' }),
      modalComments.waitFor({ state: 'visible' })
    ]);

    // Step 3: Detect which approval flow was opened
    const hasChecklist = await checklistDialog.isVisible().catch(() => false);

    if (hasChecklist && isFirstApprover) {
      // ==========================================
      // CHECKLIST APPROVAL FLOW
      // ==========================================
      console.log('Checklist detected. Running checklist approval flow...');

      await this.completeMandatoryChecklist();
      await this.enterChecklistComments(comments);
      await this.clickChecklistApproveButton();

    } else {
      // ==========================================
      // STANDARD APPROVAL MODAL FLOW
      // ==========================================
      console.log('No checklist detected. Running modal approval flow...');

      await this.enterApprovalComments(comments);
      await this.clickApprovalConfirmButton('Approve');
    }

    console.log('Approval completed successfully');
  }

  // ===========================================================
  // REJECT PR
  // ===========================================================

  async rejectPR(testData) {
    const comments = testData?.approvers?.comments;

    console.log('Processing Reject');

    await this.openApprovalAction('Reject');
    await this.enterApprovalComments(comments);
    await this.clickApprovalConfirmButton('Reject');

    console.log('Rejection completed successfully');
  }

  // ===========================================================
  // REQUEST FOR MORE INFO
  // ===========================================================

  async requestMoreInfo(testData) {
    const comments = testData?.approvers?.comments;

    console.log('Processing Request For More Info');

    await this.openApprovalAction('Request For More Info');
    await this.enterApprovalComments(comments);
    await this.clickApprovalConfirmButton('Request For More Info');

    console.log('Request for more information completed successfully');
  }
}

module.exports = ApprovalPage;