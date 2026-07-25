import { Component, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageToggleComponent } from '../../atoms/language-toggle/language-toggle';
import { ThemeModeToggleComponent } from '../../atoms/theme-mode-toggle/theme-mode-toggle';
import { DownloadCvBtnComponent } from '../../atoms/download-cv-btn/download-cv-btn';

@Component({
  selector: 'app-global-navbar',
  standalone: true,
  imports: [RouterModule, LanguageToggleComponent, ThemeModeToggleComponent, DownloadCvBtnComponent],
  templateUrl: './global-navbar.html'
})
export class GlobalNavbarComponent {
  showHomeButton = input<boolean>(false);

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}