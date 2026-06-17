import { Routes } from '@angular/router';

import { HomeGate } from './components/home-gate/home-gate';

import { Minimalist } from './components/themes/minimalist/minimalist';
import { Cyberpunk } from './components/themes/cyberpunk/cyberpunk';
import { Glassmorphism } from './components/themes/glassmorphism/glassmorphism';
import { Dark } from './components/themes/dark/dark';
import { RetroComputer } from './components/themes/retro-computer/retro-computer';
import { GradientFlow } from './components/themes/gradient-flow/gradient-flow';
import { SidebarNavigation } from './components/themes/sidebar-navigation/sidebar-navigation';
import { ParallaxScrolling } from './components/themes/parallax-scrolling/parallax-scrolling';
import { TimelineStyle } from './components/themes/timeline-style/timeline-style';

export const routes: Routes = [
  { path: '', component: HomeGate },
  {
    path: 'minimalist',
    loadComponent: () => import('./components/themes/minimalist/minimalist').then(m => m.Minimalist)
  },
  {
    path: 'cyberpunk',
    loadComponent: () => import('./components/themes/cyberpunk/cyberpunk').then(m => m.Cyberpunk)
  },
  {
    path: 'glassmorphism',
    loadComponent: () => import('./components/themes/glassmorphism/glassmorphism').then(m => m.Glassmorphism)
  },
  {
    path: 'dark',
    loadComponent: () => import('./components/themes/dark/dark').then(m => m.Dark)
  },
  {
    path: 'retro-computer',
    loadComponent: () => import('./components/themes/retro-computer/retro-computer').then(m => m.RetroComputer)
  },
  {
    path: 'gradient-flow',
    loadComponent: () => import('./components/themes/gradient-flow/gradient-flow').then(m => m.GradientFlow)
  },
  {
    path: 'sidebar-navigation',
    loadComponent: () => import('./components/themes/sidebar-navigation/sidebar-navigation').then(m => m.SidebarNavigation)
  },
  {
    path: 'parallax-scrolling',
    loadComponent: () => import('./components/themes/parallax-scrolling/parallax-scrolling').then(m => m.ParallaxScrolling)
  },
  {
    path: 'timeline-style',
    loadComponent: () => import('./components/themes/timeline-style/timeline-style').then(m => m.TimelineStyle)
  },
];