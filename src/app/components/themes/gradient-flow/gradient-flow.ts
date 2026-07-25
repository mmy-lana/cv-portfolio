import { Component, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';
import { GradientMeshCanvas } from '../../shared/gradient-mesh-canvas/gradient-mesh-canvas';

@Component({
  selector: 'app-gradient-flow',
  standalone: true,
  imports: [
    ThemeNav,
    TranslateModule,
    RouterModule,
    CvExperienceCard,
    CvIcon,
    GradientMeshCanvas
  ],
  templateUrl: './gradient-flow.html'
})
export class GradientFlow implements OnInit {
  activeSection = signal<string>('about');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme('gradient-flow');
  }
}