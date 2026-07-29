import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FaviconService } from '../../services/favicon.service';
import { ThemeService } from '../../services/theme.service';
import { GlobalNavbarComponent } from '../shared/molecules/global-navbar/global-navbar';
import { CvPresetBadgeComponent } from '../shared/atoms/cv-preset-badge/cv-preset-badge';
import { CvIcon, CvIconName } from '../shared/atoms/cv-icon/cv-icon';

export interface ThemePreset {
  id: string;
  iconName: CvIconName;
  lightPreset: string;
  darkPreset: string;
}

@Component({
  selector: 'app-home-gate',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    GlobalNavbarComponent,
    CvPresetBadgeComponent,
    CvIcon
  ],
  templateUrl: './home-gate.html'
})
export class HomeGate {
  hoveredTheme = signal<string | null>(null);

  themes: ThemePreset[] = [
    { id: 'minimalist', iconName: 'file-text', lightPreset: 'Paper Light', darkPreset: 'Onyx Dark' },
    { id: 'cyberpunk', iconName: 'zap', lightPreset: 'Matrix Day', darkPreset: 'Neon Night' },
    { id: 'glassmorphism', iconName: 'layers', lightPreset: 'Frosted Crystal', darkPreset: 'Obsidian Glass' },
    { id: 'dark', iconName: 'moon', lightPreset: 'Solar Minimal', darkPreset: 'Lunar Pitch' },
    { id: 'retro-computer', iconName: 'terminal', lightPreset: 'IBM Cream 1984', darkPreset: 'Hacker Terminal' },
    { id: 'gradient-flow', iconName: 'palette', lightPreset: 'Sunrise Mesh', darkPreset: 'Aurora Borealis' },
    { id: 'sidebar-navigation', iconName: 'sidebar', lightPreset: 'Enterprise Light', darkPreset: 'Executive Dark' },
    { id: 'parallax-scrolling', iconName: 'image', lightPreset: 'Horizon Light', darkPreset: 'Deep Space' },
    { id: 'timeline-style', iconName: 'clock', lightPreset: 'Blueprint White', darkPreset: 'Charcoal Journey' }
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