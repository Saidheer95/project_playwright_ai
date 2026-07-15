class Bids {
    constructor(page) {
        // Store the Playwright page object for later use in methods
        this.page = page;
        // Locator for the requisitions navigation link
        this.requisitionLink = '[data-testid="nav-requisitions"]';
        // Locator for the PR search input field
        this.searchPR = '[data-testid="input-search-pr"]';
        // Locator for the bid type dropdown selector
        this.selectBid = '[data-testid="select-bid-type"]';
        // Locator for the create bid confirmation button
        this.submitBid = '[data-testid="button-confirm-create-bid"]';
        // Locator for the suppliers tab in the bid workflow
        this.tabSuppliers = '[data-testid="tab-suppliers"]';
        // Locator for the add supplier button
        this.clickSupplier = '[data-testid="button-add-supplier"]';
        // Locator for the supplier search input field
        this.searchSupplier = '[data-testid="input-search-supplier"]';
        // Locator for the invite suppliers button
        this.finalInvite = '[data-testid="button-invite-suppliers"]';
        // Locator for the terms tab in the bid workflow
        this.clickTerms = '[data-testid="tab-terms"]';
        // Locator for the add clause button
        this.clickAddTerms = '[data-testid="button-add-clause"]';
        // Locator for the clause type dropdown selector
        this.selectTermsType = '[data-testid="select-clause-type"]';
        // Locator for the clause description input field
        this.enterTermsDesciptin = '[data-testid="input-clause-desc"]'
        // Locator for the submit clause button
        this.clauseSubmit = '[data-testid="button-submit-clause"]';
        // Locator for the publish bid button
        this.publishBid = '[data-testid="button-publish-bid"]';
        // Locator for the final publish confirmation button
        this.finalBid = '[data-testid="button-publish-confirm"]';
    }

    async createBid(testData) {
        // Click the requisitions navigation link to open the requisitions page
        await this.page.click(this.requisitionLink);
        // Fill the PR search field with the PR number from the test data
        await this.page.fill(this.searchPR, testData.addLine.prNumber);
        // Find the create bid button by its accessible role and label text from test data
        const clickButton = await this.page.getByRole('button', { name: testData.createBidRFQ.type });
        // Click the located button to initiate bid creation
        await clickButton.click();
        await this.page.click(this.selectBid);
        // Collect all option text values from the dropdown for debugging purposes
        const options = await this.page.locator('[role="option"]').allTextContents();
        // Print the available option text values to the console
        console.log(options);
        // Select the bid type based on the bid name provided in test data
        await this.page.getByText(testData.createBidRFQ.bidname).click();
        // Click the button to submit the bid creation form
        await this.page.click(this.submitBid);
        // Open the suppliers tab in the bid workflow
        await this.page.click(this.tabSuppliers);
        // Click to add a supplier to the bid
        await this.page.click(this.clickSupplier)
        // Activate the supplier search input field
        await this.page.click(this.searchSupplier);
        // Read the supplier names from the test data
        const suppliers = testData.createBidRFQ.supplier.name;

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

        // Click the button to invite all currently selected suppliers
        await this.page.click(this.finalInvite);
        // Click to open the terms tab
        await this.page.click(this.clickTerms);
        // Click to add a new clause to the bid terms
        await this.page.click(this.clickAddTerms);
        // Click the clause type dropdown to show available clause types
        await this.page.click(this.selectTermsType);
        // Select the specific terms type from the options using test data
        await this.page.getByRole('option', { name: testData.createBidRFQ.termsType }).click();
        // Fill the clause description field with the description from test data
        await this.page.fill(this.enterTermsDesciptin, testData.createBidRFQ.termsDescription);
        // Submit the newly added clause
        await this.page.click(this.clauseSubmit);
        // Click the publish bid button to begin publishing
        await this.page.click(this.publishBid);
        // Confirm the final publish action for the bid
        await this.page.click(this.finalBid);
    }
} module.exports = Bids;