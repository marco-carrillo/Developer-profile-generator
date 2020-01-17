const template=require("./template");
const puppeteer=require("puppeteer");
const fs=require("fs-extra");
const content=template.usrProfile();

(async function(){
    try {
        const browser=await puppeteer.launch();
        const page=await browser.newPage();
        await page.setContent(content);
        await page.emulateMedia('screen');
        await page.pdf ({path:'mypdf.pdf', format: 'A4', printBackground: true });
        await browser.close();
        console.log('PDF has been generated using Puppeteer!!!!')
        process.exit();
    } catch(e) {console.log('Our error', e)}
})();