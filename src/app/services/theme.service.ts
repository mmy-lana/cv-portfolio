import { inject, Injectable, signal } from '@angular/core';
import { FaviconService } from './favicon.service';

import { CvIconName } from '../components/shared/atoms/cv-icon/cv-icon';

export interface ThemeConfig {
  id: string;
  iconName: CvIconName;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'preferred-theme';
  private readonly MODE_KEY = 'preferred-mode';
  
  readonly themes: ThemeConfig[] = [
    { id: 'minimalist', iconName: 'file-text', isDark: false },
    { id: 'cyberpunk', iconName: 'zap', isDark: true },
    { id: 'glassmorphism', iconName: 'layers', isDark: true },
    { id: 'dark', iconName: 'moon', isDark: true },
    { id: 'retro-computer', iconName: 'terminal', isDark: true },
    { id: 'gradient-flow', iconName: 'palette', isDark: true },
    { id: 'sidebar-navigation', iconName: 'sidebar', isDark: false },
    { id: 'parallax-scrolling', iconName: 'image', isDark: true },
    { id: 'timeline-style', iconName: 'clock', isDark: false }
  ];

  currentTheme = signal<string>('minimalist');
  isDarkMode = signal<boolean>(true);

  private faviconService = inject(FaviconService);

  constructor() {
    this.initializeTheme();
  }

  toggleGlobalDarkMode(): void {
    this.isDarkMode.update(v => {
      const nextMode = !v;
      localStorage.setItem(this.MODE_KEY, nextMode ? 'dark' : 'light');
      this.applyModeToDOM(nextMode);
      return nextMode;
    });
  }

  setTheme(themeId: string): void {
    const targetTheme = this.themes.find(t => t.id === themeId);
    if (!targetTheme) return;

    this.currentTheme.set(themeId);
    localStorage.setItem(this.THEME_KEY, themeId);

    // Respect user's explicit light/dark choice across route switches
    const savedMode = localStorage.getItem(this.MODE_KEY);
    const isDark = savedMode ? savedMode === 'dark' : targetTheme.isDark;

    this.isDarkMode.set(isDark);
    this.applyThemeToDOM(themeId, isDark);
    this.faviconService.setFavicon(themeId);
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const isValid = savedTheme && this.themes.some(t => t.id === savedTheme);
    const initialThemeId = isValid ? savedTheme! : 'minimalist';
    
    this.setTheme(initialThemeId);
  }

  private applyThemeToDOM(themeId: string, isDark: boolean): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeId);
    this.applyModeToDOM(isDark);
  }

  private applyModeToDOM(isDark: boolean): void {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }
}