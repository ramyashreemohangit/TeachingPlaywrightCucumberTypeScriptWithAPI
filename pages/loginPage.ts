import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly logInLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardText: Locator;
  readonly loginTitle : Locator;

  constructor(page: Page) {
     this.page = page;
     this.logInLink = page.locator("a[class='ico-login']");
     this.emailInput = page.locator('input[placeholder="Username"]');
     this.passwordInput = page.locator('input[placeholder="Password"]');
     this.loginButton = page.getByRole('button', { name: 'Login' });
     this.dashboardText = page.getByRole('heading', { name: 'Dashboard' });
     this.loginTitle = page.locator('h5[class*="orangehrm-login-title"]');
  }

  async navigate() {
    console.log(process.env.APPLICATION_URL);
    const url = process.env.APPLICATION_URL;
    if (!url) throw new Error('APPLICATION_URL is not set');
    await this.page.goto(url);
    //await this.page.waitForSelector('h5[class*="orangehrm-login-title"]');
    await expect(this.loginTitle).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await Promise.all([
        this.loginButton.click(),
        this.dashboardText.waitFor({ state: 'visible' })
    ]);
    const result = await this.dashboardText.isVisible();
    console.log("RESULT IS "+result);
    await expect(this.dashboardText).toBeVisible();
  }
}