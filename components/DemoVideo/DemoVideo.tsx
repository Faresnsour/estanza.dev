'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';

const TOTAL_SECONDS = 75;
const WAVEFORM_BARS = [28, 48, 64, 24, 40, 56, 32, 64, 48, 20, 56, 40, 64, 36, 16];

type TimelineStep = {
  marker: string;
  title: string;
  caption: string;
  highlighted?: boolean;
};

const TIMELINE: TimelineStep[] = [
  { marker: '✓', title: 'Lead submitted', caption: '00:00 - Web Form' },
  { marker: '✓', title: 'Call started', caption: '00:09 - Outbound Call', highlighted: true },
  { marker: '3', title: 'Booked', caption: '00:42 - Calendar Synced' },
];

type DemoVideoProps = {
  /** Omit for uncontrolled mode; pass to drive playback from a parent. */
  isPlaying?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
};

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function DemoVideo({ isPlaying: playingProp, onPlayingChange }: DemoVideoProps) {
  const isControlled = playingProp !== undefined;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [internalPlaying, setInternalPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(42);

  const isPlaying = isControlled ? playingProp : internalPlaying;

  const setPlaying = useCallback((next: boolean) => {
    if (!isControlled) setInternalPlaying(next);
    onPlayingChange?.(next);
  }, [isControlled, onPlayingChange]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setElapsed((previous) => (previous >= TOTAL_SECONDS ? 0 : previous + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      void audio.play().catch(() => {
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, setPlaying]);

  return (
    <section id="demo" className="w-full bg-surface-container-low py-16 lg:py-24">
      <audio
        ref={audioRef}
        src="/saraEstanzaaiv.mp3"
        preload="none"
        onEnded={() => setPlaying(false)}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-2 text-center">
          <span className="rounded bg-surface-container-highest px-3 py-1 font-mono-custom text-xs font-semibold uppercase tracking-widest text-primary">
            LIVE DEMO
          </span>
          <h2 className="font-space text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
            Don’t take our word for it.
          </h2>
          <p className="text-base text-on-surface-variant">
            Watch what happens when a lead comes in. A real lead. A real call. A real conversation.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-inverse-surface p-6 text-inverse-on-surface shadow-2xl lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-container/15 blur-3xl" />

          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-error/20 px-2.5 py-1 font-mono-custom text-xs text-error-container">
                <span className="h-2 w-2 animate-pulse rounded-full bg-error" />
                REC
              </span>
              <span className="font-mono-custom text-sm font-semibold text-inverse-on-surface">
                REPLAY: 10s Lead Capture Session
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono-custom text-sm text-primary-container">
              <span>{formatTime(elapsed)}</span>
              <span className="text-inverse-on-surface/70">/ 01:15</span>
            </div>
          </div>

          <div className="my-6 flex flex-col items-center justify-center gap-6 rounded-xl border border-white/5 bg-white/5 px-6 py-10">
            <div className="flex w-full max-w-lg items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => setPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause demo call' : 'Play demo call'}
                className={`flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-[0_0_24px_rgba(0,209,178,0.4)] transition-all ${
                  isPlaying ? 'scale-105' : 'hover:scale-105 active:scale-95'
                }`}
              >
                <Icon name={isPlaying ? 'pause' : 'play_arrow'} filled className="text-[34px]" />
              </button>

              <div className="flex h-16 flex-1 items-center justify-between gap-1.5 px-2">
                {WAVEFORM_BARS.map((height, index) => (
                  <div
                    key={`${height}-${index}`}
                    className={`h-16 w-1.5 origin-center rounded-full bg-primary-container transition-transform duration-300 transform-gpu ${
                      isPlaying ? 'animate-pulse' : 'opacity-70'
                    }`}
                    style={{ transform: `scaleY(${(isPlaying ? height : 16) / 64})` }}
                  />
                ))}
              </div>
            </div>

            <p className="max-w-md text-center font-mono-custom text-sm text-inverse-on-surface/80">
              “Hi Sarah, this is Clara from Estanza. I noticed your team just requested an enterprise
              pilot...”
            </p>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              {TIMELINE.map((step) => (
                <div key={step.title} className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full font-mono-custom text-xs font-bold ${
                      step.marker === '✓'
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-primary-fixed text-on-primary-fixed'
                    }`}
                  >
                    {step.marker}
                  </div>
                  <span className="font-space text-xs font-semibold text-inverse-on-surface">
                    {step.title}
                  </span>
                  <span
                    className={`font-mono-custom text-[11px] ${
                      step.highlighted ? 'text-primary-fixed' : 'text-inverse-on-surface/75'
                    }`}
                  >
                    {step.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
