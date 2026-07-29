import {
  Component,
  ElementRef,
  OnDestroy,
  NgZone,
  inject,
  input,
  output,
  viewChild,
  effect,
  signal,
  HostListener
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../../services/theme.service';
import { CvIcon } from '../../atoms/cv-icon/cv-icon';
import { DownloadCvBtnComponent } from '../../atoms/download-cv-btn/download-cv-btn';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

@Component({
  selector: 'app-dev-dossier-modal',
  standalone: true,
  imports: [TranslateModule, CvIcon, DownloadCvBtnComponent],
  templateUrl: './dev-dossier-modal.html'
})
export class DevDossierModalComponent implements OnDestroy {
  public themeService = inject(ThemeService);
  private ngZone = inject(NgZone);

  isOpen = input<boolean>(false);
  closeModal = output<void>();

  isClosing = signal<boolean>(false);

  private canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('particleCanvas');
  private modalCard = viewChild<ElementRef<HTMLDivElement>>('modalCard');

  private animFrameId: number | null = null;
  private particles: Particle[] = [];
  private isTouch = false;

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.isClosing.set(false);
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          this.initParticleCanvas();
          this.triggerBurstConfetti();
        }, 50);
      } else {
        this.stopParticleCanvas();
        document.body.style.overflow = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.stopParticleCanvas();
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen() && !this.isClosing()) {
      this.triggerClose();
    }
  }

  triggerClose(): void {
    if (this.isClosing()) return;
    this.isClosing.set(true);

    setTimeout(() => {
      this.closeModal.emit();
      this.isClosing.set(false);
      document.body.style.overflow = '';
    }, 200);
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.triggerClose();
    }
  }

  onCardMouseMove(event: MouseEvent): void {
    if (this.isTouch) return;
    const card = this.modalCard()?.nativeElement;
    if (!card) return;

    const wrapper = event.currentTarget as HTMLElement;
    const rect = wrapper.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  }

  onCardMouseLeave(): void {
    const card = this.modalCard()?.nativeElement;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  private initParticleCanvas(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.isTouch = matchMedia('(hover: none)').matches;
    const count = this.isTouch ? 10 : 25;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 380);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const colors = ['#00f0ff', '#bc00ff', '#ff0055', '#38bdf8'];
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2
    }));

    this.ngZone.runOutsideAngular(() => {
      const render = () => {
        ctx.clearRect(0, 0, width, height);

        for (const p of this.particles) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }

        this.animFrameId = requestAnimationFrame(render);
      };
      render();
    });
  }

  private stopParticleCanvas(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private triggerBurstConfetti(): void {
    const canvas = document.createElement('canvas');
    canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-50';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      canvas.remove();
      return;
    }

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const burstColors = ['#00f0ff', '#bc00ff', '#ff0055', '#38bdf8', '#ffb000'];
    const burstCount = 40;
    const originX = width / 2;
    const originY = height / 3;

    const burstParticles = Array.from({ length: burstCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: burstColors[Math.floor(Math.random() * burstColors.length)],
        size: Math.random() * 4 + 2
      };
    });

    this.ngZone.runOutsideAngular(() => {
      let frames = 0;
      const animateBurst = () => {
        ctx.clearRect(0, 0, width, height);
        frames++;

        for (const p of burstParticles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15; // Gravity
          p.alpha -= 0.018;

          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fill();
          }
        }

        if (frames < 60) {
          requestAnimationFrame(animateBurst);
        } else {
          canvas.remove();
        }
      };
      animateBurst();
    });
  }
}