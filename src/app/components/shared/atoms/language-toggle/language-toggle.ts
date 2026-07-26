import { Component } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  template: `
    <button
      (click)="lang.toggle()"
      class="h-9 px-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 select-none"
      aria-label="Toggle Language"
    >
      <span class="text-slate-500 text-[10px]">LANG:</span>
      <span class="text-blue-400 font-mono">{{ lang.current.toUpperCase() }}</span>
    </button>
  `
})
export class LanguageToggleComponent {
  constructor(public lang: LanguageService) {}
}