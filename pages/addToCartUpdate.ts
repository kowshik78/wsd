
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

  constructor(page: Page) {
    super(page);
    this.wrapper = new WrapperClass(page);
    this.DetailproductTitle = page.locator('[data-test="product-name"]');
    this.chosenDetailProductTitle = page.locator('[data-test="product-title"]');
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.cartIcon = page.locator('[data-test="nav-cart"]');
    this.productQuantity = page.locator('[data-test="product-quantity"]');
}

  async addToCart(name:string) {
    this.DetailproductTitle = this.DetailproductTitle.filter({ hasText: name });
    await this.wrapper.click(this.DetailproductTitle);
    const str = await this.wrapper.getText(this.DetailproductTitle);
    await this.wrapper.click(this.addToCartBtn);
    await this.wrapper.click(this.cartIcon);
    return str;
  }
   async getCartProductTitle() {
    const string =  await this.wrapper.getText(this.chosenDetailProductTitle);
    return string;
}

  async cartQuantityUpdate(quantity: number) {
    
    await this.wrapper.click(this.productQuantity);
    await this.productQuantity.fill(quantity.toString());
    await this.page.keyboard.press('Enter');

    const priceText = await this.page.locator('[data-test="product-price"]').textContent() ?? "";
    const unitPriceNumber = parseFloat(priceText.replace('$', ''));
    
    const expectedTotal = unitPriceNumber * quantity;
    await this.page.waitForTimeout(5000);
    const totalPriceText = await this.page.locator('[data-test="line-price"]').textContent() ?? "";
    const totalPriceNumber = parseFloat(totalPriceText.replace('$', ''));
    return { expectedTotal, totalPriceNumber };
  }
}
