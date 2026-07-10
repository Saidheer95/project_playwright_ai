class Bids {
    constructor(page) {
        this.page = page;
        this.requisitionLink = '[data-testid="nav-requisitions"]';
        this.searchPR = '[data-testid="input-search-pr"]';
        this.selectBid = '[data-testid="select-bid-type"]';
        this.submitBid = '[data-testid="button-confirm-create-bid"]';
        this.tabSuppliers = '[data-testid="tab-suppliers"]';
        this.clickSupplier = '[data-testid="button-add-supplier"]';
        this.searchSupplier = '[data-testid="input-search-supplier"]';
        this.finalInvite = '[data-testid="button-invite-suppliers"]';
        this.clickTerms='[data-testid="tab-terms"]';
        this.clickAddTerms='[data-testid="button-add-clause"]';
        this.selectTermsType='[data-testid="select-clause-type"]';
        this.enterTermsDesciptin='[data-testid="input-clause-desc"]'
        this.clauseSubmit='[data-testid="button-submit-clause"]';
        this.publishBid='[data-testid="button-publish-bid"]';
        this.finalBid='[data-testid="button-publish-confirm"]';



    }
    async createBid(testData) {
        await this.page.pause();
        await this.page.click(this.requisitionLink);
        await this.page.fill(this.searchPR, testData.addLine.prNumber);
        const clickButton = await this.page.getByRole('button', { name: testData.createBid.type });
        await clickButton.click();
        await this.page.click(this.selectBid);
        const options = await this.page.locator('[role="option"]').allTextContents();
        console.log(options);
        await this.page.getByText(testData.createBid.bidname).click();
        await this.page.click(this.submitBid);
        await this.page.click(this.tabSuppliers);
        await this.page.click(this.clickSupplier)
        await this.page.click(this.searchSupplier);
        const suppliers = testData.createBid.supplier.name;

        for (const supplier of suppliers) {
            const searchBox = this.page.locator(this.searchSupplier);

            await searchBox.fill('');
            await searchBox.fill(supplier);

            await this.page.getByText(supplier, { exact: true }).waitFor();

            await this.page.getByRole('checkbox').first().check();
        }

        await this.page.click(this.finalInvite);
        await this.page.click(this.clickTerms);
        await this.page.click(this.clickAddTerms);
        await this.page.click(this.selectTermsType);
        await this.page.getByRole('option', { name: testData.createBid.termsType }).click();
        await this.page.fill(this.enterTermsDesciptin, testData.createBid.termsDescription);
        await this.page.click(this.clauseSubmit);
        await this.page.click(this.publishBid);
        await this.page.click(this.finalBid);



    }
} module.exports = Bids;