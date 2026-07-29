import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { DownloadCvBtnComponent } from '../../shared/atoms/download-cv-btn/download-cv-btn';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvBadge } from '../../shared/atoms/cv-badge/cv-badge';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';
import { CvPresetBadgeComponent } from '../../shared/atoms/cv-preset-badge/cv-preset-badge';

@Component({
  selector: 'app-minimalist',
  standalone: true,
  imports: [
    TranslateModule,
    RouterModule,
    ThemeNav,
    DownloadCvBtnComponent,
    CvExperienceCard,
    CvBadge,
    CvIcon,
    CvPresetBadgeComponent
  ],
  templateUrl: './minimalist.html',
})
export class Minimalist {
  public themeService = inject(ThemeService);
}