const { faker } = require('@faker-js/faker');

// Helper function to format date as DD-MM-YYYY
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Generate start date (today or near future)
const startDate = faker.date.soon({ days: 5 });

// Generate end date (1 year after start date)
const endDate = new Date(startDate);
endDate.setFullYear(endDate.getFullYear() + 1);

// Sample business entities and budget owners
const businessEntities = [
  'ABC Corporation',
  'XYZ Industries',
  'Global Trade Ltd',
  'Finance Solutions Inc',
  'Enterprise Holdings'
];

const budgetOwners = [
  'John Smith',
  'Sarah Johnson',
  'Michael Brown',
  'Emily Davis',
  'Robert Wilson'
];

const periods = [
  'Q1 2026',
  'Q2 2026',
  'Q3 2026',
  'Q4 2026',
  'Annual 2026',
  'Annual 2027'
];

// Budget Test Data
const budgetTestData = {
  validBudget: {
    budgetName: faker.commerce.productName(),
    businessEntity: faker.helpers.arrayElement(businessEntities),
    budgetOwner: faker.helpers.arrayElement(budgetOwners),
    period: faker.helpers.arrayElement(periods),
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  },

  multipleBudgets: [
    {
      budgetName: faker.commerce.productName(),
      businessEntity: faker.helpers.arrayElement(businessEntities),
      budgetOwner: faker.helpers.arrayElement(budgetOwners),
      period: faker.helpers.arrayElement(periods),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    },
    {
      budgetName: faker.commerce.productName(),
      businessEntity: faker.helpers.arrayElement(businessEntities),
      budgetOwner: faker.helpers.arrayElement(budgetOwners),
      period: faker.helpers.arrayElement(periods),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    },
    {
      budgetName: faker.commerce.productName(),
      businessEntity: faker.helpers.arrayElement(businessEntities),
      budgetOwner: faker.helpers.arrayElement(budgetOwners),
      period: faker.helpers.arrayElement(periods),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate)
    }
  ],

  invalidBudget: {
    budgetName: '', // Empty budget name (invalid)
    businessEntity: 'Select Entity',
    budgetOwner: 'Select Owner',
    period: 'Select Period',
    startDate: '',
    endDate: ''
  },

  emptyBudgetName: {
    budgetName: '',
    businessEntity: faker.helpers.arrayElement(businessEntities),
    budgetOwner: faker.helpers.arrayElement(budgetOwners),
    period: faker.helpers.arrayElement(periods),
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  },

  specialCharactersBudgetName: {
    budgetName: `Budget_${faker.string.alphaNumeric(10)}!@#$`,
    businessEntity: faker.helpers.arrayElement(businessEntities),
    budgetOwner: faker.helpers.arrayElement(budgetOwners),
    period: faker.helpers.arrayElement(periods),
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  }
};

module.exports = budgetTestData;
