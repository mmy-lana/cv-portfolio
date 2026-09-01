import { Component, input, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '../../../../services/theme.service';
import { LanguageToggleComponent } from '../../atoms/language-toggle/language-toggle';
import { ThemeModeToggleComponent } from '../../atoms/theme-mode-toggle/theme-mode-toggle';
import { DownloadCvBtnComponent } from '../../atoms/download-cv-btn/download-cv-btn';
import { DevDossierModalComponent } from '../dev-dossier-modal/dev-dossier-modal';
import { CvLogoComponent } from '../../atoms/cv-logo/cv-logo';
import { CvIcon } from '../../atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-global-navbar',
  standalone: true,
  imports: [
    RouterModule,
    LanguageToggleComponent,
    ThemeModeToggleComponent,
    DownloadCvBtnComponent,
    DevDossierModalComponent,
    CvLogoComponent,
    CvIcon,
  ],
  templateUrl: './global-navbar.html'
})
export class GlobalNavbarComponent {
  public themeService = inject(ThemeService);
  showHomeButton = input<boolean>(false);

  isDossierOpen = signal<boolean>(false);

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  openDevModal(): void {
    this.isDossierOpen.set(true);
  }
}