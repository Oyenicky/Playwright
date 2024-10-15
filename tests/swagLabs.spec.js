const {test, expect}=require('@playwright/test')

test('swagLabs', async({page}) =>{

await page.goto('https://www.saucedemo.com/');

await page.locator('#user-name').fill('standard_user');

await page.getByPlaceholder('Password').fill('secret_sauce');

await page. locator('#login-button').click();

const Logo= await page.locator("//div[@class='app_logo']")

await expect (Logo).toBeVisible

const dropdownLocator = page.locator("//select[@class='product_sort_container']")

await dropdownLocator.selectOption({ index : 2 });

const dropdownoptions = page.locator(".product_sort_container option")

await expect(dropdownoptions).toHaveCount(4);


await page.  waitForTimeout(5000);







})