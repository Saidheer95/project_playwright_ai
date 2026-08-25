// const fs = require('fs');
// const path = require('path');

// const {
//   assertVisible,
//   assertEnabled,
//   assertHasValue
// } = require('../../utils/assertions');


// const defaultCredentialsPath =
//   path.join(
//     __dirname,
//     '..',
//     '..',
//     'fixtures',
//     'credentials.json'
//   );


// function loadCredentials(
//   filePath = defaultCredentialsPath
// ) {

//   let raw;

//   try {

//     raw =
//       fs.readFileSync(
//         filePath,
//         'utf8'
//       );

//   } catch (error) {

//     throw new Error(
//       `Unable to read credentials file at ${filePath}: ${error.message}`
//     );
//   }


//   try {

//     return JSON.parse(raw);

//   } catch (error) {

//     throw new Error(
//       `Unable to parse credentials file at ${filePath}: ${error.message}`
//     );
//   }
// }


// class LoginPage {

//   constructor(page) {

//     this.page = page;


//     // =========================================================
//     // LOGIN
//     // =========================================================

//     this.emailID =
//       page.locator(
//         '[data-testid="input-email"]'
//       );


//     this.passwordInput =
//       page.locator(
//         '[data-testid="input-password"]'
//       );


//     this.signIn =
//       page.locator(
//         '[data-testid="button-login"]'
//       );


//     // =========================================================
//     // LOGGED-IN STATE
//     // =========================================================

//     this.clickUser =
//       page.locator(
//         '[data-testid="button-user-menu"]'
//       );


//     this.signOut =
//       page.locator(
//         '[data-testid="button-logout"]'
//       );
//   }


//   // ===========================================================
//   // LOGIN
//   // ===========================================================

//   async login(
//     email,
//     password
//   ) {

//     console.log(
//       `Logging in as: ${email}`
//     );


//     // ---------------------------------------------------------
//     // Email
//     // ---------------------------------------------------------

//     await assertVisible(
//       this.emailID,
//       30000
//     );

//     await assertEnabled(
//       this.emailID,
//       30000
//     );


//     // IMPORTANT:
//     // Clear any previously entered value.

//     await this.emailID.fill('');


//     await this.emailID.fill(
//       email
//     );


//     // Verify correct email is entered

//     await assertHasValue(
//       this.emailID,
//       email
//     );


//     console.log(
//       `Email entered successfully: ${email}`
//     );


//     // ---------------------------------------------------------
//     // Password
//     // ---------------------------------------------------------

//     await assertVisible(
//       this.passwordInput,
//       30000
//     );

//     await assertEnabled(
//       this.passwordInput,
//       30000
//     );


//     await this.passwordInput.fill(
//       ''
//     );


//     await this.passwordInput.fill(
//       password
//     );


//     // ---------------------------------------------------------
//     // Login button
//     // ---------------------------------------------------------

//     await assertVisible(
//       this.signIn
      
//     );

//     await assertEnabled(
//       this.signIn
      
//     );


//     console.log(
//       `Submitting login for: ${email}`
//     );


//     await this.signIn.click();


//     // ---------------------------------------------------------
//     // WAIT FOR AUTHENTICATED STATE
//     // ---------------------------------------------------------

//     console.log(
//       `Waiting for authenticated state: ${email}`
//     );


//     await assertVisible(
//       this.clickUser
      
//     );


//     console.log(
//       `Login completed successfully for: ${email}`
//     );


//     console.log(
//       `Current URL after login: ${this.page.url()}`
//     );
//   }


//   // ===========================================================
//   // WAIT FOR LOGIN PAGE
//   // ===========================================================

//   async waitForLoginPage() {

//     console.log(
//       'Waiting for login page...'
//     );


//     await assertVisible(
//       this.emailID
      
//     );


//     await assertEnabled(
//       this.emailID
      
//     );


//     await assertVisible(
//       this.passwordInput
      
//     );


//     await assertEnabled(
//       this.passwordInput
      
//     );


//     console.log(
//       'Login page is ready'
//     );
//   }


//   // ===========================================================
//   // LOGOUT
//   // ===========================================================

//   async logout() {

//     console.log(
//       'Logging out current user'
//     );


//     await assertVisible(
//       this.clickUser
      
//     );


//     await assertEnabled(
//       this.clickUser
      
//     );


//     await this.clickUser.click();


//     await assertVisible(
//       this.signOut
      
//     );


//     await assertEnabled(
//       this.signOut
      
//     );


//     await this.signOut.click();


//     // ---------------------------------------------------------
//     // Wait until login page is displayed
//     // ---------------------------------------------------------

//     await this.waitForLoginPage();


//     console.log(
//       'Logout completed successfully'
//     );
//   }
// }


// module.exports = {
//   LoginPage,
//   loadCredentials
// };
const fs=require('fs');
const path=require('path');
const {expect}=require('@playwright/test');

const defaultCredentialsPath=path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'credentials.json'
);

function loadCredentials(filePath=defaultCredentialsPath){
  let raw;

  try{
    raw=fs.readFileSync(filePath,'utf8');
  }catch(error){
    throw new Error(
      `Unable to read credentials file at ${filePath}: ${error.message}`
    );
  }

  try{
    return JSON.parse(raw);
  }catch(error){
    throw new Error(
      `Unable to parse credentials file at ${filePath}: ${error.message}`
    );
  }
}

class LoginPage{
  constructor(page){
    this.page=page;

    this.emailID=page.locator(
      '[data-testid="input-email"]'
    );

    this.passwordInput=page.locator(
      '[data-testid="input-password"]'
    );

    this.signIn=page.locator(
      '[data-testid="button-login"]'
    );

    this.clickUser=page.locator(
      '[data-testid="button-user-menu"]'
    );

    this.signOut=page.locator(
      '[data-testid="button-logout"]'
    );
  }

  async login(email,password){
    console.log(`Logging in as: ${email}`);

    await expect(this.emailID).toBeVisible();
    await expect(this.emailID).toBeEnabled();

    await this.emailID.fill(email);

    await expect(this.emailID).toHaveValue(email);

    console.log(`Email entered successfully: ${email}`);

    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toBeEnabled();

    await this.passwordInput.fill(password);

    await expect(this.signIn).toBeVisible();
    await expect(this.signIn).toBeEnabled();

    console.log(`Submitting login for: ${email}`);

    await this.signIn.click();

    console.log(`Waiting for authenticated state: ${email}`);

    await expect(this.clickUser).toBeVisible();

    await expect(this.page).toHaveURL(
      /\/app\/dashboard/
    );

    console.log(`Login completed successfully for: ${email}`);
    console.log(`Current URL after login: ${this.page.url()}`);
  }

  async waitForLoginPage(){
    console.log('Waiting for login page...');

    await expect(this.emailID).toBeVisible();
    await expect(this.emailID).toBeEnabled();

    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toBeEnabled();

    console.log('Login page is ready');
  }

  async logout(){
    console.log('Logging out current user');

    await expect(this.clickUser).toBeVisible();
    await expect(this.clickUser).toBeEnabled();

    await this.clickUser.click();

    await expect(this.signOut).toBeVisible();
    await expect(this.signOut).toBeEnabled();

    await this.signOut.click();

    await this.waitForLoginPage();

    console.log('Logout completed successfully');
  }
}

module.exports={
  LoginPage,
  loadCredentials
};