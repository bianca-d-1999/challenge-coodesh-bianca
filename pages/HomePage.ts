import { Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  private get signupLoginLink() { return this.page.getByRole('link', { name: 'Signup / Login' }); }
  private get navCartLink() { return this.page.getByRole('link', { name: ' Cart' }); }
  private get productsLink() { return this.page.getByRole('link', { name: ' Products' }); }

  async navigate() {
    await this.page.goto('/');
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async goToCart() {
    await this.navCartLink.click();
  }

  async goToProducts() {
    await this.productsLink.click();
  }
}