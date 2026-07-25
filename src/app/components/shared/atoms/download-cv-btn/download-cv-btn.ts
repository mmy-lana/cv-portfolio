import { Component, input } from '@angular/core';
import { CvIcon } from '../cv-icon/cv-icon';

@Component({
  selector: 'app-download-cv-btn',
  standalone: true,
  imports: [CvIcon],
  template: `
    <a
      href="assets/cv/CV_Muhammad_Maulana_Yusuf.pdf"
      download="CV_Muhammad_Maulana_Yusuf.pdf"
      target="_blank"
      rel="noopener noreferrer"
      [class]="btnClasses()"
    >
      <app-cv-icon name="download" [size]="iconSize()" />
      <span>Download CV</span>
    </a>
  `
})
export class DownloadCvBtnComponent {
  variant = input<'primary' | 'outline' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');

  btnClasses(): string {
    const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 cursor-pointer select-none';
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-xs',
      lg: 'px-6 py-3 text-sm'
    };
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-blue-500/25',
      outline: 'bg-transparent border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400',
      ghost: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md'
    };
    return `${base} ${sizes[this.size()]} ${variants[this.variant()]}`;
  }

  iconSize(): string {
    const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
    return sizeMap[this.size()];
  }
}