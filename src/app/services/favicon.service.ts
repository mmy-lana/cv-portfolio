import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class FaviconService {
  private document = inject(DOCUMENT);

  setFavicon(themeId: string): void {
    const faviconLink = this.document.getElementById('app-favicon') as HTMLLinkElement;
    if (faviconLink) {
      faviconLink.href = `assets/favicons/${themeId}.svg`;
    }
  }
}