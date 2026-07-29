import { Component, Input, inject } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-cv-preset-badge',
  standalone: true,
  template: `
    <span [class]="badgeClasses">
      <span class="w-1.5 h-1.5 rounded-full animate-pulse mr-1.5 shrink-0" [class]="dotClass"></span>
      <span>{{ showPrefix ? 'PRESET: ' : '' }}{{ presetName }}</span>
    </span>
  `
})
export class CvPresetBadgeComponent {
  public themeService = inject(ThemeService);

  @Input() themeId?: string;
  @Input() showPrefix = true;

  get currentThemeId(): string {
    return this.themeId || this.themeService.currentTheme();
  }

  get isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  get presetName(): string {
    const presetMap: Record<string, { light: string; dark: string }> = {
      minimalist: { light: 'PAPER LIGHT', dark: 'ONYX DARK' },
      cyberpunk: { light: 'MATRIX DAY', dark: 'NEON NIGHT' },
      glassmorphism: { light: 'FROSTED CRYSTAL', dark: 'OBSIDIAN GLASS' },
      dark: { light: 'SOLAR MINIMAL', dark: 'LUNAR PITCH' },
      'retro-computer': { light: 'IBM CREAM 1984', dark: 'HACKER TERMINAL' },
      'gradient-flow': { light: 'SUNRISE MESH', dark: 'AURORA BOREALIS' },
      'sidebar-navigation': { light: 'ENTERPRISE LIGHT', dark: 'EXECUTIVE DARK' },
      'parallax-scrolling': { light: 'HORIZON LIGHT', dark: 'DEEP SPACE' },
      'timeline-style': { light: 'BLUEPRINT WHITE', dark: 'CHARCOAL JOURNEY' }
    };

    const target = presetMap[this.currentThemeId] || presetMap['minimalist'];
    return this.isDark ? target.dark : target.light;
  }

  get badgeClasses(): string {
    const base = 'inline-flex items-center font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-full border transition-all duration-300 select-none uppercase tracking-wider';

    const themeStyles: Record<string, { light: string; dark: string }> = {
      cyberpunk: {
        light: 'bg-teal-50 text-[#008b8b] border-[#008b8b]/40',
        dark: 'bg-black/80 text-[#00ff41] border-[#00ff41]/50 shadow-[0_0_8px_rgba(0,255,65,0.3)]'
      },
      glassmorphism: {
        light: 'bg-white/80 text-cyan-900 border-cyan-300 backdrop-blur-md shadow-xs',
        dark: 'bg-white/10 text-cyan-300 border-white/20 backdrop-blur-md shadow-sm'
      },
      dark: {
        light: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        dark: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60'
      },
      'retro-computer': {
        light: 'bg-[#e2ddcf] text-[#003399] border-2 border-outset-btn',
        dark: 'bg-black text-[#00ff66] border border-[#00ff66]/60 font-mono'
      },
      'gradient-flow': {
        light: 'bg-white/80 text-rose-800 border-rose-200 backdrop-blur-md',
        dark: 'bg-slate-900/80 text-rose-300 border-rose-500/40 backdrop-blur-md'
      },
      'sidebar-navigation': {
        light: 'bg-blue-50 text-blue-700 border-blue-200',
        dark: 'bg-sky-950/80 text-sky-300 border-sky-800/60'
      },
      'parallax-scrolling': {
        light: 'bg-purple-50 text-purple-700 border-purple-200',
        dark: 'bg-purple-950/80 text-purple-300 border-purple-800/60'
      },
      'timeline-style': {
        light: 'bg-blue-50 text-blue-700 border-blue-200',
        dark: 'bg-cyan-950/80 text-[#00f3ff] border-cyan-800/60'
      },
      minimalist: {
        light: 'bg-slate-100 text-blue-700 border-blue-200',
        dark: 'bg-slate-900 text-blue-300 border-blue-800/50'
      }
    };

    const active = themeStyles[this.currentThemeId] || themeStyles['minimalist'];
    return `${base} ${this.isDark ? active.dark : active.light}`;
  }

  get dotClass(): string {
    return this.isDark ? 'bg-cyan-400' : 'bg-blue-600';
  }
}