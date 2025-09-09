import { test, expect } from '@playwright/test';
import { FormSubmission } from '../pages/form-submission';
import { ProducttoCart } from '../pages/addToCartUpdate';

test('Inavalid Form Submission', async ({ page }) => {
  const formSubmission = new FormSubmission(page);

  await formSubmission.navigateTo('https://practicesoftwaretesting.com/');
  await formSubmission.invalidFormSubmission();
  await formSubmission.verifyInvalidFormErrorMessages();
});
test('Valid Form Submission', async ({ page }) => {
  const formSubmission = new FormSubmission(page);

  await formSubmission.navigateTo('https://practicesoftwaretesting.com/');
  await formSubmission.validFormSubmission();
  await formSubmission.verifyValidFormSuccessMessage();
});

test('Add to Cart and Update Quantity', async ({ page }) => {
  const productToCart = new ProducttoCart(page);
  await productToCart.navigateTo('https://practicesoftwaretesting.com/');
  const productName = await productToCart.addToCart("Combination Pliers");
  const cartProductName = await productToCart.getCartProductTitle();
  expect(cartProductName).toBe(productName);

  const { expectedTotal, totalPriceNumber } = await productToCart.cartQuantityUpdate(3);
  expect(totalPriceNumber).toBeCloseTo(expectedTotal, 2);

});