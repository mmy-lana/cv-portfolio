import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class AppComponent {
  // Instantiating LanguageService on every route keeps `document.documentElement.lang`
  // in sync with the active language regardless of which page components are rendered.
  constructor(languageService: LanguageService) {
    void languageService;
    inject();
    injectSpeedInsights();
  }
}
