import { Component, Input } from '@angular/core';

export type CvIconName =
  | 'email'
  | 'phone'
  | 'linkedin'
  | 'github'
  | 'location'
  | 'calendar'
  | 'gpa'
  | 'back'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'download'
  | 'file-text'
  | 'zap'
  | 'layers'
  | 'moon'
  | 'sun'
  | 'menu'
  | 'close'
  | 'sort-asc-desc'
  | 'chevron-up'
  | 'chevron-down'
  | 'sparkles'
  | 'terminal'
  | 'palette'
  | 'sidebar'
  | 'image'
  | 'clock'
  | 'external-link'
  | 'rocket'
  | 'book-open';

@Component({
  selector: 'app-cv-icon',
  standalone: true,
  imports: [],
  templateUrl: './cv-icon.html',
})
export class CvIcon {
  @Input({ required: true }) name!: CvIconName;
  @Input() size = 'w-5 h-5';
  @Input() customClass = 'text-current';

  get iconClasses(): string {
    return `${this.size} ${this.customClass} fill-none stroke-current stroke-2`;
  }
}