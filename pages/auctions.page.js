class auctionpage{
    constructor(page){
        this.page=page;
        this.auctionLink="span:has-text('Auctions')";
        this.createAuction="button:has-text('New Auction')";
        this.selectAuctionType="label:has-text('Auction Type')";
        this.enterAuctionName="input[placeholder='Enter auction name']";
        this.selectAuctionTemplate="button[@id='select-template']";
        this.selectAddline="button:has-text('Add row')";
        this.enterQuantity="input[placeholder='Quantity']";
        this.selectUom="span:has-text('UOM')";
        this.selectDelivery="span:has-text('Select')";
        this.selectType="label:has-text('Serial Auction')";
        this.selectAuctionStrategy="input[name='auction-stratergy']";
        this.enterAuctionDuration="input[type='number']";
        this.deliveryDate="input[id='selectedDeliveryDate']";
        this.allotmentType="input[name='allotment']";
        this.selectSupplier="button:has-text('suppliers')";
        this.searchSuppliers="input[placeholder='Search...']";
        
        
    }

    async createAuctionPage(testData) {
        await this.page.pause(); // Wait for the dropdown to appear
        await this.page.click(this.auctionLink);
        await this.page.click(this.createAuction);
        await this.page.click(this.selectAuctionType);
        await this.page.fill(this.enterAuctionName, testData.auctionName);
        await this.page.locator(`span:has-text("${testData.auctionName}")`).click();
        await this.page.keyboard.press('Enter');

        await this.page.click(this.selectAuctionTemplate);
       
        await this.page.click(this.selectAddline);
        await this.page.fill(this.enterQuantity, '100');  
        await this.page.click(this.selectUom);
       
        await this.page.click(this.selectDelivery);
        for (let i = 0; i < 5; i++) {
            await this.page.keyboard.press('ArrowDown');
        }
        await this.page.click(this.selectType);
        await this.page.fill(this.selectAuctionStrategy, 'Open Auction');
        await this.page.fill(this.enterAuctionDuration, '60');
        await this.page.fill(this.deliveryDate, '2024-06-30');
        await this.page.click(this.allotmentType);
        await this.page.click(this.selectSupplier);
        await this.page.fill(this.searchSuppliers, 'Supplier Name');  

    }
}module.exports = auctionpage;