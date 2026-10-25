import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  const THEME_KEY = 'preferred-theme';
  const MODE_KEY = 'preferred-mode';

  function createService(): ThemeService {
    return TestBed.inject(ThemeService);
  }

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
  });

  it('exposes 9 themes with unique ids', () => {
    const service = createService();
    const ids = service.themes.map((t) => t.id);
    expect(ids.length).toBe(9);
    expect(new Set(ids).size).toBe(9);
    expect(ids).toEqual([
      'minimalist',
      'cyberpunk',
      'glassmorphism',
      'dark',
      'retro-computer',
      'gradient-flow',
      'sidebar-navigation',
      'parallax-scrolling',
      'timeline-style',
    ]);
  });

  it('defaults to the minimalist theme in light mode', () => {
    const service = createService();
    expect(service.currentTheme()).toBe('minimalist');
    expect(service.isDarkMode()).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('minimalist');
  });

  it('setTheme switches theme and updates the document data-theme attribute', () => {
    const service = createService();
    service.setTheme('cyberpunk');
    expect(service.currentTheme()).toBe('cyberpunk');
    expect(document.documentElement.getAttribute('data-theme')).toBe('cyberpunk');
  });

  it('setTheme persists the preference to localStorage', () => {
    const service = createService();
    service.setTheme('glassmorphism');
    expect(localStorage.getItem(THEME_KEY)).toBe('glassmorphism');
  });

  it('setTheme applies the theme default mode (dark themes start dark)', () => {
    const service = createService();
    service.setTheme('cyberpunk');
    expect(service.isDarkMode()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('setTheme ignores unknown theme ids without touching state', () => {
    const service = createService();
    service.setTheme('minimalist');
    service.setTheme('not-a-theme');
    expect(service.currentTheme()).toBe('minimalist');
    expect(localStorage.getItem(THEME_KEY)).toBe('minimalist');
  });

  it('setTheme honors a persisted explicit mode over the theme default', () => {
    localStorage.setItem(MODE_KEY, 'dark');
    const service = createService();
    service.setTheme('minimalist');
    expect(service.isDarkMode()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggleGlobalDarkMode flips the mode and persists it', () => {
    const service = createService();
    expect(service.isDarkMode()).toBe(false);
    service.toggleGlobalDarkMode();
    expect(service.isDarkMode()).toBe(true);
    expect(localStorage.getItem(MODE_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('toggleGlobalDarkMode twice returns to the original mode', () => {
    const service = createService();
    const initial = service.isDarkMode();
    service.toggleGlobalDarkMode();
    service.toggleGlobalDarkMode();
    expect(service.isDarkMode()).toBe(initial);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe('light');
  });

  it('restores a persisted valid theme at construction', () => {
    localStorage.setItem(THEME_KEY, 'timeline-style');
    const service = createService();
    expect(service.currentTheme()).toBe('timeline-style');
  });

  it('falls back to minimalist for a persisted invalid theme', () => {
    localStorage.setItem(THEME_KEY, 'legacy-theme');
    const service = createService();
    expect(service.currentTheme()).toBe('minimalist');
  });
});
