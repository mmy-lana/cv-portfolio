import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class AppComponent {
  constructor() {
    inject();
    injectSpeedInsights();
  }
}