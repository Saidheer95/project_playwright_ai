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

        await dropdown.waitFor({ state: 'visible' });
        await dropdown.scrollIntoViewIfNeeded();
        await dropdown.click();

        const optionTextValue = optionText?.trim();
        const optionLocators = [
            this.page.getByRole('option', { name: optionTextValue, exact: true }),
            this.page.getByText(optionTextValue, { exact: true }),
            this.page.locator('span').filter({ hasText: optionTextValue }),
            this.page.locator(`text=${optionTextValue}`)
        ];

        for (const option of optionLocators) {
            if (await option.count()) {
                const matchedOption = option.first();
                await matchedOption.waitFor({ state: 'visible' });
                await matchedOption.scrollIntoViewIfNeeded();
                await matchedOption.click();
                return;
            }
        }

        throw new Error(`Option '${optionText}' not found.`);
    }

    async createPurchaseRequisitionPage(testData) {
        const requisitionLink = this.page.locator(this.requisitionLink);
        const createPrButton = this.page.locator(this.createPR);
        const descriptionInput = this.page.locator(this.enterPrDescription);
        const needByDateInput = this.page.locator(this.needByDate);
        const submitButton = this.page.locator(this.finalSubmitPR);

        await requisitionLink.waitFor({ state: 'visible' });
        await requisitionLink.click();
        await createPrButton.waitFor({ state: 'visible' });
        await createPrButton.click();
        await descriptionInput.waitFor({ state: 'visible' });

        await descriptionInput.fill(testData.createPurchaseRequisition.prDescription);

        await this.selectDropdown(this.selectBusinessEntity, testData.createPurchaseRequisition.businessEntity);

        const date = new Date();
        date.setDate(date.getDate() + 1);
        const formattedDate = date.toISOString().split('T')[0];
        await needByDateInput.waitFor({ state: 'visible' });
        await needByDateInput.fill(formattedDate);

        await this.selectDropdown(this.selectdeliveryLocation, testData.createPurchaseRequisition.deliveryLocation);


        await this.selectDropdown(this.selectBuyer, testData.createPurchaseRequisition.buyer);

        await this.selectDropdown(this.selectCurrency, testData.createPurchaseRequisition.currency);

        await this.selectDropdown(this.selectBudget, testData.createPurchaseRequisition.budget);

        await submitButton.waitFor({ state: 'visible' });
        await submitButton.click();



    }

    async getPRNumber() {
        const prNumberLocator = this.page.locator(this.prNumber);
        await prNumberLocator.waitFor({ state: 'visible' });

        const prNumberText = await prNumberLocator.textContent();
        const prNumber = prNumberText?.trim();

        if (!prNumber) {
            throw new Error('PR number was not found on the page.');
        }

        JsonWriter.savePRNumber(prNumber);

        return prNumber;
    }

}

module.exports = PurchaseRequisitionPage;