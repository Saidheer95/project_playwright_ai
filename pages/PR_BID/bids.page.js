class Bids {
    constructor(page) {
        this.page=page;
        this.requisitionLink='[data-testid="nav-requisitions"]';
        this.searchPR='[data-testid="input-search-pr"]';
        this.selectBid='[data-testid="select-bid-type"]';
        this.submitBid='[data-testid="button-confirm-create-bid"]';



    }
    async createBid(testData) {
        await this.page.click(this.requisitionLink);
        await this.page.fill(this.searchPR,testData.addLine.prNumber);
        const clickButton=await this.page.getByRole('button',{name:testData.createBid.type});
        await this.page.click(this.clickButton);
        await this.selectDropdown(this.selectBid,testData.createBid.bidname);
        await this.page.click(this.submitBid);
    }
}module.exports = Bids;