import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cv-button',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './cv-button.html',
})
export class CvButton {
  @Input({ required: true }) labelKey!: string;
  @Input() variant: 'primary' | 'secondary' | 'glass' | 'cyber' | 'retro' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input() ariaLabel?: string;

  @Output() btnClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const base = 'inline-flex items-center justify-center font-bold tracking-wider rounded-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cv-accent disabled:opacity-50 disabled:pointer-events-none select-none';
    
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3 text-base',
    };

    const variants = {
      primary: 'bg-cv-primary text-cv-bg hover:brightness-110 active:scale-98 shadow-md',
      secondary: 'bg-transparent border border-cv-accent text-cv-accent hover:bg-cv-accent/10 active:scale-98',
      glass: 'bg-white/5 border border-white/20 text-white backdrop-blur-lg hover:bg-white/15 active:scale-98',
      cyber: 'bg-black text-[#00ff41] border-2 border-[#bc00ff] shadow-[0_0_15px_#bc00ff] hover:bg-[#bc00ff]/20 active:scale-95 italic font-mono uppercase tracking-widest',
      retro: 'bg-amber-500 text-black border-4 border-black border-b-8 active:border-b-4 active:translate-y-1 rounded-none font-mono uppercase',
    };

    return `${base} ${sizes[this.size]} ${variants[this.variant]}`;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.btnClick.emit(event);
    }
  }
}