import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvBadge } from '../../shared/atoms/cv-badge/cv-badge';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [ThemeNav, TranslateModule, RouterModule, CvExperienceCard, CvBadge, CvIcon],
  templateUrl: './sidebar-navigation.html'
})
export class SidebarNavigation implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme('sidebar-navigation');
  }
}