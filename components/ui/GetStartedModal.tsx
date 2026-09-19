'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';

const TRANSITION_MS = 200;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Step = 1 | 2 | 3;
export type SelectedPlan = 'growth' | 'pro' | 'general';

export interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: SelectedPlan;
}

const DATES = [
  { day: '22', weekday: 'Thu', month: 'October 2026' },
  { day: '23', weekday: 'Fri', month: 'October 2026' },
  { day: '26', weekday: 'Mon', month: 'October 2026' },
  { day: '27', weekday: 'Tue', month: 'October 2026' },
  { day: '28', weekday: 'Wed', month: 'October 2026' },
];
const TIMES = ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '01:30 PM', '02:15 PM', '03:00 PM'];

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedTime, setSelectedTime] = useState('10:15 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsBrowser(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => {
        setIsRendered(true);
        requestAnimationFrame(() => setIsVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    }
    const frame = requestAnimationFrame(() => setIsVisible(false));
    const timeout = setTimeout(() => setIsRendered(false), TRANSITION_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
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
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const focusTimeout = setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      clearTimeout(focusTimeout);
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const resetAndClose = () => {
    setStep(1);
    setSubmitError('');
    onClose();
  };

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const formData = new FormData(event.currentTarget);
    let response: Response;
    try {
      response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          challenge: formData.get('challenge'),
          date: `${selectedDate.weekday}, October ${selectedDate.day}, 2026`,
          time: selectedTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
    } catch {
      setSubmitError('We could not reach the booking service. Please try again.');
      setIsSubmitting(false);
      return;
    }

    if (!response.ok) {
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      setSubmitError(result?.error ?? 'We could not send the confirmation email. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setStep(3);
  };

  if (!isBrowser || !isRendered) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <button aria-label="Close booking dialog" className="absolute inset-0 cursor-default" onClick={resetAndClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className={`relative max-h-[96vh] w-full max-w-6xl overflow-y-auto rounded-t-3xl bg-[#faf8ff] text-[#131b2e] shadow-2xl transition-all duration-200 sm:rounded-3xl ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={resetAndClose}
          aria-label="Close booking dialog"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-900"
        >
          <span aria-hidden="true" className="text-2xl leading-none">×</span>
        </button>

        <div className="border-b border-[#c3c6d7]/50 px-4 py-5 sm:px-8">
          <div className="mx-auto flex max-w-xl items-center justify-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-medium sm:gap-4 sm:px-5">
            {(['Pick a time', 'Your details', 'Confirmed'] as const).map((label, index) => {
              const itemStep = (index + 1) as Step;
              return (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full font-mono-custom text-[10px] ${
                      step >= itemStep ? 'bg-blue-600 text-white' : 'bg-[#e2e7ff] text-slate-500'
                    }`}
                  >
                    {step > itemStep ? '✓' : itemStep}
                  </span>
                  <span className={step === itemStep ? 'font-semibold' : 'hidden text-slate-500 sm:inline'}>
                    {label}
                  </span>
                  {index < 2 && <span className="hidden h-px w-8 bg-[#c3c6d7] sm:block" />}
                </div>
              );
            })}
          </div>
        </div>

        {step === 1 && (
          <div className="grid lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.4fr)]">
            <BookingIntro />
            <div className="p-5 sm:p-8">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-slate-500">
                {selectedDate.month}
              </p>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {DATES.map((date) => (
                  <button
                    key={date.day}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`rounded-xl p-2 text-center transition-colors ${
                      selectedDate.day === date.day ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-50'
                    }`}
                  >
                    <span className="block text-[10px] uppercase">{date.weekday}</span>
                    <span className="mt-1 block text-lg font-semibold">{date.day}</span>
                  </button>
                ))}
              </div>
              <p className="mt-8 border-t border-[#c3c6d7]/50 pt-6 font-space text-lg font-semibold">
                Available times for {selectedDate.weekday}, October {selectedDate.day}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-full border px-3 py-2 text-xs transition-colors ${
                      selectedTime === time
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-transparent bg-white hover:border-blue-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#c3c6d7]/50 pt-5 sm:flex-row sm:items-center">
                <span className="font-mono-custom text-[10px] text-slate-500">
                  {selectedDate.weekday}, October {selectedDate.day} at {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                </span>
                <button type="button" onClick={() => setStep(2)} className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto">
                  Continue to your details →
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.4fr)]">
            <BookingIntro />
            <form
              className="space-y-5 bg-white p-5 sm:p-8"
              onSubmit={handleBookingSubmit}
            >
              <div>
                <h2 id="booking-title" className="font-space text-2xl font-semibold sm:text-3xl">Enter your contact details</h2>
                <p className="mt-1 text-sm text-slate-600">We will generate your discovery session confirmation.</p>
              </div>
              <label className="block text-sm font-medium">Full name<input required name="name" className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></label>
              <label className="block text-sm font-medium">Work email<input required type="email" name="email" className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></label>
              <label className="block text-sm font-medium">What is your biggest challenge with lead response?<textarea name="challenge" rows={3} className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></label>
              {submitError && <p role="alert" className="text-sm text-red-600">{submitError}</p>}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                <button type="button" onClick={() => setStep(1)} className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold">← Back</button>
                <button type="submit" disabled={isSubmitting} className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60">
                  {isSubmitting ? 'Sending confirmation…' : 'Confirm booking →'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="mx-auto max-w-2xl px-5 py-12 text-center sm:px-10 sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl text-white">✓</div>
            <p className="mt-6 font-mono-custom text-[10px] uppercase tracking-[0.15em] text-blue-600">Protocol execution verified</p>
            <h2 id="booking-title" className="mt-3 font-space text-3xl font-semibold sm:text-4xl">You&apos;re officially booked!</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">Your discovery session request has been recorded for {selectedDate.weekday}, October {selectedDate.day} at {selectedTime} ({Intl.DateTimeFormat().resolvedOptions().timeZone}).</p>
            <div className="mt-8 rounded-2xl bg-[#f2f3ff] p-5 text-left text-sm">
              <p className="font-mono-custom text-[10px] uppercase tracking-widest text-blue-600">Estanza discovery session</p>
              <p className="mt-3 font-semibold">15 minute video call</p>
              <p className="mt-1 text-slate-600">A confirmation will be sent with the meeting details.</p>
            </div>
            <button type="button" onClick={resetAndClose} className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700">Return to estanza.dev</button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

function BookingIntro() {
  return (
    <aside className="bg-[#f2f3ff] p-5 sm:p-8">
      <p className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-blue-600">Executive discovery</p>
      <h2 className="mt-4 font-space text-2xl font-semibold sm:text-3xl">Book your discovery call</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        In 15 minutes, we&apos;ll review your lead flow, identify where response time is costing you
        opportunities, and show you how Estanza can automate the first call and booking.
      </p>
      <div className="mt-8 rounded-2xl bg-white p-4">
        <p className="font-semibold">15 minutes · Video call</p>
        <p className="mt-1 text-xs text-slate-500">Google Meet or Zoom details included</p>
      </div>
      <div className="mt-6 space-y-3 text-sm text-slate-700">
        <p>⚡ Lead volume &amp; leak audit</p>
        <p>✣ CRM and dialer infrastructure</p>
        <p>◉ Interactive voice demo</p>
      </div>
    </aside>
  );
}
