const { test, expect } = require('@playwright/test');

test('SwagLabs', async ({ page }) => {
  // Navigate to SwagLabs
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Verify logo visibility
  const logo = page.locator('.app_logo');
  await expect(logo).toBeVisible();

  // Select sorting option
  const dropdownLocator = page.locator('.product_sort_container');
  await dropdownLocator.selectOption({ index: 2 });

  // Verify dropdown options count
  const dropdownOptions = page.locator('.product_sort_container option');
  await expect(dropdownOptions).toHaveCount(4);

  // Add item to cart
  const addToCart = page.locator('#add-to-cart-sauce-labs-backpack');
  await addToCart.click();

  await page.pause();

  // Proceed to checkout
  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();

// Fill checkout form
await page.getByPlaceholder('First Name').fill('Stanley');
await page.getByPlaceholder('Last Name').fill('Ovorawen');
await page.getByPlaceholder('Zip/Postal Code').fill('1200');

// Continue checkout
await page.locator('#continue').click();
await page.locator('#finish').click();

// Return to products
const backToProducts = page.locator('[data-test="back-to-products"]');
await backToProducts.click();

// Verify home page visibility
const home = page.locator('.app_logo');
await expect(home).toBeVisible();

// Remove item from cart
await page.locator('#add-to-cart-sauce-labs-onesie').click();
const removeButton = page.getByRole('button', { name: 'Remove' });
await removeButton.click();

//open cart
await page.getByTestId('shopping-cart-link').click();
const onsie = await page. getByText('Sauce Labs Onesie')
expect (onsie ).toBeVisible;

// Continue shopping
await page.getByTestId('continue-shopping').click();

await page.pause();

//Back to home page //add another item to cart
await page. getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()


//Assert number of items in cart
const cartItems= page.getByTestId('shopping-cart-link')
expect (cartItems).toHaveCount(1);

//Side Menu
await page.getByText('Open Menu').click();
const sideMenuContent= await page.locator('#menu_button_container').textContent();
expect(sideMenuContent.includes ('All Items')).toBeTruthy();
expect(sideMenuContent.includes ('About')).toBeTruthy();
expect(sideMenuContent.includes('Logout')).toBeTruthy();
expect(sideMenuContent.includes('Reset App State')).toBeTruthy();


//logout
await page. getByTestId('logout-sidebar-link').click();



})