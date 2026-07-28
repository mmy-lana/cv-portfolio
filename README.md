# ⚡ One CV, 9 Themes — Interactive Developer Portfolio

![Angular](https://img.shields.io/badge/Angular-v21.2-dd0031?style=for-the-badge&logo=angular)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.9-3178c6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Live Demo:** [https://mmylana.my.id](https://mmylana.my.id) *(Live link placeholder)*

An enterprise-grade, multi-themed developer portfolio built with **Modern Angular v21**, **Zoneless Signals**, **Tailwind CSS v4**, **WebGL Shaders**, and **Atomic Component Architecture**. Single CV content engine rendered across **9 distinct UI/UX theme presets** (18 sub-modes total).

---

## 🎨 Theme Architecture & Presets

| # | Theme Name | Light Mode Preset | Dark Mode Preset | Key Visual Feature |
|:-:| :--- | :--- | :--- | :--- |
| **01** | **Minimalist Clean** | Paper Light | Onyx Dark | Crisp typography, ATS-friendly print styles |
| **02** | **Cyberpunk Neon** | Matrix Day | Neon Night | Matrix green digital rain canvas & glitch effects |
| **03** | **Glassmorphism** | Frosted Crystal | Obsidian Glass | Soft glass UI, ambient floating spheres & glare spotlight |
| **04** | **Dark Minimal** | Solar Minimal | Lunar Pitch | Linear.app style cursor-tracking radial illumination |
| **05** | **Retro Computer** | IBM Cream 1984 | Hacker Terminal | Interactive CLI terminal prompt & MS-DOS window frame |
| **06** | **Gradient Flow** | Sunrise Mesh | Aurora Borealis | 60 FPS 3D WebGL liquid mesh shader canvas |
| **07** | **Sidebar Navigation** | Enterprise Light | Executive Dark | Collapsible dashboard sidebar & hotkey shortcuts (`1`-`6`) |
| **08** | **Parallax Scrolling** | Horizon Light | Deep Space | GSAP ScrollTrigger multi-layered depth & 3D cursor tilt |
| **09** | **Timeline Style** | Blueprint White | Charcoal Journey | Scroll-synchronized animated SVG career path line |

---

## 🚀 Key Technical Features

- **Angular 21 Primitives:** Built with Standalone Components, reactive `signal()`, `input()`, `output()`, and `@defer (on viewport)` lazy-loading blocks with linear shimmer loading skeletons.
- **Zoneless & High-FPS Canvas Execution:** 3D WebGL shaders and canvas particle loops run outside Angular change detection (`NgZone.runOutsideAngular`) for guaranteed 60 FPS animation performance.
- **Interactive CLI Terminal:** Fully functional retro command parser (`cat experience`, `cat skills`, `help`, `clear`, `download-cv`).
- **Internationalization (i18n):** Instant translation switching between English (`EN`) and Bahasa Indonesia (`ID`) powered by `@ngx-translate`.
- **Accessibility (WCAG 2.1 AA) & SEO:** Complete keyboard navigation (`Tab` / `focus-visible` rings), `prefers-reduced-motion` settings support, Open-Graph social cards, `sitemap.xml`, and `schema.org/Person` JSON-LD structured data.

---

## 🛠️ Tech Stack

- **Framework:** [Angular v21](https://angular.dev) (Standalone, Signals, Functional Resolvers)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (CSS Variables, Modern `@theme`)
- **Graphics & Motion:** WebGL GLSL Shaders, HTML5 Canvas 2D, GSAP ScrollTrigger
- **Localization:** `@ngx-translate/core` & `@ngx-translate/http-loader`
- **Language:** TypeScript 5.9

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js:** `>= 20.0.0`
- **npm:** `>= 10.0.0`

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mmy-lana/cv-portfolio.git
   cd cv-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local dev server:**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`.

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 📄 Author & License

Developed by **Muhammad Maulana Yusuf**  
- **Website:** [https://mmylana.my.id](https://mmylana.my.id)  
- **GitHub:** [@mmy-lana](https://github.com/mmy-lana)  
- **LinkedIn:** [muhammad-maulana-yusuf](https://linkedin.com/in/muhammad-maulana-yusuf)

Distributed under the **MIT License**.
