'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ScrollAnimationsProps = {
  children: ReactNode;
};

const REVEAL = {
  y: 20,
  duration: 0.55,
  ease: 'power2.out',
} as const;

function uniqueElements(elements: Array<Element | null | undefined>): Element[] {
  return [...new Set(elements.filter((element): element is Element => Boolean(element)))];
}

function collectSectionMotion(section: HTMLElement): { intro: Element | null; items: Element[] } {
  if (section.id === 'book-a-call') {
    return {
      intro: null,
      items: gsap.utils.toArray<Element>(':scope .relative.z-10 > *', section),
    };
  }

  const intro =
    section.querySelector('.mb-12') ??
    section.querySelector('.mb-10') ??
    section.querySelector('.mb-4') ??
    section.querySelector('h1, h2');

  const stepList = section.querySelector('.flex.flex-col.gap-3');
  const steps = stepList ? gsap.utils.toArray<Element>(':scope > *', stepList) : [];

  const grids = gsap.utils.toArray<HTMLElement>('.grid', section);
  const richest = [...grids].sort((a, b) => b.children.length - a.children.length)[0];
  let cards = richest ? gsap.utils.toArray<Element>(':scope > *', richest) : [];

  if (steps.length && richest && stepList && richest.contains(stepList)) {
    cards = cards.filter((card) => !card.contains(stepList));
  }

  const details = gsap.utils.toArray<Element>('details', section);
  const extras: Element[] = [];

  if (section.id === 'demo') {
    const demoEl = section.querySelector('.relative.mx-auto.max-w-4xl');
    if (demoEl) extras.push(demoEl);
  }

  const mt10El = section.querySelector('.mt-10');
  if (mt10El) extras.push(mt10El);

  if (section.id === 'integrations') {
    const integrationsEl = section.querySelector('.mx-auto.max-w-3xl');
    if (integrationsEl) extras.push(integrationsEl);
  }

  const items = uniqueElements([...steps, ...cards, ...details, ...extras]);

  if (items.length === 0) {
    const root = section.querySelector('.mx-auto') ?? section;
    return { intro: null, items: gsap.utils.toArray<Element>(':scope > *', root) };
  }

  return {
    intro: intro && !items.includes(intro) ? intro : null,
    items: items.filter((item) => item !== intro),
  };
}

function setupHero(container: HTMLElement) {
  const hero = container.querySelector<HTMLElement>('#top');
  if (!hero) return;

  const badge = hero.querySelector('.inline-flex.items-center.gap-2.rounded-full');
  const heading = hero.querySelector('h1');
  const body = heading?.nextElementSibling ?? null;
  const ctaRow = hero.querySelector('.flex.flex-wrap.items-center.gap-4.pt-2');
  const trust = ctaRow?.nextElementSibling ?? null;
  const visual = hero.querySelector('[data-hero-visual]');

  const timeline = gsap.timeline({
    defaults: { duration: 0.5, ease: 'power2.out' },
  });

  if (badge) timeline.from(badge, { y: 16 }, 0);
  if (heading || body) {
    timeline.from(uniqueElements([heading, body]), { y: 20, stagger: 0.06 }, 0.08);
  }
  if (ctaRow) timeline.from(ctaRow, { y: 16 }, 0.16);
  if (trust) timeline.from(trust, { y: 16 }, 0.22);
  if (visual) timeline.from(visual, { y: 24 }, 0.12);
}

function setupScrollReveals(container: HTMLElement) {
  const sections = gsap.utils.toArray<HTMLElement>('main section:not(#top)', container);

  sections.forEach((section) => {
    const { intro, items } = collectSectionMotion(section);
    if (!intro && items.length === 0) return;

    const timeline = gsap.timeline({
      defaults: REVEAL,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true,
      },
    });

    if (intro) timeline.from(intro, { y: 20 }, 0);
    if (items.length) {
      timeline.from(items, { y: 20, stagger: 0.08 }, intro ? 0.1 : 0);
    }
  });
}

function refreshWhenAssetsSettle(container: HTMLElement, isCancelled: () => boolean) {
  const refresh = () => {
    if (!isCancelled()) ScrollTrigger.refresh();
  };

  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const imagesReady = Promise.all(
    gsap.utils.toArray<HTMLImageElement>('img', container).map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        image.addEventListener('load', () => resolve(), { once: true });
        image.addEventListener('error', () => resolve(), { once: true });
      });
    }),
  );

  void Promise.all([fontsReady, imagesReady]).then(refresh);
  window.addEventListener('load', refresh);

  return () => window.removeEventListener('load', refresh);
}

export default function ScrollAnimations({ children }: ScrollAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    let cancelled = false;

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        setupHero(container);
        setupScrollReveals(container);
        return refreshWhenAssetsSettle(container, () => cancelled);
      },
      container,
    );

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
