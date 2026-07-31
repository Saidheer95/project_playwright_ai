const { test, expect } = require('@playwright/test');
const { nonPoInvoice } = require('./pages/nonpopage');
const { nonPoInvoiceData } = require('./data/nonpodata');

test('Create Non-PO Invoice - End to End', async ({ page }) => {
    test.setTimeout(300000);

    const invoiceFlow = new nonPoInvoice(page);

    await invoiceFlow.goto();

    await invoiceFlow.login(
        nonPoInvoiceData.validLogin.email,
        nonPoInvoiceData.validLogin.password
    );
    await page.waitForTimeout(5000);

    await invoiceFlow.navigateToCreateNonPoInvoice();
    await page.waitForTimeout(2000);

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
    await page.waitForTimeout(2000);

    const invoiceNumber = nonPoInvoiceData.invoiceHeader.invoiceNumber;
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
    await page.waitForTimeout(2000);

    await invoiceFlow.submitInvoice();
    await page.waitForTimeout(3000);

    await invoiceFlow.login1(
        nonPoInvoiceData.userLogin.email1,
        nonPoInvoiceData.userLogin.password1
    );
    await page.waitForTimeout(3000);

    await invoiceFlow.nonPoapproved(
        invoiceNumber,
        nonPoInvoiceData.nonPoApproved.comments
    );
});