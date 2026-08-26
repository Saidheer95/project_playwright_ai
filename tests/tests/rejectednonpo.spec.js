const { test } = require('@playwright/test');
const { nonPoInvoiceRejected } = require('./pages/rejectednonpopage');
const { nonPoInvoiceRejectedData } = require('./data/rejecteddatanonpo');

const invoiceNumber = nonPoInvoiceRejectedData.invoiceHeader.invoiceNumber;

test.describe.serial('Non-PO Invoice Rejection Workflow', () => {
    let invoiceFlow;

    test.beforeEach(async ({ page }) => {
        invoiceFlow = new nonPoInvoiceRejected(page);
        await invoiceFlow.goto();
    });

    test('Create Non-PO Invoice', async ({ page }) => {
        await invoiceFlow.login(
            nonPoInvoiceRejectedData.validLogin.email,
            nonPoInvoiceRejectedData.validLogin.password
        );
        

        await invoiceFlow.navigateToCreateNonPoInvoice();
      

        await invoiceFlow.invoiceHeaderDetails(
            nonPoInvoiceRejectedData.invoiceHeader.vendorName,
            nonPoInvoiceRejectedData.invoiceHeader.department,
            nonPoInvoiceRejectedData.invoiceHeader.businessEntity,
            nonPoInvoiceRejectedData.invoiceHeader.invoiceNumber,
            nonPoInvoiceRejectedData.invoiceHeader.invoiceDate,
            nonPoInvoiceRejectedData.invoiceHeader.currency,
            nonPoInvoiceRejectedData.invoiceHeader.paymentTerms,
            nonPoInvoiceRejectedData.invoiceHeader.description,
            nonPoInvoiceRejectedData.invoiceHeader.reason,
            nonPoInvoiceRejectedData.invoiceHeader.budget
        );
      

        console.log('Captured invoiceNumber:', invoiceNumber);

        await invoiceFlow.uploadInvoiceDocument(nonPoInvoiceRejectedData.docFilePath);
       

        await invoiceFlow.addLineItem(
            nonPoInvoiceRejectedData.lineItem.itemName,
            nonPoInvoiceRejectedData.lineItem.lineDeliveryDate,
            nonPoInvoiceRejectedData.lineItem.lineUom,
            nonPoInvoiceRejectedData.lineItem.lineOrderQty,
            nonPoInvoiceRejectedData.lineItem.lineUnitCost,
            nonPoInvoiceRejectedData.lineItem.lineTaxRate
        );
        

        await invoiceFlow.submitInvoice();
     
    });

    test('Approver logs in and rejects invoice', async ({ page }) => {
        await invoiceFlow.login(
            nonPoInvoiceRejectedData.approvers.email1,
            nonPoInvoiceRejectedData.approvers.password1
        );
        

        await invoiceFlow.rejected(
            invoiceNumber,
            nonPoInvoiceRejectedData.nonPoRejected.comments
        );
    });
});