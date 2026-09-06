import { Component, input, output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../../services/language.service';
import { ThemeService } from '../../../../../services/theme.service';
import { ThemeSelector } from '../../../../shared/theme-selector/theme-selector';
import { LanguageToggleComponent } from '../../../../shared/atoms/language-toggle/language-toggle';
import { ThemeModeToggleComponent } from '../../../../shared/atoms/theme-mode-toggle/theme-mode-toggle';
import { CvIcon } from '../../../../shared/atoms/cv-icon/cv-icon';
import { CvLogoComponent } from '../../../../shared/atoms/cv-logo/cv-logo';

export type DashboardSection = 'about' | 'experience' | 'skills' | 'education' | 'certificates' | 'contact';

import { CvIconName } from '../../../../shared/atoms/cv-icon/cv-icon';

export interface NavItem {
  id: DashboardSection;
  labelKey: string;
  icon: CvIconName;
  shortcut: string;
}

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [
    TranslateModule,
    ThemeSelector,
    LanguageToggleComponent,
    ThemeModeToggleComponent,
    CvIcon,
    CvLogoComponent
  ],
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

  public themeService = inject(ThemeService);
  public lang = inject(LanguageService);
  private router = inject(Router);

  navItems: NavItem[] = [
    { id: 'about', labelKey: 'about.name', icon: 'gpa', shortcut: '1' },
    { id: 'experience', labelKey: 'experience.title', icon: 'calendar', shortcut: '2' },
    { id: 'skills', labelKey: 'skills.title', icon: 'arrow-right', shortcut: '3' },
    { id: 'education', labelKey: 'education.title', icon: 'gpa', shortcut: '4' },
    { id: 'certificates', labelKey: 'certificates.title', icon: 'gpa', shortcut: '5' },
    { id: 'contact', labelKey: 'contact.title', icon: 'email', shortcut: '6' }
  ];

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
}