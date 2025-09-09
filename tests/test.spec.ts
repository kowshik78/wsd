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
  await productToCart.addToCart();
  
  const cartProductName = await productToCart.getCartProductName();
  expect(cartProductName).toMatch(/Combination Pliers/i);

  await productToCart.cartQuantityUpdate();


});