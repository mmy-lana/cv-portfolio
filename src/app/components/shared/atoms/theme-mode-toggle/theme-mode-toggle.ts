import { Component } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-theme-mode-toggle',
  standalone: true,
  template: `
    <button
      (click)="themeService.toggleGlobalDarkMode()"
      class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
    >
      <span>{{ themeService.isDarkMode() ? '🌙 Dark' : '☀️ Light' }}</span>
    </button>
  `
})
export class ThemeModeToggleComponent {
  constructor(public themeService: ThemeService) {}
}