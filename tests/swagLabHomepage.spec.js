const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    //Launch app
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
});

test.afterEach(async ({ page }) => {
    // Logout
    await page.getByText('Open Menu').click();
    await page.getByTestId('logout-sidebar-link').click();
});

test('Homepage', async ({ page }) => {
    // Verify logo visibility
    const logo = page.locator('.app_logo');
    await expect(logo).toBeVisible();

    // Select sorting option
    const dropdownLocator = page.locator('.product_sort_container');
    await dropdownLocator.selectOption({ index: 2 });

    // Verify sorting options count
    const dropdownOptions = page.locator('.product_sort_container option');
    await expect(dropdownOptions).toHaveCount(4);

    // Add item to cart
    const addToCart = page.locator('#add-to-cart-sauce-labs-backpack');
    await addToCart.click();
    await page.locator('#add-to-cart-sauce-labs-onesie').click();
    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
    
    // Open cart
    await page.getByTestId('shopping-cart-link').click();
    const onesie = page.getByText('Sauce Labs Onesie');
    expect(onesie).toBeVisible();
    const removeButton = page.getByTestId('remove-sauce-labs-onesie');
    await removeButton.click();

    // Assert number of items in cart
    const cartItems = page.locator('.shopping_cart_badge');
    await expect(cartItems).toHaveText('2');
});    

test('proceed to checkout', async({page})=>{
    // Proceed to checkout
    await page.getByTestId('shopping-cart-link').click();
    await page.locator('#checkout').click();

    // Fill checkout form
    await page.getByPlaceholder('First Name').fill('Stanley');
    await page.getByPlaceholder('Last Name').fill('Ovorawen');
    await page.getByPlaceholder('Zip/Postal Code').fill('1200');

    // Continue checkout
    await page.locator('#continue').click();
    await page.locator('#finish').click();
    
});

