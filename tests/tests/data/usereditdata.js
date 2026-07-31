const { faker } = require('@faker-js/faker');

const Departments = [
  'Admin Department',
  'Executive Management',
  'Finance Department',
  'HR Department',
  'IT Department',
  'Marketing Department',
  'Operations Department',
  'Projects Delivery Department',
  'Recruiting Department'
];

const Entities = ['Entity1', 'ProductionQA', 'Prokland'];

const Countries = ['UAE', 'India', 'USA', 'UK', 'Saudi Arabia', 'Qatar'];

const Users = ['Abhilash', 'agenticai', 'Ashok'];


function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

exports.userEditData = {
  
  validLogin: {
    email: 'karthikeya.manchikanti@prokraya.com',
    password: 'Welcome@123'
  },

  searchUser: {
    email: 'kendall.hermiston@hotmail.com'  // User email to search and edit
  },

  editUser: {
    fullName: faker.person.fullName(),
    designation: faker.person.jobTitle(),
    department: pick(Departments),
    businessEntity: pick(Entities),
    country: pick(Countries),
    phone: faker.string.numeric(10),
    reportingTo: pick(Users),
   
  }
};