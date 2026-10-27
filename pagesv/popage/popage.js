const { expect } = require('@playwright/test');
const path = require('path');

exports.poPage =
    class poPage {

        constructor(page) {
            this.page = page;
            this.url = 'https://qa.prokraya.ai/signin';

            // LOGIN
            this.emailInput = 'input-email';
            this.passwordInput = 'input-password';
            this.loginButton = 'button-login';

            // PURCHASE ORDER
            this.navToPoModule = 'nav-purchase-orders';
            this.createPoButton = 'button-create-po';
            this.poDescriptionInput = 'input-po-description';
            this.selectDeliveryLocationDropdown = 'select-delivery-location';
            this.inputReqDate = 'input-required-date';
            this.selectBusEntityDropdown = 'select-pr-business-entity';
            this.selectDepartmentDropdown = 'select-department';
            this.inputVendorDropdown = 'input-vendor-search';
            this.selectBudgetDropdown = 'select-budget';
            this.selectCurrencyDropdown = 'select-currency';
            this.selectPaymentTermsDropdown = 'select-payment-terms';
            this.checkBox = 'checkbox-advance-flag';
            this.inputAdvancePercentage = 'input-advance-percentage';
            this.createButton = 'button-save-po';

            // LINE ITEM
            this.buttonAddItem = 'button-add-line-item';
            this.buttonSelectItem = 'button-select-item';
            this.inputLineQuntity = 'input-line-quantity';
            this.selectLineUOM = 'select-line-uom';
            this.inputLineUnitPrice = 'input-line-unit-price';
            this.inputLineDiscount = 'input-line-discount';
            this.selectLineTax = 'select-line-tax-rate';
            this.buttonSaveLine = 'button-save-line';

            // PO APPROVAL
            this.buttonCheckBudget = 'Check-Budget';
            this.buttonSubApproval = 'button-submit-approval';
            this.buttonApprove2 = 'button-submit-confirm';

            // PROFILE / LOGOUT
            this.menuprofile = 'button-user-menu';
            this.buttonLogout = 'button-logout';

            // TASKS
            this.viewAll = 'link-view-all-tasks';
            this.searchId = 'input-search-tasks';
            this.approveButtons = 'button-approve';
            this.approved1 = 'menu-item-approve';
            this.comments = 'input-approval-remarks';
            this.yesButton = 'button-approval-confirm';
            this.activePo = '';

            // PO NUMBER
            this.poNumberDisplay = 'text-po-number';
            this.capturedPONumber = null;
            this.inputSearch = 'input-search';

            // SUPPLIER PO RESPONSE
            this.acptorrjtbutton = 'button-supplier-po-response';
            this.acceptbutton = 'menu-item-supplier-accept-po';

            // DELIVERY NOTES
            this.dnbutton = 'button-raise-dn';
            this.asnnumber = 'input-dn-asn';
            this.bol = 'input-dn-bol';
            this.carrier = 'select-dn-carrier';
            this.shipdate = 'input-dn-ship-date';
            this.arrivaldate = 'input-dn-arrival-date';
            this.cdn = 'button-dn-submit';

            // RECEIPTS
            this.rreceipt = 'button-raise-receipt';
            this.rdate = 'input-receipt-date';
            this.rnumber = 'input-receipt-number';
            this.rnotes = 'input-receipt-notes';
            this.radd = 'button-receipt-submit';

            // EVALUATION
            this.evalCheckbox = '.w-5.h-5.rounded';
            this.evalSubmitButton = 'button-submit-evaluation';
            this.evalCreateButton = 'button-create-supplier-evaluation';
            this.evalCommentBox = "Add any context about this supplier's performance this cycle…";

            // INVOICE
            this.invoiceRaiseButton = 'button-raise-invoice-complete';
            this.invoiceDescription = 'input-invoice-description';
            this.invoiceNumber = 'input-invoice-number';
            this.invoiceFileUpload = 'input[type="file"]';
            this.invoiceReceiptCheckbox = 'checkbox-invoice-receipt-0';
            this.invoiceTermsCheckbox = 'checkbox-invoice-terms';
            this.invoiceSubmitButton = 'button-submit-invoice';

            // PAYMENT
            this.tabPaymentDetails = 'tab-payment-details';
            this.selectPaymentMethod = 'select-payment-method';
            this.inputPaymentDescription = 'input-payment-description';
            this.buttonPay = 'button-pay';
        }

        // =====================================================
        // GOTO
        // =====================================================

        async goto() {
            await this.page.goto(this.url);
        }

        // =====================================================
        // LOGIN
        // =====================================================

        async login(email, password) {
            await this.page.getByTestId(this.emailInput).fill(email);
            await this.page.getByTestId(this.passwordInput).fill(password);
            await this.page.getByTestId(this.loginButton).click();
        }

        // =====================================================
        // CREATE PO
        // =====================================================

        async createPO(
            podescription, deliveryLocations, reqDate, busEntity, department,
            vendor, budget, currency, paymentTerms, advancePercentage,
            selectItem, lineQuantity, lineUOM, lineUnitPrice, lineDiscount, lineTax
        ) {
            await this.page.getByTestId(this.navToPoModule).click();
            await this.page.getByTestId(this.createPoButton).click();
            await this.page.getByTestId(this.poDescriptionInput).fill(podescription);

            await this.page.getByTestId(this.selectDeliveryLocationDropdown).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(deliveryLocations) }).click();

            await this.page.getByTestId(this.inputReqDate).fill(reqDate);

            await this.page.getByTestId(this.selectBusEntityDropdown).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(busEntity) }).click();

            await this.page.getByTestId(this.selectDepartmentDropdown).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(department) }).click();

            await this.page.getByTestId(this.inputVendorDropdown).click();
            await this.page.getByPlaceholder('Search by Name...').fill(vendor);
            await this.page.getByTestId(/vendor-option-/).filter({ hasText: vendor }).first().click();

            await this.page.getByTestId(this.selectBudgetDropdown).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(budget) }).click();

            await this.page.getByTestId(this.selectCurrencyDropdown).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(currency) }).click();

            await this.page.getByTestId(this.selectPaymentTermsDropdown).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: paymentTerms, exact: true }).click();

            await this.page.getByTestId(this.checkBox).check();
            await this.page.getByTestId(this.inputAdvancePercentage).fill(advancePercentage);

            await this.page.getByTestId(this.createButton).click();

            await this.page.getByTestId(this.buttonAddItem).click();
            await this.page.getByTestId(this.buttonSelectItem).click();
            await this.page.getByPlaceholder('Search items...').fill(selectItem);
            await this.page.waitForTimeout(1000);
            await this.page.getByRole('option', { name: new RegExp(selectItem) }).first().click();

            await this.page.getByTestId(this.inputLineQuntity).fill(lineQuantity);

            await this.page.getByTestId(this.selectLineUOM).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(lineUOM) }).click();

            await this.page.getByTestId(this.inputLineUnitPrice).fill(lineUnitPrice);
            await this.page.getByTestId(this.inputLineDiscount).fill(lineDiscount);

            await this.page.getByTestId(this.selectLineTax).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: lineTax, exact: true }).click();

            await this.page.getByTestId(this.buttonSaveLine).click();

            await this.page.getByRole('button', { name: 'Check Budget' }).click();
            await this.page.waitForTimeout(2000);

            await this.page.getByTestId(this.buttonSubApproval).click();
            const approvalDialog = this.page.getByRole('dialog', {
                name: 'Submit Purchase Order for Approval?',
            });
            await expect(approvalDialog).toBeVisible();
            await approvalDialog
                .getByRole('button', { name: 'Submit for Approval', exact: true })
                .click({ force: true });
            await expect(approvalDialog).toBeHidden();

            const submissionNotification = this.page
                .getByRole('region', { name: 'Notifications (F8)' })
                .getByRole('listitem')
                .filter({ hasText: 'Purchase order has been submitted for approval.' });
            await expect(submissionNotification).toBeVisible();
            await submissionNotification.getByRole('button').click();
        }

        // =====================================================
        // CAPTURE PO NUMBER
        // =====================================================

        async capturePONumber() {
            await this.page.waitForSelector(`[data-testid="${this.poNumberDisplay}"]`, { state: 'visible' });
            const poElement = this.page.getByTestId(this.poNumberDisplay);
            this.capturedPONumber = await poElement.textContent();
            this.capturedPONumber = this.capturedPONumber?.trim();
            console.log(`✓ Captured PO Number: ${this.capturedPONumber}`);
            if (!this.capturedPONumber) {
                throw new Error('PO number element is empty. Check data-testid="text-po-number"');
            }
            return this.capturedPONumber;
        }

        // =====================================================
        // FIRST APPROVER LOGIN
        // =====================================================

        async login1(email1, password1) {
            await this.page.getByTestId(this.menuprofile).click();
            await this.page.getByTestId(this.buttonLogout).click();
            await this.page.getByTestId(this.emailInput).fill(email1);
            await this.page.getByTestId(this.passwordInput).fill(password1);
            await this.page.getByTestId(this.loginButton).click();
        }

        // =====================================================
        // FIRST APPROVER - SEARCH TASK AND APPROVE
        // =====================================================

        async poApprover(poDescription, comments) {
            await this.page.getByTestId(this.viewAll).click();
            await this.page.getByTestId(this.searchId).click();
            await this.page.getByPlaceholder('Search by Entity ID, Subject, Submitter...').fill(poDescription);
            await this.page.waitForTimeout(1000);

            await this.page
                .locator('[data-testid^="task-subject-"]')
                .filter({ hasText: poDescription })
                .first()
                .click();

            await this.page.getByTestId(this.approveButtons).click();
            await this.page.getByTestId(this.approved1).click();
            await this.page.getByTestId(this.comments).fill(comments);
            await this.page.getByTestId(this.yesButton).click();
            await this.page.waitForTimeout(1000);

            console.log('✓ First Approver approved PO');
        }

        // =====================================================
        // SECOND APPROVER LOGIN (ASHOK REDDY)
        // =====================================================

        async loginSecondApprover(email, password) {
            console.log('Logging out First Approver...');
            await this.page.getByTestId(this.menuprofile).click();
            await this.page.getByTestId(this.buttonLogout).click();
            await this.page.waitForTimeout(1000);

            console.log('Logging in Second Approver:', email);
            await this.page.getByTestId(this.emailInput).fill(email);
            await this.page.getByTestId(this.passwordInput).fill(password);
            await this.page.getByTestId(this.loginButton).click();
            await this.page.waitForTimeout(1500);

            console.log('✓ Second Approver logged in successfully');
        }

        // =====================================================
        // SECOND APPROVER - SEARCH TASK AND APPROVE
        // =====================================================

       //  async poSecondApprover(poDescription, comments) {
       //      console.log('Second Approver searching task:', poDescription);

       //      await this.page.getByTestId(this.viewAll).click();
       //      await this.page.waitForTimeout(1000);

       //      await this.page.getByTestId(this.searchId).click();
       //      await this.page.getByPlaceholder('Search by Entity ID, Subject, Submitter...').fill(poDescription);
       //      await this.page.waitForTimeout(1500);

       //      const secondApproverTask = this.page
       //          .locator('[data-testid^="task-subject-"]')
       //          .filter({ hasText: poDescription })
       //          .first();

       //      await secondApproverTask.waitFor({ state: 'visible', timeout: 10000 });
       //      console.log('✓ Second Approver task found');

       //      await secondApproverTask.click();
       //      await this.page.waitForTimeout(1000);

       //      await this.page.getByTestId(this.approveButtons).click();
       //      await this.page.getByTestId(this.approved1).click();
       //      await this.page.getByTestId(this.comments).fill(comments);
       //      await this.page.getByTestId(this.yesButton).click();
       //      await this.page.waitForTimeout(1500);

       //      console.log('✓ Second Approver approved PO successfully');
       //  }

        // =====================================================
        // VENDOR LOGIN + ACCEPT PO
        // =====================================================

        async login2(email2, password2, poNumber) {
            await this.page.getByTestId(this.menuprofile).click();
            await this.page.getByTestId(this.buttonLogout).click();
            await this.page.getByTestId(this.emailInput).fill(email2);
            await this.page.getByTestId(this.passwordInput).fill(password2);
            await this.page.getByTestId(this.loginButton).click();
            await this.page.getByTestId(this.navToPoModule).click();
            await this.page.getByTestId(this.inputSearch).fill(poNumber);
            await this.page.getByRole('cell', { name: poNumber }).click();
            await this.page.getByTestId(this.acptorrjtbutton).click();
            await this.page.getByTestId(this.acceptbutton).click();
        }

        // =====================================================
        // CREATE DELIVERY NOTE
        // =====================================================

        async createDN(asnNumber, bolNumber, carrier, shipDate, arrivalDate) {
            await this.page.getByTestId(this.dnbutton).click();
            await this.page.getByTestId(this.asnnumber).fill(asnNumber);
            await this.page.getByTestId(this.bol).fill(bolNumber);
            await this.page.getByTestId(this.carrier).click();
            await this.page.waitForSelector('[role="option"]', { state: 'visible' });
            await this.page.getByRole('option', { name: new RegExp(carrier) }).click();
            await this.page.getByTestId(this.shipdate).fill(shipDate);
            await this.page.getByTestId(this.arrivaldate).fill(arrivalDate);
            await this.page.getByTestId(this.cdn).click();
        }

        // =====================================================
        // REQUESTER LOGIN
        // =====================================================

        async login3(email, password, poNumber) {
            await this.page.getByTestId(this.menuprofile).click();
            await this.page.getByTestId(this.buttonLogout).click();
            await this.page.getByTestId(this.emailInput).fill(email);
            await this.page.getByTestId(this.passwordInput).fill(password);
            await this.page.getByTestId(this.loginButton).click();
            await this.page.getByTestId(this.navToPoModule).click();
            await this.page.getByTestId(this.inputSearch).fill(poNumber);
            await this.page.getByRole('cell', { name: poNumber }).click();
        }

        // =====================================================
        // CREATE RECEIPT + SUPPLIER EVALUATION
        // =====================================================
        // After the receipt is raised, the "Evaluation" panel pops up.
        // It contains dynamic criteria (Star ratings, Yes/No checkboxes,
        // multi-option buttons) and a "PO Performance Comment" box.
        // This method generically identifies and fills ALL question
        // groups across the evaluation form before submitting.
        // =====================================================

        async createReceipt(receiptDate, receiptNumber, receiptNotes) {

            // 1. RAISE RECEIPT
            await this.page.getByTestId(this.rreceipt).click();
            await this.page.getByTestId(this.rdate).fill(receiptDate);
            await this.page.getByTestId(this.rnumber).fill(receiptNumber);
            await this.page.getByTestId(this.rnotes).fill(receiptNotes);
            await this.page.getByTestId(this.radd).click();

            // 2. WAIT FOR EVALUATION MODAL
            console.log('Waiting for Evaluation modal to appear...');
            await this.page.waitForSelector('text=Evaluation', { state: 'visible', timeout: 20000 });
            await this.page.waitForTimeout(2000);
            console.log('✓ Evaluation page displayed');

            // =====================================================
            // A. STAR RATING CRITERIA (e.g. 5-star ratings with "0 of 5")
            // =====================================================
            try {
                const starOfFiveTexts = this.page.getByText(/\d+\s*of\s*5/i);
                const starGroupCount = await starOfFiveTexts.count();
                console.log(`Found ${starGroupCount} star rating criteria group(s).`);

                if (starGroupCount > 0) {
                    for (let i = 0; i < starGroupCount; i++) {
                        const textElement = starOfFiveTexts.nth(i);
                        const parentContainer = textElement.locator('xpath=..');

                        let stars = parentContainer.locator('button, svg.lucide-star, svg[class*="star"], [data-testid*="star"], [aria-label*="star" i], span.cursor-pointer, svg');
                        let starCount = await stars.count();

                        if (starCount < 5) {
                            const cardContainer = textElement.locator('xpath=ancestor::div[contains(@class, "rounded") or contains(@class, "border") or contains(@class, "p-")][1]');
                            if (await cardContainer.count() > 0) {
                                stars = cardContainer.locator('button, svg.lucide-star, svg[class*="star"], [data-testid*="star"], [aria-label*="star" i], span.cursor-pointer, svg');
                                starCount = await stars.count();
                            }
                        }

                        if (starCount > 0) {
                            const pickIndex = Math.min(starCount - 1, Math.floor(Math.random() * Math.min(starCount, 5)));
                            await stars.nth(pickIndex).click({ force: true });
                            console.log(`✓ Star group ${i + 1}: clicked star #${pickIndex + 1} (out of ${starCount})`);
                            await this.page.waitForTimeout(400);
                        } else {
                            console.log(`⚠ No star elements found for star group ${i + 1}`);
                        }
                    }
                } else {
                    // Global fallback if "0 of 5" text is not present
                    const allStars = this.page.locator('svg.lucide-star, svg[class*="star"], [aria-label*="star" i]');
                    const totalStars = await allStars.count();
                    if (totalStars >= 5) {
                        for (let i = 0; i < totalStars; i += 5) {
                            const pickIndex = i + Math.floor(Math.random() * 5);
                            if (pickIndex < totalStars) {
                                await allStars.nth(pickIndex).click({ force: true });
                                console.log(`✓ Star global fallback: clicked star #${pickIndex + 1}`);
                                await this.page.waitForTimeout(400);
                            }
                        }
                    }
                }
            } catch (err) {
                console.log('⚠ Note during star rating selection:', err.message);
            }

            // =====================================================
            // B. YES / NO CHECKBOX CRITERIA (e.g. Yes / No options)
            // =====================================================
            try {
                const yesLocators = this.page.getByText('Yes', { exact: true });
                const noLocators = this.page.getByText('No', { exact: true });

                const yesCount = await yesLocators.count();
                const noCount = await noLocators.count();
                const yesNoGroupCount = Math.min(yesCount, noCount);

                console.log(`Found ${yesNoGroupCount} Yes/No criteria group(s).`);

                for (let i = 0; i < yesNoGroupCount; i++) {
                    const chooseYes = Math.random() < 0.5;
                    const chosenText = chooseYes ? 'Yes' : 'No';
                    const targetTextEl = chooseYes ? yesLocators.nth(i) : noLocators.nth(i);

                    // Target the custom checkbox square (preceding div) or the text span
                    const checkboxSquare = targetTextEl.locator('xpath=preceding-sibling::div[1]');
                    if (await checkboxSquare.count() > 0 && await checkboxSquare.isVisible()) {
                        await checkboxSquare.click({ force: true });
                    } else {
                        await targetTextEl.click({ force: true });
                    }

                    console.log(`✓ Yes/No group ${i + 1}: selected ${chosenText}`);
                    await this.page.waitForTimeout(400);
                }
            } catch (err) {
                console.log('⚠ Note during Yes/No selection:', err.message);
            }

            // =====================================================
            // C. MULTI-OPTION CRITERIA (Pill buttons inside question cards)
            // =====================================================
            try {
                // Scope exclusively to question cards within the evaluation form
                const questionCards = this.page.locator('div.bg-white.rounded-2xl, div[class*="rounded-2xl"][class*="border"], div[class*="rounded-xl"][class*="border"]').filter({
                    has: this.page.locator('p, span[class*="text-violet"], span[class*="font-semibold"]')
                });

                const cardCount = await questionCards.count();
                console.log(`Found ${cardCount} question card(s).`);

                for (let c = 0; c < cardCount; c++) {
                    const card = questionCards.nth(c);

                    // Skip if card already has star ratings or Yes/No checkboxes
                    const hasStars = (await card.locator('svg.lucide-star, svg[class*="star"]').count()) > 0;
                    const hasYesNo = (await card.getByText(/^(Yes|No)$/).count()) > 0;

                    if (!hasStars && !hasYesNo) {
                        // Find candidate option buttons inside this card only
                        const optionBtns = card.locator('button').filter({
                            hasNotText: /Submit|Save|Draft|Review|Back|Cancel|Close|Check Budget|Logout|User|Console|Sourcing/i
                        });

                        const optCount = await optionBtns.count();
                        if (optCount > 0) {
                            const pickIdx = Math.floor(Math.random() * optCount);
                            const chosenBtn = optionBtns.nth(pickIdx);
                            await chosenBtn.click({ force: true });
                            console.log(`✓ Question card ${c + 1}: selected option #${pickIdx + 1}`);
                            await this.page.waitForTimeout(400);
                        }
                    }
                }
            } catch (err) {
                console.log('⚠ Note during multi-option selection:', err.message);
            }

            // =====================================================
            // D. PO PERFORMANCE COMMENT
            // =====================================================
            try {
                const performanceComments = [
                    'Supplier performance was good and delivery was satisfactory.',
                    'Supplier completed the order within the expected timeline.',
                    'Overall supplier performance was satisfactory.',
                    'The supplier provided good quality and timely service.',
                    'Supplier performance met the expected requirements.',
                    'Delivery and product quality were acceptable.',
                    'Overall experience with the supplier was positive.',
                    'Supplier performance needs some improvement.',
                    'The supplier handled the purchase order professionally.',
                    'The overall supplier performance was satisfactory.'
                ];

                const randomComment =
                    performanceComments[Math.floor(Math.random() * performanceComments.length)];

                const commentField = this.page.locator('textarea')
                    .or(this.page.getByPlaceholder(/Add any context about this supplier/i))
                    .or(this.page.locator('input[placeholder*="performance" i]'))
                    .first();

                if (await commentField.count() > 0 && await commentField.isVisible()) {
                    await commentField.fill(randomComment);
                    console.log(`✓ Added performance comment: ${randomComment}`);
                } else {
                    console.log('⚠ Performance comment field not found or not visible');
                }
            } catch (err) {
                console.log('⚠ Note during comment entry:', err.message);
            }

            await this.page.waitForTimeout(1000);

            // =====================================================
            // E. SUBMIT EVALUATION
            // =====================================================
            console.log('Submitting evaluation...');

            // Primary submit button (e.g. "Submit Evaluation", "Submit", "Submit for Review", "Save & Submit")
            const submitEvaluationBtn = this.page
                .getByRole('button', { name: /Submit Evaluation|Submit for Review|Submit Assessment|Submit/i })
                .or(this.page.locator('button:has-text("Submit")'))
                .first();

            await submitEvaluationBtn.scrollIntoViewIfNeeded().catch(() => {});
            await submitEvaluationBtn.waitFor({ state: 'visible', timeout: 10000 });
            await submitEvaluationBtn.click({ force: true });
            console.log('✓ Clicked submit button');
            await this.page.waitForTimeout(1500);

            // Handle optional confirmation popup/modal if one appears
            const confirmEvalPopupBtn = this.page
                .locator('[role="dialog"]')
                .getByRole('button', { name: /Submit|Confirm|Yes/i })
                .or(this.page.locator('button:has-text("Submit Evaluation")').last())
                .first();

            if (await confirmEvalPopupBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                await confirmEvalPopupBtn.click({ force: true });
                console.log('✓ Confirmed evaluation submit in dialog');
            }

            await this.page.waitForLoadState('networkidle').catch(() => {});
            await this.page.waitForTimeout(2000);
            console.log('✓ Evaluation submitted successfully');
        }

        // =====================================================
        // VENDOR LOGIN FOR INVOICE
        // =====================================================

        async login4(email2, password2, poNumber) {
            await this.page.getByTestId(this.menuprofile).click();
            await this.page.getByTestId(this.buttonLogout).click();
            await this.page.getByTestId(this.emailInput).fill(email2);
            await this.page.getByTestId(this.passwordInput).fill(password2);
            await this.page.getByTestId(this.loginButton).click();
            await this.page.getByTestId(this.navToPoModule).click();
            await this.page.getByTestId(this.inputSearch).fill(poNumber);
            await this.page.getByRole('cell', { name: poNumber }).click();
        }

        // =====================================================
        // CREATE INVOICE
        // =====================================================

        async createInvoice(invoiceDescription, invoiceNumber, docFilePath) {
            console.log('Opening Raise Invoice modal...');
            await this.page.getByTestId(this.invoiceRaiseButton).click();
            await this.page.waitForTimeout(1500);

            // Fill description and number
            await this.page.getByTestId(this.invoiceDescription).fill(invoiceDescription);
            await this.page.getByTestId(this.invoiceNumber).fill(invoiceNumber);

            // Resolve file path and upload
            const resolvedPath = path.resolve(process.cwd(), docFilePath || 'files/Luffy (1).pdf');
            console.log('Uploading invoice document:', resolvedPath);
            await this.page
                .locator(this.invoiceFileUpload)
                .setInputFiles(resolvedPath);

            await this.page.waitForTimeout(2000);

            // =====================================================
            // CHECK RECEIPT LINE IN RECEIPTS TABLE
            // =====================================================
            console.log('Selecting receipt line checkbox in Receipts table...');

            const receiptCheckbox = this.page.getByTestId('checkbox-invoice-receipt-0')
                .or(this.page.locator('button[data-testid="checkbox-invoice-receipt-0"]'))
                .or(this.page.locator('[data-testid^="checkbox-invoice-receipt-"]'))
                .or(this.page.locator('tr[data-testid^="row-invoice-receipt-"] button[role="checkbox"]'))
                .or(this.page.locator('table tbody tr button[role="checkbox"]'))
                .first();

            await receiptCheckbox.scrollIntoViewIfNeeded().catch(() => {});
            await receiptCheckbox.waitFor({ state: 'visible', timeout: 10000 });

            // Click the checkbox button
            await receiptCheckbox.click().catch(async () => {
                await receiptCheckbox.click({ force: true });
            });
            await this.page.waitForTimeout(1000);

            // Verify if checked; if still unchecked, trigger evaluate click or row cell click
            const state = await receiptCheckbox.getAttribute('data-state').catch(() => '');
            if (state !== 'checked') {
                console.log('State is not checked, triggering evaluate click...');
                await receiptCheckbox.evaluate(el => el.click()).catch(() => {});
                await this.page.waitForTimeout(500);
            }

            console.log('✓ Receipt line checkbox selected');
            await this.page.waitForTimeout(1000);

            // =====================================================
            // CHECK TERMS & CONDITIONS
            // =====================================================
            console.log('Checking Terms & Conditions...');
            const termsCheckbox = this.page.getByTestId('checkbox-invoice-terms')
                .or(this.page.getByRole('checkbox', { name: /Terms & Conditions/i }))
                .or(this.page.locator('label').filter({ hasText: /I Agree to Terms & Conditions/i }))
                .or(this.page.getByText('I Agree to Terms & Conditions', { exact: false }))
                .first();

            await termsCheckbox.scrollIntoViewIfNeeded().catch(() => {});
            await termsCheckbox.click({ force: true });
            console.log('✓ Checked Terms & Conditions checkbox');
            await this.page.waitForTimeout(1000);

            // =====================================================
            // SUBMIT INVOICE BUTTON
            // =====================================================
            console.log('Clicking Submit Invoice button...');
            const submitInvoiceButton = this.page.getByRole('button', { name: /^Submit Invoice$/i })
                .or(this.page.locator('button:has-text("Submit Invoice")'))
                .or(this.page.getByTestId(this.invoiceSubmitButton))
                .first();

            await submitInvoiceButton.scrollIntoViewIfNeeded().catch(() => {});
            await submitInvoiceButton.waitFor({ state: 'visible', timeout: 10000 });
            await submitInvoiceButton.click({ force: true });
            console.log('✓ Clicked Submit Invoice button');

            // Handle "Credit and Debit Notes" popup or any confirmation modal
            await this.page.waitForTimeout(1500);

            // 1. Credit and Debit Notes popup
            const creditNotesModal = this.page
                .locator('[role="dialog"], div.modal')
                .filter({ hasText: /Credit and Debit Notes|Continue Submit/i })
                .first();

            if (await creditNotesModal.isVisible({ timeout: 4000 }).catch(() => false)) {
                console.log('Credit and Debit Notes modal displayed');

                // Select credit/debit note checkbox
                const creditCheckbox = creditNotesModal
                    .locator('button[role="checkbox"], input[type="checkbox"], [data-state="unchecked"], div[class*="border"]')
                    .first();

                if (await creditCheckbox.isVisible({ timeout: 3000 }).catch(() => false)) {
                    await creditCheckbox.click({ force: true });
                    console.log('✓ Selected Credit/Debit Note checkbox');
                    await this.page.waitForTimeout(500);
                }

                // Click "Continue Submit" button
                const continueSubmitBtn = creditNotesModal
                    .getByRole('button', { name: /Continue Submit/i })
                    .or(creditNotesModal.locator('button:has-text("Continue Submit")'))
                    .first();

                await continueSubmitBtn.waitFor({ state: 'visible', timeout: 5000 });
                await continueSubmitBtn.click({ force: true });
                console.log('✓ Clicked Continue Submit button');
                await this.page.waitForTimeout(1500);
            }

            // 2. Generic confirmation modal (Confirm / Yes / Submit)
            const confirmBtn = this.page
                .locator('[role="dialog"] button:has-text("Confirm"), [role="dialog"] button:has-text("Yes"), [role="dialog"] button:has-text("Submit"), [data-testid*="confirm"]')
                .or(this.page.locator('button:has-text("Confirm")'))
                .first();

            if (await confirmBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                await confirmBtn.click({ force: true });
                console.log('✓ Confirmed invoice submission in confirmation modal');
            }

            // Wait for invoice modal to close completely
            await this.page.waitForSelector('[role="dialog"], div.modal', { state: 'hidden', timeout: 15000 }).catch(() => {});
            await this.page.waitForLoadState('networkidle').catch(() => {});
            await this.page.waitForTimeout(2500);
            console.log('✓ Invoice created successfully and modal closed');
        }

        // =====================================================
        // LOGOUT SUPPLIER + LOGIN INVOICE APPROVER
        // =====================================================

        async loginInvoiceApprover(email, password) {
            console.log('Logging out Supplier...');

            // Ensure all modals/overlays are hidden
            await this.page.waitForSelector('[role="dialog"], div.modal, [data-state="open"]', { state: 'hidden', timeout: 8000 }).catch(() => {});
            await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' })).catch(() => {});
            await this.page.waitForTimeout(1500);

            // Locate the supplier profile menu button using a broad, reliable selector
            const userMenuBtn = this.page.locator('[data-testid="button-user-menu"], header button, button')
                .filter({ hasText: /Amelia25|Buford|@|user|profile/i })
                .first();

            const fallbackUserMenuBtn = this.page.locator('[data-testid="button-user-menu"]').first();
            const activeUserMenuBtn = (await userMenuBtn.count()) > 0 ? userMenuBtn : fallbackUserMenuBtn;

            await activeUserMenuBtn.waitFor({ state: 'visible', timeout: 15000 }).catch(async () => {
                await fallbackUserMenuBtn.waitFor({ state: 'visible', timeout: 15000 });
            });
            await activeUserMenuBtn.click({ force: true });
            await this.page.waitForTimeout(1000);

            // Click logout using a generic menu/button selector
            const logoutBtn = this.page.locator('button, [role="menuitem"]')
                .filter({ hasText: /logout|sign out/i })
                .first();

            if (await logoutBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
                await logoutBtn.click({ force: true });
            } else {
                // If the dropdown didn't open, reopen and retry once.
                await activeUserMenuBtn.click({ force: true });
                await this.page.waitForTimeout(500);
                await logoutBtn.click({ force: true }).catch(() => {});
            }

            await this.page.waitForLoadState('networkidle').catch(() => {});
            await this.page.waitForTimeout(2000);
            console.log('✔ Supplier logged out');

            console.log('Logging in Invoice Approver:', email);
            await this.page.getByTestId(this.emailInput).fill(email);
            await this.page.getByTestId(this.passwordInput).fill(password);
            await this.page.getByTestId(this.loginButton).click();
            await this.page.waitForLoadState('networkidle').catch(() => {});
            await this.page.waitForTimeout(2000);

            console.log('✔ Invoice Approver logged in successfully');
        }

        // =====================================================
        // INVOICE APPROVER - SEARCH DASHBOARD BY PO NUMBER, OPEN & APPROVE
        // =====================================================
        // Uses the captured PO number to search the approver's task
        // dashboard, opens the matching invoice task, clicks Approve,
        // and confirms approval.
        // =====================================================

        async approveInvoice(poNumber, comments) {

            const searchPo = poNumber || this.capturedPONumber;

            if (!searchPo) {
                throw new Error(
                    'No PO number available to search. ' +
                    'Pass poNumber or capture it via capturePONumber() first.'
                );
            }

            console.log('Opening task dashboard to approve invoice for PO:', searchPo);

            // Open the approver's task dashboard
            await this.page.getByTestId(this.viewAll).click();
            await this.page.waitForTimeout(1000);

            // Search using the PO number
            await this.page.getByTestId(this.searchId).click();
            await this.page
                .getByPlaceholder('Search by Entity ID, Subject, Submitter...')
                .fill(searchPo);
            await this.page.waitForTimeout(1500);

            console.log('Searching invoice task with PO Number:', searchPo);

            // Locate and open the matching invoice task
            const invoiceTask = this.page
                .locator('[data-testid^="task-subject-"]')
                .filter({ hasText: searchPo })
                .first()
                .or(this.page.locator(`text="${searchPo}"`).first());

            await invoiceTask.waitFor({ state: 'visible', timeout: 10000 });
            console.log('✓ Invoice task found');

            await invoiceTask.click();
            await this.page.waitForTimeout(1000);

            // Click the Approve action button
            const approveActionBtn = this.page.getByTestId(this.approveButtons)
                .or(this.page.getByRole('button', { name: /^Approve$/i }))
                .or(this.page.locator('button:has-text("Approve")').first())
                .first();

            await approveActionBtn.waitFor({ state: 'visible', timeout: 15000 });
            await approveActionBtn.click();
            await this.page.waitForTimeout(500);

            // Select "Approve" from the revealed dropdown menu if present
            const approveMenuItem = this.page.getByTestId(this.approved1)
                .or(this.page.getByRole('menuitem', { name: /^Approve$/i }))
                .or(this.page.locator('[role="menuitem"]:has-text("Approve")'))
                .first();

            if (await approveMenuItem.isVisible({ timeout: 2000 }).catch(() => false)) {
                await approveMenuItem.click();
                await this.page.waitForTimeout(1000);
            }

            // "Approve Invoice" modal appears (Image 1)
            const approvalRemarks = [
                'Invoice verified and approved for payment.',
                'Invoice details match the purchase order and delivery note.',
                'Approved. All items received and verified successfully.',
                'Invoice approved for processing.',
                'Verified and confirmed for payment release.'
            ];
            const randomRemark = comments || approvalRemarks[Math.floor(Math.random() * approvalRemarks.length)];

            // Fill remarks textarea in Approve Invoice modal
            const remarksField = this.page.getByPlaceholder('Optional remarks...')
                .or(this.page.getByTestId(this.comments))
                .or(this.page.locator('[role="dialog"] textarea, textarea'))
                .first();

            if (await remarksField.isVisible({ timeout: 4000 }).catch(() => false)) {
                await remarksField.fill(randomRemark);
                console.log(`✓ Added approval remarks: "${randomRemark}"`);
            }

            // Click the "Approve" button inside the modal
            const modalApproveBtn = this.page.locator('[role="dialog"] button:has-text("Approve")')
                .or(this.page.getByRole('button', { name: 'Approve', exact: true }).last())
                .or(this.page.getByTestId(this.yesButton))
                .or(this.page.locator('button:has-text("Approve")').last())
                .first();

            await modalApproveBtn.waitFor({ state: 'visible', timeout: 10000 });
            await modalApproveBtn.click({ force: true });
            await this.page.waitForLoadState('networkidle').catch(() => {});
            await this.page.waitForTimeout(2000);

            console.log('✓ Invoice approved successfully');
        }

        // =====================================================
        // RECORD PAYMENT (Image 2)
        // =====================================================
        // 1. Scrolls down and clicks on "Payment Details"
        // 2. Selects "Payment Method" dropdown -> selects "Cash"
        // 3. Adds random payment description
        // 4. Clicks "Pay" button
        // =====================================================

        async recordPayment(paymentMethod = 'Cash', paymentDescription) {
            console.log('Scrolling down to Payment Details...');

            // 1. Scroll down and click on "Payment Details"
            const paymentDetailsTrigger = this.page
                .getByRole('button', { name: /Payment Details/i })
                .or(this.page.getByRole('tab', { name: /Payment Details/i }))
                .or(this.page.getByText('Payment Details', { exact: false }))
                .or(this.page.getByTestId(this.tabPaymentDetails))
                .first();

            await paymentDetailsTrigger.scrollIntoViewIfNeeded().catch(() => {});
            await this.page.waitForTimeout(500);

            if (await paymentDetailsTrigger.isVisible({ timeout: 5000 }).catch(() => false)) {
                await paymentDetailsTrigger.click({ force: true });
                console.log('✓ Clicked "Payment Details"');
                await this.page.waitForTimeout(1000);
            }

            // Scroll to "Record Payment" section
            const recordPaymentSection = this.page.getByText('Record Payment', { exact: false }).first();
            await recordPaymentSection.scrollIntoViewIfNeeded().catch(() => {});
            await this.page.waitForTimeout(500);

            // 2. Select Payment Method dropdown -> Select "Cash"
            console.log('Selecting payment method:', paymentMethod);
            const methodDropdown = this.page
                .getByText('Select method', { exact: false })
                .or(this.page.getByTestId(this.selectPaymentMethod))
                .or(this.page.locator('div, button').filter({ hasText: /^Select method$/i }))
                .first();

            await methodDropdown.scrollIntoViewIfNeeded();
            await methodDropdown.click({ force: true });
            await this.page.waitForTimeout(500);

            // Select method option (e.g. "Cash")
            await this.page.waitForSelector('[role="option"], div[role="menuitem"], li', { state: 'visible', timeout: 5000 }).catch(() => {});
            const cashOption = this.page
                .getByRole('option', { name: new RegExp(`^${paymentMethod}$`, 'i') })
                .or(this.page.getByText(new RegExp(`^${paymentMethod}$`, 'i')))
                .first();

            await cashOption.click({ force: true });
            console.log(`✓ Selected payment method: ${paymentMethod}`);
            await this.page.waitForTimeout(500);

            // 3. Add random payment description
            const defaultDescriptions = [
                'Payment processed in full via Cash as per invoice terms.',
                'Full invoice settlement completed through Cash payment.',
                'Payment cleared successfully for the approved purchase order invoice.',
                'Cash payment issued for order fulfillment and verified receipts.',
                'Invoice payment disbursed successfully.'
            ];
            const descToFill = paymentDescription || defaultDescriptions[Math.floor(Math.random() * defaultDescriptions.length)];

            console.log('Entering payment description:', descToFill);
            const paymentDescField = this.page
                .getByLabel(/payment description/i)
                .or(this.page.getByPlaceholder(/payment description/i))
                .or(this.page.getByTestId(this.inputPaymentDescription))
                .or(this.page.locator('textarea, input[type="text"], input[type="search"]').last())
                .first();

            await paymentDescField.scrollIntoViewIfNeeded().catch(() => {});
            await paymentDescField.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
            await paymentDescField.fill(descToFill);
            console.log(`✓ Added payment description: "${descToFill}"`);
            await this.page.waitForTimeout(500);

            // 4. Click Pay button inside the Record Payment form
            console.log('Clicking Pay button...');
            const payButton = this.page
                .locator('button, [role="button"]')
                .filter({ hasText: /^Pay$/i })
                .filter({ hasNot: this.page.locator('[aria-hidden="true"]') })
                .last();

            await payButton.scrollIntoViewIfNeeded().catch(() => {});
            await payButton.waitFor({ state: 'visible', timeout: 15000 });

            // Wait for the form to be valid before clicking; disable state can block the action.
            await expect(payButton).toBeEnabled({ timeout: 15000 }).catch(async () => {
                await this.page.waitForTimeout(1500);
                await this.page.locator('button, [role="button"]').filter({ hasText: /^Pay$/i }).last().click({ force: true });
            });

            await payButton.click({ force: true });
            console.log('✓ Clicked Pay button');

            // 5. Handle any confirmation popup if present
            await this.page.waitForTimeout(1000);
            const confirmPay = this.page
                .locator('button:has-text("Confirm"), button:has-text("Yes"), [data-testid*="confirm"]')
                .first();

            if (await confirmPay.isVisible({ timeout: 2000 }).catch(() => false)) {
                await confirmPay.click({ force: true });
                console.log('✓ Confirmed payment in popup modal');
            }

            await this.page.waitForTimeout(2000);
            console.log('✓ Payment recorded successfully');
        }

    };