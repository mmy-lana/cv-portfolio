import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  current: 'en' | 'id' = 'en';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'id']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  toggle() {
    this.current = this.current === 'en' ? 'id' : 'en';
    this.translate.use(this.current);
  }
}