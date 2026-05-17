# challenge-coodesh-bianca.d
Desafio coodesh
# Automation Challenge — AutomationExercise.com

Projeto de automação de testes desenvolvido como parte de processo seletivo, cobrindo fluxos E2E e testes de API do site [automationexercise.com](https://automationexercise.com).

---

## Stack 

**Playwright + TypeScript**

- **Auto-wait nativo** — o Playwright aguarda automaticamente elementos ficarem visíveis, habilitados e estáveis antes de interagir. Isso elimina completamente a necessidade de `waitForTimeout()` ou esperas fixas
- **API testing integrado** — é possível testar endpoints REST no mesmo framework 
- **Locators inteligentes** — prioriza seletores por role, placeholder e atributos semânticos, que são mais estáveis que XPath ou CSS frágeis
- **TypeScript** — tipagem estática que torna o código mais seguro e autodocumentado, especialmente útil no POM onde os métodos públicos funcionam como contrato

---

## Arquitetura — Page Object Model (POM)

Cada página do sistema tem uma classe própria em `pages/`, responsável por:
- Declarar seus locators como **getters privados**
- Expor apenas métodos públicos com semântica de negócio (`fillAccountDetails`, `assertAccountCreated`)
- Manter os testes limpos

## Estrutura

pages/
├── HomePage.ts       → navegação principal
├── SignupPage.ts     → fluxo de cadastro (2 etapas)
├── ProductsPage.ts   → listagem e adição ao carrinho
└── CartPage.ts       → validação de quantidade e total
tests/
├── 01_registration.spec.ts   → Desafio 01
├── 02_cart.spec.ts           → Desafio 02
└── 03_api_products.spec.ts   → Desafio API
utils/
└── userFactory.ts    → geração de dados dinâmicos

---

### Desafio 01 — Registro E2E

- Dados gerados dinamicamente via `userFactory.ts` usando timestamp 
- Fluxo dividido em etapas com assertions intermediárias (`assertSignupFormVisible`, `assertAccountInfoFormVisible`) 
- Validação final via `getByRole('heading', { name: 'Account Created!' })` — locator semântico

### Desafio 02 — Manipulação de Inventário

- Adição em loop com hover para revelar o botão de adicionar ao carrinho, que só aparece no estado hover (comportamento real do site)
- `.first()` usado explicitamente no locator do botão pois o wrapper contém dois elementos `.add-to-cart` 
- Validação do total calculada em runtime: `total === preço unitário × quantidade`

### Desafio API — GET /api/productsList

- Usa `request.newContext()` do Playwright 
- Valida estrutura mínima de cada produto (`id`, `name`, `price`, `category`) além do status code, garantindo que a resposta contém dados válidos e não apenas um array vazio

---

## Como executar

```bash
npm install
npx playwright install chromium
npm test
```

### Scripts disponíveis

```bash
npm run test:registration   # Desafio 01
npm run test:cart           # Desafio 02
npm run test:api            # Desafio API
npm run test:report         # Abre relatório HTML
```