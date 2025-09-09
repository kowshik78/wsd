import { Page, Locator, expect } from '@playwright/test';
export class WrapperClass {
    constructor(private page: Page) {}

    async click(element: Locator) {
        await element.waitFor({ state: 'visible', timeout: 20000 });
        await element.click();
    }

    async typeText(element: Locator, text: string) {
        await element.waitFor({ state: 'visible', timeout: 10000 });
        await element.fill(text);
    }

    async getText(element: Locator) {
        await expect(element).toBeVisible({ timeout: 20000 });
        const text = await element.textContent();
        return text;
    }

    async verifyText(element: Locator, expected: string) {
        const actual = await this.getText(element)
        expect(actual?.trim()).toBe(expected);
    }
}