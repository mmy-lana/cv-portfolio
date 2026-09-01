import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { CvIcon } from '../cv-icon/cv-icon';

@Component({
  selector: 'app-theme-mode-toggle',
  standalone: true,
  imports: [CvIcon],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="themeService.isDarkMode()"
      (click)="themeService.toggleGlobalDarkMode()"
      class="h-9 w-17 p-1 rounded-full border transition-all duration-300 cursor-pointer flex items-center relative select-none shadow-inner group outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      [class.bg-slate-800]="themeService.isDarkMode()"
      [class.border-slate-700]="themeService.isDarkMode()"
      [class.bg-slate-200]="!themeService.isDarkMode()"
      [class.border-slate-300]="!themeService.isDarkMode()"
      [attr.aria-label]="themeService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      [title]="themeService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <!-- BACKGROUND ICONS GUIDE -->
      <div class="w-full flex items-center justify-between px-1.5 text-xs pointer-events-none">
        <app-cv-icon name="sun" size="w-3.5 h-3.5" class="text-amber-500 transition-opacity duration-200" [class.opacity-100]="!themeService.isDarkMode()" [class.opacity-40]="themeService.isDarkMode()" />
        <app-cv-icon name="moon" size="w-3.5 h-3.5" class="text-indigo-400 transition-opacity duration-200" [class.opacity-100]="themeService.isDarkMode()" [class.opacity-40]="!themeService.isDarkMode()" />
      </div>

      <!-- SMOOTH SLIDING THUMB -->
      <div
        class="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 ease-out"
        [class.translate-x-[36px]]="themeService.isDarkMode()"
        [class.translate-x-0]="!themeService.isDarkMode()"
        [class.bg-slate-900]="themeService.isDarkMode()"
        [class.text-indigo-400]="themeService.isDarkMode()"
        [class.bg-white]="!themeService.isDarkMode()"
        [class.text-amber-500]="!themeService.isDarkMode()"
      >
        <app-cv-icon [name]="themeService.isDarkMode() ? 'moon' : 'sun'" size="w-3.5 h-3.5" />
      </div>
    </button>
  `
})
export class ThemeModeToggleComponent {
  public themeService = inject(ThemeService);
}