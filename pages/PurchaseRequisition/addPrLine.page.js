class AddPrLinePage {
    constructor(page) {
        this.page = page;
        this.addLineButton = '[data-testid="button-add-line-item"]';
        this.selectProduct = '[data-testid="button-select-item"]';
        this.enterQuantity = '[data-testid="input-line-quantity"]';
        this.uomSelect = '[data-testid="select-line-uom"]';
        this.priceInput = '[data-testid="input-line-unit-price"]';
        this.saveLineButton = '[data-testid="button-save-line"]';
    }

    async selectRandomProduct() {
        await this.page.click(this.selectProduct);

        const options = this.page.locator('[role="option"]');

        await options.first().waitFor();

        const count = await options.count();

        const randomIndex = Math.floor(Math.random() * count);

        await options.nth(randomIndex).click();
    }

    async selectDropdown() {
        await this.page.click(this.uomSelect);

        const options = this.page.locator('[role="option"]');

        await options.first().waitFor();

        const count = await options.count();

        const randomIndex = Math.floor(Math.random() * count);

        await options.nth(randomIndex).click();
    }


    async addPurchaseRequisitionLine(testData) {

        // Open Add Line modal
        await this.page.click(this.addLineButton);

        // Wait for modal to be visible
        await this.page.locator(this.saveLineButton).waitFor({ state: 'visible' });

        // Fill form
        await this.selectRandomProduct();
        await this.page.fill(this.enterQuantity, String(testData.addLine.quantity));
        await this.selectDropdown();
        await this.page.fill(this.priceInput, String(testData.addLine.price));

        // Click Save + wait for API response (better than networkidle)
        await Promise.all([
            this.page.waitForResponse(resp =>
                resp.url().includes('/line') && resp.status() === 200 // adjust API if needed
            ),
            await this.page.click(this.saveLineButton)
        ]);

        // Wait for success toast
        const toast = this.page.locator('text=Line item added successfully');

        // Small stabilization wait
        await this.page.waitForTimeout(500);
    }

}

module.exports = AddPrLinePage;