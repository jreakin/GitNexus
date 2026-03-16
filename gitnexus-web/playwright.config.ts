import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testIgnore: ['**/manual-record.spec.ts', '**/debug-issues.spec.ts'],
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    launchOptions: {
      args: [
        // Cross-origin requests to gitnexus serve on a different port
        '--disable-web-security',
        '--disable-site-isolation-trials',
        // Software WebGL for sigma.js graph rendering in headless mode
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--enable-webgl',
      ],
    },
    // Required: Vite dev server sets COEP require-corp for SharedArrayBuffer (LadybugDB WASM).
    // Playwright must bypass this to allow cross-origin fetches to gitnexus serve.
    bypassCSP: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  outputDir: 'test-results',
});
