import type { APIRequestContext } from '@playwright/test';

export interface LoginPayload {
  user: {
    email: string;
    password: string;
  };
}

export interface ArticlePayload {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export class APIUtils {
    readonly apiContext: APIRequestContext;
    readonly loginPayload: LoginPayload;

    constructor(apiContext: APIRequestContext, loginPayLoad: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayLoad;
    }


    async getToken() {
        console.log("INSIDE getToken() METHOD");
        const loginResponse = await this.apiContext.post("/api/users/login", 
            {
                data: this.loginPayload
            });
        const loginRepsonseJson = await loginResponse.json();
        console.log("JSON LOGIN RESPONSE");
        console.log(loginRepsonseJson);
        const token = loginRepsonseJson.user.token;
        console.log("=======================================TOKEN=========================");
        console.log(token);
        return token;
    }

    async createArticle(articlePayload: ArticlePayload) {
        let response:any = {};
        response.token = await this.getToken();
        console.log("INSIDE APIUTILS createArticle method");
        const articleResponse = await this.apiContext.post("/api/articles/", {
            data: articlePayload,
            headers: {
                'Authorization': `Token ${response.token}`,
                'Content-Type': 'application/json'
            }
        });
 
        const articleResponseJson = await articleResponse.json();
        console.log(articleResponseJson);
        console.log("ARTICLE RESPONSE JSON ABOVE");
        return response;
    }
}