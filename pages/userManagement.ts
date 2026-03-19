import { Page, Locator, expect } from "@playwright/test";

export class UserManagementPage {
  readonly page: Page;
  readonly adminMenu: Locator;
  readonly userNameField: Locator;
  readonly searchBtn: Locator;
  readonly table: Locator;
  readonly tableHeader: Locator;

  constructor(page: Page) {
     this.page = page;
     this.adminMenu = page.locator('a[href*="admin/viewAdminModule"]');
     this.userNameField = page.locator('div.oxd-form-row input[class*=oxd-input--active]');
     this.searchBtn = page.locator('button[type="Submit"]');
     this.table = page.locator('div.oxd-table');
     this.tableHeader = page.locator('div.oxd-table-header div[class*="oxd-table-th"]');
  }

  async clickMenu(menuName: string) {
    switch(menuName.toLowerCase()) {
        case "admin":
            await this.adminMenu.click();
            break;
        default:
            throw new Error(`Menu with name ${menuName} not found`);
    }
  }

  async searchEmployee(searchUserTestData: any) {
    await this.userNameField.fill(searchUserTestData.users[0].userName);
    await this.searchBtn.click();
  }

async verifyEmployeeVisible(searchUserTestData: any, tableHeaderName: string) {
  console.log("INSIDE THE TABLE METHOD");

  // Wait for the table body to be visible
  await this.page.locator('div.oxd-table-body').waitFor({ state: 'visible' });

  // Step 1: Find the index of the header column
  const headerCount = await this.tableHeader.count();
  let targetIndex = -1;

  for (let i = 0; i < headerCount; i++) {
    const headerText = (await this.tableHeader.nth(i).innerText()).trim();
    if (headerText.includes(tableHeaderName)) {
      targetIndex = i;
      break;
    }
  }

  console.log(`"${tableHeaderName}" column index = ${targetIndex}`);

  // Step 2: Loop through rows and check only that column
  const rows = this.page.locator('div.oxd-table-body div.oxd-table-row');
  const rowCount = await rows.count();
  console.log("TOTAL ROWS " + rowCount);

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const targetCell = row.getByRole('cell').nth(targetIndex);

    const cellText = (await targetCell.innerText()).trim();
    if (cellText === searchUserTestData.users[0].userName) {
      console.log(`Found "${cellText}" in Username column at row ${i}`);
      await expect(targetCell).toHaveText(searchUserTestData.users[0].userName);
    }
  }
}
}