import { BeforeAll, AfterAll, Before, After, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../../pages/loginPage';
import type { CustomWorld } from './world';
import { request } from '@playwright/test';
setDefaultTimeout(60 * 1000 * 2);

dotenv.config();

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
});

After(async function (this: CustomWorld, { result, pickle }) {
  if (result?.status === Status.FAILED && this.page) {
    const img = await this.page.screenshot({
      path: `./test-result/screenshots/${pickle.name}.png`,
      type: 'png'
    });
    await this.attach(img, 'image/png');
    console.log('Screenshot logged');
  }
  if (this.context) {
    await this.context.close();
  }
});

AfterAll(async () => {
  await browser.close();
});