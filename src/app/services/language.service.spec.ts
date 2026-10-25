import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  const LANG_KEY = 'preferred-lang';

  function createService(): LanguageService {
    return TestBed.inject(LanguageService);
  }

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideTranslateService({ fallbackLang: 'en' })],
    });
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  it('defaults to English when no preference is stored and sets the document lang', () => {
    const service = createService();
    expect(service.selectedOption()).toBe('en');
    expect(service.activeLangCode()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem(LANG_KEY)).toBe('en');
  });

  it('updates documentElement.lang when switching to Indonesian', () => {
    const service = createService();
    service.setLanguage('id');
    expect(service.activeLangCode()).toBe('id');
    expect(document.documentElement.lang).toBe('id');
    expect(localStorage.getItem(LANG_KEY)).toBe('id');
  });

  it('updates documentElement.lang when switching to Sundanese and back to English', () => {
    const service = createService();
    service.setLanguage('su');
    expect(document.documentElement.lang).toBe('su');
    service.setLanguage('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('keeps documentElement.lang in sync after repeated changes (never stale)', () => {
    const service = createService();
    for (const code of ['id', 'su', 'en', 'su', 'id'] as const) {
      service.setLanguage(code);
      expect(document.documentElement.lang).toBe(code);
    }
  });

  it('falls back to English for an unsupported stored value and rewrites the stored value', () => {
    localStorage.setItem(LANG_KEY, 'de');
    const service = createService();
    expect(service.selectedOption()).toBe('en');
    expect(service.activeLangCode()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem(LANG_KEY)).toBe('en');
  });

  it('falls back to English for a malformed stored value', () => {
    localStorage.setItem(LANG_KEY, '<script>alert(1)</script>');
    const service = createService();
    expect(service.activeLangCode()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('ignores an unsupported code passed to setLanguage', () => {
    const service = createService();
    service.setLanguage('fr');
    expect(service.activeLangCode()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem(LANG_KEY)).toBe('en');
  });

  it('resolves "auto" to a supported language and sets the document lang to the resolved code', () => {
    localStorage.setItem(LANG_KEY, 'auto');
    const service = createService();
    expect(service.selectedOption()).toBe('auto');
    expect(['en', 'id', 'su']).toContain(service.activeLangCode());
    expect(document.documentElement.lang).toBe(service.activeLangCode());
    expect(localStorage.getItem(LANG_KEY)).toBe('auto');
  });

  it('restores a valid stored preference on construction', () => {
    localStorage.setItem(LANG_KEY, 'id');
    const service = createService();
    expect(service.selectedOption()).toBe('id');
    expect(service.activeLangCode()).toBe('id');
    expect(document.documentElement.lang).toBe('id');
  });
});
