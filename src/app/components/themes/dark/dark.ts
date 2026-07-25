import { Component, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-dark',
  standalone: true,
  imports: [ThemeNav, TranslateModule, RouterModule, CvExperienceCard, CvIcon],
  templateUrl: './dark.html'
})
export class Dark implements OnInit {
  activeSection = signal<string>('about');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme('dark');
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty('--x', `${x}px`);
    target.style.setProperty('--y', `${y}px`);
  }

  onMagneticMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - centerX) * 0.25;
    const deltaY = (event.clientY - centerY) * 0.25;
    target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }

  onMagneticLeave(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    target.style.transform = 'translate(0px, 0px)';
  }
}