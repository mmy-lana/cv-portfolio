import { test, expect, type Page } from '@playwright/test';
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
  '/timeline-style',
];

// Scan states. Dark mode and Indonesian are additive coverage; the original default-state
// tests keep their exact names and route list. States are seeded through the persisted
// preferences read by ThemeService ('preferred-mode') and LanguageService ('preferred-lang')
// during bootstrap, which is deterministic and does not depend on dropdown UI timing.
const scanStates: { name: string; titleSuffix: string; storage: Record<string, string> }[] = [
  { name: 'default', titleSuffix: '', storage: {} },
  { name: 'dark mode', titleSuffix: ' [dark mode]', storage: { 'preferred-mode': 'dark' } },
  {
    name: 'indonesian (ID)',
    titleSuffix: ' [indonesian (ID)]',
    storage: { 'preferred-lang': 'id' },
  },
];

/**
 * Navigate and wait until the *fully rendered* application is ready for an axe scan:
 * 1. the async Angular shell (blocked on the i18n fetch) has produced real content;
 * 2. every `@defer (on viewport)` block has been triggered by scrolling the full document;
 * 3. all `@placeholder` skeletons have been replaced by deferred content.
 */
async function renderFullPage(
  page: Page,
  route: string,
  storage: Record<string, string>,
): Promise<void> {
  if (Object.keys(storage).length > 0) {
    await page.addInitScript((seed) => {
      for (const [key, value] of Object.entries(seed)) window.localStorage.setItem(key, value);
    }, storage);
  }

  await page.goto(route);

  // (1) Application content exists (h1 is present on every route, incl. sr-only ones).
  await expect(page.locator('app-root h1').first()).toBeAttached({ timeout: 15_000 });

  // (2) Deterministically trigger every viewport-deferred block: scroll the whole document
  //     in sub-viewport steps and let two frames render per step so each placeholder
  //     intersects the viewport. scrollHeight is re-evaluated per step because deferred
  //     content grows the page.
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });

  // (3) Deferred-content readiness gate. `@placeholder` markup is always a skeleton built
  //     from empty `div.animate-pulse` / `div.animate-shimmer` nodes; every non-placeholder
  //     animated element in the app is a <span>, so this count reaches 0 only after all
  //     deferred blocks have replaced their placeholders. Routes without @defer (e.g.
  //     /retro-computer) report 0 immediately, which is correct.
  await expect(page.locator('div.animate-pulse, div.animate-shimmer')).toHaveCount(0, {
    timeout: 20_000,
  });

  // (4) Let lazy chunks and translation fetches settle before measuring.
  await page.waitForLoadState('networkidle');
}

test.describe('Accessibility & Readability Audit across All 9 Themes', () => {
  for (const state of scanStates) {
    for (const route of themeRoutes) {
      test(`Route "${route}"${state.titleSuffix} should pass WCAG 2.1 AA accessibility checks`, async ({
        page,
      }) => {
        await renderFullPage(page, route, state.storage);

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .exclude('.parallax-bg-text') // Exclude decorative background watermarks
          .exclude('.parallax-fast-float') // Exclude decorative floating code tags
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    }
  }

  // Exclusion-policy guard: the two excluded selectors may stay excluded only while every
  // matching node is genuinely decorative (aria-hidden). This must not become a way to
  // hide real content from the scans.
  test('excluded decorative selectors are marked aria-hidden', async ({ page }) => {
    await renderFullPage(page, '/parallax-scrolling', {});
    for (const selector of ['.parallax-bg-text', '.parallax-fast-float']) {
      const nodes = page.locator(selector);
      const count = await nodes.count();
      if (count > 0) {
        expect(
          await nodes.evaluateAll((els) =>
            els.every((el) => el.getAttribute('aria-hidden') === 'true'),
          ),
        ).toBe(true);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Batch A2 targeted regressions: accessible naming, *measured* contrast ratios,
// and document-language handling. These assert computed values, not merely the
// absence of axe violations.
// ---------------------------------------------------------------------------

type ContrastSample = { fg: string; bg: string; fontSize: string; ratio: number };

/** Measure effective foreground/background contrast for every element matching `selector`. */
async function measureContrastAll(page: Page, selector: string): Promise<ContrastSample[]> {
  return page.evaluate((sel) => {
    // Computed colors may serialize in any CSS color space (Tailwind v4 emits oklch),
    // so normalize through canvas pixels to get sRGB values.
    const toRgb = (value: string): [number, number, number] | null => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const data = ctx.getImageData(0, 0, 1, 1).data;
      return data[3] > 0 ? [data[0], data[1], data[2]] : null;
    };
    const luminance = ([r, g, b]: [number, number, number]): number => {
      const f = (c: number) => {
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const out: ContrastSample[] = [];
    for (const el of Array.from(document.querySelectorAll(sel))) {
      const cs = getComputedStyle(el);
      const fg = toRgb(cs.color);
      let node: Element | null = el;
      let bg: [number, number, number] | null = null;
      while (node) {
        bg = toRgb(getComputedStyle(node).backgroundColor);
        if (bg) break;
        node = node.parentElement;
      }
      if (!fg || !bg) continue;
      const l1 = luminance(fg);
      const l2 = luminance(bg);
      out.push({
        fg: cs.color,
        bg: `rgb(${bg.join(', ')})`,
        fontSize: cs.fontSize,
        ratio: Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100,
      });
    }
    return out;
  }, selector);
}

function expectContrastAtLeast(samples: ContrastSample[], minRatio: number): void {
  expect(samples.length).toBeGreaterThan(0);
  for (const sample of samples) {
    expect(
      sample.ratio,
      `insufficient contrast ${sample.ratio}:1 (${sample.fg} on ${sample.bg}, ${sample.fontSize})`,
    ).toBeGreaterThanOrEqual(minRatio);
  }
}

test.describe('Batch A2 targeted regressions (naming, contrast, document language)', () => {
  test('terminal input on /retro-computer has an accessible name', async ({ page }) => {
    await renderFullPage(page, '/retro-computer', {});
    // Resolves only if the input exposes the accessible name via role+name computation.
    await expect(page.getByRole('textbox', { name: 'Terminal command input' })).toBeVisible();
  });

  test('timeline date and location labels meet 4.5:1 contrast (light mode)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await renderFullPage(page, '/timeline-style', { 'preferred-mode': 'light' });
    expectContrastAtLeast(await measureContrastAll(page, 'span[class*="text-[11px]"]'), 4.5);
    expectContrastAtLeast(
      await measureContrastAll(page, 'span[class*="text-xs"][class*="font-mono"]'),
      4.5,
    );
  });

  test('timeline date and location labels meet 4.5:1 contrast (dark mode)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await renderFullPage(page, '/timeline-style', { 'preferred-mode': 'dark' });
    expectContrastAtLeast(await measureContrastAll(page, 'span[class*="text-[11px]"]'), 4.5);
    expectContrastAtLeast(
      await measureContrastAll(page, 'span[class*="text-xs"][class*="font-mono"]'),
      4.5,
    );
  });

  test('sidebar ECOSYSTEM label meets 4.5:1 contrast (light mode, desktop sidebar)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await renderFullPage(page, '/sidebar-navigation', { 'preferred-mode': 'light' });
    expectContrastAtLeast(await measureContrastAll(page, 'p[class*="text-[10px]"]'), 4.5);
  });

  const languageCases: { seed: string; expected: string }[] = [
    { seed: 'en', expected: 'en' },
    { seed: 'id', expected: 'id' },
    { seed: 'su', expected: 'su' },
    { seed: 'de', expected: 'en' }, // unsupported -> default
    { seed: '<script>alert(1)</script>', expected: 'en' }, // malformed -> default
    { seed: '', expected: 'en' }, // missing -> default
  ];
  for (const { seed, expected } of languageCases) {
    test(`document lang is "${expected}" when stored preference is "${seed || '(empty)'}"`, async ({
      page,
    }) => {
      await renderFullPage(page, '/', { 'preferred-lang': seed });
      expect(await page.evaluate(() => document.documentElement.lang)).toBe(expected);
    });
  }

  test('switching language via the UI updates the document lang', async ({ page }) => {
    await renderFullPage(page, '/', {});
    await page.evaluate(() => window.scrollTo(0, 0));
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('en');

    // Menu items are labeled by their native names (see language-toggle.ts).
    await page.locator('app-language-toggle button').first().click();
    await page
      .locator('app-language-toggle [role="menuitem"]')
      .filter({ hasText: 'Bahasa Indonesia' })
      .first()
      .click();
    await expect.poll(() => page.evaluate(() => document.documentElement.lang)).toBe('id');
    await expect
      .poll(async () => (await page.locator('body').innerText()).includes('Katalog'))
      .toBe(true);

    await page.locator('app-language-toggle button').first().click();
    await page
      .locator('app-language-toggle [role="menuitem"]')
      .filter({ hasText: 'Basa Sunda' })
      .first()
      .click();
    await expect.poll(() => page.evaluate(() => document.documentElement.lang)).toBe('su');

    await page.locator('app-language-toggle button').first().click();
    await page
      .locator('app-language-toggle [role="menuitem"]')
      .filter({ hasText: 'English' })
      .first()
      .click();
    await expect.poll(() => page.evaluate(() => document.documentElement.lang)).toBe('en');
  });
});
