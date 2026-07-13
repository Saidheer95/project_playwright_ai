const JsonWriter = require('../../utils/JsonWriter');

class PurchaseRequisitionPage {
    constructor(page) {
        this.page = page;

        this.requisitionLink = '[data-testid="nav-requisitions"]';
        this.createPR = '[data-testid="button-create-pr"]';
        this.enterPrDescription = '[data-testid="input-pr-description"]';
        this.selectBusinessEntity = '[data-testid="select-pr-business-entity"]';
        this.needByDate = '[data-testid="input-need-by-date"]';
        this.selectdeliveryLocation = '[data-testid="select-delivery-location"]';
        this.selectBuyer = '[data-testid="select-buyer"]';
        this.selectCurrency = '[data-testid="select-currency"]';
        this.selectBudget = '[data-testid="select-budget"]';
        this.finalSubmitPR = '[data-testid="button-save-pr"]';
        this.prNumber = '[data-testid="text-pr-number"]';
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

        await this.page.fill(this.enterPrDescription, testData.createPurchaseRequisition.prDescription);

        await this.selectDropdown(this.selectBusinessEntity, testData.createPurchaseRequisition.businessEntity);

        const date=new Date();
        const formattedDate = date.toISOString().split('T')[0];
        console.log("Current Date:", formattedDate);
        await this.page.fill(this.needByDate, formattedDate);

        await this.selectDropdown(this.selectdeliveryLocation, testData.createPurchaseRequisition.deliveryLocation);


        await this.selectDropdown(this.selectBuyer, testData.createPurchaseRequisition.buyer);

        await this.selectDropdown(this.selectCurrency, testData.createPurchaseRequisition.currency);

        await this.selectDropdown(this.selectBudget, testData.createPurchaseRequisition.budget);

        await this.page.click(this.finalSubmitPR);



    }

    async getPRNumber() {
        // await this.page.waitForSelector(this.prNumber, { state: 'visible' });

        const prNumber = (await this.page.locator(this.prNumber).textContent());


        JsonWriter.savePRNumber(prNumber);

        return prNumber;
    }

}

module.exports = PurchaseRequisitionPage;