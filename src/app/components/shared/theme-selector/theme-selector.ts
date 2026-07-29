import { Component, signal, HostListener, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService, ThemeConfig } from '../../../services/theme.service';
import { CvIcon, CvIconName } from '../atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [TranslateModule, CvIcon],
  templateUrl: './theme-selector.html'
})
export class ThemeSelector {
  @Input() position: 'down' | 'up' = 'down';
  @Input() align: 'left' | 'right' = 'right';
  isOpen = signal<boolean>(false);

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  getThemeIcon(themeId: string): CvIconName {
    const iconMap: Record<string, CvIconName> = {
      minimalist: 'file-text',
      cyberpunk: 'zap',
      glassmorphism: 'layers',
      dark: 'moon',
      'retro-computer': 'terminal',
      'gradient-flow': 'palette',
      'sidebar-navigation': 'sidebar',
      'parallax-scrolling': 'image',
      'timeline-style': 'clock'
    };
    return iconMap[themeId] || 'file-text';
  }

  toggleDropdown(): void {
    this.isOpen.update(val => !val);
  }

  selectTheme(theme: ThemeConfig): void {
    this.themeService.setTheme(theme.id);
    this.isOpen.set(false);
    
    // Smoothly route to the newly selected theme page
    this.router.navigate([theme.id]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Safely auto-close dropdown when clicking outside component coordinates
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    this.isOpen.set(false);
  }
}