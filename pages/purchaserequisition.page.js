class PurchaserequisitionPage {
    constructor(page) {
        this.page = page;

        this.requisitionLink = '[data-testid="nav-requisitions"]';
        this.createPR = '[data-testid="button-create-pr"]';
        this.enterPrDescription = '[data-testid="input-pr-description"]';
        this.selectdeliveryLocation = '[data-testid="select-delivery-location"]';
        this.needByDate = '[data-testid="input-need-by-date"]';
        this.selectBusinessEntity = '[data-testid="select-pr-business-entity"]';
        this.selectBuyer = '[data-testid="select-buyer"]';
        this.selectCurrency = '[data-testid="select-currency"]';
        this.selectBudget = '[data-testid="select-budget"]';
        this.finalSubmitPR = '[data-testid="button-save-pr"]';
    }

    async selectDropdown(dropdownLocator, optionText) {
        const dropdown = this.page.locator(dropdownLocator);

        await dropdown.scrollIntoViewIfNeeded();
        await dropdown.click();

        await this.page.waitForTimeout(500);

        const optionLocators = [
            this.page.getByRole('option', { name: optionText, exact: true }),
            this.page.getByText(optionText, { exact: true }),
            this.page.locator(`span:text-is("${optionText}")`),
            this.page.locator(`text="${optionText}"`)
        ];

        for (const option of optionLocators) {
            if (await option.count()) {
                await option.first().scrollIntoViewIfNeeded();
                await option.first().click();
                return;
            }
        }

        throw new Error(`Option '${optionText}' not found.`);
    }

    async createPurchaseRequisitionPage(testData) {

        await this.page.click(this.requisitionLink);
        await this.page.click(this.createPR);

        await this.page.fill(this.enterPrDescription, testData.prDescription);

        await this.selectDropdown(this.selectdeliveryLocation, testData.deliveryLocation);

        await this.page.fill(this.needByDate, testData.needByDate);

        await this.selectDropdown(this.selectBusinessEntity, testData.businessEntity);

        await this.selectDropdown(this.selectBuyer, testData.buyer);

        await this.selectDropdown(this.selectCurrency, testData.currency);

        await this.selectDropdown(this.selectBudget, testData.budget);

        await this.page.click(this.finalSubmitPR);
    }
}

module.exports = PurchaserequisitionPage;