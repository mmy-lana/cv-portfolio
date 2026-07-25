import { Component } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  template: `
    <button
      (click)="lang.toggle()"
      class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
      aria-label="Toggle Language"
    >
      <span class="text-slate-500 text-[10px]">LANG:</span>
      <span class="text-blue-400">{{ lang.current.toUpperCase() }}</span>
    </button>
  `
})
export class LanguageToggleComponent {
  constructor(public lang: LanguageService) {}
}