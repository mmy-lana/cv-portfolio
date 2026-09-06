import { Component, OnInit, AfterViewInit, OnDestroy, signal, NgZone, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeNav } from '../../shared/theme-nav/theme-nav';
import { ThemeService } from '../../../services/theme.service';
import { DownloadCvBtnComponent } from '../../shared/atoms/download-cv-btn/download-cv-btn';
import { CvExperienceCard } from '../../shared/cv-experience-card/cv-experience-card';
import { CvBadge } from '../../shared/atoms/cv-badge/cv-badge';
import { CvIcon } from '../../shared/atoms/cv-icon/cv-icon';
import { CvPresetBadgeComponent } from '../../shared/atoms/cv-preset-badge/cv-preset-badge';

@Component({
  selector: 'app-parallax-scrolling',
  standalone: true,
  imports: [
    ThemeNav,
    TranslateModule,
    RouterModule,
    DownloadCvBtnComponent,
    CvExperienceCard,
    CvBadge,
    CvIcon,
    CvPresetBadgeComponent
  ],
  templateUrl: './parallax-scrolling.html'
})
export class ParallaxScrolling implements AfterViewInit, OnDestroy {
  public themeService = inject(ThemeService);
  private ngZone = inject(NgZone);

  scrollProgress = signal<number>(0);
  private scrollListener?: () => void;

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initScrollProgress();
      this.initGSAPParallax();
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private initScrollProgress(): void {
    this.scrollListener = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      this.scrollProgress.set(scrolled);
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  private async initGSAPParallax(): Promise<void> {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);
      
      ScrollTrigger.config({ ignoreMobileResize: true });
      
      gsap.utils.toArray<HTMLElement>('.parallax-bg-img').forEach((el) => {
        gsap.fromTo(el,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.parallax-bg-text').forEach((el) => {
        gsap.to(el, {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.parallax-fast-float').forEach((el) => {
        gsap.to(el, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.parallax-card-reveal').forEach((el) => {
        gsap.fromTo(el, 
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    } catch {
      // Fallback gracefully if GSAP dynamic import fails
    }
  }

  onTiltMove(event: MouseEvent): void {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  onTiltLeave(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    if (!target) return;
    target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  heroImage(): string {
  return this.themeService.isDarkMode() ? 'assets/images/hero-dark.webp' : 'assets/images/hero-light.webp';
  }

  skillsImage(): string {
    return this.themeService.isDarkMode() ? 'assets/images/skills-dark.webp' : 'assets/images/skills-light.webp';
  }
}