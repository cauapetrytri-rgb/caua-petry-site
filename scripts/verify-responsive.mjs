import { chromium } from "playwright";

const targetUrl = process.argv[2] ?? "http://localhost:3002";
const browser = await chromium.launch({ headless: true });
const messages = [];

async function verifyViewport(name, viewport) {
  const page = await browser.newPage({ viewport });
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      messages.push({ viewport: name, type: message.type(), text: message.text() });
    }
  });
  page.on("pageerror", (error) => {
    messages.push({ viewport: name, type: "pageerror", text: error.message });
  });

  await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 30_000 });
  const h1 = await page.locator("h1").first().innerText();
  await page.getByRole("button", { name: /abrir diagnóstico|quero vender|conversar/i }).first().click();
  await page.getByRole("dialog").waitFor({ timeout: 10_000 });
  const modalTitle = await page.locator("#diagnostico-form-title").innerText();
  const questionCount = await page.getByRole("button", { name: "Sim" }).count();
  await page.screenshot({ path: `verification-${name}.png`, fullPage: true });
  await page.close();

  return { viewport: name, h1, modalTitle, questionCount };
}

const results = [
  await verifyViewport("desktop", { width: 1440, height: 1000 }),
  await verifyViewport("mobile", { width: 390, height: 844 }),
];

await browser.close();
console.log(JSON.stringify({ results, messages }, null, 2));
