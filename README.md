# SQA 19 — Demo Web Shop Automation & API Testing

**Student:** Tusher Dhali  
**Website:** https://demowebshop.tricentis.com/  
**API:** https://jsonplaceholder.typicode.com/users

Playwright + Page Object Model (UI) and Postman/Newman (API).

## Tech stack

- Node.js + JavaScript
- Playwright Test + POM
- Allure + HTML reporters (screenshots attached)
- Postman Collection + Newman CLI
- dotenv for `BASE_URL`

## Folder structure

```text
SQA19_DemoWebShop/
├── pages/                 # Page Object Model
├── tests/                 # Q1, Q2, Q3 UI specs
├── utils/                 # Shared test data helpers
├── api-tests/             # Postman collection + Newman docs
├── screenshots/           # Captured screenshots
├── playwright.config.js
├── package.json
└── README.md
```

## Setup

```bash
cd ~/Desktop/SQA_AUTOMATION/SQA19_DemoWebShop
npm install
npx playwright install chromium
cp .env.example .env
```

Optional (Allure CLI): install Java + `allure-commandline`, then use generate/open scripts below.

## Run UI scenarios

```bash
# Q1 — Invalid login
npm run test:q1

# Q2 — Register + add to cart
npm run test:q2

# Q3 — Search → checkout → order details (E2E)
npm run test:q3

# All UI tests sequentially
npm run test:ui
```

## Run API suite

```bash
npm run test:api
```

## Run everything (UI + API)

```bash
npm run test:all
```

## Reports

After any Playwright run:

```bash
# HTML report
npm run report

# Allure (requires allure CLI)
npm run allure:generate
npm run allure:open
```

Screenshots are attached to the HTML/Allure reports and also saved under `screenshots/`.

## Git workflow (Part B)

Branches used:

- `feature/q1-invalid-login`
- `feature/q2-register-cart`
- `feature/q3-e2e-checkout`
- `feature/api-tests`

Each question was developed on its own branch and merged into `main` with meaningful commits.
