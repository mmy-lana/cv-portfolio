import { Injectable, signal, computed } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface LanguageOption {
  code: string;
  label: string;
  shortLabel: string;
  nativeName: string;
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly LANG_KEY = 'preferred-lang';

  readonly supportedLanguages: LanguageOption[] = [
    { code: 'auto', label: 'System Default', shortLabel: 'AUTO', nativeName: 'Otomatis' },
    { code: 'en', label: 'English', shortLabel: 'EN', nativeName: 'English' },
    { code: 'id', label: 'Bahasa Indonesia', shortLabel: 'ID', nativeName: 'Bahasa Indonesia' },
    { code: 'su', label: 'Basa Sunda', shortLabel: 'SU', nativeName: 'Basa Sunda' }
  ];

  selectedOption = signal<string>('en');
  activeLangCode = signal<string>('en');

  current = computed(() => this.activeLangCode());

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'id', 'su']);
    translate.setDefaultLang('en');
    this.initializeLanguage();
  }

  setLanguage(optionCode: string): void {
    this.selectedOption.set(optionCode);
    localStorage.setItem(this.LANG_KEY, optionCode);

    const resolvedCode = optionCode === 'auto' ? this.detectSystemLanguage() : optionCode;
    this.activeLangCode.set(resolvedCode);
    this.translate.use(resolvedCode);
  }

  toggle(): void {
    const next = this.activeLangCode() === 'en' ? 'id' : 'en';
    this.setLanguage(next);
  }

  private initializeLanguage(): void {
    const saved = localStorage.getItem(this.LANG_KEY) || 'en';
    this.setLanguage(saved);
  }

  private detectSystemLanguage(): string {
    if (typeof navigator === 'undefined') return 'en';
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('id')) return 'id';
    if (browserLang.startsWith('su')) return 'su';
    return 'en';
  }
}