import { Component, ElementRef, OnInit, OnDestroy, viewChild, NgZone, inject } from '@angular/core';

@Component({
  selector: 'app-cyber-matrix-canvas',
  standalone: true,
  template: `<canvas #matrixCanvas class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-20"></canvas>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CyberMatrixCanvas implements OnInit, OnDestroy {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('matrixCanvas');
  private ngZone = inject(NgZone);
  private animationFrameId: number | null = null;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initMatrixAnimation();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initMatrixAnimation(): void {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHandler);

    const chars = '0123456789ABCDEFµΞΨΩ$#@%&*<>/\\';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = Math.random() > 0.95 ? '#00f0ff' : '#00ff41';
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      this.animationFrameId = requestAnimationFrame(draw);
    };

    draw();
  }
}