import { Page, Locator, expect } from "@playwright/test";

export class UserManagementPage {
  readonly page: Page;
  readonly adminMenu: Locator;

  constructor(page: Page) {
     this.page = page;
     this.adminMenu = page.locator('a[href*="admin/viewAdminModule"]');
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

  async searchEmployee(employeeName: string) {

  }

}