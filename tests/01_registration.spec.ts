import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';
import { generateUser } from '../utils/userFactory';

test.describe('Desafio 01 - Registro E2E', () => {
  test('deve registrar novo usuário com dados dinâmicos e exibir "Account Created!"', async ({ page }) => {
    const user = generateUser();

    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    // 1. Navegar para home e ir para Signup
    await homePage.navigate();
    await homePage.goToSignupLogin();

    // 2. Verificar formulário de signup visível
    await signupPage.assertSignupFormVisible();

    // 3. Preencher nome e email e submeter
    await signupPage.fillSignupNameAndEmail(user);

    // 4. Verificar formulário de detalhes da conta
    await signupPage.assertAccountInfoFormVisible();

    // 5. Preencher dados completos da conta
    await signupPage.fillAccountDetails(user);

    // 6. Validar mensagem de sucesso "ACCOUNT CREATED!"
    await signupPage.assertAccountCreated();
  });
});
