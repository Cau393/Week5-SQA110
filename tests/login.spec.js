const { expect } = require("chai");
const { createDriver } = require("../utils/driver");
const config = require("../utils/config");
const LoginPage = require("../pages/LoginPage");

describe("Sauce Demo — Login", function () {
    let driver;
    let loginPage;

    beforeEach(async function () {
        driver = await createDriver();
        loginPage = new LoginPage(driver);
        await loginPage.open();
    });

    afterEach(async function () {
        if (driver) await driver.quit();
    });

    it("successful login redirects to a URL containing /inventory", async function () {
        await loginPage.login(config.username, config.password);
        const url = await driver.getCurrentUrl();
        expect(url).to.include("/inventory");
    });

    it("invalid credentials display an error message", async function () {
        await loginPage.login("wrong_user", "wrong_pass");
        const error = await loginPage.getErrorMessage();
        expect(error).to.include("do not match");
    });

    it('the page title on the login page is "Swag Labs"', async function () {
        const title = await loginPage.getTitle();
        expect(title).to.equal("Swag Labs");
    });
});
