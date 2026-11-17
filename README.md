# SauceDemo Playwright Automation

This repository showcases a professional E2E and negative testing suite built with **Playwright** and **JavaScript** for the SauceDemo e-commerce platform, covering authentication, cart and checkout workflows, catalog sorting, and application state management.

---

## Test Suites Overview

| # | Test Suite | Target File | Key Testing Techniques & Scenarios |
| :- | :--- | :--- | :--- |
| 1 | **`Login Suite`** | `login.spec.js` | Successful authentication (`standard_user`), failed login with invalid password, locked-out user validation (`locked_out_user`) |
| 2 | **`Cart & Checkout Suite`** | `checkout.spec.js` | Adding products to cart, badge count verification (`2`), complete E2E checkout workflow, subtotal validation, and order confirmation |
| 3 | **`Catalog & Filters Suite`** | `catalog-and-filters.spec.js` | Product sorting (`Price: Low to High`), removing items from cart, PDP navigation, negative checkout test (`Missing First Name`), and app state reset |

---

## Detailed Breakdown

### 1. Login Suite (`login.spec.js`)
A focused authentication test suite verifying access control and error handling:
- **Successful Authentication:** Validates standard user login and successful redirection to the inventory page (`/inventory.html`).
- **Negative Authentication:** Ensures the expected error message appears when an invalid password is provided.
- **Locked-Out Validation:** Confirms that `locked_out_user` is blocked with the expected error message.

### 2. Cart & Checkout Suite (`checkout.spec.js`)
A comprehensive workflow testing the core e-commerce purchasing journey:
- **Cart Management:** Adds multiple products and verifies that the shopping cart badge updates correctly.
- **End-to-End Checkout Flow:** Automates filling customer details (`First Name`, `Last Name`, `Zip/Postal Code`), reviewing the item total (`$39.98`), and placing an order through to the confirmation message.

### 3. Catalog & Filters Suite (`catalog-and-filters.spec.js`)
A suite validating sorting, navigation, negative inputs, and application state controls:
- **Product Sorting:** Switches sorting to `Price: Low to High` and verifies the cheapest product (`$7.99`) appears first.
- **Item Removal:** Adds a product to the cart, removes it, and verifies the cart badge disappears.
- **PDP Navigation:** Opens a product detail page and verifies the `Back to products` button is visible.
- **Negative Form Validation:** Tests checkout continuation with a missing mandatory field (`First Name`) and verifies the specific error message.
- **State Reset:** Uses the sidebar menu (`Reset App State`) and verifies the cart is emptied.

---

## Tech Stack
- **Framework:** Playwright (`@playwright/test`)
- **Language:** JavaScript
- **Browsers:** Chromium, Firefox, WebKit

---

## Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)

---

## How to Run Locally

1. **Clone or download** this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
4. **Run tests:**
   - Run all tests across all browsers:
     ```bash
     npx playwright test
     ```
   - Run tests in Headed mode (visible browser):
     ```bash
     npx playwright test --headed
     ```
   - Run tests on a specific browser (e.g., Chromium):
     ```bash
     npx playwright test --project=chromium --headed
     ```
   - Run tests using Playwright UI Mode (Interactive):
     ```bash
     npx playwright test --ui
     ```
5. **View the HTML report:**
   ```bash
   npx playwright show-report
   ```
