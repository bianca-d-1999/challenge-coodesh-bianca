import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  private get productsHeading() { return this.page.getByRole('heading', { name: 'All Products' }); }
  private get firstProduct() { return this.page.locator('.product-image-wrapper').first(); }
  private get continueShoppingButton() { return this.page.getByRole('button', { name: 'Continue Shopping' }); }
  private get viewCartLink() { return this.page.getByRole('link', { name: 'View Cart' }); }

  async assertPageLoaded() {
    await expect(this.productsHeading).toBeVisible();
  }

  async addFirstProductNTimes(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.firstProduct.hover();
      const addBtn = this.firstProduct.locator('.add-to-cart').first();
      await addBtn.click();

      if (i < quantity - 1) {
        await this.continueShoppingButton.waitFor({ state: 'visible' });
        await this.continueShoppingButton.click();
      }
    }
  }

  async goToCart() {
    await this.viewCartLink.click();
  }
}