import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../../services/language.service';
import { ThemeSelector } from '../../../../shared/theme-selector/theme-selector';
import { CvIcon } from '../../../../shared/atoms/cv-icon/cv-icon';

export type DashboardSection = 'about' | 'experience' | 'skills' | 'education' | 'certificates' | 'contact';

export interface NavItem {
  id: DashboardSection;
  labelKey: string;
  icon: any;
  shortcut: string;
}

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [TranslateModule, ThemeSelector, CvIcon],
  templateUrl: './dashboard-sidebar.html'
})
export class DashboardSidebar {
  activeSection = input.required<DashboardSection>();
  isCollapsed = input.required<boolean>();
  isMobileOpen = input.required<boolean>();

  sectionSelect = output<DashboardSection>();
  toggleCollapse = output<void>();
  toggleMobile = output<void>();
  downloadCv = output<void>();

  navItems: NavItem[] = [
    { id: 'about', labelKey: 'about.name', icon: 'gpa', shortcut: '1' },
    { id: 'experience', labelKey: 'experience.title', icon: 'calendar', shortcut: '2' },
    { id: 'skills', labelKey: 'skills.title', icon: 'arrow-right', shortcut: '3' },
    { id: 'education', labelKey: 'education.title', icon: 'gpa', shortcut: '4' },
    { id: 'certificates', labelKey: 'certificates.title', icon: 'gpa', shortcut: '5' },
    { id: 'contact', labelKey: 'contact.title', icon: 'email', shortcut: '6' }
  ];

  constructor(
    public lang: LanguageService,
    private router: Router
  ) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSelect(id: DashboardSection): void {
    this.sectionSelect.emit(id);
  }

  onToggleCollapse(): void {
    this.toggleCollapse.emit();
  }

  onToggleMobile(): void {
    this.toggleMobile.emit();
  }

  onDownloadCv(): void {
    this.downloadCv.emit();
  }

  toggleLanguage(): void {
    this.lang.toggle();
  }
}