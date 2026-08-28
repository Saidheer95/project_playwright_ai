const { expect } = require('@playwright/test');

class AddRFPLine {
    constructor(page) {
        this.page = page;
        this.clickAddLine = page.getByRole("button", { name: "Add Line" });
        this.selectItem = '[data-testid="select-line-item"]';
        this.selectLineType = '[data-testid="select-linetype"]';
        this.enterQuantity = '[data-testid="input-line-quantity"]';
        this.selectUOM = '[data-testid="select-line-uom"]';
        this.enterUnitPrice = '[data-testid="input-line-price"]';
        this.clickAdd = '[data-testid="button-submit-line"]';
        // Locator for the suppliers tab in the bid workflow
        this.tabSuppliers = '[data-testid="tab-suppliers"]';
        // Locator for the add supplier button
        this.clickSupplier = '[data-testid="button-add-supplier"]';
        // Locator for the supplier search input field
        this.searchSupplier = '[data-testid="input-search-supplier"]';
        // Locator for the invite suppliers button
        this.finalInvite = '[data-testid="button-invite-suppliers"]';

        this.evaluationCriteriaTab = '[data-testid="tab-criteria"]';
        this.addCriteria = '[data-testid="button-add-criteria"]';
        this.selectCategory = '[data-testid="select-criteria-category"]';
        this.enterCriteriaDescription = '[data-testid="input-criteria-question"]';
        this.selectCriteriaValue = '[data-testid="select-criteria-option"]';
        this.selectValueType = '[data-testid="select-criteria-valuetype"]';
        this.enterCriteriaValue = '[data-testid="input-criteria-weight"]';
        this.submitCriteria = '[data-testid="button-submit-criteria"]';
        this.selectEvaluationTeam = '[data-testid="tab-team"]';
        this.selectTechnicalTeam = '[data-testid="button-select-member-technical-review-team"]';
        this.searchTechnicalTeam = '[data-testid="input-search-member-technical-review-team"]';
        this.selectCommercialTeam = '[data-testid="button-select-member-commercial-review-team"]';
        this.searchCommercialTeam = '[data-testid="input-search-member-commercial-review-team"]';



        // Locator for the terms tab in the bid workflow
        this.clickTerms = '[data-testid="tab-terms"]';
        // Locator for the add clause button
        this.clickAddTerms = '[data-testid="button-add-clause"]';
        // Locator for the clause type dropdown selector
        this.selectTermsType = '[data-testid="select-clause-type"]';
        // Locator for the clause description input field
        this.enterTermsDesciption = '[data-testid="input-clause-desc"]'
        // Locator for the submit clause button
        this.clauseSubmit = '[data-testid="button-submit-clause"]';
        // Locator for the publish bid button
        this.publishBid = '[data-testid="button-publish-bid"]';
        // Locator for the final publish confirmation button
        this.finalBid = '[data-testid="button-publish-confirm"]';

    }

    async selectRandomProduct() {
        await this.page.click(this.selectItem);

        const options = this.page.locator('[role="option"]');

        await options.first().waitFor();

        const count = await options.count();

        const randomIndex = Math.floor(Math.random() * count);

        await options.nth(randomIndex).click();
    }

    async selectDropdown() {
        await this.page.click(this.selectUOM);

        const options = this.page.locator('[role="option"]');

        await options.first().waitFor();

        const count = await options.count();

        const randomIndex = Math.floor(Math.random() * count);

        await options.nth(randomIndex).click();
    }


    async addBidRFPLine(testdata) {

        // const dynamicData=gene

        for (let i = 0; i <= 3; i++) {

            await this.clickAddLine.click();
            // Fill form
            await this.selectRandomProduct();
            await this.page.click(this.selectLineType, testdata.addLine.lineType);
            const option = this.page.locator('[role="option"]', {
                hasText: testdata.addLine.lineType
            });
            await option.waitFor();
            await option.click();
            await this.page.fill(this.enterQuantity, String(testdata.addLine.quantity));
            await this.selectDropdown();
            await this.page.fill(this.enterUnitPrice, String(testdata.addLine.price));

            await this.page.click(this.clickAdd);
        }
        await this.page.click(this.tabSuppliers);
        // Click to add a supplier to the bid
        await this.page.click(this.clickSupplier)
        // Activate the supplier search input field
        await this.page.click(this.searchSupplier);
        // Read the supplier names from the test data
        const suppliers = testdata.createBidRFP.supplier.name;

        // Loop through each supplier name provided in the test data
        for (const supplier of suppliers) {
            // Create a locator reference for the supplier search field
            const searchBox = this.page.locator(this.searchSupplier);
            // Clear any existing search text from the field
            await searchBox.fill('');
            // Fill the supplier search field with the current supplier name
            await searchBox.fill(supplier);
            // Wait until the supplier text appears exactly in the page
            await this.page.getByText(supplier, { exact: true }).waitFor();
            // Check the first checkbox in the current context to select the supplier
            await this.page.getByRole('checkbox').first().check();
        }

        await this.page.click(this.finalInvite);


        await this.page.click(this.evaluationCriteriaTab);
       
        for (const category of testdata.createBidRFP.criteriaCategory.name) {
            const addCriteriaButton = this.page.locator(this.addCriteria);

            await expect(addCriteriaButton).toBeVisible();
            await expect(addCriteriaButton).toBeEnabled();
            await addCriteriaButton.click();

            const categorySelect = this.page.locator(this.selectCategory);

            await expect(categorySelect).toBeAttached();
            await expect(categorySelect).toBeVisible();
            await expect(categorySelect).toBeEnabled();

            await categorySelect.click();

            const categoryOption = this.page.getByRole('option', {
                name: category,
                exact: true
            });

            await expect(categoryOption).toBeVisible();
            await categoryOption.click();

            const description = this.page.locator(this.enterCriteriaDescription);

            await expect(description).toBeVisible();
            await description.fill(
                testdata.createBidRFP.criteriaDescription
            );

            const criteriaValueSelect = this.page.locator(this.selectCriteriaValue);

            await expect(criteriaValueSelect).toBeVisible();
            await criteriaValueSelect.click();

            const criteriaOption = this.page.getByRole('option', {
                name: testdata.createBidRFP.criteriaOption,
                exact: true
            });

            await expect(criteriaOption).toBeVisible();
            await criteriaOption.click();

            const valueTypeSelect = this.page.locator(this.selectValueType);

            await expect(valueTypeSelect).toBeVisible();
            await valueTypeSelect.click();

            const valueTypeOption = this.page.getByRole('option', {
                name: testdata.createBidRFP.criteriaValueType,
                exact: true
            });

            await expect(valueTypeOption).toBeVisible();
            await valueTypeOption.click();

            const criteriaValue = this.page.locator(this.enterCriteriaValue);

            await expect(criteriaValue).toBeVisible();
            await criteriaValue.fill(
                String(testdata.createBidRFP.criteriaWeight)
            );

            const submitCriteria = this.page.locator(this.submitCriteria);

            await expect(submitCriteria).toBeVisible();
            await expect(submitCriteria).toBeEnabled();
            await submitCriteria.click();

            await expect(submitCriteria).toBeHidden();
        }
        await this.page.click(this.selectEvaluationTeam);
        await this.page.click(this.selectTechnicalTeam);
        await this.page.fill(this.searchTechnicalTeam, testdata.createBidRFP.technicalTeam.name);
        await this.page.getByRole('option', { name: testdata.createBidRFP.technicalTeam.name }).click();
        await this.page.click(this.selectCommercialTeam);
        await this.page.fill(this.searchCommercialTeam, testdata.createBidRFP.commercialTeam.name);
        await this.page.getByRole('option', { name: testdata.createBidRFP.commercialTeam.name }).click();

        // await this.page.getByText(testData.createBidRFP.commercialTeam.name,{exact:true}).click();
        await this.page.click(this.clickTerms);
        await this.page.click(this.clickAddTerms);
        await this.page.click(this.selectTermsType);
        await this.page.getByRole('option', { name: testdata.createBidRFP.termsType }).click();
        // await this.page.keyboard.press('Tab');

        await this.page.fill(this.enterTermsDesciption, testdata.createBidRFP.termsDescription);
        // await this.page.fill(this.enterTermsDesciption,dynamicData.termsDescription);
        await this.page.click(this.clauseSubmit);
        await expect(this.publishBid).toBeVisible();
        await this.page.click(this.publishBid);
        await this.page.click(this.finalBid);




    }
} module.exports = AddRFPLine;