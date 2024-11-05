const{test, expect}=require('@playwright/test');

test('Verify logged-out user cannot login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message
    const errorMessage = page.getByText('Epic sadface: Sorry, this user has been locked out.');
    await expect(errorMessage).toBeVisible();
    //await page.screenshot({ path: 'screenshot.png' });
});
