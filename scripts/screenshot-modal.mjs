import { chromium } from "playwright";

const targetUrl = process.argv[2] ?? "http://localhost:3002";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 30_000 });
await page.getByRole("button", { name: /abrir diagnóstico|quero vender|conversar/i }).first().click();
await page.getByRole("dialog").waitFor({ timeout: 10_000 });
await page.screenshot({ path: "verification-modal-mobile.png", fullPage: false });
await browser.close();
