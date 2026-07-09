const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function createDriver() {
    const options = new chrome.Options();
    const headless = process.env.HEADLESS === "true";

    if (headless) {
        options.addArguments("--headless=new");
    }

    options.addArguments("--window-size=1920,1080");
    options.addArguments("--no-sandbox");

    return new Builder().forBrowser("chrome").setChromeOptions(options).build();
}

module.exports = { createDriver };
