import { chromium } from "playwright";

const targetUrl = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const messages = [];

page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) {
    messages.push({ type: message.type(), text: message.text() });
  }
});

page.on("pageerror", (error) => {
  messages.push({ type: "pageerror", text: error.message });
});

await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 30_000 });
const title = await page.title();
const h1 = await page.locator("h1").first().innerText();
const ctaCount = await page.locator("a[href='#contato'], a[href^='mailto:']").count();
await page.screenshot({ path: "verification-home.png", fullPage: true });
await browser.close();

console.log(JSON.stringify({ title, h1, ctaCount, messages }, null, 2));
