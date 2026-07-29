import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cv-logo',
  standalone: true,
  template: `
    <svg 
      [class]="size"
      viewBox="0 0 512 512" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MMY Logo"
    >
      <defs>
        <linearGradient id="mmy-bg-grad" x1="85.35%" y1="85.35%" x2="14.64%" y2="14.64%">
          <stop offset="0%" stop-color="#00D9FF"/>
          <stop offset="100%" stop-color="#E3E3E3"/>
        </linearGradient>
        <clipPath id="mmy-canvas-clip">
          <rect width="512" height="512" rx="110" ry="110"/>
        </clipPath>
      </defs>
      <rect width="512" height="512" rx="110" ry="110" fill="url(#mmy-bg-grad)" stroke="#FFFFFF" stroke-width="12" clip-path="url(#mmy-canvas-clip)"/>
      <g clip-path="url(#mmy-canvas-clip)">
        <g transform="rotate(0, 256, 256)">
          <!-- 3D Shadow Layers -->
          <text x="260" y="256" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#111111">MMY</text>
          <text x="259" y="258" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#111111">MMY</text>
          <text x="258" y="259" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#111111">MMY</text>
          <text x="256" y="260" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#111111">MMY</text>
          <text x="254" y="259" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#111111">MMY</text>
          <text x="253" y="258" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#111111">MMY</text>
          <text x="252" y="256" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#111111">MMY</text>
          <text x="256" y="252" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#111111">MMY</text>
          <!-- Top White Layer -->
          <text x="256" y="256" text-anchor="middle" dominant-baseline="central" font-family="'Poppins', sans-serif" font-weight="700" font-size="190" fill="#FFFFFF">MMY</text>
        </g>
      </g>
    </svg>
  `
})
export class CvLogoComponent {
  @Input() size = 'w-9 h-9';
}