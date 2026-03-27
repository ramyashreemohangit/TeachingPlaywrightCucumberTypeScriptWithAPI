import { Page, Locator, expect } from "@playwright/test";

export class ApiIntegrationWithUIPage {
  readonly page: Page;
  readonly articleName: Locator;

  constructor(page: Page) {
     this.page = page;
     this.articleName = page.locator("div.article-preview");
     }

  async verifyArticleCreation(articlePayload: any) {
    await this.page.waitForTimeout(2000);
    console.log("NEWLY CREATED ARTICLE IS");
    console.log(await this.articleName.nth(0).innerText());
    await expect(this.articleName.nth(0)).toContainText(articlePayload.article.title);
  }
}