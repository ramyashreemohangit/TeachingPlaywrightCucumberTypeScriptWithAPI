import { Page, Locator, expect } from "@playwright/test";

let frameLocator:any;
export class IFramePage {
  readonly page: Page;

  constructor(page: Page) {
     this.page = page;
     }

  async navigate() {
    console.log(process.env.IFRAME_APPLICATION_URL);
    const url = process.env.IFRAME_APPLICATION_URL;
    if (!url) throw new Error('IFRAME_APPLICATION_URL is not set');
    await this.page.goto(url);
  }

  async clickPracticeLink() {
    await this.page.waitForSelector('[data-testid="iframe"]');


    console.log("======================INSIDE PAGE=========================");
    const countInsidePage = await this.page.locator('a[href*="practice"]').count();
    console.log('Practice links found:', countInsidePage);

    console.log("======================INSIDE IFRAME=======================");
    frameLocator = this.page.frameLocator('[data-testid="iframe"]');
    const countInsideIFrame = await frameLocator.locator('a[href*="practice"]').count();
    console.log('Practice links found:', countInsideIFrame);

    await this.page.waitForTimeout(5000);
    await frameLocator.locator('a[href*="practice"]').click();
  }

  async verifyPracticeLinkClickedInIFrame() {
    let iFrameHeading = await frameLocator.locator('div.container div p').nth(0).innerText();
    console.log("Heading inside iFrame:", iFrameHeading);
  }
}