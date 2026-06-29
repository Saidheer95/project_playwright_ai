class PurchaserequisitionPage {
    constructor(page) {
        this.page = page;
        this.requisitionLink="[data-testid='nav-requisitions']";
        this.createPR='[data-testid="button-create-pr"]';
        this.enterPrDescription='[data-testid="input-pr-description"]';
        this.selectdeliveryLocation='[data-testid="select-delivery-location"]';
        this.needByDate='[data-testid="input-need-by-date"]';
        this.selectBusinessEntity='[data-testid="select-pr-business-entity"]';
        this.selectCurrency='[data-testid="select-currency"]';
        this.selectBuyer='[data-testid="select-buyer"]';

    }
    async createPurchaseRequisitionPage(testData) {
        await this.page.click(this.requisitionLink);
        await this.page.click(this.createPR);
        await this.page.fill(this.enterPrDescription, testData.prDescription);
        await this.page.click(this.selectdeliveryLocation);
        const deliveryLocationOption = await this.page.locator(`span:has-text("${testData.deliveryLocation}")`);
        await deliveryLocationOption.click();   
        await this.page.fill(this.needByDate, testData.needByDate);
        await this.page.click(this.selectBusinessEntity);
        const businessEntityOption = await this.page.locator(`span:has-text("${testData.businessEntity}")`);
        await businessEntityOption.click();
        await this.page.click(this.selectCurrency);
        const currencyOption = await this.page.locator(`span:has-text("${testData.currency}")`);
        await currencyOption.click();
        await this.page.click(this.selectBuyer);
        const buyerOption = await this.page.locator(`span:has-text("${testData.buyer}")`);
        await buyerOption.click();
    }
}