import Image from 'next/image';
import Icon from '../ui/Icon';
import { useGetStarted } from '../ui/GetStartedProvider';

type Phase = {
  id: string;
  label: string;
  icon: string;
  title: string;
  body: string;
  meta: string;
  badge?: string;
  highlighted?: boolean;
  metaAccent?: boolean;
};

const PHASES: Phase[] = [
  {
    id: 'phase-01',
    label: 'PHASE 01',
    icon: 'contact_page',
    title: 'Lead submitted',
    body: 'Visitor enters contact details and project needs via web form or paid ad campaign.',
    meta: 'Trigger: Webhook / API',
  },
  {
    id: 'phase-02',
    label: 'PHASE 02 · 10S WINDOW',
    icon: 'ring_volume',
    title: 'estanza calls',
    body: 'Autonomous voice agent dials the prospect’s mobile device instantly over tier-1 telephony trunks.',
    meta: 'Speed-to-dial: 00:08s',
    badge: '10-Second Guarantee',
    highlighted: true,
  },
  {
    id: 'phase-03',
    label: 'PHASE 03',
    icon: 'record_voice_over',
    title: 'Conversation starts',
    body: 'Natural human-sounding dialogue answers technical questions, clarifies timeline, & qualifies budgetary fit.',
    meta: 'NLP Latency: 270ms',
  },
  {
    id: 'phase-04',
    label: 'PHASE 04',
    icon: 'calendar_month',
    title: 'Appointment booked',
    body: 'Confirmed meeting drops directly onto your team’s live calendar with rich transcription notes.',
    meta: 'Status: Meeting Scheduled',
    metaAccent: true,
  },
];

type Integration = {
  icon: string;
  name: string;
  description: string;
  imageUrl?: string;
};

const INTEGRATIONS: Integration[] = [
  {
    icon: 'calendar_today',
    name: 'Google Calendar',
    description: 'Real-time availability read/write lock',
    imageUrl: '/integrations/google-calendar.png',
  },
  {
    icon: 'link',
    name: 'Calendly',
    description: 'Instant booking link triggers',
    imageUrl: '/integrations/calendly.svg',
  },
  {
    icon: 'hub',
    name: 'GoHighLevel',
    description: 'Full agency pipeline sync & logs',
    imageUrl: '/integrations/gohighlevel.png',
  },
  {
    icon: 'dataset',
    name: 'HubSpot',
    description: 'Deals, stages, & voice transcripts',
    imageUrl: '/integrations/hubspot.svg',
  },
];

function PhaseCard({ phase }: { phase: Phase }) {
  if (phase.highlighted) {
    return (
      <div className="relative flex flex-col justify-between rounded-xl bg-inverse-surface p-6 text-inverse-on-surface shadow-[0_0_24px_rgba(0,209,178,0.2)] ring-2 ring-primary-container">
        {phase.badge && (
          <div className="absolute -top-3 left-4 rounded bg-primary-container px-2.5 py-0.5 font-mono-custom text-[11px] font-bold uppercase tracking-wider text-on-primary-container">
            {phase.badge}
          </div>
        )}
        <div>
          <div className="mb-4 flex items-center justify-between pt-2">
            <span className="font-mono-custom text-xs font-bold text-primary-container">
              {phase.label}
            </span>
            <Icon name={phase.icon} className="text-[22px] text-primary-container" />
          </div>
          <h3 className="mb-2 font-space text-lg font-bold text-inverse-on-surface">{phase.title}</h3>
          <p className="text-sm text-inverse-on-surface/80">{phase.body}</p>
        </div>
        <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-3 font-mono-custom text-xs text-primary-fixed">
          <span className="h-2 w-2 animate-ping rounded-full bg-primary-container" />
          <span>{phase.meta}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-xl border border-outline-variant/20 bg-surface-container-low p-6 shadow-xs transition-all hover:shadow-sm">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono-custom text-xs font-bold text-primary">{phase.label}</span>
          <Icon name={phase.icon} className="text-[22px] text-on-surface-variant" />
        </div>
        <h3 className="mb-2 font-space text-lg font-bold text-on-surface">{phase.title}</h3>
        <p className="text-sm text-on-surface-variant">{phase.body}</p>
      </div>
      <div
        className={`mt-6 flex items-center gap-2 border-t border-outline-variant/10 pt-3 font-mono-custom text-xs ${
          phase.metaAccent ? 'font-semibold text-primary' : 'text-on-surface-variant'
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${phase.metaAccent ? 'bg-primary' : 'bg-outline-variant'}`}
        />
        <span>{phase.meta}</span>
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="w-full bg-surface-container-low py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-2 text-center">
          <span className="rounded bg-surface-container px-3 py-1 font-mono-custom text-xs font-semibold uppercase tracking-widest text-primary">
            INTEGRATIONS
          </span>
          <h2 className="font-space text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
            Your current setup can stay.
          </h2>
          <p className="text-base text-on-surface-variant">
            estanza connects with the tools already handling your leads and appointments.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((integration) => (
            <div
              key={integration.name}
              className="flex flex-col items-center gap-2 rounded-xl border border-transparent bg-surface-container-lowest p-6 text-center shadow-xs transition-all hover:border-primary-container"
            >
              <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-primary">
                {integration.imageUrl ? (
                  <Image
                    src={integration.imageUrl}
                    alt={`${integration.name} logo`}
                    className="h-7 w-7 object-contain"
                    width={28}
                    height={28}
                    loading="lazy"
                  />
                ) : (
                  <Icon name={integration.icon} className="text-[28px]" />
                )}
              </div>
              <span className="font-space text-base font-bold text-on-surface">
                {integration.name}
              </span>
              <span className="text-xs text-on-surface-variant">{integration.description}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl rounded-xl bg-surface-container-high px-6 py-3 text-center shadow-xs">
          <p className="font-mono-custom text-sm font-semibold text-on-surface">
            Your ads bring the lead in <span className="mx-2 text-primary">·</span> Your CRM keeps
            the info <span className="mx-2 text-primary">·</span> estanza makes the call.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Pipeline() {
  const { openGetStarted } = useGetStarted();

  return (
    <section id="how-it-works" className="w-full bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start gap-1">
          <span className="rounded bg-surface-container px-3 py-1 font-mono-custom text-xs font-semibold uppercase tracking-widest text-primary">
            ESTANZA
          </span>
          <h2 className="font-space text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
            So we made the first call automatic.
          </h2>
          <p className="text-base text-on-surface-variant">
            The second a lead comes in, estanza picks up the phone.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl bg-surface-container-high p-6 shadow-xs md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
              <Icon name="touch_app" className="text-[24px]" />
            </div>
            <div>
              <p className="font-space text-base font-bold text-on-surface">
                It happens without someone on your team having to pick up their phone and make the
                call.
              </p>
              <p className="mt-0.5 text-sm text-on-surface-variant">
                10 seconds can make a difference between closing an enterprise deal and missing the
                window entirely.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openGetStarted()}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 font-space text-sm font-bold text-on-primary shadow-sm transition-colors hover:bg-on-surface"
          >
            <span>Deploy Telephony</span>
            <Icon name="bolt" className="text-[16px]" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  return (
    <>
      <Pipeline />
      <Integrations />
    </>
  );
}
