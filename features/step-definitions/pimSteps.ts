import {When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

When(/^user adds an employee$/, async function (this: CustomWorld) {
    await this.pimPage.addEmployee();
})

Then(/^new employee details should be added to the application$/, async function (this: CustomWorld) {
    await this.pimPage.verifyNewlyAddedEmployeeDetails();
})

When(/^user enters their personal details$/, async function (this: CustomWorld) {
    await this.pimPage.enterPersonalDetails();
})

When(/^user clicks on "Save" button$/, async function (this: CustomWorld) {
    await this.pimPage.saveButton();
})
Then(/^personal details of employee should be saved in the application$/, async function (this: CustomWorld) {
    await this.pimPage.performRefresh();
})