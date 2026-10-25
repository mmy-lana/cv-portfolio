import { Component, signal, inject, output, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { LanguageService } from '../../../services/language.service';
import { LanguageToggleComponent } from '../atoms/language-toggle/language-toggle';
import { ThemeModeToggleComponent } from '../atoms/theme-mode-toggle/theme-mode-toggle';
import { DownloadCvBtnComponent } from '../atoms/download-cv-btn/download-cv-btn';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { CvIcon } from '../atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-theme-nav',
  standalone: true,
  templateUrl: './theme-nav.html',
  imports: [
    TranslateModule,
    LanguageToggleComponent,
    ThemeModeToggleComponent,
    DownloadCvBtnComponent,
    ThemeSelector,
    CvIcon,
  ],
})
export class ThemeNav {
  public themeService = inject(ThemeService);
  public lang = inject(LanguageService);
  private router = inject(Router);
  private document = inject(DOCUMENT);

  sectionSelect = output<string>();
  menuOpen = signal<boolean>(false);
  showScrollTop = signal<boolean>(false);

  // Skip link target: move keyboard focus past the sticky navigation into the page
  // content (WCAG 2.4.1 Bypass Blocks). Falls back to the first content section on
  // theme pages that do not render a <main> landmark.
  skipToContent(event: Event): void {
    event.preventDefault();
    const target =
      this.document.querySelector<HTMLElement>('main') ??
      this.document.querySelector<HTMLElement>('section');
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScrollTop.set(window.scrollY > 300);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sections = [
    { id: 'about', label: 'nav.about' },
    { id: 'experience', label: 'nav.experience' },
    { id: 'skills', label: 'nav.skills' },
    { id: 'education', label: 'nav.education' },
    { id: 'certificates', label: 'nav.certificates' },
    { id: 'contact', label: 'nav.contact' },
  ];

  goHome(): void {
    this.router.navigate(['/']);
  }

  scrollTo(id: string): void {
    this.sectionSelect.emit(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
