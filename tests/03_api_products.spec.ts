import { test, expect, request } from '@playwright/test';

test.describe('Desafio API - GET /api/productsList', () => {
  test('deve retornar status 200 e lista de produtos não nula', async () => {
    // Cria contexto de API isolado (sem browser)
    const apiContext = await request.newContext({
      baseURL: 'https://automationexercise.com',
    });

    const response = await apiContext.get('/api/productsList');

    // 1. Validar Status Code 200
    expect(response.status()).toBe(200);

    // 2. Parsear body como JSON
    const body = await response.json();

    // 3. Validar que o campo responseCode é 200
    expect(body.responseCode).toBe(200);

    // 4. Validar que a lista de produtos existe e não é nula/vazia
    expect(body.products).toBeDefined();
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    // 5. Validar estrutura mínima de cada produto
    for (const product of body.products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
    }

    await apiContext.dispose();
  });
});
