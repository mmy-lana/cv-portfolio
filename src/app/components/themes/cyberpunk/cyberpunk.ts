import { Component, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';
import { CyberMatrixCanvas } from '../../shared/cyber-matrix-canvas/cyber-matrix-canvas';

@Component({
  selector: 'app-cyberpunk',
  standalone: true,
  imports: [
    ThemeNav,
    TranslateModule,
    CvExperienceCard,
    CvIcon,
    CyberMatrixCanvas
  ],
  templateUrl: './cyberpunk.html',
})
export class Cyberpunk implements OnInit {
  sysStatus = signal<'ONLINE' | 'STANDBY'>('ONLINE');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme('cyberpunk');
  }
}