const { test } = require('@playwright/test');
const { nonPoInvoiceRfmi } = require('./pages/nonporfmipage');
const { nonPoInvoiceRfmiData } = require('./data/nonporfmidata');

const invoiceNumber = nonPoInvoiceRfmiData.invoiceHeader.invoiceNumber;

test.describe.serial('Non-PO Invoice RFMI and Approval Workflow', () => {
    let invoiceFlow;

    test.beforeEach(async ({ page }) => {
        invoiceFlow = new nonPoInvoiceRfmi(page);
        await invoiceFlow.goto();
    });

    test('Create Non-PO Invoice', async ({ page }) => {
        await invoiceFlow.login(
            nonPoInvoiceRfmiData.validLogin.email,
            nonPoInvoiceRfmiData.validLogin.password
        );
       

        await invoiceFlow.navigateToCreateNonPoInvoice();
        

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
        

        await invoiceFlow.submitInvoice();
        
    });

    test('Approver logs in and requests more info', async ({ page }) => {
        await invoiceFlow.login(
            nonPoInvoiceRfmiData.approvers.email1,
            nonPoInvoiceRfmiData.approvers.password1
        );
        

        await invoiceFlow.rfmi(
            invoiceNumber,
            nonPoInvoiceRfmiData.nonPoRfmi.comments
        );
    });

    test('Vendor resubmits invoice after RFMI', async ({ page }) => {
        await invoiceFlow.login(
            nonPoInvoiceRfmiData.validLogin.email,
            nonPoInvoiceRfmiData.validLogin.password
        );
        

        await invoiceFlow.resubmitInvoice(invoiceNumber);
    });

    test('Approver approves resubmitted invoice', async ({ page }) => {
        await invoiceFlow.login(
            nonPoInvoiceRfmiData.approvers.email1,
            nonPoInvoiceRfmiData.approvers.password1
        );
        

        await invoiceFlow.approved(
            invoiceNumber,
            nonPoInvoiceRfmiData.nonPoApproved.comments
        );
    });
});