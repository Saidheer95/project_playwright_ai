const { expect } = require('@playwright/test');
const { generateBidTestData } = require('../../utils/dataGenerator');
const JsonWriter = require('../../utils/JsonWriter');


class PRTender {
    constructor(page) {
        this.page = page;
        this.requisitionLink = '[data-testid="nav-requisitions"]';
        this.searchPR = '[data-testid="input-search-pr"]';
        this.selectBid = '[data-testid="select-bid-type"]';
        this.selectOpenDate = '[data-testid="input-contract-start-date"]';
        this.selectEndDate = '[data-testid="input-contract-end-date"]';
        this.selectLines = '[data-testid^="pr-to-contract-line-test-id"]';
        this.selectRenewable = '[data-testid="select-contract-renewable-from-pr"]';
        this.searchSupplier = '[data-testid="input-vendor-search-contract"]';
        this.createContract = '[data-testid="button-create-contract-from-pr"]';
        this.tabClauses = '[data-testid="tab-clauses"]';
        this.clickAddClause = '[data-testid="button-add-clause"]';
        this.clauseTitleInput = '[data-testid^="input-clause-title"]'; 
        this.saveChanges='[data-testid="button-save-clauses"]';
        this.clickReviewTeam = '[data-testid="button-add-reviewer"]';
        this.clicksearchReviewer = '[data-testid="input-reviewer-search"]';
        this.clickAddReviewer = '[data-testid="button-add-selected"]';
        this.submitReview = '[data-testid="button-submit-contract"]';
        this.finalSubmitReview='[data-testid="button-confirm-submit"]';
        this.contractNumber='[data-testid="text-contract-ref"]';
    }

    async createContractPR(testdata) {

        await this.page.pause();
        const dynamicData = generateBidTestData('Contract');
        console.log('Generated Tender data:', dynamicData);

        // 1. Navigate and search PR
        await this.page.click(this.requisitionLink);
        await this.page.fill(this.searchPR, testdata.addLine.prNumber);

        // 2. Select contract
        const clickButton = this.page.getByRole('button', { name: testdata.createContract.type });
        await clickButton.click();

        // 3. Fill Dates
        await this.page.fill(this.selectOpenDate, dynamicData.openDate);
        await this.page.fill(this.selectEndDate, dynamicData.closeDate);

        // 4. CHECK MULTIPLE LINES
        const checkboxes = this.page.locator(this.selectLines);
        const lineCount = await checkboxes.count();
        for (let i = 0; i < lineCount; i++) {
            const checkbox = checkboxes.nth(i);
            if (!(await checkbox.isChecked())) {
                await checkbox.check();
            }
        }

        await this.page.fill(
            this.searchSupplier,
            testdata.createContract.supplier.name
        );

        const supplierOption = this.page.getByText(
            testdata.createContract.supplier.name,
            { exact: true }
        );

        await supplierOption.waitFor({ state: 'visible' });
        await supplierOption.click();


        await this.page.click(this.createContract);

        const clausesTab = this.page.locator(this.tabClauses);

        // Wait for the tab to exist
        await clausesTab.waitFor({ state: 'visible' });

        // Scroll the Clauses tab into the viewport
        await clausesTab.scrollIntoViewIfNeeded();

        // Click Clauses tab
        await clausesTab.click();

        await this.page.click(this.clickAddClause);


        await this.page.fill(this.clauseTitleInput, testdata.clauses.title);


        const descriptionField = this.page
            .locator('[contenteditable="true"][data-placeholder="Click here to start editing..."]')
            .last();

        await descriptionField.waitFor({ state: 'visible' });

        await descriptionField.fill(testdata.clauses.description);

        await this.page.click(this.saveChanges);


        await this.page.click(this.clickReviewTeam);

        await this.page.click(this.clicksearchReviewer);

        const reviewers = testdata.reviewer.name;
        for (const reviewer of reviewers) {
            const searchBox = this.page.locator(this.clicksearchReviewer);

            await searchBox.fill('');
            await searchBox.fill(reviewer);

            await this.page.getByText(reviewer, { exact: true }).waitFor();

            await this.page.getByRole('checkbox').first().check();
        }



        await this.page.click(this.clickAddReviewer);


        // 7. Final Submission
        await this.page.click(this.submitReview);

        await this.page.click(this.finalSubmitReview);
    }

    async getContractNumber(){
        const contractNumberLocator=this.page.locator(this.contractNumber);

        await contractNumberLocator.waitFor({
            state:'visible'
        });

        const contractNumberText=await contractNumberLocator.textContent();

        const contractNumber=contractNumberText?.trim();

        if(!contractNumber){
            throw new Error('Contract number was not found on the page.');
        }

        console.log(`Contract Number: ${contractNumber}`);

        JsonWriter.saveContractNumber(contractNumber);

        return contractNumber;
    }
}

module.exports = PRTender;