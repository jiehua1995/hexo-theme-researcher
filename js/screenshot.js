const puppeteer = require('puppeteer');

const sizes = [
  { width: 375, height: 667, name: 'iphone6' },
  { width: 768, height: 1024, name: 'ipad' },
  { width: 1440, height: 900, name: 'laptop' },
  { width: 1920, height: 1080, name: 'desktop' }
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const size of sizes) {
    await page.setViewport({ width: size.width, height: size.height });
    await page.goto('http://localhost:4000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `screenshot-${size.name}.png` });
    console.log(`Saved screenshot-${size.name}.png`);
  }

  await browser.close();
})();
