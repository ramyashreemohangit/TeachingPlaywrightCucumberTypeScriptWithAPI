import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import searchUserTestData from '../../test-data/userManagementTestData/searchUser.json'
import { clickMenu } from '../support/utils';

Given('user clicks on {string} menu', async function (this: CustomWorld, menuName: string) {
    await this.page.waitForTimeout(5000);
    await clickMenu(this.page, menuName);
})

When('user searches for an existing employee', async function (this: CustomWorld) {
    await this.userManagementPage.searchEmployee(searchUserTestData);
})

Then('searched employee should be visible in the search result under {string} column', async function (this: CustomWorld, tableHeaderName: string) {
    await this.userManagementPage.verifyEmployeeVisible(searchUserTestData, tableHeaderName);
})

 When('user deletes an employee', async function (this: CustomWorld) {
    await this.userManagementPage.deleteUser();
 })

 Then('employee details should be deleted from the application', async function (this: CustomWorld) {
    await this.userManagementPage.verifyUserDeletion();
 })