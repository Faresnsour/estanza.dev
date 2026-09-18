'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ScrollAnimationsProps = {
  children: ReactNode;
};

export default function ScrollAnimations({ children }: ScrollAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const hero = container.querySelector<HTMLElement>('#top');
      const sections = gsap.utils.toArray<HTMLElement>('main section:not(#top)');

      if (hero) {
        const heroTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        heroTimeline
          .from(hero.querySelector('h1'), { autoAlpha: 0, y: 24, duration: 0.8 })
          .from(hero.querySelector('p'), { autoAlpha: 0, y: 18, duration: 0.6 }, '-=0.45')
          .from(hero.querySelectorAll('button'), { autoAlpha: 0, y: 14, duration: 0.5, stagger: 0.1 }, '-=0.3')
          .from(hero.querySelector('[data-hero-visual]'), {
            autoAlpha: 0,
            x: 28,
            duration: 0.8,
          }, '-=0.55');
      }

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 84%',
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        container.querySelector('footer'),
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container.querySelector('footer'),
            start: 'top 92%',
            once: true,
          },
        },
      );
    }, container);

    return () => context.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
