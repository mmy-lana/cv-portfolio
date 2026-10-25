import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { CvIcon } from '../shared/atoms/cv-icon/cv-icon';

/**
 * Wildcard (404) view. Rendered for any URL that does not match a known route so
 * visitors and crawlers land on a useful page with navigation instead of a blank
 * shell. Host-level 404 status handling is configured separately at the CDN.
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, CvIcon],
  template: `
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
      <p
        class="text-xs font-bold uppercase tracking-[0.35em] transition-colors"
        [class.text-slate-400]="themeService.isDarkMode()"
        [class.text-slate-500]="!themeService.isDarkMode()"
      >
        Error 404
      </p>
      <h1
        class="mt-4 text-3xl sm:text-4xl font-black tracking-tight transition-colors"
        [class.text-white]="themeService.isDarkMode()"
        [class.text-slate-900]="!themeService.isDarkMode()"
      >
        Page not found
      </h1>
      <p
        class="mt-4 text-sm sm:text-base max-w-xl mx-auto transition-colors"
        [class.text-slate-400]="themeService.isDarkMode()"
        [class.text-slate-600]="!themeService.isDarkMode()"
      >
        The page you are looking for does not exist or may have been moved. Head back to the
        homepage or jump straight into one of the nine CV theme presets below.
      </p>

      <a
        routerLink="/"
        class="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        [class.bg-white]="themeService.isDarkMode()"
        [class.text-slate-900]="themeService.isDarkMode()"
        [class.bg-slate-900]="!themeService.isDarkMode()"
        [class.text-white]="!themeService.isDarkMode()"
      >
        <app-cv-icon name="back" size="w-4 h-4" />
        <span>Back to homepage</span>
      </a>

      <section class="mt-14">
        <h2
          class="text-xs font-bold uppercase tracking-widest transition-colors"
          [class.text-slate-400]="themeService.isDarkMode()"
          [class.text-slate-500]="!themeService.isDarkMode()"
        >
          Theme presets
        </h2>
        <nav class="mt-5 flex flex-wrap justify-center gap-3" aria-label="Theme presets">
          @for (theme of themeService.themes; track theme.id) {
            <a
              [routerLink]="['/', theme.id]"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
              [class.border-slate-800]="themeService.isDarkMode()"
              [class.bg-slate-900/40]="themeService.isDarkMode()"
              [class.text-slate-200]="themeService.isDarkMode()"
              [class.border-slate-200]="!themeService.isDarkMode()"
              [class.bg-white]="!themeService.isDarkMode()"
              [class.text-slate-700]="!themeService.isDarkMode()"
            >
              <app-cv-icon [name]="theme.iconName" size="w-3.5 h-3.5" />
              <span>{{ theme.id }}</span>
            </a>
          }
        </nav>
      </section>
    </main>
  `,
})
export class NotFound {
  readonly themeService = inject(ThemeService);
}
