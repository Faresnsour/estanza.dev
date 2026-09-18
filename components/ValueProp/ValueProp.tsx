import Icon from '../ui/Icon';

type ReasonStep = {
  number: string;
  title: string;
  body: string;
  emphasised?: boolean;
};

const REASON_STEPS: ReasonStep[] = [
  {
    number: '01',
    title: 'A lead fills out your form.',
    body: 'The prospect has actively dedicated their focus, typed in their requirements, and hit submit.',
  },
  {
    number: '02',
    title: 'They’re interested. They’re available. They’re thinking about your service.',
    body: 'Right at this exact micro-moment, their attention belongs entirely to solving this problem.',
  },
  {
    number: '03',
    title: 'That’s the moment to call.',
    body: 'Every minute elapsed after submission reduces pickup probability exponentially. In 30 minutes, they’ve already moved to a competitor or meeting.',
    emphasised: true,
  },
];

type Capability = {
  icon: string;
  iconClassName: string;
  title: string;
  body: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: 'live_help',
    iconClassName: 'bg-secondary-container text-on-secondary-container',
    title: 'Answer questions',
    body: 'Give it your services, pricing, locations, FAQs, and other information your customers usually ask about. The voice agent uses semantic retrieval to reply in under 300ms.',
  },
  {
    icon: 'filter_alt',
    iconClassName: 'bg-primary-container/20 text-primary',
    title: 'Qualify leads',
    body: 'Ask the questions your team normally asks before booking a call: budget size, decision timeline, team seats, or urgency parameters. Discard bad fits gently.',
  },
  {
    icon: 'edit_calendar',
    iconClassName: 'bg-secondary-fixed text-on-secondary-fixed',
    title: 'Book appointments',
    body: 'Connect Google Calendar or Calendly and let the agent find an available time with the right account executive, resolving scheduling friction right in the phone call.',
  },
  {
    icon: 'schedule_send',
    iconClassName: 'bg-surface-container-highest text-on-surface',
    title: 'Follow up',
    body: 'If the lead isn’t ready or doesn’t answer on the first attempt, the conversation doesn’t have to end there. Automated retry schedules trigger at optimal time intervals.',
  },
];

export function SpeedReason() {
  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-4">
          <span className="rounded bg-surface-container-highest px-3 py-1 font-mono-custom text-xs font-semibold uppercase tracking-widest text-primary">
            THE REASON
          </span>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <h2 className="mb-6 font-space text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
                Speed matters more than most businesses think.
              </h2>

              <div className="flex flex-col gap-3">
                {REASON_STEPS.map((step) =>
                  step.emphasised ? (
                    <div
                      key={step.number}
                      className="relative overflow-hidden rounded-xl border border-primary-container/30 bg-primary/10 p-5 shadow-xs"
                    >
                      <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary-container/30 blur-xl" />
                      <div className="relative flex items-start gap-4">
                        <span className="font-mono-custom text-xl font-bold text-primary">
                          {step.number}
                        </span>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <h3 className="font-space text-base font-bold text-on-surface">
                              {step.title}
                            </h3>
                            <Icon name="bolt" className="text-[18px] text-primary" />
                          </div>
                          <p className="text-sm text-on-surface-variant">{step.body}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={step.number}
                      className="rounded-xl bg-surface-container-lowest p-5 shadow-xs transition-shadow hover:shadow-sm"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono-custom text-xl font-bold text-on-surface-variant">
                          {step.number}
                        </span>
                        <div>
                          <h3 className="mb-1 font-space text-base font-bold text-on-surface">
                            {step.title}
                          </h3>
                          <p className="text-sm text-on-surface-variant">{step.body}</p>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm lg:col-span-6 lg:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2">
                <span className="font-mono-custom text-xs font-semibold uppercase tracking-wider text-primary">
                  INBOUND VELOCITY METRIC
                </span>
                <Icon name="trending_up" className="text-[24px] text-primary" />
              </div>

              <div className="flex flex-col">
                <span className="font-space text-5xl font-extrabold leading-none tracking-tight text-primary-container lg:text-6xl">
                  +391%
                </span>
                <span className="mt-2 font-space text-lg font-semibold uppercase tracking-wide text-on-surface">
                  CONVERSION SURGE
                </span>
              </div>

              <p className="font-space text-lg font-semibold text-on-surface">
                Higher conversion rate when leads were contacted within the first minute.
              </p>
              <p className="text-sm text-on-surface-variant">
                Research into lead response times found that contacting a lead within the first few
                minutes can dramatically increase the chances of making contact and qualifying them.
              </p>

              <div className="mt-1 flex items-start gap-3 rounded-lg border border-error/20 bg-error-container/40 p-4">
                <Icon name="warning" className="mt-0.5 text-[22px] text-error" />
                <div>
                  <span className="block font-space text-sm font-bold text-on-error-container">
                    The problem isn’t getting the lead.
                  </span>
                  <span className="text-xs text-on-error-container">
                    It’s being late. 78% of customers buy from the company that responds to them
                    first.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-outline-variant/15 pt-6 font-mono-custom text-xs text-on-surface-variant">
              <span>Source: Lead Response Management / InsideSales research</span>
              <Icon name="verified" className="text-[16px] text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="w-full bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex max-w-2xl flex-col items-start gap-1">
          <span className="rounded bg-surface-container-highest px-3 py-1 font-mono-custom text-xs font-semibold uppercase tracking-widest text-primary">
            CAPABILITIES
          </span>
          <h2 className="font-space text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
            What the agent actually does
          </h2>
          <p className="text-base text-on-surface-variant">
            It’s not just an automated “hello.” You decide what the agent knows and what it should
            ask.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CAPABILITIES.map((capability) => (
            <div
              key={capability.title}
              className="flex items-start gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-xs transition-all hover:shadow-sm"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${capability.iconClassName}`}
              >
                <Icon name={capability.icon} className="text-[24px]" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-space text-lg font-bold text-on-surface">{capability.title}</h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{capability.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ValueProp() {
  return (
    <>
      <SpeedReason />
      <Capabilities />
    </>
  );
}
