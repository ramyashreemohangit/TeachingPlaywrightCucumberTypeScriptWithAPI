import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Given(/^user navigates to the application$/, async function (this: CustomWorld) {
    await this.loginPage.navigate();
})

When(/^user logs in$/, async function (this: CustomWorld) {
    await this.page.waitForTimeout(5000);
    await this.loginPage.login(process.env.TESTER_USERNAME!, process.env.TESTER_PASSWORD!);
})


Then(/^logout link should be visible$/, async function (this: CustomWorld) {
    await this.loginPage.logOutLinkVisibility();
})

When(/^user wants to upgrade$/, async function (this: CustomWorld) {
    await this.loginPage.upgrade();
})