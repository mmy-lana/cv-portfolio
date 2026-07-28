import { Component, OnInit, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { FaviconService } from '../../../services/favicon.service';
import { DownloadCvBtnComponent } from '../../shared/atoms/download-cv-btn/download-cv-btn';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';
import { CyberMatrixCanvas } from '../../shared/cyber-matrix-canvas/cyber-matrix-canvas';

@Component({
  selector: 'app-cyberpunk',
  standalone: true,
  imports: [
    ThemeNav,
    TranslateModule,
    DownloadCvBtnComponent,
    CvExperienceCard,
    CvIcon,
    CyberMatrixCanvas
  ],
  templateUrl: './cyberpunk.html',
})
export class Cyberpunk {
  public themeService = inject(ThemeService);

  sysStatus = signal<'ONLINE' | 'STANDBY'>('ONLINE');
}