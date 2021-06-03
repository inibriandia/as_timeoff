require("dotenv").config();
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  await page.goto("https://secure.acuityscheduling.com/login.php");

  await page.type("#username", process.env.AS_USER);

  await page.click("#next-button");

  await page.waitForTimeout(500);

  await page.click("#acuity-continue");
  await page.waitForSelector("#password");
  await page.type("#password", process.env.AS_PASS);

  await Promise.all([
    page.click("#next-button"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  await Promise.all([
    page.goto(
      "https://secure.acuityscheduling.com/appointments.php?action=newBlockHtml"
    ),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  // Complete time off form start_time
  let input = await page.$("#start_time");
  await input.click({ clickCount: 3 });
  await input.type("8am");

  input = await page.$("#end_time");
  await input.click({ clickCount: 3 });
  await input.type("8pm");

  await page.type("#start_date_textbox-input", "10/11/2022");

  await page.screenshot({ path: "tests/sc.png" });

  await page.evaluate(() => {
    document
      .querySelector('input[name="calendarID[]"][value="4745350"]')
      .parentElement.click();
  });

  await page.click("#block-time-submit");

  await page.waitForTimeout(5000);

  await page.screenshot({ path: "tests/final.png" });

  await browser.close();
})();
