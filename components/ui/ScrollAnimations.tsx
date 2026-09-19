'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

type ScrollAnimationsProps = {
  children: ReactNode;
};

export default function ScrollAnimations({ children }: ScrollAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let context: { revert: () => void } | undefined;
    let cancelled = false;

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>('main section:not(#top)');

        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { y: 36 },
            {
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
      }, container);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
