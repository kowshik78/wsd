import { Page } from "@playwright/test";

export class BasePage {
    protected readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        console.log(`Navigating to ${url}`);
        await this.page.goto(url, {timeout: 60000});
        await this.page.waitForLoadState('load');
    }
    async getTitle(){
        return this.page.title();
    }

}