import { Component, signal, inject, output, HostListener } from '@angular/core';
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
    CvIcon
  ],
})
export class ThemeNav {
  public themeService = inject(ThemeService);
  public lang = inject(LanguageService);
  private router = inject(Router);

  sectionSelect = output<string>();
  menuOpen = signal<boolean>(false);
  showScrollTop = signal<boolean>(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScrollTop.set(window.scrollY > 300);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sections = [
    { id: 'about', label: 'about.name' },
    { id: 'experience', label: 'experience.title' },
    { id: 'skills', label: 'skills.title' },
    { id: 'education', label: 'education.title' },
    { id: 'certificates', label: 'certificates.title' },
    { id: 'contact', label: 'contact.title' }
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
    this.menuOpen.update(v => !v);
  }
}