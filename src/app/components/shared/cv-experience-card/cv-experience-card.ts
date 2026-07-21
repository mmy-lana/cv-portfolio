import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CvBadge } from '../atoms/cv-badge/cv-badge';
import { CvIcon } from '../atoms/cv-icon/cv-icon';

export interface CVItem {
  company?: string;
  school?: string;
  role?: string;
  degree?: string;
  period?: string;
  year?: string;
  location?: string;
  gpa?: string;
  desc?: string | string[];
}

@Component({
  selector: 'app-cv-experience-card',
  standalone: true,
  imports: [TranslateModule, CvBadge, CvIcon],
  templateUrl: './cv-experience-card.html'
})
export class CvExperienceCard {
  @Input({ required: true }) data!: CVItem;
  @Input() layoutVariant: 'clean' | 'retro' | 'cyber' = 'clean';

  // Helper getters to normalize differences between Job Experience and Education items
  get mainTitle(): string {
    return this.data.role || this.data.degree || '';
  }

  get subtitle(): string {
    return this.data.company || this.data.school || '';
  }

  get timePeriod(): string {
    return this.data.period || this.data.year || '';
  }

  get descriptions(): string[] {
    if (!this.data.desc) return [];
    return Array.isArray(this.data.desc) ? this.data.desc : [this.data.desc];
  }
}