import { Component, OnInit, AfterViewInit, OnDestroy, inject, signal, HostListener, NgZone } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { FaviconService } from '../../../services/favicon.service';
import { DownloadCvBtnComponent } from '../../shared/atoms/download-cv-btn/download-cv-btn';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';
import { DashboardSidebar, DashboardSection } from './components/dashboard-sidebar/dashboard-sidebar';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    DownloadCvBtnComponent,
    CvExperienceCard,
    CvIcon,
    DashboardSidebar
  ],
  templateUrl: './sidebar-navigation.html'
})
export class SidebarNavigation implements OnInit, AfterViewInit, OnDestroy {
  public themeService = inject(ThemeService);
  private faviconService = inject(FaviconService);
  private ngZone = inject(NgZone);

  activeSection = signal<DashboardSection>('about');
  isCollapsed = signal<boolean>(false);
  isMobileOpen = signal<boolean>(false);

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.themeService.setTheme('sidebar-navigation');
    this.faviconService.setFavicon('sidebar-navigation');
  }

  ngAfterViewInit(): void {
    this.initScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initScrollSpy(): void {
    this.ngZone.runOutsideAngular(() => {
      const sections: DashboardSection[] = ['about', 'experience', 'skills', 'education', 'certificates', 'contact'];

      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as DashboardSection;
            this.ngZone.run(() => {
              this.activeSection.set(id);
            });
          }
        });
      }, options);

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          this.observer?.observe(el);
        }
      });
    });
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