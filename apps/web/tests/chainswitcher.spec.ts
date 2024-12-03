import { test, expect } from '@playwright/test';

test.describe('network switch', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(
      'http://explorer.localhost:3000/klayr_mainchain?network=mainnet&app=klayr_mainchain',
    );
  });

  test('mainnet to testnet switch', async ({ page }) => {
    await page.getByText('Klayr', { exact: true }).click();
    await expect(page.getByRole('button', { name: 'icon Klayr' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'mainnet' })).toBeVisible();
    await expect(page.getByText('Select environments')).toBeVisible();
    await page.getByRole('button', { name: 'mainnet' }).click();
    await page.locator('li').filter({ hasText: 'testnet' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('div').filter({ hasText: /^Klayr$/ })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^testnet$/ })).toBeVisible();
  });

  test('klayr chain to PepeWorld chain switch', async ({ page }) => {
    await page.getByText('mainnetKlayr').click();
    await page.getByRole('button', { name: 'mainnet' }).click();
    await page.locator('li').filter({ hasText: 'testnet' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('testnet')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Klayr$/ })).toBeVisible();
    await page.getByText('testnetKlayr').click();
    await page.getByRole('button', { name: 'icon Klayr' }).click();
    await page.locator('li').filter({ hasText: 'PepeWorld' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('div').filter({ hasText: /^PepeWorld$/ })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^testnet$/ })).toBeVisible();
  });

  test('PepeWorld chain to mainnet chain switch', async ({ page }) => {
    await page.getByText('mainnetKlayr').click();
    await expect(page.getByText('Select environments')).toBeVisible();
    await page.getByRole('button', { name: 'icon Klayr' }).click();
    await page.getByRole('button', { name: 'mainnet' }).click();
    await page.locator('li').filter({ hasText: 'testnet' }).click();
    await page.getByRole('button', { name: 'icon Klayr' }).click();
    await page.locator('li').filter({ hasText: 'PepeWorld' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('div').filter({ hasText: /^PepeWorld$/ })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^testnet$/ })).toBeVisible();
    await page.getByText('testnet').click();
    await page.getByRole('button', { name: 'testnet' }).click();
    await page.getByText('mainnet').click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('mainnetKlayr')).toBeVisible();
  });
});
