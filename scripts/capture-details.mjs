import { chromium } from "playwright";
import path from "path";

const ARTIFACT_DIR = "/home/abhishek/.gemini/antigravity-cli/brain/7a0d24a2-d02c-4158-8ba4-8417778fc2a7";

async function captureAllScenes() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Skip boot diagnostic to scroll freely
  const skipBtn = await page.$('button:has-text("[SKIP / SILENT RUN]")');
  if (skipBtn) await skipBtn.click();
  await page.waitForTimeout(400);

  // Scroll to Scene 3: Beat Crates
  await page.evaluate(() => {
    const el = document.getElementById("scene-beats");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-scene3-beats.png"),
    fullPage: false,
  });

  // Scroll to Scene 4: 4x4 Loops
  await page.evaluate(() => {
    const el = document.getElementById("scene-loops");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-scene4-loops.png"),
    fullPage: false,
  });

  // Scroll to Scene 6: Library Pass
  await page.evaluate(() => {
    const el = document.getElementById("scene-pass");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-scene6-pass.png"),
    fullPage: false,
  });

  // Scroll to Scene 7: Credits & Contact Terminal
  await page.evaluate(() => {
    const el = document.getElementById("scene-contact");
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-scene7-contact.png"),
    fullPage: false,
  });

  await browser.close();
  console.log("All scenes successfully audited and screens captured!");
}

captureAllScenes().catch(console.error);
