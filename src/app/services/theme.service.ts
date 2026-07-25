import { inject, Injectable, signal } from '@angular/core';
import { FaviconService } from './favicon.service';

export interface ThemeConfig {
  id: string;
  icon: string;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'preferred-theme';
  
  // Supported CV Themes matching en.json keys and layouts
  readonly themes: ThemeConfig[] = [
    { id: 'minimalist', icon: '📄', isDark: false },
    { id: 'cyberpunk', icon: '⚡', isDark: true },
    { id: 'glassmorphism', icon: '🪟', isDark: true },
    { id: 'dark', icon: '🌙', isDark: true },
    { id: 'retro-computer', icon: '🖥️', isDark: true },
    { id: 'gradient-flow', icon: '🎨', isDark: true },
    { id: 'sidebar-navigation', icon: '📋', isDark: false },
    { id: 'parallax-scrolling', icon: '🖼️', isDark: true },
    { id: 'timeline-style', icon: '⏱️', isDark: false }
  ];

  // Angular signal to provide reactive theme updates across the application shell
  currentTheme = signal<string>('minimalist');

  constructor() {
    this.initializeTheme();
  }

  private faviconService = inject(FaviconService);

  setTheme(themeId: string): void {
    const targetTheme = this.themes.find(t => t.id === themeId);
    if (!targetTheme) return;

    this.currentTheme.set(themeId);
    localStorage.setItem(this.STORAGE_KEY, themeId);
    this.applyThemeToDOM(targetTheme);
    this.faviconService.setFavicon(themeId);
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    const isValid = savedTheme && this.themes.some(t => t.id === savedTheme);
    const initialThemeId = isValid ? savedTheme! : 'minimalist';
    
    const initialTheme = this.themes.find(t => t.id === initialThemeId)!;
    this.currentTheme.set(initialThemeId);
    this.applyThemeToDOM(initialTheme);
  }

  private applyThemeToDOM(theme: ThemeConfig): void {
    const root = document.documentElement;
    
    // Set both the data-theme attribute for CSS attribute selectors and tailwind utilities
    root.setAttribute('data-theme', theme.id);
    
    // Synchronize global html class list for robust standard dark-mode adjustments
    if (theme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}