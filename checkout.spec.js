// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Test Suite: Coș și Checkout', () => {

  test('Adăugare produse în coș și verificare badge', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
  });

  test('Flux complet E2E Checkout și plasare comandă', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await page.locator('[data-test="checkout"]').click();

    await page.getByPlaceholder('First Name').fill('Daniela');
    await page.getByPlaceholder('Last Name').fill('Caraman');
    await page.getByPlaceholder('Zip/Postal Code').fill('2001');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  });

});