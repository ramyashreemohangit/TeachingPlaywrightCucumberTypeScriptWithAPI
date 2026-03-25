import { Page } from '@playwright/test';

export async function clickMenu(page: Page, menuName: string) {
  switch(menuName.toLowerCase()) {
    case "admin":
     await page.locator('a[href*="admin/viewAdminModule"]').click();
      break;
    case "pim":
     await page.locator('a[href*="pim/viewPimModule"]').click();
      break;
    default:
      throw new Error(`Menu with name ${menuName} not found`);
  }
}