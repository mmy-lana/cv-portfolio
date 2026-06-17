// cyberpunk.ts
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';

@Component({
  selector: 'app-cyberpunk',
  standalone: true,
  imports: [ThemeNav, TranslateModule], // Add TranslateModule here!
  templateUrl: './cyberpunk.html',
})
export class Cyberpunk { }