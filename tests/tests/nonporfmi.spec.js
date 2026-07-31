const { test, expect } = require('@playwright/test');
const { nonPoInvoiceRfmi } = require('./pages/nonporfmipage');
const { nonPoInvoiceRfmiData } = require('./data/nonporfmidata');

test('Create Non-PO Invoice - Request For More Info Flow', async ({ page }) => {
    test.setTimeout(300000);

    const invoiceFlow = new nonPoInvoiceRfmi(page);

    await invoiceFlow.goto();

    await invoiceFlow.login(
        nonPoInvoiceRfmiData.validLogin.email,
        nonPoInvoiceRfmiData.validLogin.password
    );
    await page.waitForTimeout(5000);

    await invoiceFlow.navigateToCreateNonPoInvoice();
    await page.waitForTimeout(2000);

    await invoiceFlow.invoiceHeaderDetails(
        nonPoInvoiceRfmiData.invoiceHeader.vendorName,
        nonPoInvoiceRfmiData.invoiceHeader.department,
        nonPoInvoiceRfmiData.invoiceHeader.businessEntity,
        nonPoInvoiceRfmiData.invoiceHeader.invoiceNumber,
        nonPoInvoiceRfmiData.invoiceHeader.invoiceDate,
        nonPoInvoiceRfmiData.invoiceHeader.currency,
        nonPoInvoiceRfmiData.invoiceHeader.paymentTerms,
        nonPoInvoiceRfmiData.invoiceHeader.description,
        nonPoInvoiceRfmiData.invoiceHeader.reason,
        nonPoInvoiceRfmiData.invoiceHeader.budget
    );
    await page.waitForTimeout(2000);

    const invoiceNumber = nonPoInvoiceRfmiData.invoiceHeader.invoiceNumber;
    console.log('Captured invoiceNumber:', invoiceNumber);

    await invoiceFlow.uploadInvoiceDocument(nonPoInvoiceRfmiData.docFilePath);

    await invoiceFlow.addLineItem(
        nonPoInvoiceRfmiData.lineItem.itemName,
        nonPoInvoiceRfmiData.lineItem.lineDeliveryDate,
        nonPoInvoiceRfmiData.lineItem.lineUom,
        nonPoInvoiceRfmiData.lineItem.lineOrderQty,
        nonPoInvoiceRfmiData.lineItem.lineUnitCost,
        nonPoInvoiceRfmiData.lineItem.lineTaxRate
    );
    await page.waitForTimeout(2000);

    await invoiceFlow.submitInvoice();
    await page.waitForTimeout(3000);

    // Log in as approver
    await invoiceFlow.login1(
        nonPoInvoiceRfmiData.userLogin.email1,
        nonPoInvoiceRfmiData.userLogin.password1
    );
    await page.waitForTimeout(3000);

    // Approver requests more info
    await invoiceFlow.nonPoRfmi(
        invoiceNumber,
        nonPoInvoiceRfmiData.nonPoRfmi.comments
    );
    await page.waitForTimeout(3000);

    // Log back in as vendor to resubmit
    await invoiceFlow.signInAndSignOut(
        nonPoInvoiceRfmiData.validLogin.email,
        nonPoInvoiceRfmiData.validLogin.password
    );
    await page.waitForTimeout(3000);

    // Vendor resubmits the invoice
    await invoiceFlow.nonPoRfmi1(
        invoiceNumber,
        nonPoInvoiceRfmiData.nonPoRfmi.comments
    );
    await page.waitForTimeout(3000);

    // Log back in as approver
    await invoiceFlow.signInAndSignOut1(
        nonPoInvoiceRfmiData.userLogin.email1,
        nonPoInvoiceRfmiData.userLogin.password1
    );
    await page.waitForTimeout(3000);

    // Approver approves the resubmitted invoice
    await invoiceFlow.nonPoRfmi2(
        invoiceNumber,
        nonPoInvoiceRfmiData.nonPoRfmi2.comments2
    );
});