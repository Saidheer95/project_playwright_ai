class ApprovalPage {
    constructor(page) {
        this.page = page;   
        this.approvalLink = '[data-testid="button-notifications"]';
        this.approvalRequest = '[data-testid="link-view-all-notifications"]';
        this.searchTasks='[data-testid="input-search-tasks"]';
        this.clickTask='[data-testid="task-entity-0"]';
        this.clickApprovalsDropdwon='[data-testid="button-approve"]';
        this.enterComments='[data-testid="input-approval-remarks"]';
        
    }

    async navigateToApprovalRequest(testData) {
        await this.page.click(this.approvalLink);
        await this.page.click(this.approvalRequest);
        await this.page.fill(this.searchTasks, testData.approvers.number);
        await this.page.click(this.clickTask);
        await this.page.click(this.clickApprovalsDropdwon);
        const approval=await this.page.getByRole('menuitem',{name:testData.approvers.action});
        await approval.waitFor({state:'visible'});
        await approval.click();
        console.log(`Approval Action: ${testData.approvers.action}`);
        await this.page.fill(this.enterComments, testData.approvers.comments);
        const finalApprove=await this.page.getByRole('button',{name:testData.approvers.action});
        await finalApprove.click();
    
    }
}module.exports = ApprovalPage;