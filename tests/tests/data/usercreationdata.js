const { faker } = require('@faker-js/faker');

const Departments = ["Admin Department", "Executive Management", "Finance Department", "HR Department", "IT Department", "Marketing Department", "Operations Department", "Projects Delivery Department", "Recruiting Department"];

const Entities = ["Entity1", "ProductionQA", "Prokland"];

const Countries = ["UAE", "India", "USA", "UK", "Saudi Arabia", "Qatar"];

const Users = ["Abhilash", "agenticai", "Ashok"];

const Roles = ["PROCUREMENT OFFICER", "PROCUREMENT MANAGER", "FINANCE OFFICER", "FINANCE MANAGER", "DEPARTMENT HEAD", "DEPARTMENT USER"];

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

exports.userData = {

    validLogin: {
        email: "karthikeya.manchikanti@prokraya.com",
        password: "Welcome@123"
    },

    createUser: {
        email: faker.internet.email().toLowerCase(),
        fullName: faker.person.fullName(),
        designation: faker.person.jobTitle(),
        department: pick(Departments),
        businessEntity: pick(Entities),
        country: pick(Countries),
        phone: faker.string.numeric(10),
        reportingTo: pick(Users),
        role: pick(Roles)
    },

    setPassword: {
        newPassword: "Test@123",
        confirmPassword: "Test@123"
    }

};