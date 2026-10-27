const { faker } = require('@faker-js/faker');
const path = require('path');

// =====================================================
// MASTER DATA
// =====================================================
const deliveryLocation = ['Hyderabad'];
const busEntity = ['Entity1'];

const department = [
    'Admin Department',
    'IT Department',
    'Finance Department',
    'Sales Department',
    'HR Department',
    'Marketing Department',
    'Projects Delivery Department',
    'Executive Management',
    'Operations Department',
    'Recruiting Department'
];

const companies = ['Windler LLC'];

const categories = [
    'All departments . Application Software Licenses'
];

const currency = ['USD', 'INR', 'EUR', 'AEDA', 'GKG'];
const paymentTerms = ['30 Days', '60 Days', '45 Days', '5 Days', 'Immediate'];
const selectItem = ['BG002', 'BG008', 'BG001'];
const unitOfMeasure = ['Each', 'Box'];

const lineTax = [
    'GST -0%',
    'CGST6%+SGST6%',
    'GST-18%',
    'VAT - 20%'
];

const carriers = ['DTDC'];

// =====================================================
// RANDOM FUNCTION
// =====================================================

function pick(arr) {
    return faker.helpers.arrayElement(arr);
}

// =====================================================
// RANDOM DATA
// =====================================================

const randomLocation = pick(deliveryLocation);
const randomBusEntity = pick(busEntity);
const randomDepartment = pick(department);
const randomVendor = pick(companies);
const randomBudget = pick(categories);
const randomCurrency = pick(currency);
const randomPaymentTerms = pick(paymentTerms);

const randomAdvancePercentage = faker.number.int({ min: 5, max: 50 }).toString();
const randomSelectItem = pick(selectItem);
const randomLineQuantity = faker.number.int({ min: 1, max: 20 }).toString();
const randomLineUOM = pick(unitOfMeasure);
const randomLineUnitPrice = faker.commerce.price({ min: 10, max: 1000, dec: 2 });
const randomLineDiscount = faker.number.int({ min: 0, max: 15 }).toString();
const randomLineTax = pick(lineTax);

const randomPoDescription = faker.commerce.productDescription();

// =====================================================
// DELIVERY NOTE DATA
// =====================================================

const randomASNNumber = 'ASN-' + faker.number.int({ min: 1000, max: 9999 }).toString();
const randomBOL = 'BOL-' + faker.number.int({ min: 10000, max: 99999 }).toString();
const randomCarrier = pick(carriers);

const shipDateObj = new Date();
shipDateObj.setDate(shipDateObj.getDate() + 5);
const randomShipDate = shipDateObj.toISOString().split('T')[0];

const randomArrivalDate = new Date(
    shipDateObj.getTime() +
    faker.number.int({ min: 10, max: 30 }) * 24 * 60 * 60 * 1000
).toISOString().split('T')[0];

// =====================================================
// EXPORT PO DATA
// =====================================================

exports.poData = {

    // REQUESTER
    validUser: {
        email: 'venkateswara.reddy@prokraya.com',
        password: 'Test@123',
    },

    // FIRST APPROVER
    userLogin: {
        email1: 'pramod.ankireddy@prokraya.com',
        password1: 'Test@123',
    },

    // SECOND APPROVER
    secondApprover: {
        email: 'ashok.reddy@prokraya.com',
        password: 'Test@123'
    },

    // VENDOR
    vendorLogin: {
        email2: 'Amelia25@yahoo.com',
        password2: 'Test@123'
    },

    // INVOICE APPROVER
    // TODO: replace with the actual invoice-approver test account
    invoiceApprover: {
        email: 'ashok.reddy@prokraya.com',
        password: 'Test@123'
    },

    // PO DETAILS
    poDetails: {
        podescription: randomPoDescription,
        deliveryLocation: randomLocation,
        reqDate: faker.date.future({ years: 1 }).toISOString().split('T')[0],
        busEntity: randomBusEntity,
        department: randomDepartment,
        vendor: randomVendor,
        budget: randomBudget,
        currency: randomCurrency,
        paymentTerms: randomPaymentTerms,
        advancePercentage: randomAdvancePercentage,
    },

    // LINE DETAILS
    lineDetails: {
        selectItem: randomSelectItem,
        lineQuantity: randomLineQuantity,
        lineUOM: randomLineUOM,
        lineUnitPrice: randomLineUnitPrice,
        lineDiscount: randomLineDiscount,
        lineTax: randomLineTax,
        lineDeliveryDate: faker.date.future({ years: 1 }).toISOString().split('T')[0],
    },

    // APPROVAL COMMENT
    poApprover: {
        comment: faker.lorem.sentence(),
    },

    // DELIVERY NOTE
    dnDetails: {
        asnNumber: randomASNNumber,
        bolNumber: randomBOL,
        carrier: randomCarrier,
        shipDate: randomShipDate,
        arrivalDate: randomArrivalDate,
    },

    // RECEIPT
    // Note: evaluationOption/rating/yesNo are no longer needed here —
    // the Evaluation panel's criteria (stars, Yes/No, option buttons)
    // are now filled dynamically inside popage.js's createReceipt().
    receiptDetails: {
        receiptDate: new Date().toISOString().split('T')[0],
        receiptNumber: 'REC-' + faker.number.int({ min: 10000, max: 99999 }).toString(),
        receiptNotes: faker.lorem.sentence(),
    },

    // INVOICE
    invoiceDetails: {
        invoiceDescription: faker.commerce.productDescription(),
        invoiceNumber: 'INV-' + faker.number.int({ min: 10000, max: 99999 }).toString(),
        docFilePath: path.resolve(__dirname, '../../filesv/luffy 1.pdf'),
    },

    // PAYMENT
    paymentDetails: {
        paymentMethod: 'Cash',
        paymentDescription: faker.commerce.productDescription(),
    },

};