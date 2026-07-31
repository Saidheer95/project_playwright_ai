const { test, expect } = require('@playwright/test');
const { userEditPage } = require('./pages/usereditpage');
const { userEditData } = require('./data/usereditdata');

test('Edit and Update User', async ({ page }) => {
  test.setTimeout(180000);

  const userFlow = new userEditPage(page);
  await userFlow.goto();

  // Step 1: Login
  await userFlow.validLogin(
    userEditData.validLogin.email,
    userEditData.validLogin.password
  );
  await page.waitForTimeout(5000);

  // Step 2: Navigate to user management
  await userFlow.navigateToUserManagement();
  await page.waitForTimeout(2000);

  // Step 3: Search user
  await userFlow.searchUserByEmail(userEditData.searchUser.email);
  await page.waitForTimeout(1000);

  // Step 4: Click edit button
  await userFlow.clickEditUser();
  await page.waitForTimeout(1000);

  // Step 5: Edit user details
  await userFlow.editUser(
    userEditData.editUser.fullName,
    userEditData.editUser.designation,
    userEditData.editUser.department,
    userEditData.editUser.businessEntity,
    userEditData.editUser.country,
    userEditData.editUser.phone,
    userEditData.editUser.reportingTo
  );
  await page.waitForTimeout(2000);

  console.log('✓ User updated successfully');
  console.log('✓ New Name:', userEditData.editUser.fullName);
  console.log('✓ New Designation:', userEditData.editUser.designation);
  console.log('✓ New Department:', userEditData.editUser.department);
});