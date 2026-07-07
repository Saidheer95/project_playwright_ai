class ApprovalPage {
    constructor(page) {
        this.page = page;   
        this.approvalLink = '[data-testid="button-notifications"]';
        this.approvalRequest = '[data-testid="link-view-all-notifications"]';
        this.searchTasks='[data-testid="input-search-tasks"]';
        
    }

    async navigateToApprovalRequest(testData) {
        await this.page.click(this.approvalLink);
        await this.page.click(this.approvalRequest);
        await this.page.fill(this.searchTasks, testData.approver.number);
    }
}module.exports = ApprovalPage;