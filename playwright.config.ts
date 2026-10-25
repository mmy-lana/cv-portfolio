import { defineConfig, devices } from '@playwright/test';

// Test target selection:
// - Default: the locally built artifact served by e2e/serve-dist.mjs (run `npm run build` first).
// - Opt-in production smoke: PLAYWRIGHT_BASE_URL=https://www.mmylana.my.id npm run test:e2e
//   (the local server is skipped when the base URL points at an external host).
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4300';
const isLocalArtifactTarget = /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?(\/)?$/.test(baseURL);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 1,
  // Full-page rendering of deferred content + axe scans needs more than the 30 s default.
  timeout: 60_000,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: isLocalArtifactTarget
    ? {
        command: 'node e2e/serve-dist.mjs',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
      }
    : undefined,
});
