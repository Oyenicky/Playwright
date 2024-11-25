const { test, expect } = require('@playwright/test');

test('sidemenu', async({page})=>{
    //launch app
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
//const sideMenuContent = await page.locator('#menu_button_container').textContent();

    //open menu
    page.getByRole('button', {type:'button'}).click;
    const sideMenuContent = await page.locator('#menu_button_container').textContent();
    const menuItems = ['All Items', 'About', 'Logout', 'Reset App State'];
    for (const item of menuItems) {
        expect(sideMenuContent).toContain(item);
    }


    
});