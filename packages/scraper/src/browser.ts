import puppeteer, { Page } from 'puppeteer';

export default async function withPage<T>(func: (page: Page) => Promise<T>): Promise<T> {
  const browser = await puppeteer.launch({
    timeout: 20000,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    headless: true,
    executablePath: '/opt/homebrew/bin/chromium',
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--window-size=1280,720',
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // Block images, videos, fonts from downloading
  await page.setRequestInterception(true);

  page.on('request', (interceptedRequest) => {
    const blockResources = ['stylesheet', 'image', 'media', 'font'];
    if (blockResources.includes(interceptedRequest.resourceType())) {
      interceptedRequest.abort();
    } else {
      interceptedRequest.continue();
    }
  });

  // Change the user agent of the scraper
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
  );

  try {
    return await func(page);
  } finally {
    await page.screenshot({ path: './screenshot.png' });
    await page.close();
    await browser.close();
  }
}
