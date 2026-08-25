class SupplierResponse{
    constructor(page){
        this.page=page;
        this.clickBids='[data-testid="nav-bids"]';
        this.searchBids='[data-testid="input-search-pending"]';
        this.enterAcknowldege='[data-testid="button-acknowledge"]';
        this.selectType='[data-testid="select-ack-type"]';
        this.enterBuyerNotes='[data-testid="textarea-ack-notes"]';
        this.selectTermsAndConditions='[data-testid="checkbox-ack-terms"]';
        this.finalAcknowledge='[data-testid="button-submit-ack"]';
        this.bidResponseNo='[data-testid="input-search-suppbids"]';
    }
    async submitResponse(){
        await this.page.click(this.clickBids);
        const bidSearch = this.page.locator(this.searchBids);
        await bidSearch.fill(testData.bidNumber);      
          


    }
}