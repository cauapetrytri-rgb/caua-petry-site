import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const refs = [
  ["Awwwards", "https://www.awwwards.com/"],
  ["Godly", "https://godly.website/"],
  ["Land-book", "https://www.land-book.com/"],
  ["Lapa Ninja", "https://www.lapa.ninja/"],
  ["Dribbble", "https://dribbble.com/search/saas%20dark%20landing%20page"],
  ["Behance", "https://www.behance.net/search/projects/saas%20landing%20page%20dark"],
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const [name, url] of refs) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 35_000 });
    await page.waitForTimeout(3000);

    const data = await page.evaluate(() => {
      const bodyText = document.body?.innerText || "";
      const headings = Array.from(document.querySelectorAll("h1,h2,h3"))
        .slice(0, 16)
        .map((heading) => heading.textContent?.trim())
        .filter(Boolean);
      const buttons = Array.from(document.querySelectorAll("button,a"))
        .slice(0, 30)
        .map((item) => item.textContent?.trim())
        .filter(Boolean)
        .slice(0, 15);
      const images = Array.from(document.images)
        .slice(0, 12)
        .map((img) => ({
          alt: img.alt,
          src: img.currentSrc || img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        }));
      const styleSamples = Array.from(
        document.querySelectorAll("body, main, section, article, h1, h2, nav, button, a"),
      )
        .slice(0, 45)
        .map((el) => {
          const style = getComputedStyle(el);

          return {
            tag: el.tagName,
            font: style.fontFamily,
            size: style.fontSize,
            color: style.color,
            background: style.backgroundColor,
            radius: style.borderRadius,
            letterSpacing: style.letterSpacing,
          };
        });

      return { text: bodyText.slice(0, 1400), headings, buttons, images, styleSamples };
    });

    results.push({ name, url, title: await page.title(), ok: true, ...data });
  } catch (error) {
    results.push({ name, url, ok: false, error: String(error).slice(0, 700) });
  } finally {
    await page.close();
  }
}

await browser.close();
await writeFile("reference-research.json", `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results.map(({ name, ok, title, error }) => ({ name, ok, title, error })), null, 2));
