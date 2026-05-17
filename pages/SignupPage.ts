import { Page, expect } from '@playwright/test';
import { UserData } from '../utils/userFactory';

export class SignupPage {
  constructor(private readonly page: Page) {}

  private get newUserSignupHeading() { return this.page.getByRole('heading', { name: 'New User Signup!' }); }
  private get nameInput() { return this.page.getByPlaceholder('Name'); }
  private get emailInput() { return this.page.locator('[data-qa="signup-email"]'); }
  private get signupButton() { return this.page.getByRole('button', { name: 'Signup' }); }
  private get accountInfoHeading() { return this.page.getByText('Enter Account Information'); }
  private get titleMrRadio() { return this.page.locator('#id_gender1'); }
  private get passwordInput() { return this.page.locator('#password'); }
  private get daySelect() { return this.page.locator('#days'); }
  private get monthSelect() { return this.page.locator('#months'); }
  private get yearSelect() { return this.page.locator('#years'); }
  private get firstNameInput() { return this.page.locator('#first_name'); }
  private get lastNameInput() { return this.page.locator('#last_name'); }
  private get companyInput() { return this.page.locator('#company'); }
  private get addressInput() { return this.page.locator('#address1'); }
  private get countrySelect() { return this.page.locator('#country'); }
  private get stateInput() { return this.page.locator('#state'); }
  private get cityInput() { return this.page.locator('#city'); }
  private get zipcodeInput() { return this.page.locator('#zipcode'); }
  private get mobileInput() { return this.page.locator('#mobile_number'); }
  private get createAccountButton() { return this.page.getByRole('button', { name: 'Create Account' }); }
  private get accountCreatedHeading() { return this.page.getByRole('heading', { name: 'Account Created!' }); }
  private get continueButton() { return this.page.getByRole('link', { name: 'Continue' }); }

  async assertSignupFormVisible() {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async fillSignupNameAndEmail(user: UserData) {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.signupButton.click();
  }

  async assertAccountInfoFormVisible() {
    await expect(this.accountInfoHeading).toBeVisible();
  }

  async fillAccountDetails(user: UserData) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(user.password);
    await this.daySelect.selectOption('15');
    await this.monthSelect.selectOption('6');
    await this.yearSelect.selectOption('1995');
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company);
    await this.addressInput.fill(user.address);
    await this.countrySelect.selectOption('India');
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileInput.fill(user.mobileNumber);
    await this.createAccountButton.click();
  }

  async assertAccountCreated() {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}