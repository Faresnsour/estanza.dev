'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CALENDLY_URL = 'https://calendly.com/estanzadev/30min';

const TRANSITION_MS = 200;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export type SelectedPlan = 'growth' | 'pro' | 'general';

export interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: SelectedPlan;
}

export default function GetStartedModal({
  isOpen,
  onClose,
}: GetStartedModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const visibleFrameRef = useRef<number | null>(null);

  // Portal target only exists in the browser.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsBrowser(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Mount/unmount around the enter + exit transition.
  useEffect(() => {
    if (isOpen) {
      const renderFrame = requestAnimationFrame(() => {
        setIsRendered(true);
        const visibleFrame = requestAnimationFrame(() => setIsVisible(true));
        visibleFrameRef.current = visibleFrame;
      });
      return () => {
        cancelAnimationFrame(renderFrame);
        if (visibleFrameRef.current !== null) {
          cancelAnimationFrame(visibleFrameRef.current);
          visibleFrameRef.current = null;
        }
      };
    }

    const hideFrame = requestAnimationFrame(() => setIsVisible(false));
    const timeout = setTimeout(() => setIsRendered(false), TRANSITION_MS);
    return () => {
      cancelAnimationFrame(hideFrame);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  // Escape to close + focus trap on Tab.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setShowCalendly(false);
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll and restore focus to whatever opened the modal.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimeout = setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      clearTimeout(focusTimeout);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen]);

  const handleScheduleCall = useCallback(() => {
    setShowCalendly(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowCalendly(false);
    onClose();
  }, [onClose]);

  if (!isBrowser || !isRendered) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-started-title"
        aria-describedby="get-started-subtitle"
        className={`relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl ring-1 ring-slate-900/5 transition-all duration-200 motion-reduce:transition-none sm:rounded-2xl ${
          isVisible ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-4 opacity-0 sm:scale-95'
        }`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="h-5 w-5"
          >
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
          <div className="max-w-md">
            {showCalendly && (
              <button
                type="button"
                onClick={() => setShowCalendly(false)}
                className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
              >
                <span aria-hidden="true">←</span>
                Back to options
              </button>
            )}

            <h2
              id="get-started-title"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]"
            >
              {showCalendly ? 'Book your discovery call' : 'Book your onboarding call'}
            </h2>
            <p id="get-started-subtitle" className="mt-2 text-sm leading-relaxed text-slate-500">
              {showCalendly
                ? 'Choose a time that works for you without leaving estanza.dev.'
                : 'Schedule a call with our team to connect your CRM and plan your voice agent setup.'}
            </p>
          </div>

          {showCalendly && (
            <iframe
              title="Schedule a discovery call"
              src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff`}
              className="mt-6 h-[650px] w-full rounded-xl border border-slate-200 sm:mt-8"
            />
          )}

          {!showCalendly && (
            <div className="mt-6 sm:mt-8">
            <div className="flex flex-col rounded-xl border border-blue-200 bg-gradient-to-b from-blue-50/70 to-white p-5 ring-1 ring-inset ring-blue-600/5">
              <span className="self-start rounded-md bg-blue-600 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                Guided Onboarding
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                Connect your tools and plan your setup
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                Book a call with our team to discuss your CRM integration, voice agent workflow,
                and launch plan.
              </p>
              <button
                type="button"
                onClick={handleScheduleCall}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.99]"
              >
                <span>Schedule Discovery Call</span>
                <ArrowIcon />
              </button>
            </div>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body,
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}
