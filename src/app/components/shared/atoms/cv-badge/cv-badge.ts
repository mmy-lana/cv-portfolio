import { Component, Input, booleanAttribute } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cv-badge',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cv-badge.html',
})
export class CvBadge {
  @Input({ required: true }) labelKey!: string;
  @Input() variant: 'solid' | 'outline' | 'glass' | 'neon' | 'retro' = 'solid';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input({ transform: booleanAttribute }) interactive = false;

  get badgeClasses(): string {
    const base = 'inline-flex items-center justify-center font-semibold rounded-full tracking-wide transition-all duration-300 select-none';
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    };

    const variants = {
      solid: 'bg-cv-primary text-cv-bg border border-transparent shadow-sm',
      outline: 'bg-transparent border border-cv-accent/40 text-cv-accent hover:border-cv-accent',
      glass: 'bg-white/10 text-white border border-white/20 backdrop-blur-md',
      neon: 'bg-black text-[#00ff41] border border-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.3)] hover:shadow-[0_0_15px_rgba(0,255,65,0.6)] uppercase font-mono',
      retro: 'bg-[#000000] text-amber-500 border-2 border-dashed border-amber-500 rounded-none font-mono',
    };

    const interactiveClass = this.interactive 
      ? 'cursor-pointer hover:scale-105 active:scale-95' 
      : 'cursor-default';

    return `${base} ${sizes[this.size]} ${variants[this.variant]} ${interactiveClass}`;
  }
}