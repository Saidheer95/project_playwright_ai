const { test, expect } = require('@playwright/test');
const { userCreationPage } = require('./pages/usercreationpage');
const { userData } = require('./data/usercreationdata');


test('Create New User', async ({ page }) => {
  test.setTimeout(180000);
  
  const userFlow = new userCreationPage(page);
  await userFlow.goto();

  // Step 1: Login
  await userFlow.validLogin(
    userData.validLogin.email,
    userData.validLogin.password
  );
  await page.waitForTimeout(5000);

  // Step 2: Create user
  await userFlow.createUser(
    userData.createUser.email,
    userData.createUser.fullName,
    userData.createUser.designation,
    userData.createUser.department,
    userData.createUser.businessEntity,
    userData.createUser.country,
    userData.createUser.phone,
    userData.createUser.reportingTo,
    userData.createUser.role
  );
  await page.waitForTimeout(2000);

  // Step 3: Store email for later use
  const createdUserEmail = userData.createUser.email;
  console.log('✓ User created successfully');
  console.log('✓ Email stored:', createdUserEmail);
  console.log('✓ Name:', userData.createUser.fullName);

  await userFlow.setPassword(
  createdUserEmail,
  userData.setPassword.newPassword, 
  userData.setPassword.confirmPassword  
);
});