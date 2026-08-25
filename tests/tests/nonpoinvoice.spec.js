const { test } = require('@playwright/test');
const { nonPoInvoice } = require('./pages/nonpopage');
const { nonPoInvoiceData } = require('./data/nonpodata');

const invoiceNumber = nonPoInvoiceData.invoiceHeader.invoiceNumber;

test.describe.serial('Non-PO Invoice Approval Workflow', () => {
let invoiceFlow;

test.beforeEach(async ({ page }) => {
    invoiceFlow = new nonPoInvoice(page);
    await invoiceFlow.goto();
});

test('Create Non-PO Invoice', async ({ page }) => {
    await invoiceFlow.login(
        nonPoInvoiceData.validLogin.email,
        nonPoInvoiceData.validLogin.password
    );
    

    await invoiceFlow.navigateToCreateNonPoInvoice();
   

    await invoiceFlow.invoiceHeaderDetails(
        nonPoInvoiceData.invoiceHeader.vendorName,
        nonPoInvoiceData.invoiceHeader.department,
        nonPoInvoiceData.invoiceHeader.businessEntity,
        nonPoInvoiceData.invoiceHeader.invoiceNumber,
        nonPoInvoiceData.invoiceHeader.invoiceDate,
        nonPoInvoiceData.invoiceHeader.currency,
        nonPoInvoiceData.invoiceHeader.paymentTerms,
        nonPoInvoiceData.invoiceHeader.description,
        nonPoInvoiceData.invoiceHeader.reason,
        nonPoInvoiceData.invoiceHeader.budget
    );
    

    console.log('Captured invoiceNumber:', invoiceNumber);

    await invoiceFlow.uploadInvoiceDocument(nonPoInvoiceData.docFilePath);

    await invoiceFlow.addLineItem(
        nonPoInvoiceData.lineItem.itemName,
        nonPoInvoiceData.lineItem.lineDeliveryDate,
        nonPoInvoiceData.lineItem.lineUom,
        nonPoInvoiceData.lineItem.lineOrderQty,
        nonPoInvoiceData.lineItem.lineUnitCost,
        nonPoInvoiceData.lineItem.lineTaxRate
    );
    

    await invoiceFlow.submitInvoice();
});

test('Approver logs in and approves invoice', async ({ page }) => {
    await invoiceFlow.login(
        nonPoInvoiceData.approvers.email1,
        nonPoInvoiceData.approvers.password1
    );

    await invoiceFlow.approved(
        invoiceNumber,
        nonPoInvoiceData.nonPoApproved.comments
    );
});
});