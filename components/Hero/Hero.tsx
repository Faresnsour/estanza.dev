'use client';

import Icon from '../ui/Icon';
import { useGetStarted } from '../ui/GetStartedProvider';

const WAVEFORM_BARS = [32, 48, 20, 56, 36, 64, 44, 28, 56, 24, 60, 40, 16, 52, 60, 28];

const TRUST_SIGNALS = [
  { icon: 'bolt', label: 'Avg. latency < 280ms' },
  { icon: 'verified_user', label: 'Zero dropped calls' },
  { icon: 'sync', label: 'Calendar synced' },
];

type HeroProps = {
  /** Fired by the “See It In Action” button — scroll to the demo and start playback. */
  onWatchDemo?: () => void;
};

export default function Hero({ onWatchDemo }: HeroProps) {
  const { openGetStarted } = useGetStarted();

  return (
    <section id="top" className="relative w-full overflow-hidden bg-surface py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column — copy */}
          <div className="flex flex-col items-start gap-4 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 font-mono-custom text-xs text-on-surface shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-container" />
              </span>
              <span>AI VOICE AGENTS · 10-SECOND RESPONSE · AUTOMATIC BOOKING</span>
            </div>

            <h1 className="max-w-2xl font-space text-4xl font-bold leading-tight tracking-tight text-on-surface sm:text-5xl lg:text-[56px]">
              Your next lead might be ready to buy right now.{' '}
              <span className="text-primary-container drop-shadow-xs">Call them in 10 seconds.</span>
            </h1>

            <p className="max-w-xl font-body-lg text-lg text-on-surface-variant">
              estanza automatically calls new leads the moment they submit their information — 24/7.
              No waiting for someone to see the notification. No callback hours later.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openGetStarted('general')}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-6 py-3.5 font-space text-base font-bold text-on-primary-container transition-all hover:shadow-[0_4px_20px_rgba(0,209,178,0.4)] active:scale-[0.99]"
              >

                <span>Get Started</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </button>

              <button
                type="button"
                onClick={onWatchDemo}
                className="inline-flex items-center gap-2 rounded-lg bg-inverse-surface px-6 py-3.5 font-space text-base font-medium text-on-primary shadow-sm transition-all hover:bg-on-surface active:scale-[0.99]"
              >
                <Icon name="play_circle" filled className="text-[20px] text-primary-container" />
                <span>See It In Action</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono-custom text-xs text-on-surface-variant">
              {TRUST_SIGNALS.map((signal, index) => (
                <div key={signal.icon} className="flex items-center gap-4">
                  {index > 0 && <span className="text-outline-variant">/</span>}
                  <div className="flex items-center gap-1.5">
                    <Icon name={signal.icon} className="text-[16px] text-primary-container" />
                    <span>{signal.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — live telephony console */}
          <div
            data-hero-visual
            className="relative mt-8 lg:col-span-5 lg:mt-0"
          >
            <div className="absolute -inset-2 -z-10 rounded-xl bg-gradient-to-tr from-primary-container/20 to-secondary/10 blur-xl" />
            <TelephonyConsole />
          </div>
        </div>
      </div>
    </section>
  );
}

function TelephonyConsole() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-inverse-surface p-6 text-inverse-on-surface shadow-xl">
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-primary-container/10 blur-2xl" />

      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary-container" />
          <span className="font-mono-custom text-xs uppercase tracking-wider text-primary-fixed">
            ESTANZA TELEPHONY ENGINE
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-primary/40 px-2 py-0.5 font-mono-custom text-[11px] text-primary-fixed">
            LIVE
          </span>
          <span className="rounded bg-white/10 px-2 py-0.5 font-mono-custom text-[11px] text-inverse-on-surface">
            LATENCY &lt; 280ms
          </span>
        </div>
      </div>

      <div className="my-4 flex items-center justify-between rounded-lg bg-white/10 p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/20 text-primary-container">
            <Icon name="phone_in_talk" filled className="text-[20px]" />
          </div>
          <div>
            <div className="font-mono-custom text-xs font-semibold text-inverse-on-surface">
              Prospect: Marcus Vance (VP Sales)
            </div>
            <div className="flex items-center gap-1 font-mono-custom text-[11px] text-primary-fixed">
              <span className="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-primary-container" />
              Connected in 00:08s · High-Res Opus HD
            </div>
          </div>
        </div>
        <span className="font-mono-custom text-xs text-primary-fixed">00:14</span>
      </div>

      <div className="mb-4 flex flex-col gap-2 rounded-lg border border-white/5 bg-white/5 p-3.5">
        <div className="flex items-center justify-between font-mono-custom text-[11px] text-inverse-on-surface/70">
          <span>OUTBOUND SIP AUDIO STREAM</span>
          <span className="text-primary-fixed">SYNTHESIZED EMOTION ENGINE</span>
        </div>
        <div className="flex h-14 w-full items-center justify-between gap-1 px-1">
          {WAVEFORM_BARS.map((value, index) => (
            <div
              key={`${value}-${index}`}
              className="w-1 animate-pulse rounded-full bg-primary-container"
              style={{
                height: `${value * 0.7}px`,
                animationDelay: `${(index % 4) * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative rounded-lg bg-white/10 p-3.5">
        <div className="flex items-start gap-2.5">
          <Icon name="chat" className="mt-0.5 text-[18px] text-primary-container" />
          <div className="space-y-1">
            <div className="text-xs text-inverse-on-surface">
              <strong className="text-primary-fixed">Lead:</strong> “I just requested a consultation
              quote on your site... wait, you’re calling me already?”
            </div>
            <div className="pt-1 text-xs text-inverse-on-surface/90">
              <strong className="text-primary-container">Estanza AI:</strong> “Yes Marcus! We pride
              ourselves on zero delay. I saw you need 400 qualified demos this quarter...”
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between font-mono-custom text-[11px] text-inverse-on-surface/60">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
            Natural Turn-Taking Active
          </span>
          <span>00:14 / 01:30</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 font-mono-custom text-[11px] text-inverse-on-surface/50">
        <span>CARRIER: GLOBAL TIER-1 PSTN</span>
        <span className="text-primary-fixed">CALENDAR SLOT DETECTED: TOMORROW 2:30 PM</span>
      </div>
    </div>
  );
}
