import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { HomeGate } from './components/home-gate/home-gate';
import { NotFound } from './components/not-found/not-found';
import { ThemeService } from './services/theme.service';
import { FaviconService } from './services/favicon.service';

export const themeResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const themeId = route.data['themeId'];
  if (themeId) {
    inject(ThemeService).setTheme(themeId);
    inject(FaviconService).setFavicon(themeId);
  }
  return true;
};

/** Per-route document metadata so each URL presents a unique title/description. */
const routeMeta: Record<string, { title: string; description: string }> = {
  '': {
    title: 'Muhammad Maulana Yusuf — Frontend Developer',
    description:
      'Experienced Frontend Developer specializing in Angular, React, TypeScript, and microfrontend systems.',
  },
  minimalist: {
    title: 'Minimalist Clean CV — Muhammad Maulana Yusuf',
    description:
      'ATS-friendly minimalist CV layout with crisp typography in paper-light and onyx-dark presets — one CV rendered across nine interactive themes.',
  },
  cyberpunk: {
    title: 'Cyberpunk Neon CV — Muhammad Maulana Yusuf',
    description:
      'Neon-futuristic CV theme with matrix digital rain, glitch effects, and terminal accents — one CV rendered across nine interactive themes.',
  },
  glassmorphism: {
    title: 'Glassmorphism CV — Muhammad Maulana Yusuf',
    description:
      'Frosted-glass CV theme with ambient floating spheres and a glare spotlight — one CV rendered across nine interactive themes.',
  },
  dark: {
    title: 'Eclipse Minimal Dark CV — Muhammad Maulana Yusuf',
    description:
      'High-contrast minimal CV theme with cursor-tracking radial luminescence — one CV rendered across nine interactive themes.',
  },
  'retro-computer': {
    title: 'Retro Computer CV — Muhammad Maulana Yusuf',
    description:
      'MS-DOS-styled CV theme with an interactive CLI terminal and a working command parser — one CV rendered across nine interactive themes.',
  },
  'gradient-flow': {
    title: 'Gradient Flow CV — Muhammad Maulana Yusuf',
    description:
      'Animated WebGL liquid-mesh gradient CV theme with sunrise and aurora presets — one CV rendered across nine interactive themes.',
  },
  'sidebar-navigation': {
    title: 'Dashboard Sidebar CV — Muhammad Maulana Yusuf',
    description:
      'Enterprise dashboard CV theme with collapsible sidebar navigation and hotkey shortcuts — one CV rendered across nine interactive themes.',
  },
  'parallax-scrolling': {
    title: 'Parallax Scrolling CV — Muhammad Maulana Yusuf',
    description:
      'Scroll-driven CV theme with GSAP ScrollTrigger depth layers and 3D cursor tilt — one CV rendered across nine interactive themes.',
  },
  'timeline-style': {
    title: 'Timeline CV — Muhammad Maulana Yusuf',
    description:
      'Timeline-based CV theme with a scroll-synchronized animated career path — one CV rendered across nine interactive themes.',
  },
  '**': {
    title: 'Page not found — Muhammad Maulana Yusuf',
    description:
      'The page you were looking for does not exist. Browse the nine CV theme presets of Muhammad Maulana Yusuf’s portfolio.',
  },
};

export const metaResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const meta = routeMeta[route.routeConfig?.path ?? ''];
  if (meta) {
    inject(Title).setTitle(meta.title);
    inject(Meta).updateTag({ name: 'description', content: meta.description });
  }
  return true;
};

export const routes: Routes = [
  { path: '', component: HomeGate, resolve: { meta: metaResolver } },
  {
    path: 'minimalist',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'minimalist' },
    loadComponent: () =>
      import('./components/themes/minimalist/minimalist').then((m) => m.Minimalist),
  },
  {
    path: 'cyberpunk',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'cyberpunk' },
    loadComponent: () => import('./components/themes/cyberpunk/cyberpunk').then((m) => m.Cyberpunk),
  },
  {
    path: 'glassmorphism',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'glassmorphism' },
    loadComponent: () =>
      import('./components/themes/glassmorphism/glassmorphism').then((m) => m.Glassmorphism),
  },
  {
    path: 'dark',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'dark' },
    loadComponent: () => import('./components/themes/dark/dark').then((m) => m.Dark),
  },
  {
    path: 'retro-computer',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'retro-computer' },
    loadComponent: () =>
      import('./components/themes/retro-computer/retro-computer').then((m) => m.RetroComputer),
  },
  {
    path: 'gradient-flow',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'gradient-flow' },
    loadComponent: () =>
      import('./components/themes/gradient-flow/gradient-flow').then((m) => m.GradientFlow),
  },
  {
    path: 'sidebar-navigation',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'sidebar-navigation' },
    loadComponent: () =>
      import('./components/themes/sidebar-navigation/sidebar-navigation').then(
        (m) => m.SidebarNavigation,
      ),
  },
  {
    path: 'parallax-scrolling',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'parallax-scrolling' },
    loadComponent: () =>
      import('./components/themes/parallax-scrolling/parallax-scrolling').then(
        (m) => m.ParallaxScrolling,
      ),
  },
  {
    path: 'timeline-style',
    resolve: { theme: themeResolver, meta: metaResolver },
    data: { themeId: 'timeline-style' },
    loadComponent: () =>
      import('./components/themes/timeline-style/timeline-style').then((m) => m.TimelineStyle),
  },
  // Wildcard: render a real not-found view (with navigation) instead of a blank shell.
  { path: '**', component: NotFound, resolve: { meta: metaResolver } },
];
