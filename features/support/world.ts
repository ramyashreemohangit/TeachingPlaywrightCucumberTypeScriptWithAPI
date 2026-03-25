import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
//import type { APIRequestContext } from '@playwright/test';
import { UserManagementPage } from '../../pages/userManagement';
import { PIMPage } from '../../pages/pimPage';

// 1) Describe what's in "this" (the Scenario's backpack)
export interface CustomWorld extends World {
  //UI
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
  userManagementPage: UserManagementPage;
  pimPage: PIMPage;
}

class MyWorld extends World implements CustomWorld {
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  userManagementPage!: UserManagementPage;
  pimPage!: PIMPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

// 3) Tell Cucumber to use our Custom World
setWorldConstructor(MyWorld);