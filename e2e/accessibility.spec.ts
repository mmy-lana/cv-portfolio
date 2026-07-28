import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const themeRoutes = [
  '/',
  '/minimalist',
  '/cyberpunk',
  '/glassmorphism',
  '/dark',
  '/retro-computer',
  '/gradient-flow',
  '/sidebar-navigation',
  '/parallax-scrolling',
  '/timeline-style'
];

test.describe('Accessibility & Readability Audit across All 9 Themes', () => {
  for (const route of themeRoutes) {
    test(`Route "${route}" should pass WCAG 2.1 AA accessibility checks`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('.parallax-bg-text')    // Exclude decorative background watermarks
        .exclude('.parallax-fast-float') // Exclude decorative floating code tags
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});