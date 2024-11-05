const { test, expect } = require('@playwright/test');

let page;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
});

test.afterEach(async () => {
    // Logout
    if (page) {
        await page.locator('[data-test="logout-sidebar-link"]').click();
        await page.close();
    }
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

    // Open cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    const onesie = page.getByText('Sauce Labs Onesie');
    await expect(onesie).toBeVisible();

    // Continue shopping
    await page.locator('[data-test="continue-shopping"]').click();

    // Add another item to cart
    await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();

    // Assert number of items in cart
    const cartItems = page.locator('.shopping_cart_badge');
    await expect(cartItems).toHaveText('1');

    // Side Menu
    await page.locator('#react-burger-menu-btn').click();
    const sideMenuContent = await page.locator('#menu_button_container').textContent();
    await expect(sideMenuContent).toContain('All Items');
    await expect(sideMenuContent).toContain('About');
    await expect(sideMenuContent).toContain('Logout');
    await expect(sideMenuContent).toContain('Reset App State');
});

test('Verify logged-out user cannot login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message
    const errorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
    await expect(errorMessage).toBeVisible();
    await page.screenshot({ path: 'screenshot.png' });
});
