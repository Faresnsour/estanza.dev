'use client';

import { useState } from 'react';
import Icon from '../ui/Icon';
import { useGetStarted } from '../ui/GetStartedProvider';

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Integrations', href: '/#integrations' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openGetStarted } = useGetStarted();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-surface/85 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:h-20 lg:px-8">
        <div className="flex items-center gap-6">
          <a href="#top" className="group flex items-center gap-2" onClick={closeMenu}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-container" />
            </span>
            <span className="font-space text-lg font-bold tracking-tight text-on-surface lg:text-xl">
              estanza<span className="text-primary-container">.dev</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body-md text-sm text-on-surface-variant transition-colors hover:text-on-surface"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/#demo"
            className="hidden items-center px-2 py-1 font-body-md text-sm text-on-surface-variant transition-colors hover:text-on-surface md:inline-flex"
          >
            See Demo
          </a>

          <button
            type="button"
            onClick={() => openGetStarted()}
            className="inline-flex items-center gap-1 rounded-lg bg-primary-container px-3.5 py-2 font-space text-sm font-bold text-on-primary-container transition-all hover:shadow-[0_4px_16px_rgba(0,209,178,0.4)] active:scale-[0.98]"
          >
            <span>Get Started</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-container text-on-surface transition-colors hover:bg-surface-container-high lg:hidden"
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} className="text-[20px]" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-outline-variant/15 bg-surface/95 px-4 pb-4 pt-2 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>

                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-3 font-body-md text-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/#demo"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-3 font-body-md text-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
              >
                See Demo
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
