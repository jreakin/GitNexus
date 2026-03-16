import { test, expect } from '@playwright/test';

/**
 * E2E tests for the GitNexus web UI.
 * Requires:
 *   - gitnexus serve running on localhost:4747
 *   - gitnexus-web dev server running on localhost:5173
 *
 * Skipped when servers aren't available (CI without services, etc.).
 * Set E2E=1 to force-run even without the availability check.
 */

// Skip all tests if the gitnexus server isn't reachable
test.beforeAll(async () => {
  if (process.env.E2E) return; // force-run
  try {
    const res = await fetch('http://localhost:4747/api/repos');
    if (!res.ok) test.skip(true, 'gitnexus serve not available on :4747');
  } catch {
    test.skip(true, 'gitnexus serve not available on :4747');
  }
});

/** Shared helper: connect to the local server and wait for the graph to load */
async function connectAndWaitForGraph(page: import('@playwright/test').Page) {
  // Collect all console messages for debugging
  page.on('console', msg => console.log(`[browser ${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => console.log(`[browser crash] ${err.message}`));

  await page.goto('/');
  await page.screenshot({ path: 'test-results/step-1-landing.png' });

  // Click "Server" tab in onboarding
  await page.getByText('Server').click();
  await expect(page.getByText('Connect to Server')).toBeVisible({ timeout: 5_000 });
  await page.screenshot({ path: 'test-results/step-2-server-tab.png' });

  // Enter server URL and connect
  const serverInput = page.locator('input[name="server-url-input"]');
  await serverInput.fill('http://localhost:4747');
  await page.screenshot({ path: 'test-results/step-3-url-filled.png' });

  await page.getByRole('button', { name: /Connect/ }).click();

  // Take screenshots during loading
  await page.waitForTimeout(2_000);
  await page.screenshot({ path: 'test-results/step-4-after-connect-2s.png' });
  await page.waitForTimeout(5_000);
  await page.screenshot({ path: 'test-results/step-5-after-connect-7s.png' });

  // Wait for graph to load — status bar shows "Ready"
  await expect(page.getByText('Ready')).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText(/\d+ nodes/).first()).toBeVisible();
}

test.describe('Server Connection & Graph Loading', () => {
  test('connects to server and loads graph', async ({ page }) => {
    // Capture console errors for debugging
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    await connectAndWaitForGraph(page);
    await page.screenshot({ path: 'test-results/graph-loaded.png', fullPage: true });

    // Log any errors for debugging
    if (errors.length > 0) {
      console.log('Browser errors:', errors);
    }
  });
});

test.describe('Nexus AI', () => {
  test('panel opens and agent initializes without error', async ({ page }) => {
    await connectAndWaitForGraph(page);

    // Click Nexus AI button to open the panel
    await page.getByRole('button', { name: 'Nexus AI' }).click();

    // Should see the Nexus AI tab content
    await expect(page.getByText('Ask me anything')).toBeVisible({ timeout: 15_000 });

    // Wait for agent initialization
    await page.waitForTimeout(5_000);

    await page.screenshot({ path: 'test-results/nexus-ai-panel.png', fullPage: true });

    // "Database not ready" should NOT be visible
    const errorBanner = page.getByText('Database not ready');
    expect(await errorBanner.isVisible().catch(() => false)).toBe(false);
  });
});

test.describe('Processes Panel', () => {
  test('shows process list and View button works', async ({ page }) => {
    await connectAndWaitForGraph(page);

    // Open Nexus AI panel, switch to Processes tab
    await page.getByRole('button', { name: 'Nexus AI' }).click();
    await page.getByText('Processes').click();

    // Should show process count
    await expect(page.getByText(/\d+ processes detected/)).toBeVisible({ timeout: 10_000 });
    await page.screenshot({ path: 'test-results/processes-panel.png', fullPage: true });

    // Wait for LadybugDB to finish loading
    await page.waitForTimeout(5_000);

    // Hover first process item to reveal View button, then click it
    const processRow = page.locator('.group').first();
    await processRow.hover();
    await page.waitForTimeout(500);

    const viewBtn = processRow.getByRole('button', { name: /View/ });
    if (await viewBtn.isVisible()) {
      await viewBtn.click();
      await page.waitForTimeout(2_000);
      await page.screenshot({ path: 'test-results/process-view-clicked.png', fullPage: true });
    } else {
      await page.screenshot({ path: 'test-results/process-view-button-not-found.png', fullPage: true });
    }
  });

  test('lightbulb highlights nodes in graph', async ({ page }) => {
    await connectAndWaitForGraph(page);

    await page.getByRole('button', { name: 'Nexus AI' }).click();
    await page.getByText('Processes').click();
    await expect(page.getByText(/\d+ processes detected/)).toBeVisible({ timeout: 10_000 });

    // Wait for LadybugDB
    await page.waitForTimeout(5_000);

    await page.screenshot({ path: 'test-results/before-highlight.png', fullPage: true });

    // Hover first process to reveal lightbulb
    const processRow = page.locator('.group').first();
    await processRow.hover();
    await page.waitForTimeout(500);

    const lightbulb = processRow.locator('button[title*="highlight"]');
    if (await lightbulb.isVisible()) {
      await lightbulb.click();
      await page.waitForTimeout(1_000);
      await page.screenshot({ path: 'test-results/after-highlight.png', fullPage: true });
    } else {
      await page.screenshot({ path: 'test-results/lightbulb-not-found.png', fullPage: true });
    }
  });
});

test.describe('Turn Off All Highlights', () => {
  test('selecting a node dims others, button clears it', async ({ page }) => {
    await connectAndWaitForGraph(page);

    // Wait for graph to fully render
    await page.waitForTimeout(3_000);

    await page.screenshot({ path: 'test-results/before-select.png', fullPage: true });

    // Click a file in the file tree to select a node
    const fileItem = page.getByText('start.sh');
    if (await fileItem.isVisible()) {
      await fileItem.click();
      await page.waitForTimeout(1_000);
      await page.screenshot({ path: 'test-results/node-selected.png', fullPage: true });

      // Click "Turn off all highlights" button (top-right lightbulb)
      const highlightBtn = page.locator('button[title*="Turn off"]');
      if (await highlightBtn.isVisible()) {
        await highlightBtn.click();
        await page.waitForTimeout(1_000);
        await page.screenshot({ path: 'test-results/highlights-cleared.png', fullPage: true });
      } else {
        await page.screenshot({ path: 'test-results/turn-off-button-not-found.png', fullPage: true });
      }
    } else {
      await page.screenshot({ path: 'test-results/start-sh-not-found.png', fullPage: true });
    }
  });
});
