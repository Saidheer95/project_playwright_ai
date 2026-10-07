const { expect, test } = require('@playwright/test');
const { poPage } = require('../../pagesv/popage/popage');
const { poData } = require('../../datav/podatav/podata');

test('create purchase order', async ({ page }) => {
    test.setTimeout(180_000);
    const login = new poPage(page);

    // =====================================================
    // LOGIN AS REQUESTER
    // =====================================================

    await login.goto();

    await login.login(
        poData.validUser.email,
        poData.validUser.password
    );

    // =====================================================
    // CREATE PURCHASE ORDER
    // =====================================================

    await login.createPO(
        poData.poDetails.podescription,
        poData.poDetails.deliveryLocation,
        poData.poDetails.reqDate,
        poData.poDetails.busEntity,
        poData.poDetails.department,
        poData.poDetails.vendor,
        poData.poDetails.budget,
        poData.poDetails.currency,
        poData.poDetails.paymentTerms,
        poData.poDetails.advancePercentage,
        poData.lineDetails.selectItem,
        poData.lineDetails.lineQuantity,
        poData.lineDetails.lineUOM,
        poData.lineDetails.lineUnitPrice,
        poData.lineDetails.lineDiscount,
        poData.lineDetails.lineTax
    );

    const poDescription = poData.poDetails.podescription;
    console.log('PO Description:', poDescription);

    // =====================================================
    // CAPTURE PO NUMBER
    // =====================================================

    const poNumber = await login.capturePONumber();
    console.log('PO Number:', poNumber);

    // =====================================================
    // FIRST APPROVER LOGIN + APPROVE
    // =====================================================

    await login.login1(
        poData.userLogin.email1,
        poData.userLogin.password1
    );

    await login.poApprover(
        poDescription,
        poData.poApprover.comment
    );

    // =====================================================
    // SECOND APPROVER LOGIN + APPROVE (ASHOK REDDY)
    // =====================================================

    // await login.loginSecondApprover(
    //     poData.secondApprover.email,
    //     poData.secondApprover.password
    // );

    // await login.poSecondApprover(
    //     poDescription,
    //     poData.poApprover.comment
    // );

    // =====================================================
    // VENDOR LOGIN + ACCEPT PO
    // =====================================================

    await login.login2(
        poData.vendorLogin.email2,
        poData.vendorLogin.password2,
        poNumber
    );

    // =====================================================
    // CREATE DELIVERY NOTE
    // =====================================================

    await login.createDN(
        poData.dnDetails.asnNumber,
        poData.dnDetails.bolNumber,
        poData.dnDetails.carrier,
        poData.dnDetails.shipDate,
        poData.dnDetails.arrivalDate
    );

    // =====================================================
    // REQUESTER LOGIN
    // =====================================================

    await login.login3(
        poData.validUser.email,
        poData.validUser.password,
        poNumber
    );

    // =====================================================
    // CREATE RECEIPT + SUPPLIER EVALUATION
    // =====================================================

    await login.createReceipt(
        poData.receiptDetails.receiptDate,
        poData.receiptDetails.receiptNumber,
        poData.receiptDetails.receiptNotes
    );

    // =====================================================
    // VENDOR LOGIN
    // =====================================================

    await login.login4(
        poData.vendorLogin.email2,
        poData.vendorLogin.password2,
        poNumber
    );

    // =====================================================
    // CREATE INVOICE
    // =====================================================

    await login.createInvoice(
        poData.invoiceDetails.invoiceDescription,
        poData.invoiceDetails.invoiceNumber,
        poData.invoiceDetails.docFilePath
    );

    // =====================================================
    // LOGOUT SUPPLIER + LOGIN INVOICE APPROVER
    // =====================================================

    await login.loginInvoiceApprover(
        poData.invoiceApprover.email,
        poData.invoiceApprover.password
    );

    // =====================================================
    // APPROVE INVOICE (SEARCH BY PO NUMBER)
    // =====================================================

    await login.approveInvoice(
        poNumber
    );

    // =====================================================
    // RECORD PAYMENT
    // =====================================================

    await login.recordPayment(
        poData.paymentDetails.paymentMethod,
        poData.paymentDetails.paymentDescription
    );

   

});