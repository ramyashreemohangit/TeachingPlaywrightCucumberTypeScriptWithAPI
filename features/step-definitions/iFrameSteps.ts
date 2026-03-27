import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

Given(/^user navigates to the application having iFrame component$/, async function (this: CustomWorld) {
    await this.iFramePage.navigate();
})

When(/^user clicks on "Practice" link$/, async function (this: CustomWorld) {
    await this.iFramePage.clickPracticeLink();
});

Then(/^"Practice" link inside iFrame should be clicked successfully$/, async function (this: CustomWorld) {
    await this.iFramePage.verifyPracticeLinkClickedInIFrame();
});