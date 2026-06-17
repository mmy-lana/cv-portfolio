import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-nav',
  standalone: true,
  templateUrl: './theme-nav.html',
  imports: [TranslateModule],
})
export class ThemeNav {
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

  toggleLang() {
    this.lang.toggle();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop = window.scrollY > 300;
  }
}