import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
//import type { APIRequestContext } from '@playwright/test';

// 1) Describe what's in "this" (the Scenario's backpack)
export interface CustomWorld extends World {
  //UI
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
}

class MyWorld extends World implements CustomWorld {
  context!: BrowserContext;
  page!: Page;
 loginPage!: LoginPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

// 3) Tell Cucumber to use our Custom World
setWorldConstructor(MyWorld);