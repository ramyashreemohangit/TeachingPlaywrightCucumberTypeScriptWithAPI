import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Given('user clicks on {string} menu', async function (this: CustomWorld, menuName: string) {
    await this.page.waitForTimeout(5000);
    await this.userManagementPage.clickMenu(menuName);
    
})




 ///And user searches for an existing employee
//Then searched employee should be visible in the search result


//await this.userManagementPage.searchEmployee(menuName);