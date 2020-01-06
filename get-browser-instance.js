
import chromium from 'chrome-aws-lambda';

let browser = null;

const getBrowserInstance = async () => {
  if (!browser) {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  }
  return browser;
};

export default getBrowserInstance;
