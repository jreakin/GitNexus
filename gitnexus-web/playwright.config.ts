import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    // Capture traces, screenshots, and video for every test
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    // Collect console logs
    launchOptions: {
      args: [
        '--disable-web-security',
        '--disable-site-isolation-trials',
        // Enable WebGL for sigma.js graph rendering
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--enable-webgl',
      ],
    },
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
