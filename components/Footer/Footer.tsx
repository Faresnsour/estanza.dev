import Icon from '../ui/Icon';
import Image from 'next/image';

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Navigation',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Live Demo', href: '#demo' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const STATUS_BADGES = ['LATENCY < 350MS', 'SIP TRUNKING ACTIVE'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-6">
            <div className="flex items-center gap-2">
              <Image
                src="/estanza-logo.png"
                alt="estanza.dev"
                width={226}
                height={224}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />
              <span className="font-space text-lg font-bold text-on-surface">estanza.dev</span>
            </div>
            <p className="max-w-md text-sm text-on-surface-variant">
              AI voice agents for faster lead response. Connect instantly, qualify rigorously,
              convert automatically.
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono-custom text-xs text-on-surface-variant">
              {STATUS_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-surface-container-lowest px-2.5 py-0.5 shadow-xs"
                >
                  {badge}
                </span>
              ))}
            </div>
            <a
              href="https://www.instagram.com/estanza.dev"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow estanza.dev on Instagram"
              className="mt-1 inline-flex w-fit items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-on-surface"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-2 font-mono-custom text-xs lg:col-span-2">
              <span className="font-semibold uppercase tracking-wider text-on-surface-variant">
                {column.title}
              </span>
              {column.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-2 font-mono-custom text-xs lg:col-span-2">
            <span className="font-semibold uppercase tracking-wider text-on-surface-variant">
              Platform
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary-container" />
              <span className="font-medium text-on-surface">24/7 Uptime</span>
            </div>
            <span className="text-on-surface-variant">99.99% SLA</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/15 pt-6 font-mono-custom text-xs text-on-surface-variant sm:flex-row">
          <p>© {year} estanza.dev. All rights reserved.</p>
          <span className="flex items-center gap-1.5">
            GLOBAL INFRASTRUCTURE READY
            <Icon name="public" className="text-[14px] text-primary" />
          </span>
        </div>
      </div>
    </footer>
  );
}
