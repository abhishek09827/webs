import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "/home/abhishek/.gemini/antigravity-cli/brain/7a0d24a2-d02c-4158-8ba4-8417778fc2a7";

async function runAudit() {
  console.log("Starting visual audit with Chromium...");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const errors = [];

  // Desktop Run (1440x900)
  console.log("Capturing Desktop 1440x900...");
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`[Console Error Desktop]: ${msg.text()}`);
    }
  });

  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(1000);

  // Screenshot Scene 0 & 1
  await desktopPage.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-hero.png"),
    fullPage: false,
  });

  // Click Initialize Audio Engine in Scene 0
  const initBtn = await desktopPage.$('button:has-text("INITIALIZE AUDIO ENGINE")');
  if (initBtn) {
    await initBtn.click();
    await desktopPage.waitForTimeout(1200);
  }

  // Scroll down through Arrangement & Beats
  await desktopPage.evaluate(() => window.scrollTo(0, 1500));
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-arrangement.png"),
    fullPage: false,
  });

  await desktopPage.evaluate(() => window.scrollTo(0, 3200));
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-beats.png"),
    fullPage: false,
  });

  await desktopPage.evaluate(() => window.scrollTo(0, 5000));
  await desktopPage.waitForTimeout(600);
  await desktopPage.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-kits.png"),
    fullPage: false,
  });

  // Mobile Run (390x844 - iPhone 14)
  console.log("Capturing Mobile 390x844...");
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`[Console Error Mobile]: ${msg.text()}`);
    }
  });

  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  await mobilePage.screenshot({
    path: path.join(ARTIFACT_DIR, "mobile-hero.png"),
    fullPage: false,
  });

  // Click Skip on mobile to see arrangement
  const skipBtn = await mobilePage.$('button:has-text("[SKIP / SILENT RUN]")');
  if (skipBtn) {
    await skipBtn.click();
    await mobilePage.waitForTimeout(500);
  }

  await mobilePage.evaluate(() => window.scrollTo(0, 1400));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(ARTIFACT_DIR, "mobile-arrangement.png"),
    fullPage: false,
  });

  await mobilePage.evaluate(() => window.scrollTo(0, 4200));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(ARTIFACT_DIR, "mobile-kits.png"),
    fullPage: false,
  });

  // Styleguide Capture
  console.log("Capturing Styleguide...");
  const styleguidePage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await styleguidePage.goto("http://localhost:3000/styleguide", { waitUntil: "networkidle" });
  await styleguidePage.waitForTimeout(600);
  await styleguidePage.screenshot({
    path: path.join(ARTIFACT_DIR, "desktop-styleguide.png"),
    fullPage: false,
  });

  await browser.close();

  console.log("=== AUDIT SUMMARY ===");
  console.log(`Console Errors: ${errors.length}`);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
  } else {
    console.log("PASS: 0 console errors detected.");
  }
}

runAudit().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
