
import {BasePage} from "./base-Page";
import { Page, Locator, expect} from '@playwright/test';
import { WrapperClass } from '../wrapper/wrapperClass';

export class ProducttoCart extends BasePage {
  private wrapper: WrapperClass;
  private addToCartBtn: Locator;
  private cartIcon: Locator;
  private DetailproductTitle: Locator;
  private chosenDetailProductTitle: Locator;
  private productQuantity: Locator;
  private cartPrice: Locator;
  private totalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.wrapper = new WrapperClass(page);
    this.DetailproductTitle = page.locator('[data-test="product-name"]');
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.cartIcon = page.locator('[data-test="nav-cart"]');
    this.productQuantity = page.locator('[data-test="product-quantity"]');
    this.cartPrice = page.locator('[data-test="product-price"]');
    this.totalPrice = page.locator('[data-test="line-price"]');
}

  async addToCart() {
    this.chosenDetailProductTitle = this.DetailproductTitle.filter({ hasText: "Combination Pliers" });
    await this.wrapper.click(this.chosenDetailProductTitle);
    await this.wrapper.click(this.addToCartBtn);
    await this.wrapper.click(this.cartIcon);
  }
  async getCartProductName() {
    const cartProductLocator = this.page.locator('[data-test="product-title"]', { hasText: /Combination Pliers/i });
    await expect(cartProductLocator).toBeVisible({ timeout: 20000 });
    return (await cartProductLocator.textContent())?.trim();
}

  async cartQuantityUpdate() {
    await this.wrapper.click(this.productQuantity);
    await this.productQuantity.fill('3');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000); 
  }
 async getCartProductTitle() {
    const cartProductLocator = this.page.locator('[data-test="product-title"]', {  hasText: /Combination Pliers/i});
    await cartProductLocator.waitFor({ state: 'visible', timeout: 10000 });
    return cartProductLocator;

}


}
