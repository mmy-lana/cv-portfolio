import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  inject,
  signal,
  HostListener,
  NgZone,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { DownloadCvBtnComponent } from '../../shared/atoms/download-cv-btn/download-cv-btn';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';
import {
  DashboardSidebar,
  DashboardSection,
} from './components/dashboard-sidebar/dashboard-sidebar';
import { CvPresetBadgeComponent } from '../../shared/atoms/cv-preset-badge/cv-preset-badge';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    DownloadCvBtnComponent,
    CvExperienceCard,
    CvIcon,
    DashboardSidebar,
    CvPresetBadgeComponent,
  ],
  templateUrl: './sidebar-navigation.html',
})
export class SidebarNavigation implements AfterViewInit, OnDestroy {
  public themeService = inject(ThemeService);
  private ngZone = inject(NgZone);

  activeSection = signal<DashboardSection>('about');
  isCollapsed = signal<boolean>(false);
  isMobileOpen = signal<boolean>(false);

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.initScrollSpy();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initScrollSpy(): void {
    this.ngZone.runOutsideAngular(() => {
      const sections: DashboardSection[] = [
        'about',
        'experience',
        'skills',
        'education',
        'certificates',
        'contact',
      ];

      const onScroll = () => {
        const scrollPosition = window.scrollY + 180;

        for (let i = sections.length - 1; i >= 0; i--) {
          const id = sections[i];
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPosition) {
            if (this.activeSection() !== id) {
              this.ngZone.run(() => {
                this.activeSection.set(id);
              });
            }
            break;
          }
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    });
  }

  toggleSidebar(): void {
    this.isCollapsed.update((v) => !v);
  }

  toggleMobileMenu(): void {
    this.isMobileOpen.update((v) => !v);
  }

  selectSection(id: DashboardSection): void {
    this.activeSection.set(id);
    this.isMobileOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcuts(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)
      return;

    // WCAG 2.1.4 Character Key Shortcuts: bare single-key shortcuts are scoped to
    // the sidebar (where the key hints are rendered) so they are active only while
    // keyboard focus is within that component and cannot surprise speech-input or
    // single-key-switch users elsewhere on the page. The former Ctrl/Cmd+D download
    // shortcut was removed because it hijacked the browser's bookmark shortcut.
    if (!target.closest('app-dashboard-sidebar')) return;

    const keyMap: Record<string, DashboardSection> = {
      '1': 'about',
      '2': 'experience',
      '3': 'skills',
      '4': 'education',
      '5': 'certificates',
      '6': 'contact',
    };

    if (keyMap[event.key]) {
      event.preventDefault();
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
