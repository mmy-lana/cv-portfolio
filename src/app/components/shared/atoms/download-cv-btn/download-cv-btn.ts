import { Component, input, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../../services/theme.service';
import { CvIcon } from '../cv-icon/cv-icon';

@Component({
  selector: 'app-download-cv-btn',
  standalone: true,
  imports: [TranslateModule, CvIcon],
  template: `
    <a
      href="assets/cv/CV_Muhammad_Maulana_Yusuf.pdf"
      download="CV_Muhammad_Maulana_Yusuf.pdf"
      target="_blank"
      rel="noopener noreferrer"
      [class]="btnClasses()"
    >
      <app-cv-icon name="download" [size]="iconSize()" />
      <span>{{ 'actions.download_cv' | translate }}</span>
    </a>
  `
})
export class DownloadCvBtnComponent {
  public themeService = inject(ThemeService);

  variant = input<'primary' | 'outline' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');

  btnClasses(): string {
    const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 cursor-pointer select-none active:scale-95';
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-xs',
      lg: 'px-6 py-3 text-sm'
    };
    const isDark = this.themeService.isDarkMode();
    const currentTheme = this.themeService.currentTheme();

    const themePrimaryMap: Record<string, { light: string; dark: string }> = {
      glassmorphism: {
        light: 'bg-white/80 hover:bg-white text-cyan-950 border border-cyan-300/80 shadow-xs backdrop-blur-md',
        dark: 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 backdrop-blur-md'
      },
      cyberpunk: {
        light: 'bg-teal-700 hover:bg-teal-800 text-white border border-teal-600 font-mono',
        dark: 'bg-black hover:bg-[#00ff41] text-[#00ff41] hover:text-black border border-[#00ff41] font-mono shadow-[0_0_10px_rgba(0,255,65,0.2)]'
      },
      dark: {
        light: 'bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/30',
        dark: 'bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-500/40 shadow-xs'
      },
      'retro-computer': {
        light: 'bg-[#e2ddcf] hover:bg-[#d6d1c4] text-[#003399] border-2 border-outset-btn font-mono',
        dark: 'bg-black hover:bg-[#00ff66] text-[#00ff66] hover:text-black border border-[#00ff66] font-mono'
      },
      'gradient-flow': {
        light: 'bg-white/80 hover:bg-white text-rose-900 border border-rose-200/80 shadow-xs backdrop-blur-md',
        dark: 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 backdrop-blur-md'
      },
      'sidebar-navigation': {
        light: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800',
        dark: 'bg-sky-950/80 hover:bg-sky-900 text-sky-200 border border-sky-800/60'
      },
      'parallax-scrolling': {
        light: 'bg-purple-700 hover:bg-purple-800 text-white border border-purple-600/40',
        dark: 'bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/40'
      },
      'timeline-style': {
        light: 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/30',
        dark: 'bg-cyan-950/80 hover:bg-cyan-900 text-[#00f3ff] border border-cyan-800/60'
      },
      minimalist: {
        light: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800',
        dark: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
      }
    };

    const activeTheme = themePrimaryMap[currentTheme] || themePrimaryMap['minimalist'];
    const activePrimary = isDark ? activeTheme.dark : activeTheme.light;

    const variants = {
      primary: activePrimary,
      outline: isDark
        ? 'bg-transparent border border-slate-700 text-slate-300 hover:bg-white/5 hover:border-slate-600'
        : 'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400',
      ghost: isDark
        ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15'
        : 'bg-slate-900/10 hover:bg-slate-900/15 text-slate-900 backdrop-blur-md border border-slate-900/15'
    };
    return `${base} ${sizes[this.size()]} ${variants[this.variant()]}`;
  }

  iconSize(): string {
    const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
    return sizeMap[this.size()];
  }
}