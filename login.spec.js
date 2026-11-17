// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Test Suite: Autentificare SauceDemo', () => {
  
  test('Autentificare cu succes cu user valid', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('Autentificare eșuată cu parolă greșită', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('parola_gresita');
    await page.getByRole('button', { name: 'Login' }).click();

    // Folosim waitFor pentru a lăsa Firefox să randeze mesajul de eroare
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Încercare de login cu utilizator blocat (locked_out_user)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

});