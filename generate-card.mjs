import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set high-res viewport for good print quality
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

    // Load the HTML file
    const filePath = `file://${path.resolve('business-card.html')}`;
    console.log(`Loading ${filePath}...`);

    // Wait until network is idle to ensure Tailwind CSS from CDN loads
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    console.log("Generating PDF...");
    await page.pdf({
        path: 'Xusan_Ibragimov_Business_Card.pdf',
        format: 'A4',
        printBackground: true, // Crucial for getting the dark background colors
        margin: { top: '0', bottom: '0', left: '0', right: '0' }
    });

    console.log("Generating Image...");

    // Find the first card (Front)
    const frontCard = await page.$('.card:nth-child(1)');
    if (frontCard) {
        await frontCard.screenshot({ path: 'business_card_front.png' });
        console.log("Front card image saved.");
    }

    // Find the second card (Back)
    const backCard = await page.$('.card:nth-child(2)');
    if (backCard) {
        await backCard.screenshot({ path: 'business_card_back.png' });
        console.log("Back card image saved.");
    }

    await browser.close();
    console.log("Done!");
})();
