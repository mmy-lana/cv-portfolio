import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';

import { HomeGate } from './components/home-gate/home-gate';
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

export const routes: Routes = [
  { path: '', component: HomeGate },
  {
    path: 'minimalist',
    resolve: { theme: themeResolver },
    data: { themeId: 'minimalist' },
    loadComponent: () => import('./components/themes/minimalist/minimalist').then(m => m.Minimalist)
  },
  {
    path: 'cyberpunk',
    resolve: { theme: themeResolver },
    data: { themeId: 'cyberpunk' },
    loadComponent: () => import('./components/themes/cyberpunk/cyberpunk').then(m => m.Cyberpunk)
  },
  {
    path: 'glassmorphism',
    resolve: { theme: themeResolver },
    data: { themeId: 'glassmorphism' },
    loadComponent: () => import('./components/themes/glassmorphism/glassmorphism').then(m => m.Glassmorphism)
  },
  {
    path: 'dark',
    resolve: { theme: themeResolver },
    data: { themeId: 'dark' },
    loadComponent: () => import('./components/themes/dark/dark').then(m => m.Dark)
  },
  {
    path: 'retro-computer',
    resolve: { theme: themeResolver },
    data: { themeId: 'retro-computer' },
    loadComponent: () => import('./components/themes/retro-computer/retro-computer').then(m => m.RetroComputer)
  },
  {
    path: 'gradient-flow',
    resolve: { theme: themeResolver },
    data: { themeId: 'gradient-flow' },
    loadComponent: () => import('./components/themes/gradient-flow/gradient-flow').then(m => m.GradientFlow)
  },
  {
    path: 'sidebar-navigation',
    resolve: { theme: themeResolver },
    data: { themeId: 'sidebar-navigation' },
    loadComponent: () => import('./components/themes/sidebar-navigation/sidebar-navigation').then(m => m.SidebarNavigation)
  },
  {
    path: 'parallax-scrolling',
    resolve: { theme: themeResolver },
    data: { themeId: 'parallax-scrolling' },
    loadComponent: () => import('./components/themes/parallax-scrolling/parallax-scrolling').then(m => m.ParallaxScrolling)
  },
  {
    path: 'timeline-style',
    resolve: { theme: themeResolver },
    data: { themeId: 'timeline-style' },
    loadComponent: () => import('./components/themes/timeline-style/timeline-style').then(m => m.TimelineStyle)
  },
];