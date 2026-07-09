const path = require("path");
const { expect } = require("chai");
const { createDriver } = require("../utils/driver");
const config = require("../utils/config");
const { readExcel } = require("../utils/excel");
const RegistrationPage = require("../pages/RegistrationPage");

// ExpandTesting /register has no email field. Spreadsheet columns follow the homework
// shape; at runtime email (if present) or firstName + lastName map to the username field.
// Unique suffixes for success rows use hyphens to stay within site username rules.
const EXCEL_PATH = path.join(__dirname, "../data/registration-data.xlsx");
const rows = readExcel(EXCEL_PATH);

function buildUsername(row) {
    const email = (row.email ?? "").toString().trim();
    if (email) return email;
    return `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim();
}

function resolveUsername(row) {
    let username = buildUsername(row);
    if (row.expected === "success" && username) {
        const suffix = `-${Date.now().toString(36)}`;
        const maxBaseLength = Math.max(3, 39 - suffix.length);
        if (username.length > maxBaseLength) {
            username = username.slice(0, maxBaseLength);
        }
        username = `${username}${suffix}`;
    }
    return username;
}

async function getFlashSafe(page) {
    try {
        return await page.getFlashMessage();
    } catch {
        return "";
    }
}

async function assertExpected(driver, page, row) {
    const expected = row.expected;

    if (expected === "success") {
        await driver.wait(async () => {
            const url = await driver.getCurrentUrl();
            return url.includes("/login");
        }, config.timeouts.explicit);
        const flash = await getFlashSafe(page);
        expect(flash).to.include("Successfully registered");
        return;
    }

    if (expected === "required") {
        expect(await getFlashSafe(page)).to.include("All fields are required.");
        return;
    }

    if (expected === "mismatch") {
        expect(await getFlashSafe(page)).to.include("Passwords do not match.");
        return;
    }

    if (expected === "error") {
        expect(await getFlashSafe(page)).to.include(String(row.expectedError));
        return;
    }

    throw new Error(`Unknown expected outcome: ${expected}`);
}

describe("Registration - Main", function () {
    let driver;
    let registrationPage;

    beforeEach(async function () {
        driver = await createDriver();
        registrationPage = new RegistrationPage(driver);
        await registrationPage.open();
    });

    afterEach(async function () {
        if (driver) await driver.quit();
    });

    rows.forEach((row) => {
        it(`[${row.testId}] ${row.testCase}`, async function () {
            await registrationPage.register({
                username: resolveUsername(row),
                password: row.password ?? "",
                confirmPassword: row.confirmPassword ?? "",
            });
            await assertExpected(driver, registrationPage, row);
        });
    });
});
