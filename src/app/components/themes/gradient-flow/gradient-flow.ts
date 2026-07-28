import { Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { DownloadCvBtnComponent } from '../../shared/atoms/download-cv-btn/download-cv-btn';
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
    DownloadCvBtnComponent,
    CvExperienceCard,
    CvIcon,
    GradientMeshCanvas
  ],
  templateUrl: './gradient-flow.html'
})
export class GradientFlow {
  public themeService = inject(ThemeService);

  activeSection = signal<string>('about');
}