const { until } = require("selenium-webdriver");
const config = require("../utils/config");

class BasePage {
    constructor(driver, defaultTimeout = config.timeouts.explicit) {
        this.driver = driver;
        this.defaultTimeout = defaultTimeout;
    }

    async open(url) {
        await this.driver.get(url);
    }

    async getTitle() {
        return this.driver.getTitle();
    }

    async getCurrentUrl() {
        return this.driver.getCurrentUrl();
    }

    async waitForVisible(locator, timeout = this.defaultTimeout) {
        return this.driver.wait(until.elementLocated(locator), timeout);
    }

    async waitForUrlContains(text, timeout = this.defaultTimeout) {
        return this.driver.wait(until.urlContains(text), timeout);
    }

    async findElement(locator) {
        await this.waitForVisible(locator);
        return this.driver.findElement(locator);
    }

    async click(locator) {
        const el = await this.findElement(locator);
        await el.click();
    }

    async type(locator, text) {
        const el = await this.findElement(locator);
        await el.clear();
        await el.sendKeys(text);
    }

    async findElements(locator) {
        await this.waitForVisible(locator);
        return this.driver.findElements(locator);
    }

    async getText(locator) {
        const el = await this.findElement(locator);
        return el.getText();
    }

    async isDisplayed(locator) {
        try {
            const el = await this.driver.findElement(locator);
            return el.isDisplayed();
        } catch {
            return false;
        }
    }
}

module.exports = BasePage;
