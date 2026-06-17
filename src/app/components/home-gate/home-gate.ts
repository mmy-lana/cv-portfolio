import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-gate',
  standalone: true, // Ensure standalone is true if you are using it
  imports: [TranslateModule],
  templateUrl: './home-gate.html'
})
export class HomeGate {
  constructor(private router: Router) { }

  themes = [
    { id: 'minimalist', icon: '📄', tags: ['Clean', 'Modern'] },
    { id: 'cyberpunk', icon: '⚡', tags: ['Neon', 'Dark'] },
    { id: 'glassmorphism', icon: '🪟', tags: ['Glass', 'Modern'] },
    { id: 'dark', icon: '🌙', tags: ['Dark', 'Elegant'] },
    { id: 'retro-computer', icon: '🖥️', tags: ['Retro', 'Terminal'] },
    { id: 'gradient-flow', icon: '🎨', tags: ['Gradient'] },
    { id: 'sidebar-navigation', icon: '📋', tags: ['Sidebar'] },
    { id: 'parallax-scrolling', icon: '🖼️', tags: ['Parallax'] },
    { id: 'timeline-style', icon: '⏱️', tags: ['Timeline'] }
  ];

  goToTheme(id: string) {
    this.router.navigate([id]);
  }
}