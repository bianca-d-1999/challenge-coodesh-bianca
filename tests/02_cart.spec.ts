import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Desafio 02 - Manipulação de Inventário', () => {
  const QUANTITY = 4;

  test('deve adicionar 4 unidades ao carrinho e validar quantidade e valor total', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // 1. Navegar para a página de produtos
    await homePage.navigate();
    await homePage.goToProducts();
    await productsPage.assertPageLoaded();

    // 2. Adicionar o primeiro produto 4 vezes
    await productsPage.addFirstProductNTimes(QUANTITY);

    // 3. Ir para o carrinho
    await productsPage.goToCart();

    // 4. Validar quantidade no carrinho
    await cartPage.assertProductQuantity(QUANTITY);

    // 5. Validar que o total = preço unitário × quantidade
    await cartPage.assertProductTotal(QUANTITY);
  });
});
