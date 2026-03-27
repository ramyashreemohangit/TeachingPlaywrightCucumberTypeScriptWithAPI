import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { UserManagementPage } from '../../pages/userManagement';
import { PIMPage } from '../../pages/pimPage';
import { IFramePage } from '../../pages/iFramePage';
import type { APIRequestContext } from '@playwright/test';
import { APIUtils } from '../../api/APIUtils';
import { ApiIntegrationWithUIPage } from '../../pages/ApiIntegrationWithUIPage';

// 1) Describe what's in "this" (the Scenario's backpack)
export interface CustomWorld extends World {
  //UI
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
  userManagementPage: UserManagementPage;
  pimPage: PIMPage;
  iFramePage: IFramePage;
  apiIntegrationWithUIPage: ApiIntegrationWithUIPage;

  //API
  loginApi: APIRequestContext;
  apiUtils: APIUtils; 
  authToken?: string;
}

class MyWorld extends World implements CustomWorld {
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  userManagementPage!: UserManagementPage;
  pimPage!: PIMPage;
  iFramePage!: IFramePage;
  apiIntegrationWithUIPage!: ApiIntegrationWithUIPage;

  //API
  loginApi!: APIRequestContext;
  apiUtils!: APIUtils; 
  authToken?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

// 3) Tell Cucumber to use our Custom World
setWorldConstructor(MyWorld);