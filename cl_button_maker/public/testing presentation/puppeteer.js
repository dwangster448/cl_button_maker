const puppeteer = require("puppeteer");

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/cl_button_maker/cl_button_maker/booknow.html");

  // navbar handler when resized small enough
  const burgerVisible = await page.evaluate(() => {
    const burger = document.querySelector(".navbar-burger");
    return burger && window.getComputedStyle(burger).display !== "none";
  });

  if (burgerVisible) {
    await page.click(".navbar-burger");
    console.log("Navbar expanded");
  }

  // Fill out reservation form
  await page.type("#res_name", "Test User");
  await page.type("#res_email", "testuser@example.com");
  await page.type("#res_phone", "1234567890");

  await page.click('input[name="button-size"][value="1"]');

  await page.type("#pickup_date", "06-01-2025");
  await page.type("#pickup_time", "10:00AM");
  await page.type("#return_date", "06-03-2025");
  await page.type("#return_time", "15:00PM");
  await page.click("#return_agreement");
  await page.click("#uw_info_agreement");
  await page.type("#additional_notes", "This is a test comment")

  await page.click('#review button[type="submit"]');
  console.log("Reservation form submitted");

  await delay(2000);

  // Scroll to top to view message bar and admin button
  await page.evaluate(() => window.scrollTo(0, 0));
  console.log("Scrolled to top");

  // Admin login
  await page.click("#admin-login-button");
  console.log("Admin login button clicked");

  await page.waitForSelector("#admin_email");
  await page.type("#admin_email", "testing@test.com");
  console.log("Admin email typed");

  await page.type("#password", "123456");
  console.log("Password typed");

  await page.click("#submit_login");
  console.log("Submit button clicked");

  await delay(3000);
}

go();


