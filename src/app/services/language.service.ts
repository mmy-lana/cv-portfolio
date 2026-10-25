import { Injectable, signal, computed, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
  private readonly DEFAULT_LANG = 'en';
  private document = inject(DOCUMENT);

  readonly supportedLanguages: LanguageOption[] = [
    { code: 'auto', label: 'System Default', shortLabel: 'AUTO', nativeName: 'Otomatis' },
    { code: 'en', label: 'English', shortLabel: 'EN', nativeName: 'English' },
    { code: 'id', label: 'Bahasa Indonesia', shortLabel: 'ID', nativeName: 'Bahasa Indonesia' },
    { code: 'su', label: 'Basa Sunda', shortLabel: 'SU', nativeName: 'Basa Sunda' },
  ];

  selectedOption = signal<string>('en');
  activeLangCode = signal<string>('en');

  current = computed(() => this.activeLangCode());

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'id', 'su']);
    translate.setDefaultLang(this.DEFAULT_LANG);
    this.initializeLanguage();
  }

  setLanguage(optionCode: string): void {
    // Never trust raw input (incl. persisted values): only supported options are accepted.
    const normalized = this.supportedLanguages.some((option) => option.code === optionCode)
      ? optionCode
      : this.DEFAULT_LANG;

    this.selectedOption.set(normalized);
    localStorage.setItem(this.LANG_KEY, normalized);

    const resolvedCode = normalized === 'auto' ? this.detectSystemLanguage() : normalized;
    this.activeLangCode.set(resolvedCode);
    this.translate.use(resolvedCode);
    this.applyDocumentLanguage(resolvedCode);
  }

  toggle(): void {
    const next = this.activeLangCode() === 'en' ? 'id' : 'en';
    this.setLanguage(next);
  }

  private initializeLanguage(): void {
    const saved = localStorage.getItem(this.LANG_KEY) || this.DEFAULT_LANG;
    this.setLanguage(saved);
  }

  private applyDocumentLanguage(code: string): void {
    this.document.documentElement.lang = code;
  }

  private detectSystemLanguage(): string {
    if (typeof navigator === 'undefined') return this.DEFAULT_LANG;
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('id')) return 'id';
    if (browserLang.startsWith('su')) return 'su';
    return this.DEFAULT_LANG;
  }
}
