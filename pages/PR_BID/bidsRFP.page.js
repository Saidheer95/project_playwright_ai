class BidsRFP {
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
        this.evaluationCriteriaTab = '[data-testid="tab-criteria"]';
        this.addCriteria = '[data-testid="button-add-criteria"]';
        this.selectCategory = '[data-testid="select-criteria-category"]';
        this.enterCriteriaDescription = '[data-testid="input-criteria-question"]';
        this.selectCriteriaValue = '[data-testid="select-criteria-option"]';
        this.selectValueType = '[data-testid="select-criteria-valuetype"]';
        this.enterCriteriaValue = '[data-testid="input-criteria-weight"]';
        this.clickTerms = '[data-testid="tab-terms"]';
        this.submitCriteria = '[data-testid="button-submit-criteria"]';
        this.selectEvaluationTeam = '[data-testid="tab-team"]';
        this.selectTechnicalTeam = '[data-testid="button-select-member-technical-review-team"]';
        this.searchTechnicalTeam = '[data-testid="input-search-member-technical-review-team"]';
        this.selectCommercialTeam = '[data-testid="button-select-member-commercial-review-team"]';
        this.searchCommercialTeam = '[data-testid="input-search-member-commercial-review-team"]';
        this.clickAddTerms = '[data-testid="button-add-clause"]';
        this.selectTermsType = '[data-testid="select-clause-type"]';
        this.enterTermsDesciptin = '[data-testid="input-clause-desc"]'
        this.clauseSubmit = '[data-testid="button-submit-clause"]';
        this.publishBid = '[data-testid="button-publish-bid"]';
        this.finalBid = '[data-testid="button-publish-confirm"]';
    }
    async createBidRFP(testData) {
        await this.page.pause();
        await this.page.click(this.requisitionLink);
        await this.page.fill(this.searchPR, testData.addLine.prNumber);
        const clickButton = await this.page.getByRole('button', { name: testData.createBidRFP.type });
        await clickButton.click();
        await this.page.click(this.selectBid);
        const options = await this.page.locator('[role="option"]').allTextContents();
        console.log(options);
        await this.page.getByText(testData.createBidRFP.bidname).click();
        await this.page.click(this.submitBid);
        await this.page.click(this.tabSuppliers);
        await this.page.click(this.clickSupplier)
        await this.page.click(this.searchSupplier);
        const suppliers = testData.createBidRFP.supplier.name;
        for (const supplier of suppliers) {
            const searchBox = this.page.locator(this.searchSupplier);

            await searchBox.fill('');
            await searchBox.fill(supplier);

            await this.page.getByText(supplier, { exact: true }).waitFor();

            await this.page.getByRole('checkbox').first().check();
        }

        await this.page.click(this.finalInvite);
        await this.page.click(this.evaluationCriteriaTab);

        for (const category of testData.createBidRFP.criteriaCategory.name) {
            await this.page.click(this.addCriteria);
            await this.page.click(this.selectCategory);
            const options1 = await this.page.locator('[role="option"]').allTextContents();
            // Print the available option text values to the console
            console.log(options1);
            await this.page.getByRole('option', { name: category }).click();
            await this.page.fill(this.enterCriteriaDescription, testData.createBidRFP.criteriaDescription);
            await this.page.click(this.selectCriteriaValue);
            await this.page.getByRole('option', { name: testData.createBidRFP.criteriaOption }).click();
            await this.page.click(this.selectValueType);
            await this.page.getByRole('option', { name: testData.createBidRFP.criteriaValueType }).click();
            await this.page.fill(this.enterCriteriaValue, testData.createBidRFP.criteriaWeight);
            await this.page.click(this.submitCriteria);
        }

        await this.page.click(this.selectEvaluationTeam);
        await this.page.click(this.selectTechnicalTeam);
        await this.page.fill(this.searchTechnicalTeam, testData.createBidRFP.technicalTeam.name);
        await this.page.getByRole('option',{name:testData.createBidRFP.technicalTeam.name}).click();
        await this.page.click(this.selectCommercialTeam);
        await this.page.fill(this.searchCommercialTeam, testData.createBidRFP.commercialTeam.name);
        await this.page.getByRole('option',{name:testData.createBidRFP.commercialTeam.name}).click();

        // await this.page.getByText(testData.createBidRFP.commercialTeam.name,{exact:true}).click();
        await this.page.click(this.clickTerms);
        await this.page.click(this.clickAddTerms);
        await this.page.click(this.selectTermsType);
        await this.page.getByRole('option', { name: testData.createBidRFP.termsType }).click();
        await this.page.fill(this.enterTermsDesciptin, testData.createBidRFP.termsDescription);
        await this.page.click(this.clauseSubmit);
        await this.page.click(this.publishBid);
        await this.page.click(this.finalBid);
    }
} module.exports = BidsRFP;