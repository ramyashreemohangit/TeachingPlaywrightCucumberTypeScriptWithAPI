import { When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';

// Import the article payload JSON.
import articlePayload from '../../test-data/articlePayload.json';

let response :any = {};

When(/^the user logs in via API with valid credentials and creates an article$/, async function (this: CustomWorld) {
    console.log("INSIDE STEP DEFINITION API loginViaApiSteps.ts");
    response= await this.apiUtils.createArticle(articlePayload);
    this.authToken = response.token;
  });

Then(/^the article should be created successfully$/, async function (this: CustomWorld) {
    const url = process.env.APPLICATION_URL_UI!;

    console.log("==================AUTH TOKEN IS===================");
    console.log(this.authToken);

    if (!this.authToken) {
        throw new Error('Auth token is missing');
    }

    // Go to app first
    await this.page.goto(url);

    // Inject token into localStorage
    await this.page.evaluate((token) => {
    window.localStorage.setItem('jwtToken', token);
    }, this.authToken);

    //Reload page to apply auth
    await this.page.reload();
   
    await this.page.pause();

    await this.apiIntegrationWithUIPage.verifyArticleCreation(articlePayload);
})