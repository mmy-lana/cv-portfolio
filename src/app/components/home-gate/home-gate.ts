import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FaviconService } from '../../services/favicon.service';
import { ThemeService } from '../../services/theme.service';
import { GlobalNavbarComponent } from '../shared/molecules/global-navbar/global-navbar';

export interface ThemePreset {
  id: string;
  icon: string;
  lightPreset: string;
  darkPreset: string;
}

@Component({
  selector: 'app-home-gate',
  standalone: true,
  imports: [TranslateModule, GlobalNavbarComponent],
  templateUrl: './home-gate.html'
})
export class HomeGate {
  hoveredTheme = signal<string | null>(null);

  themes: ThemePreset[] = [
    { id: 'minimalist', icon: '📄', lightPreset: 'Paper Light', darkPreset: 'Onyx Dark' },
    { id: 'cyberpunk', icon: '⚡', lightPreset: 'Matrix Day', darkPreset: 'Neon Night' },
    { id: 'glassmorphism', icon: '🪟', lightPreset: 'Frosted Crystal', darkPreset: 'Obsidian Glass' },
    { id: 'dark', icon: '🌙', lightPreset: 'Solar Minimal', darkPreset: 'Lunar Pitch' },
    { id: 'retro-computer', icon: '🖥️', lightPreset: 'IBM Cream 1984', darkPreset: 'Hacker Terminal' },
    { id: 'gradient-flow', icon: '🎨', lightPreset: 'Sunrise Mesh', darkPreset: 'Aurora Borealis' },
    { id: 'sidebar-navigation', icon: '📋', lightPreset: 'Enterprise Light', darkPreset: 'Executive Dark' },
    { id: 'parallax-scrolling', icon: '🖼️', lightPreset: 'Horizon Light', darkPreset: 'Deep Space' },
    { id: 'timeline-style', icon: '⏱️', lightPreset: 'Blueprint White', darkPreset: 'Charcoal Journey' }
  ];

  constructor(
    private router: Router,
    private faviconService: FaviconService,
    public themeService: ThemeService
  ) {}

  goToTheme(id: string): void {
    this.router.navigate([id]);
  }

  onMouseEnter(id: string): void {
    this.hoveredTheme.set(id);
    this.faviconService.setFavicon(id);
  }

  onMouseLeave(): void {
    this.hoveredTheme.set(null);
    this.faviconService.setFavicon('minimalist');
  }

  onCardMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty('--card-x', `${x}px`);
    target.style.setProperty('--card-y', `${y}px`);
  }
}