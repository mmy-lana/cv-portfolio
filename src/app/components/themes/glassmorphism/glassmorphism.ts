import { Component, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvBadge } from '../../shared/atoms/cv-badge/cv-badge';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-glassmorphism',
  standalone: true,
  imports: [ThemeNav, TranslateModule, RouterModule, CvExperienceCard, CvBadge, CvIcon],
  templateUrl: './glassmorphism.html'
})
export class Glassmorphism implements OnInit {
  activeSection = signal<string>('about');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme('glassmorphism');
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  }
}