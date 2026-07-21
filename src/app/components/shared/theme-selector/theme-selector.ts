import { Component, signal, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService, ThemeConfig } from '../../../services/theme.service';
import { CvButton } from '../atoms/cv-button/cv-button';
import { CvIcon } from '../atoms/cv-icon/cv-icon';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [TranslateModule, CvButton, CvIcon],
  templateUrl: './theme-selector.html'
})
export class ThemeSelector {
  isOpen = signal<boolean>(false);

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  toggleDropdown(): void {
    this.isOpen.update(val => !val);
  }

  selectTheme(theme: ThemeConfig): void {
    this.themeService.setTheme(theme.id);
    this.isOpen.set(false);
    
    // Smoothly route to the newly selected theme page
    this.router.navigate([theme.id]);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Safely auto-close dropdown when clicking outside component coordinates
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    this.isOpen.set(false);
  }
}