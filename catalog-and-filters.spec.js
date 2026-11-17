// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Test Suite: Catalog, Sortare și Gestionare Coș', () => {

  test('6. Sortarea produselor după preț (Low to High)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Selectăm opțiunea de sortare preț crescător
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    // Verificăm că primul produs din listă este cel mai ieftin (Sauce Labs Onesie)
    const firstProductPrice = page.locator('.inventory_item_price').first();
    await expect(firstProductPrice).toHaveText('$7.99');
  });

  test('7. Ștergerea unui produs din coș', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Adăugăm produsul și apoi îl scoatem
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    // Verificăm că badge-ul a disparut (coșul e gol)
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });

  test('8. Navigare pe pagina de detalii a unui produs (PDP)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Dăm click pe titlul produsului Backpack
    await page.getByText('Sauce Labs Backpack').click();
    
    // Verificăm că am ajuns pe pagina de detalii și vedem butonul de Back
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });

  test('9. Test negativ: Continuare în checkout fără First Name', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Adăugăm în coș și mergem la checkout
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Lăsăm First Name gol și apăsăm Continue direct
    await page.locator('[data-test="continue"]').click();

    // Verificăm mesajul de eroare specific
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
  });

  test('10. Resetarea stării aplicației din meniul lateral', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Adăugăm un produs în coș
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Deschidem meniul lateral și dăm click pe Reset App State
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="reset-sidebar-link"]').click();

    // Verificăm că coșul s-a golit
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  });

});