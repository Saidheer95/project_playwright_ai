const { test, expect } = require('@playwright/test');
const { nonPoInvoiceRejected } = require('./pages/rejectednonpopage');
const { nonPoInvoiceRejectedData } = require('./data/rejecteddatanonpo');

test('Create Non-PO Invoice - Rejection Flow', async ({ page }) => {
    test.setTimeout(180000);

    const invoiceFlow = new nonPoInvoiceRejected(page);

    await invoiceFlow.goto();

    await invoiceFlow.login(
        nonPoInvoiceRejectedData.validLogin.email,
        nonPoInvoiceRejectedData.validLogin.password
    );
    await page.waitForTimeout(5000);

    await invoiceFlow.navigateToCreateNonPoInvoice();
    await page.waitForTimeout(2000);

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
    await page.waitForTimeout(2000);

    const invoiceNumber = nonPoInvoiceRejectedData.invoiceHeader.invoiceNumber;
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
    await page.waitForTimeout(2000);

    await invoiceFlow.submitInvoice();
    await page.waitForTimeout(3000);

    await invoiceFlow.login1(
        nonPoInvoiceRejectedData.userLogin.email1,
        nonPoInvoiceRejectedData.userLogin.password1
    );
    await page.waitForTimeout(3000);

    await invoiceFlow.nonPoRejected(
        invoiceNumber,
        nonPoInvoiceRejectedData.nonPoRejected.comments
    );
});