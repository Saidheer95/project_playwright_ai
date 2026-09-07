class SupplierAcceptPage {
    constructor(page){
        this.page=page;
        this.contractNavigationTab='[data-testid="nav-contracts"]';
        this.searchContract='[data-testid="input-search-open"]';
        this.contractPreviewTab='[data-testid="button-view-toggle"]';
        this.clausesTab='[data-testid="tab-clauses"]';
        this.saveChanges='[data-testid="button-save-clauses"]';
        this.confirm='[data-testid="button-submit-acceptance""]';
    }

async submitSupplier(testdata){
    await this.page.pause();
    await this.page.click(this.contractNavigationTab);
    await this.page.fill(this.searchContract, testdata.contractNumber);
    
    const contractNumber=this.page.getByText(testdata.contractNumber);
    await contractNumber.waitFor({state:'visible'});
    await contractNumber.click();

    

    await this.page.click(this.contractPreviewTab);

   const tabClauses = this.page.locator(this.clausesTab);

        // Wait for the tab to exist
        await tabClauses.waitFor({ state: 'visible' });

        // Scroll the Clauses tab into the viewport
        await tabClauses.scrollIntoViewIfNeeded();

        // Click Clauses tab
        await tabClauses.click();

    const descriptionField = this.page
            .locator('[contenteditable="true"][data-placeholder="Click here to start editing..."]')
            .last();

    await descriptionField.waitFor({ state: 'visible' });

    await descriptionField.fill(testdata.updateClauses.editdescription);
    await this.page.click(this.saveChanges);
    await this.page.click(this.confirm);




}

}module.exports=SupplierAcceptPage;