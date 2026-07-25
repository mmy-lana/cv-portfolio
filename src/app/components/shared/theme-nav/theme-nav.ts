import { Component, HostListener, output } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { CvButton } from '../atoms/cv-button/cv-button';
import { CvIcon } from '../atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-theme-nav',
  standalone: true,
  templateUrl: './theme-nav.html',
  imports: [TranslateModule, ThemeSelector, CvButton, CvIcon],
})
export class ThemeNav {
  sectionSelect = output<string>();

  constructor(
    private router: Router,
    public lang: LanguageService
  ) { }

  sections = [
    { id: 'about', label: 'about.name' },
    { id: 'experience', label: 'experience.title' },
    { id: 'skills', label: 'skills.title' },
    { id: 'education', label: 'education.title' },
    { id: 'certificates', label: 'certificates.title' },
    { id: 'contact', label: 'contact.title' }
  ];

  activeSection = 'about';
  menuOpen = false;
  showScrollTop = false;

  toggleLang(): void {
    this.lang.toggle();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  scrollTo(id: string): void {
    this.sectionSelect.emit(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.activeSection = id;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScrollTop = window.scrollY > 300;
    
    // Auto-update active section indicator on scroll coordinate match
    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          this.activeSection = section.id;
          break;
        }
      }
    }
  }
}