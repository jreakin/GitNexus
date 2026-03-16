import { test } from '@playwright/test';

/**
 * Manual recording session.
 * Opens the app and pauses so you can interact with the UI.
 * Close the browser when done — trace, video, and screenshots are saved automatically.
 *
 * Run with: npx playwright test e2e/manual-record.spec.ts --headed --timeout=0
 */
test('manual recording session', async ({ page }) => {
  // Collect console for debugging
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', err => console.log(`[crash] ${err.message}`));

  await page.goto('http://localhost:5173');

  // Pause here — interact with the UI manually
  // The trace, video, and screenshots are captured automatically
  await page.pause();
});
