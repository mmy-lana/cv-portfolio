import { Component, OnInit, signal, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';
import { DashboardSidebar, DashboardSection } from './components/dashboard-sidebar/dashboard-sidebar';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [TranslateModule, RouterModule, CvExperienceCard, CvIcon, DashboardSidebar],
  templateUrl: './sidebar-navigation.html'
})
export class SidebarNavigation implements OnInit {
  activeSection = signal<DashboardSection>('about');
  isCollapsed = signal<boolean>(false);
  isMobileOpen = signal<boolean>(false);

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme('sidebar-navigation');
  }

  toggleSidebar(): void {
    this.isCollapsed.update(v => !v);
  }

  toggleMobileMenu(): void {
    this.isMobileOpen.update(v => !v);
  }

  selectSection(id: DashboardSection): void {
    this.activeSection.set(id);
    this.isMobileOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcuts(event: KeyboardEvent): void {
    if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) return;

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'd') {
      event.preventDefault();
      this.downloadCV();
      return;
    }

    const keyMap: Record<string, DashboardSection> = {
      '1': 'about',
      '2': 'experience',
      '3': 'skills',
      '4': 'education',
      '5': 'certificates',
      '6': 'contact'
    };

    if (keyMap[event.key]) {
      this.selectSection(keyMap[event.key]);
    }
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'assets/cv/CV_Muhammad_Maulana_Yusuf.pdf';
    link.download = 'CV_Muhammad_Maulana_Yusuf.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  }
}