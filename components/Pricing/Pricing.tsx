'use client';

import type { ReactNode } from 'react';
import Icon from '../ui/Icon';
import { useGetStarted } from '../ui/GetStartedProvider';

export type PlanId = 'growth' | 'pro';

type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  price: string;
  badge?: string;
  ribbon?: string;
  featuresIntro?: string;
  features: ReactNode[];
  ctaLabel: string;
  featured: boolean;
};

const PLANS: Plan[] = [
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For businesses that want every new lead called quickly.',
    price: '$299',
    badge: 'STARTER',
    ctaLabel: 'Get Growth',
    featured: false,
    features: [
      'Calls new leads within 10 seconds',
      <>
        <strong>300 minutes</strong> / month outbound talk time
      </>,
      'Google Calendar & Calendly Sync',
      'Daily automated performance reports',
      'Instant booking notifications (SMS/Slack)',
      '24/7 continuous autonomous response',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Scale',
    tagline: 'For businesses with more leads and a bigger follow-up process.',
    price: '$599',
    ribbon: 'Most Popular / Scaled Teams',
    featuresIntro: 'Everything in Growth, plus:',
    ctaLabel: 'Get Pro Scale',
    featured: true,
    features: [
      <>
        <strong>750 minutes</strong> / month outbound talk time
      </>,
      'Native GoHighLevel & HubSpot integrations',
      'Custom agent personality prompts',
      'Custom knowledge base & document indexing',
      'Automated follow-up cadence (Retry engine)',
      'Custom multi-step CRM webhook workflows',
    ],
  },
];

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect?: (planId: PlanId) => void }) {
  const isFeatured = plan.featured;

  return (
    <div
      className={
        isFeatured
          ? 'relative flex flex-col justify-between rounded-2xl bg-inverse-surface p-8 text-inverse-on-surface shadow-[0_0_32px_rgba(0,209,178,0.2)] ring-2 ring-primary-container'
          : 'flex flex-col justify-between rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-xs transition-all hover:shadow-md'
      }
    >
      {plan.ribbon && (
        <div className="absolute -top-3.5 right-6 rounded-full bg-primary-container px-3.5 py-1 font-mono-custom text-xs font-bold uppercase tracking-wider text-on-primary-container">
          {plan.ribbon}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`font-space text-2xl font-bold ${
                isFeatured ? 'text-inverse-on-surface' : 'text-on-surface'
              }`}
            >
              {plan.name}
            </h3>
            <p
              className={`mt-1 text-xs ${
                isFeatured ? 'text-inverse-on-surface/85' : 'text-on-surface-variant'
              }`}
            >
              {plan.tagline}
            </p>
          </div>
          {plan.badge && (
            <span className="rounded-full bg-surface-container px-3 py-1 font-mono-custom text-xs text-on-surface">
              {plan.badge}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1 py-1">
          <span
            className={`font-space text-5xl font-bold ${
              isFeatured ? 'text-inverse-on-surface' : 'text-on-surface'
            }`}
          >
            {plan.price}
          </span>
          <span
            className={`text-sm font-medium ${
              isFeatured ? 'text-inverse-on-surface/80' : 'text-on-surface-variant'
            }`}
          >
            / month
          </span>
        </div>

        {plan.featuresIntro && (
          <span className="font-mono-custom text-xs uppercase tracking-wider text-primary-fixed">
            {plan.featuresIntro}
          </span>
        )}

        <div
          className={`flex flex-col gap-2.5 pt-2 text-sm ${
            isFeatured ? 'border-t border-white/10' : 'border-t border-outline-variant/15'
          }`}
        >
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon
                name="check_circle"
                className={`text-[18px] ${isFeatured ? 'text-primary-container' : 'text-primary'}`}
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <button
          type="button"
          onClick={() => onSelect?.(plan.id)}
          className={
            isFeatured
              ? 'inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container py-3.5 font-space text-sm font-bold text-on-primary-container transition-all hover:shadow-[0_4px_24px_rgba(0,209,178,0.5)] active:scale-[0.99]'
              : 'inline-flex w-full items-center justify-center gap-2 rounded-lg bg-surface-container py-3.5 font-space text-sm font-bold text-on-surface transition-colors hover:bg-surface-container-highest'
          }
        >
          <span>{plan.ctaLabel}</span>
          <Icon name="arrow_forward" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}

export function FinalCta() {
  const { openGetStarted } = useGetStarted();

  return (
    <section className="relative w-full overflow-hidden bg-inverse-surface py-20 text-inverse-on-surface lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#00d1b2_1px,transparent_1px)] opacity-10 [background-size:24px_24px]" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
        <span className="rounded bg-white/10 px-3 py-1 font-mono-custom text-xs font-semibold uppercase tracking-widest text-primary-container">
          ZERO LATENCY TELEPHONY
        </span>
        <h2 className="font-space text-4xl font-bold text-inverse-on-surface sm:text-5xl">
          You already paid for the lead. <br />
          <span className="text-primary-container">Don’t make them wait.</span>
        </h2>
        <p className="max-w-xl text-base text-inverse-on-surface/80">
          estanza calls while they’re still interested. Turn costly ad clicks into qualified calendar
          bookings automatically.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => openGetStarted('general')}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-8 py-4 font-space text-base font-bold text-on-primary-container transition-all hover:shadow-[0_8px_32px_rgba(0,209,178,0.4)] active:scale-[0.99]"
          >
            <span>Get Started</span>
            <Icon name="arrow_forward" className="text-[20px]" />
          </button>
        </div>
        <p className="pt-2 font-mono-custom text-xs text-inverse-on-surface/75">
          10-second response · 24/7 · AI voice · Automatic booking
        </p>
      </div>
    </section>
  );
}

export default function Pricing() {
  const { openGetStarted } = useGetStarted();

  return (
    <>
      <section id="pricing" className="w-full bg-surface py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-2 text-center">
            <span className="rounded bg-surface-container px-3 py-1 font-mono-custom text-xs font-semibold uppercase tracking-widest text-primary">
              PRICING
            </span>
            <h2 className="font-space text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
              Start with the amount of calling you need.
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onSelect={openGetStarted} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
