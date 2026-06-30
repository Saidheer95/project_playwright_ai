class PurchaseSubmitApprovalPage {
    constructor(page) {
        this.page = page;
        this.checkBudget='[data-testid="button-check-budget"]';
        this.submitApproval='[data-testid="button-submit-approval"]';
        this.approvalConfirmaiton='[data-testid="button-submit-confirm"]';
    }


    async submitForApproval() {
        await this.page.click(this.checkBudget);
        await this.page.waitForTimeout(1000);
        await this.page.click(this.submitApproval);
        await this.page.waitForTimeout(1000);
        await this.page.click(this.approvalConfirmaiton);
        await this.page.waitForTimeout(1000);
    }
}module.exports = PurchaseSubmitApprovalPage;