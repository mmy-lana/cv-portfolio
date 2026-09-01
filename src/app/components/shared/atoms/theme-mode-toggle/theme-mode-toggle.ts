import { Component } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { CvIcon } from '../cv-icon/cv-icon';

@Component({
  selector: 'app-theme-mode-toggle',
  standalone: true,
  imports: [CvIcon],
  template: `
    <button
      (click)="themeService.toggleGlobalDarkMode()"
      class="h-9 px-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 select-none"
      [attr.aria-label]="themeService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <app-cv-icon [name]="themeService.isDarkMode() ? 'moon' : 'sun'" size="w-3.5 h-3.5" />
      <span>{{ themeService.isDarkMode() ? 'Dark' : 'Light' }}</span>
    </button>
  `
})
export class ThemeModeToggleComponent {
  constructor(public themeService: ThemeService) {}
}