const{test, expect}= require('@playwright/test')

test('unilorinweb', async({page})=>{

await page.goto('https://www.unilorin.edu.ng/')

//Total number of frames
const allFrames= await page.frames()
console.log('number of frames', allFrames.lenght)

})