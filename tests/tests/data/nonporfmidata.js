const { faker } = require('@faker-js/faker');


const vendorNameSearch=['Demo', 'TATAAIG', 'Janit industries', 'Tale industries', 'Super vision Pvt Ltd'];
const validDepartments = ['Admin Department', 'Executive Management', 'Finance Department', 'HR Department', 'IT Department', 'Marketing Department', 'Operations Department', 'Projects Delivery Department', 'Recruiting Department', 'Sales Department'];
const validBusinessEntities = ['Entity1'];
const validCurrencies = ['USD', 'INR','EUR'];
const validPaymentTerms = ['30 Days', '45 Days', '60 Days', '90 Days', 'Immediate'];
const budgets = [
  'Cross . Application Software Licenses',
  'Budget Retest . Application Software Licenses',
  'Tender Budget . Application Software Licenses'
];
const validItemValues = [
  'BG002',
  'BG008',
  'BG001',
  'BG006'
];
const validUoms = ['Box', 'Bi-Weekly', 'Daily', 'Dozen', 'Each', 'Hours', 'Half Yearly', 'Kilogram', 'Linear Meter', 'Month', 'Meter', 'Monthly'];
const validTaxRates =  ['GST - 0% - Goods and Service with Zero % Tax','CGST6%+SGST6% - CGST6%+SGST%','GST-18% - GST of 18% on all Applicable Goods and Services','VAT - 20% - VAT 20% Applicable on all goods and services'];

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.nonPoInvoiceRfmiData = {

    validLogin: {
        email:   'abhilash.gundapuneni@prokraya.com',
        password: 'Test@123'
    },

    userLogin:{
        email1:'ashok.reddy@prokraya.com',
        password1: 'Test@123',
    },

    invoiceHeader: {
        vendorName:      pick(vendorNameSearch),
        department:      pick(validDepartments),
        businessEntity:  pick(validBusinessEntities),
        invoiceNumber:   'INV-' + faker.string.numeric(8),
        invoiceDate:     faker.date.recent({ days: 5 }).toISOString().split('T')[0],
        currency:        pick(validCurrencies),
        paymentTerms:    pick(validPaymentTerms),
        description:     faker.commerce.productDescription(),
        reason:          faker.lorem.sentence(),
        budget:          pick(budgets),
    },

    lineItem: {
        itemName:         pick(validItemValues),
        lineDeliveryDate: faker.date.future({ years: 1 }).toISOString().split('T')[0],
        lineUom:          pick(validUoms),
        lineOrderQty:     faker.number.int({ min: 1, max: 5 }).toString(),
        lineUnitCost:     faker.finance.amount({ min: 1, max: 5, dec: 2 }),
        lineTaxRate:      pick(validTaxRates),
    },

    docFilePath: './tests/Files/Bank_Letter_NovaSpark 1.pdf',
    nonPoRfmi:{
        comments:'RequestForMoreInfoOnInvoice'
    },
    nonPoRfmi2:{
        comments2:'approve'
    }
};