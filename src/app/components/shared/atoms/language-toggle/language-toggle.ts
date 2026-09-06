import { Component, signal, HostListener, ElementRef, inject, Input } from '@angular/core';
import { LanguageService, LanguageOption } from '../../../../services/language.service';
import { ThemeService } from '../../../../services/theme.service';
import { CvIcon } from '../cv-icon/cv-icon';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CvIcon],
  template: `
    <div class="relative inline-block text-left z-50">
      <button
        type="button"
        (click)="toggleDropdown()"
        class="h-9 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 select-none outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        [class.bg-slate-900]="themeService.isDarkMode()"
        [class.border-slate-800]="themeService.isDarkMode()"
        [class.text-slate-200]="themeService.isDarkMode()"
        [class.hover:bg-slate-800]="themeService.isDarkMode()"
        [class.bg-slate-100]="!themeService.isDarkMode()"
        [class.border-slate-200]="!themeService.isDarkMode()"
        [class.text-slate-800]="!themeService.isDarkMode()"
        [class.hover:bg-slate-200]="!themeService.isDarkMode()"
        aria-label="Select Language"
        [attr.aria-expanded]="isOpen()"
      >
        <app-cv-icon name="globe" size="w-3.5 h-3.5" [class.text-blue-400]="themeService.isDarkMode()" [class.text-blue-600]="!themeService.isDarkMode()" />
        <span class="font-mono">{{ currentShortLabel() }}</span>
        <app-cv-icon [name]="position === 'up' ? 'chevron-up' : 'chevron-down'" size="w-3 h-3" class="transition-transform duration-200" [class.rotate-180]="isOpen()" />
      </button>

      @if (isOpen()) {
        <div
          class="absolute w-48 rounded-2xl border p-2 shadow-2xl backdrop-blur-xl z-50 animate-fade-in-up duration-200"
          [class.top-full]="position === 'down'"
          [class.mt-2]="position === 'down'"
          [class.bottom-full]="position === 'up'"
          [class.mb-2]="position === 'up'"
          [class.right-0]="align === 'right'"
          [class.left-0]="align === 'left'"
          [class.bg-slate-950/95]="themeService.isDarkMode()"
          [class.border-slate-800]="themeService.isDarkMode()"
          [class.text-white]="themeService.isDarkMode()"
          [class.bg-white/95]="!themeService.isDarkMode()"
          [class.border-slate-200]="!themeService.isDarkMode()"
          [class.text-slate-900]="!themeService.isDarkMode()"
          role="menu"
          aria-orientation="vertical"
        >
          <div class="px-2 py-1 border-b mb-1" [class.border-slate-800]="themeService.isDarkMode()" [class.border-slate-100]="!themeService.isDarkMode()">
            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Language</p>
          </div>

          <div class="space-y-1">
            @for (opt of lang.supportedLanguages; track opt.code) {
              <button
                type="button"
                (click)="selectLanguage(opt)"
                class="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer"
                [class.bg-blue-600]="lang.selectedOption() === opt.code"
                [class.text-white]="lang.selectedOption() === opt.code"
                [class.hover:bg-slate-800/80]="lang.selectedOption() !== opt.code && themeService.isDarkMode()"
                [class.hover:bg-slate-100]="lang.selectedOption() !== opt.code && !themeService.isDarkMode()"
                role="menuitem"
              >
                <div class="flex items-center space-x-2">
                  <span>{{ opt.nativeName }}</span>
                </div>
                @if (lang.selectedOption() === opt.code) {
                  <app-cv-icon name="check" size="w-3.5 h-3.5" />
                }
              </button>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class LanguageToggleComponent {
  public lang = inject(LanguageService);
  public themeService = inject(ThemeService);
  private elementRef = inject(ElementRef);

  @Input() position: 'down' | 'up' = 'down';
  @Input() align: 'left' | 'right' = 'right';

  isOpen = signal<boolean>(false);

  currentShortLabel(): string {
    const currentOpt = this.lang.supportedLanguages.find(l => l.code === this.lang.selectedOption());
    return currentOpt ? currentOpt.shortLabel : this.lang.activeLangCode().toUpperCase();
  }

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  selectLanguage(opt: LanguageOption): void {
    this.lang.setLanguage(opt.code);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isOpen.set(false);
  }
}