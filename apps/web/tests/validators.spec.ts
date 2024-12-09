import { test, expect } from '@playwright/test';

test.describe('Validators Table Rendering', () => {
  const tableSelector = 'table';
  const loaderSelector = '.loader';
  const columnHeaders = [
    'Validator',
    'Status',
    'Total blocks',
    'Validator weight',
    'Total stake',
    'Commission',
    'Total Rewards',
    'Block Rewards',
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto(
      'http://explorer.localhost:3000/klayr_mainchain/validators?network=mainnet&app=klayr_mainchain',
    );
  });

  test('Verify Validators header and URL', async ({ page }) => {
    // Verify that the Validators heading is visible
    await expect(page.getByRole('heading', { name: 'Validators' })).toBeVisible();

    // Verify that the URL contains 'validators'
    await expect(page).toHaveURL(/.*validators.*/);
  });

  test('Verify table data loads properly', async ({ page }) => {
    // Wait for the table to load
    await page.waitForSelector(tableSelector);

    // Check if all rows are displayed correctly after loading
    const rowCount = await page.locator(`${tableSelector} tbody tr`).count();
    expect(rowCount).toBeGreaterThan(0);

    // Verify the number of rows and columns
    const columnCount = await page.locator(`${tableSelector} thead th`).count();
    expect(columnCount).toBe(columnHeaders.length);
    await expect(page.locator(loaderSelector)).toHaveCount(0);
  });

  test('Verify column headers', async ({ page }) => {
    await page.waitForSelector(tableSelector);

    // Check if all column headers are rendered correctly
    for (let i = 0; i < columnHeaders.length; i++) {
      await expect(page.locator(`${tableSelector} thead th`).nth(i)).toHaveText(columnHeaders[i]);
    }
  });

  test('Tootlip visibility', async ({ page }) => {
    await page.waitForSelector(tableSelector);

    // Hover over the Validator weight column header
    await page.getByRole('cell', { name: 'Validator weight' }).getByRole('img').nth(1).hover();
    // Verify that the tooltip is visible
    await expect(
      page.getByRole('tooltip').locator('div').filter({ hasText: 'The total stake received by a' }),
    ).toBeVisible();
  });
});

test.describe('Validators Table Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      'http://explorer.localhost:3000/klayr_mainchain/validators?network=mainnet&app=klayr_mainchain',
    );
  });

  const checkSortingOrder = async (
    page: any,
    columnName: string,
    columnIndex: number,
  ): Promise<void> => {
    const getColumnValues = async (columnIndex: number): Promise<string[]> => {
      return await page.evaluate((columnIndex: number) => {
        return Array.from(
          document.querySelectorAll(`table tbody tr td:nth-child(${columnIndex})`),
        ).map((cell) => (cell.textContent ? cell.textContent.trim() : ''));
      }, columnIndex);
    };

    await page.waitForTimeout(1000);
    const initialOrder: string[] = await getColumnValues(columnIndex);
    console.log(`Initial Order for ${columnName}:`, initialOrder);

    try {
      await page.getByRole('cell', { name: columnName, exact: true }).getByRole('img').click();
    } catch (error) {
      console.log(`Direct click failed for ${columnName}, trying first image.`);
      await page
        .getByRole('cell', { name: columnName, exact: true })
        .getByRole('img')
        .first()
        .click();
    }

    await page.waitForTimeout(1000);
    const sortedOrder: string[] = await getColumnValues(columnIndex);
    console.log(`Sorted Order for ${columnName}:`, sortedOrder);

    expect(sortedOrder).not.toEqual(initialOrder);
  };

  test('Verify sorting functionality for Validator', async ({ page }) => {
    await checkSortingOrder(page, 'Validator', 1);
  });

  test('Verify sorting functionality for Status', async ({ page }) => {
    await checkSortingOrder(page, 'Status', 2);
  });

  test('Verify sorting functionality for Total blocks', async ({ page }) => {
    await checkSortingOrder(page, 'Total blocks', 3);
  });

  test('Verify sorting functionality for Validator weight', async ({ page }) => {
    await checkSortingOrder(page, 'Validator weight', 4);
  });

  test('Verify sorting functionality for Commission', async ({ page }) => {
    await checkSortingOrder(page, 'Commission', 6);
  });
});
