import { BeforeAll, AfterAll, Before, After, AfterStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../../pages/loginPage';
import type { CustomWorld } from './world';
import { request } from '@playwright/test';
setDefaultTimeout(60 * 1000 * 2);
import { UserManagementPage } from '../../pages/userManagement';
import { PIMPage } from '../../pages/pimPage';
import { IFramePage } from '../../pages/iFramePage';
import { APIUtils } from '../../api/APIUtils';
import { ApiIntegrationWithUIPage } from '../../pages/ApiIntegrationWithUIPage';

dotenv.config();

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
  this.userManagementPage = new UserManagementPage(this.page);
  this.pimPage = new PIMPage(this.page);
  this.iFramePage = new IFramePage(this.page);
  this.apiIntegrationWithUIPage = new ApiIntegrationWithUIPage(this.page);

  console.log("BASE URL FOR API TESTING:", process.env.BASE_URL_API);
  //API
  this.loginApi = await request.newContext({
    baseURL: process.env.BASE_URL_API,
    extraHTTPHeaders: { 'Content-Type': 'application/json' }
  }); //----> THIS IS FOR API

//Login Payload
const loginPayload = {
  user: {
    email: process.env.TESTER_USERNAME_API!,
    password: process.env.TESTER_PASSWORD_API!
  }
};

// create APIUtils per scenario (like you do for LoginPage)
this.apiUtils = new APIUtils(this.loginApi, loginPayload);
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