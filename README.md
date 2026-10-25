# One CV, 9 Themes — Interactive Developer Portfolio

[![Portfolio Quality CI](https://github.com/mmy-lana/cv-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mmy-lana/cv-portfolio/actions)
![Angular](https://img.shields.io/badge/Angular-v21.2-dd0031?style=for-the-badge&logo=angular)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.9-3178c6?style=for-the-badge&logo=typescript)
![WCAG 2.1 AA](<https://img.shields.io/badge/WCAG_2.1_AA-axe_Tested_(0_violations)-success?style=for-the-badge>)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Live Demo:** [https://www.mmylana.my.id](https://www.mmylana.my.id)

An enterprise-grade, multi-themed developer portfolio built with **Modern Angular v21**, **Zoneless Signals**, **Tailwind CSS v4**, **WebGL Shaders**, and **Atomic Component Architecture**. Single CV content engine rendered across **9 distinct UI/UX theme presets** (18 sub-modes total), cross-linked into a fully interlinked production ecosystem of live project catalogs and engineering deep-dives.

---

## Theme Architecture & Presets

|   #    | Theme Name             | Light Mode Preset | Dark Mode Preset | Key Visual Feature                                               |
| :----: | :--------------------- | :---------------- | :--------------- | :--------------------------------------------------------------- |
| **01** | **Minimalist Clean**   | Paper Light       | Onyx Dark        | Crisp typography, ATS-friendly print styles                      |
| **02** | **Cyberpunk Neon**     | Matrix Day        | Neon Night       | Matrix green digital rain canvas & glitch effects                |
| **03** | **Glassmorphism**      | Frosted Crystal   | Obsidian Glass   | Soft glass UI, ambient floating spheres & glare spotlight        |
| **04** | **Eclipse Minimal**    | Solar Minimal     | Lunar Pitch      | Linear.app style cursor-tracking radial illumination             |
| **05** | **Retro Computer**     | IBM Cream 1984    | Hacker Terminal  | Interactive CLI terminal prompt & MS-DOS window frame            |
| **06** | **Gradient Flow**      | Sunrise Mesh      | Aurora Borealis  | 3D WebGL liquid mesh shader canvas (sustained ~60 FPS animation) |
| **07** | **Sidebar Navigation** | Enterprise Light  | Executive Dark   | Collapsible dashboard sidebar & hotkey shortcuts (`1`-`6`)       |
| **08** | **Parallax Scrolling** | Horizon Light     | Deep Space       | GSAP ScrollTrigger multi-layered depth & 3D cursor tilt          |
| **09** | **Timeline Style**     | Blueprint White   | Charcoal Journey | Scroll-synchronized animated SVG career path line                |

---

## Production Ecosystem & Platforms

This CV hub is the **control plane** of a fully interlinked, cross-navigable ecosystem of live platforms:

| Platform                             | URL                                                                      | Content                                        |
| :----------------------------------- | :----------------------------------------------------------------------- | :--------------------------------------------- |
| **CV Portfolio Hub** (Active Domain) | [https://www.mmylana.my.id](https://www.mmylana.my.id)                   | 9 Architecture Theme Presets — this repository |
| **Flagship Project Catalog**         | [https://portfolio.mmylana.my.id](https://portfolio.mmylana.my.id)       | 110+ Web Applications & Diagnostics            |
| **Under The Hood Hub**               | [https://underthehood.mmylana.my.id](https://underthehood.mmylana.my.id) | 285+ Deep-Dive Architectural Concepts          |

Every theme preset exposes cross-linked navigation to the **Flagship Project Catalog** and the **Under The Hood Hub** — via the global navbar, the mobile slide-out drawer, and the sidebar navigation ecosystem section — forming a single navigable mesh of portfolios, diagnostics, and engineering deep-dives. The live ecosystem badges (project catalog / under-the-hood) are also surfaced inside the **Holographic Developer Dossier** modal on the home gate.

---

## Key Technical Features

- **Angular 21 Primitives:** Built with Standalone Components, reactive `signal()`, `input()`, `output()`, and `@defer (on viewport)` lazy-loading blocks with linear shimmer loading skeletons.
- **Zoneless & High-FPS Canvas Execution:** 3D WebGL shaders and canvas particle loops run outside Angular change detection (`NgZone.runOutsideAngular`) so animation work stays off the change-detection path and sustains ~60 FPS animation on typical hardware.
- **Interactive CLI Terminal:** Fully functional retro command parser (`cat experience`, `cat skills`, `help`, `clear`, `download-cv`).
- **Internationalization (i18n):** Instant translation switching between English (`EN`), Bahasa Indonesia (`ID`), and Basa Sunda (`SU`), plus a system-language `AUTO` mode, powered by `@ngx-translate`.
- **Accessibility & SEO:** Keyboard navigation with skip links and a focus-managed dossier dialog (`Tab` / `focus-visible` rings), `prefers-reduced-motion` support (including static canvas frames), Open-Graph social cards, `sitemap.xml`, and `schema.org/Person` JSON-LD structured data. Accessibility is verified by automated axe-core scans (WCAG 2.0/2.1 A+AA rule sets — 0 violations across 10 routes × 3 language/mode states × 2 devices); full WCAG 2.1 AA conformance has **not** been manually certified.
- **Unified Vector Icon System:** Every glyph — theme mode, navigation, sort toggles, and live ecosystem badges — is rendered by a single `app-cv-icon` atom with standardized Lucide-grade SVG paths (`viewBox 24x24`, `stroke="currentColor"`), inheriting color across all 9 theme presets and 18 sub-modes with zero emoji artifacts.
- **Ecosystem Interlinking:** Native cross-navigation to the Flagship Project Catalog (110+ apps & diagnostics) and the Under The Hood engineering hub (285+ deep-dive topics) from every theme preset, mobile drawer, and dossier modal.
- **Automated Testing Pipelines:** Comprehensive Playwright E2E accessibility suite (`@axe-core/playwright`) plus Lighthouse CI auditing of the production build artifact, integrated with GitHub Actions.

---

## 🛠️ Tech Stack

- **Framework:** [Angular v21](https://angular.dev) (Standalone, Signals, Functional Resolvers)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (CSS Variables, Modern `@theme`)
- **Graphics & Motion:** WebGL GLSL Shaders, HTML5 Canvas 2D, GSAP ScrollTrigger
- **Testing & QA:** [Playwright E2E](https://playwright.dev), `@axe-core/playwright` (WCAG 2.0/2.1 A+AA rule sets), [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- **Localization:** `@ngx-translate/core` & `@ngx-translate/http-loader`
- **Language:** TypeScript 5.9

---

## Local Development Setup

### Prerequisites

- **Node.js:** `>= 20.17.0` (or `>= 22.9.0` — required by the pinned `packageManager: npm@11`)
- **npm:** `>= 10.0.0`

### Installation & Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mmy-lana/cv-portfolio.git
   cd cv-portfolio
   ```

2. **Install dependencies & Playwright browser:**

   ```bash
   npm install
   npx playwright install chromium
   ```

3. **Start local dev server:**

   ```bash
   npm start
   ```

   Navigate to `http://localhost:4200/`.

4. **Run Automated Audits & E2E Tests:**

   ```bash
   # Run Playwright WCAG 2.1 AA Accessibility & Contrast Suite across all 9 themes
   npm run test:e2e

   # Run Lighthouse CI Performance & Core Web Vitals Audit against the production
   # build artifact in dist/ (see lighthouserc.json). For a manual audit of the
   # deployed site instead, run: npx lighthouse https://www.mmylana.my.id --view
   npm run test:lighthouse
   ```

5. **Production Build:**
   ```bash
   npm run build
   ```

---

## Author & License

Developed by **Muhammad Maulana Yusuf**

- **Website:** [https://www.mmylana.my.id](https://www.mmylana.my.id)
- **GitHub:** [@mmy-lana](https://github.com/mmy-lana)
- **LinkedIn:** [muhammad-maulana-yusuf](https://linkedin.com/in/muhammad-maulana-yusuf)

Distributed under the **MIT License**.
