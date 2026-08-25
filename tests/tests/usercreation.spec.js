const { test } = require('@playwright/test');
const { userCreationPage } = require('./pages/usercreationpage');
const { userData } = require('./data/usercreationdata');

const createdUserEmail = userData.createUser.email;

test.describe.serial('User Creation and Password Setup Workflow', () => {
    let userFlow;

    test.beforeEach(async ({ page }) => {
        userFlow = new userCreationPage(page);
        await userFlow.goto();
        await userFlow.login(
            userData.validLogin.email,
            userData.validLogin.password
        );
        await page.waitForTimeout(2000);
    });

    test('Create New User', async ({ page }) => {
        // Navigate to user management first
        await userFlow.navigateToUserManagement();
        await page.waitForTimeout(1000);

        // Create user
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

        console.log('✓ User created successfully');
        console.log('✓ Email:', createdUserEmail);
        console.log('✓ Name:', userData.createUser.fullName);
        console.log('✓ Department:', userData.createUser.department);
        console.log('✓ Role:', userData.createUser.role);
    });

    test('Set Password for Created User', async ({ page }) => {
        await userFlow.setPassword(
            createdUserEmail,
            userData.setPassword.newPassword,
            userData.setPassword.confirmPassword
        );
        

        console.log('✓ Password set successfully');
        console.log('✓ User is now ready to login');
    });
});