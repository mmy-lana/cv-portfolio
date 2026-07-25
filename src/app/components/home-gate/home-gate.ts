import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FaviconService } from '../../services/favicon.service';
import { LanguageService } from '../../services/language.service';
import { ThemeSelector } from '../shared/theme-selector/theme-selector';
import { CvIcon } from '../shared/atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-home-gate',
  standalone: true,
  imports: [TranslateModule, ThemeSelector, CvIcon],
  templateUrl: './home-gate.html'
})
export class HomeGate {
  hoveredTheme = signal<string | null>(null);

  themes = [
    { id: 'minimalist', icon: '📄', tags: ['Clean', 'Modern'] },
    { id: 'cyberpunk', icon: '⚡', tags: ['Neon', 'Dark'] },
    { id: 'glassmorphism', icon: '🪟', tags: ['Glass', 'Modern'] },
    { id: 'dark', icon: '🌙', tags: ['Dark', 'Elegant'] },
    { id: 'retro-computer', icon: '🖥️', tags: ['Retro', 'Terminal'] },
    { id: 'gradient-flow', icon: '🎨', tags: ['Gradient'] },
    { id: 'sidebar-navigation', icon: '📋', tags: ['Sidebar'] },
    { id: 'parallax-scrolling', icon: '🖼️', tags: ['Parallax'] },
    { id: 'timeline-style', icon: '⏱️', tags: ['Timeline'] }
  ];

  constructor(
    private router: Router,
    private faviconService: FaviconService,
    public lang: LanguageService
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

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    target.style.setProperty('--tilt-x', `${rotateX}deg`);
    target.style.setProperty('--tilt-y', `${rotateY}deg`);
  }

  toggleLanguage(): void {
    this.lang.toggle();
  }
}