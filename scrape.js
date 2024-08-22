import puppeteer from "puppeteer";

// all the methods used from Puppeteer are asynchronous, so we create an async function (or use IIFE)

const scrape = async () => {
    // Puppeteer has "headless" browser
    // to launch that browser
    const browser = await puppeteer.launch();

    // to create a new page within that browser to work with
    const page = await browser.newPage();

    // URL to scrape
    const url = 'https://books.toscrape.com';

    // to go to that URL within our headless browser
    await page.goto(url);

    // to get title elements for example from that URL page
    const title = await page.title();
    console.log(`Page title: ${title}`);

    // after everything we need to close the browser
    await browser.close();
}

scrape();