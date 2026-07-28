import { Component, OnInit, AfterViewInit, OnDestroy, signal, NgZone, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { FaviconService } from '../../../services/favicon.service';
import { DownloadCvBtnComponent } from '../../shared/atoms/download-cv-btn/download-cv-btn';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvBadge } from '../../shared/atoms/cv-badge/cv-badge';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-timeline-style',
  standalone: true,
  imports: [
    ThemeNav,
    TranslateModule,
    RouterModule,
    DownloadCvBtnComponent,
    CvExperienceCard,
    CvBadge,
    CvIcon
  ],
  templateUrl: './timeline-style.html'
})
export class TimelineStyle implements AfterViewInit, OnDestroy {
  public themeService = inject(ThemeService);
  private ngZone = inject(NgZone);
  private translate = inject(TranslateService);

  scrollProgress = signal<number>(0);
  expandedNodes = signal<Record<string, boolean>>({});
  sortOrder = signal<'recent' | 'chronological'>('recent');

  private scrollListener?: () => void;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.scrollListener = () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        this.scrollProgress.set(scrolled);
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  toggleSort(): void {
    this.sortOrder.update(order => order === 'recent' ? 'chronological' : 'recent');
  }

  getSortedExperience(): any[] {
    const items = (this.translate.instant('experience.items') || []) as any[];
    if (!Array.isArray(items)) return [];
    return this.sortOrder() === 'chronological' ? [...items].reverse() : items;
  }

  toggleNode(key: string): void {
    this.expandedNodes.update(state => ({
      ...state,
      [key]: !state[key]
    }));
  }

  isExpanded(key: string): boolean {
    return !!this.expandedNodes()[key];
  }
}