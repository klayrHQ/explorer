import { test, expect } from '@playwright/test';

test.describe('MENU FUNCTIONALITY', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      'http://explorer.localhost:3000/klayr_mainchain?network=mainnet&app=klayr_mainchain',
    );
  });

  test('Text menu minimize function, when min only icons are shown', async ({ page }) => {
    //The icons should have text labels
    await expect(page.locator('span').filter({ hasText: 'Blockchain' }).first()).toBeVisible();
    //Click on the minimize button => only icons should be shown
    await page.getByLabel('Minimized sidebar').click();
    await expect(page.locator('span').filter({ hasText: 'Blockchain' }).first()).not.toBeVisible();
    //Click on the minimize button => text labels should be shown
    await page.getByLabel('Minimized sidebar').click();
    await expect(page.locator('span').filter({ hasText: 'Blockchain' }).first()).toBeVisible();
  });

  test('Text menu hover sub menu', async ({ page }) => {
    //Hover over the Blockchain menu item => Top Accounts link should be visible
    await page
      .locator('div')
      .filter({ hasText: /^Blockchain$/ })
      .hover();
    await expect(page.getByRole('link', { name: 'Top Accounts' })).toBeVisible();
    //Hover over the Stakes menu item => Top Accounts link should not be visible
    await page.getByRole('link', { name: 'Stakes' }).hover();
    await expect(page.getByRole('link', { name: 'Top Accounts' })).not.toBeVisible();
  });
});

test.describe('MENU NAVIGATION', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      'http://explorer.localhost:3000/klayr_mainchain?network=mainnet&app=klayr_mainchain',
    );
  });

  test('Navigation Dashboard from homepage page', async ({ page }) => {
    // Click on the Dashboard link from homepage => Nothing should happen
    await page.getByRole('link', { name: 'Dashboard' }).click();
    const currentURL = page.url();
    await expect(page).toHaveURL(currentURL);
  });

  test('Navigation to Dashboard page', async ({ page }) => {
    await page.goto(
      'http://explorer.localhost:3000/klayr_mainchain/chains?page=1&limit=10&network=mainnet&app=klayr_mainchain',
    );
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(
      'http://explorer.localhost:3000/klayr_mainchain?network=mainnet&app=klayr_mainchain',
    );
  });

  const menuItems = [
    { name: 'Transactions', url: /.*transactions.*/ },
    { name: 'Stakes', url: /.*stakes.*/ },
    { name: 'Chains', url: /.*chains.*/ },
    { name: 'NFTs', url: null }, // Special case for NFTs
  ];

  menuItems.forEach((item) => {
    if (item.url) {
      test(`Navigation to ${item.name} page`, async ({ page }) => {
        await page.getByRole('link', { name: item.name }).click();
        await expect(page.getByRole('heading', { name: item.name })).toBeVisible();
        await expect(page).toHaveURL(item.url);
      });
    } else {
      test(`Navigation to ${item.name} page won't work`, async ({ page }) => {
        const currentURL = page.url();
        await page.locator('span').filter({ hasText: item.name }).first().click();
        await expect(page).toHaveURL(currentURL);
      });
    }
  });

  const submenuItems = [
    { name: 'Top Accounts', url: /.*top-accounts.*/ },
    { name: 'Validators', url: /.*validators.*/ },
    { name: 'Blocks', url: /.*blocks.*/ },
    { name: 'Tokens', url: /.*tokens.*/ },
    { name: 'Nodes', url: /.*nodes.*/ },
  ];

  submenuItems.forEach((item) => {
    test(`Navigation to ${item.name} page`, async ({ page }) => {
      await page
        .locator('div')
        .filter({ hasText: /^Blockchain$/ })
        .hover();
      await page.getByRole('link', { name: item.name }).click();
      await expect(page.getByRole('heading', { name: item.name })).toBeVisible();
      await expect(page).toHaveURL(item.url);
    });
  });
});
