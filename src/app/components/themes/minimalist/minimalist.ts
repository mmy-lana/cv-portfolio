import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';

@Component({
  selector: 'app-minimalist',
  standalone: true,
  imports: [ThemeNav, TranslateModule, RouterModule],
  templateUrl: './minimalist.html',
})
export class Minimalist {}