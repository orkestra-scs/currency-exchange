import puppeteer from "puppeteer";

describe("App.js", () => {
    let browser;
    let page;
    const url = "http://localhost:3000";

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    test("Welcome to CE", async () => {
        await page.goto(url);
        await page.waitForSelector("#login", {visible: true});
        const text = await page.$eval("#login", (e) => e.textContent);
        expect(text).toContain("Username");
    });

    test("navigates to the Register Page", async () => {
        await page.goto(url);
        await page.waitForSelector("#login", {visible: true});
        await page.click("#registerButton");
        await page.waitForSelector("#register");
        const text = await page.$eval("#register", (e) => e.textContent);
        expect(text).toContain("Confirm Password");
    });

    test("success on login", async () => {
        await page.goto(url);
        await page.waitForSelector("#login");

        await page.click("#login_username");
        await page.type("#login_username", "admin");

        await page.click("#login_password");
        await page.type("#login_password", "adminPass");

        await page.click("#loginButton");

        await page.waitForSelector(".ant-select-selector");

        const text = await page.$eval(
            ".ant-typography",
            (e) => e.textContent
        );
        expect(text).toContain("Select a Currency");
    });

    test("fail on login", async () => {
        await page.goto(url);
        await page.waitForSelector("#login");

        await page.click("#login_username");
        await page.type("#login_username", "admin");

        await page.click("#login_password");
        await page.type("#login_password", "adminPaTTT");

        await page.click("#loginButton");

        await page.waitForSelector("#loginButton");

        const text = await page.$eval(
            "#loginButton",
            (e) => e.textContent
        );
        expect(text).toContain("Submit");
    });

    afterAll(() => browser.close());
});
