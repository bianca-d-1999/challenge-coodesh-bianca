import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private get cartRows() { return this.page.locator('#cart_info_table tbody tr'); }

  async assertProductQuantity(expectedQty: number) {
    const firstRow = this.cartRows.first();
    const quantityCell = firstRow.locator('.cart_quantity button');
    await expect(quantityCell).toHaveText(String(expectedQty));
  }

  async assertProductTotal(expectedQty: number) {
    const firstRow = this.cartRows.first();
    const priceText = await firstRow.locator('.cart_price p').innerText();
    const totalText = await firstRow.locator('.cart_total p').innerText();

    const unitPrice = parseFloat(priceText.replace(/[^\d]/g, ''));
    const total = parseFloat(totalText.replace(/[^\d]/g, ''));

    expect(total).toBe(unitPrice * expectedQty);
  }
}