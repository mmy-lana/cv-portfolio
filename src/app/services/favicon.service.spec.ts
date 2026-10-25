import { TestBed } from '@angular/core/testing';
import { FaviconService } from './favicon.service';

describe('FaviconService', () => {
  let link: HTMLLinkElement;

  function createService(): FaviconService {
    return TestBed.inject(FaviconService);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    link = document.createElement('link');
    link.id = 'app-favicon';
    link.rel = 'icon';
    document.head.appendChild(link);
  });

  afterEach(() => {
    link.remove();
  });

  it('points the app-favicon link at the theme SVG', () => {
    const service = createService();
    service.setFavicon('cyberpunk');
    expect(link.getAttribute('href')).toBe('assets/favicons/cyberpunk.svg');
  });

  it('updates the href when the theme changes', () => {
    const service = createService();
    service.setFavicon('minimalist');
    service.setFavicon('gradient-flow');
    expect(link.getAttribute('href')).toBe('assets/favicons/gradient-flow.svg');
  });

  it('is a safe no-op when the favicon link element is missing', () => {
    link.remove();
    const service = createService();
    expect(() => service.setFavicon('dark')).not.toThrow();
  });
});
