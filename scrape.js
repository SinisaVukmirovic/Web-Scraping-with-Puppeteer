import puppeteer from "puppeteer";
// all the methods used from Puppeteer are asynchronous, so we create an async function (or use IIFE)

// to save scraped data into a JSON file, we can use "fs" module (file system) of NODE
import fs from "fs";

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

    // to get title elements for example from URL page
    // const title = await page.title();
    // console.log(`Page title: ${title}`);

    // puppeteer gives us a method "evaluate" that allowes us to run JavaScript in the context of the page, we can select data using querySelector(All)
    const books = await page.evaluate(() => {
        const bookElements = document.querySelectorAll('.product_pod');
        // !!! cannot console log within page.evaluate
        // instead we can return...
        return Array.from(bookElements).map(book => {
            const title = book.querySelector('h3 a').getAttribute('title');
            const price = book.querySelector('.price_color').textContent;
            const stock = book.querySelector('.instock.availability') ? 'In stock' : 'Out of stock';
            const rating = book.querySelector('.star-rating').className.split(' ')[1];
            const link = book.querySelector('h3 a').getAttribute('href');

            return {
                title,
                price,
                stock,
                rating,
                link
            };
        });
    });
    // ...that console log
    // console.log(books);

    // JSON.stringify(file name, replacer, format)
    fs.writeFileSync('books.json', JSON.stringify(books, null, 2)); 
    console.log('Books data saved to books.json');

    // after everything we need to close the browser
    await browser.close();
}

scrape();