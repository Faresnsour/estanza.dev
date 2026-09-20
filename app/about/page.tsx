'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollAnimations from '@/components/ui/ScrollAnimations';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <ScrollAnimations>
      <div className="flex min-h-screen flex-col bg-surface text-on-surface">
        <Header />
        <main className="w-full flex-1 pt-20">
          {/* Hero Section */}
          <section className="relative w-full overflow-hidden bg-surface py-24 lg:py-32">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-10 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low text-primary text-xs font-mono-custom font-medium shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                  ABOUT US · estanza.dev
                </span>
                <span className="text-xs font-mono-custom text-outline tracking-wider uppercase">EST. 2024</span>
              </div>
              <h1 className="font-space font-bold text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight leading-[1.15] mb-10 max-w-4xl">
                We built Estanza because we watched too many good leads go cold.
              </h1>
              <div className="max-w-3xl">
                <p className="font-body-lg text-xl lg:text-2xl text-on-surface-variant font-normal leading-[1.75] tracking-normal">
                  A prospect fills out a form, gets excited, checks their email… and waits. By the time someone finally calls back, they've already talked to two competitors. That gap — the ten, twenty, sixty minutes between "submitted" and "contacted" — is where most businesses quietly lose the deal.
                </p>
                <p className="font-body-lg text-xl lg:text-2xl text-on-surface font-medium leading-[1.75] mt-6">
                  So we built something that closes it in seconds, not hours.
                </p>
              </div>
            </div>
          </section>

          {/* Mission / Philosophy */}
          <section className="w-full py-20 lg:py-28 bg-surface-container-low relative">
            <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
              <span className="font-mono-custom text-xs uppercase tracking-widest text-outline font-semibold mb-4 block">
                OPERATIONAL PHILOSOPHY
              </span>
              <blockquote className="font-space text-2xl sm:text-3xl lg:text-4xl font-semibold text-on-surface tracking-tight leading-snug">
                "Speed gets people's attention. It's not what keeps them with us. Here's what actually does."
              </blockquote>
              <div className="w-12 h-1 bg-primary-container mx-auto mt-8 rounded-full" />
            </div>
          </section>

          {/* Four Pillars */}
          <section className="w-full py-24 lg:py-36 bg-surface">
            <div className="mx-auto max-w-5xl px-6 lg:px-8 space-y-24 lg:space-y-36">
              {/* Pillar 01 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <div className="lg:col-span-4 flex flex-col">
                  <div className="font-mono-custom text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    01 — ARCHITECTURE & CONVERSATION
                  </div>
                  <h2 className="font-space text-3xl sm:text-4xl font-bold text-on-surface tracking-tight leading-tight">
                    We build around your business, not a script.
                  </h2>
                </div>
                <div className="lg:col-span-8 pt-2">
                  <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-[1.8] font-normal">
                    Before your agent ever picks up a call, we sit down with how your business actually sells — what your leads ask, where they hesitate, what makes them say yes. The agent is trained on that. Not on a one-size-fits-all pitch that happens to mention your company name.
                  </p>
                  <div className="mt-8 flex items-center gap-6 pt-6">
                    <div className="flex items-center gap-2 font-mono-custom text-xs text-on-surface font-medium">
                      <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                      Bespoke Qualification Logic
                    </div>
                    <div className="flex items-center gap-2 font-mono-custom text-xs text-on-surface font-medium">
                      <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
                      Context-Aware Objection Flow
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 02 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <div className="lg:col-span-4 flex flex-col">
                  <div className="font-mono-custom text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    02 — TAILORED CRAFTSMANSHIP
                  </div>
                  <h2 className="font-space text-3xl sm:text-4xl font-bold text-on-surface tracking-tight leading-tight">
                    Every detail is intentional. Nothing is off the shelf.
                  </h2>
                </div>
                <div className="lg:col-span-8 pt-2">
                  <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-[1.8] font-normal">
                    If a feature is on your account, it's there because your business needed it — not because it shipped in a template. That takes longer for us upfront. It's also why what you get actually fits, instead of feeling like software you have to work around.
                  </p>
                  <div className="mt-8 p-6 bg-surface-container-low rounded-xl shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">tune</span>
                      <p className="font-body-lg text-sm text-on-surface-variant leading-relaxed">
                        Zero bloated menu trees or generic SaaS modules. Every webhook payload, field mapping, and telephony endpoint is custom-wired to your CRM schema.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pillar 03 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <div className="lg:col-span-4 flex flex-col">
                  <div className="font-mono-custom text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    03 — PARTNERSHIP & SPEED
                  </div>
                  <h2 className="font-space text-3xl sm:text-4xl font-bold text-on-surface tracking-tight leading-tight">
                    Your time doesn't sit in a queue.
                  </h2>
                </div>
                <div className="lg:col-span-8 pt-2">
                  <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-[1.8] font-normal">
                    We know what it feels like to wait on a vendor while your own leads are going cold. So when you reach out, you hear back fast — not "within 2 business days." If something needs fixing, we fix it. If it needs explaining, we explain it. That's it.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container font-mono-custom text-xs text-on-surface font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> Dedicated Slack Bridge
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container font-mono-custom text-xs text-on-surface font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> Direct Engineer Access
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container font-mono-custom text-xs text-on-surface font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> Instant Telephony Routing Updates
                    </span>
                  </div>
                </div>
              </div>

              {/* Pillar 04 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                <div className="lg:col-span-4 flex flex-col">
                  <div className="font-mono-custom text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                    04 — RIGOROUS ENGINEERING
                  </div>
                  <h2 className="font-space text-3xl sm:text-4xl font-bold text-on-surface tracking-tight leading-tight">
                    We're fast because it's engineered that way, not marketed that way.
                  </h2>
                </div>
                <div className="lg:col-span-8 pt-2">
                  <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-[1.8] font-normal">
                    The same standard we hold your leads' response time to, we hold the platform to. It's built on a modern stack — Next.js 16, TypeScript, end to end — so calls connect quickly and your dashboard doesn't sit there spinning.
                  </p>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-lg bg-surface-container-low shadow-sm">
                      <div className="font-mono-custom text-[11px] text-outline uppercase tracking-wider mb-1">Stack Engine</div>
                      <div className="font-space font-semibold text-lg text-on-surface">Next.js 16</div>
                      <div className="font-mono-custom text-xs text-on-surface-variant mt-1">App Router + Edge</div>
                    </div>
                    <div className="p-5 rounded-lg bg-surface-container-low shadow-sm">
                      <div className="font-mono-custom text-[11px] text-outline uppercase tracking-wider mb-1">Type Safety</div>
                      <div className="font-space font-semibold text-lg text-on-surface">TypeScript</div>
                      <div className="font-mono-custom text-xs text-on-surface-variant mt-1">End-to-End Strict</div>
                    </div>
                    <div className="p-5 rounded-lg bg-surface-container-low shadow-sm">
                      <div className="font-mono-custom text-[11px] text-outline uppercase tracking-wider mb-1">Telephony Core</div>
                      <div className="font-space font-semibold text-lg text-on-surface">Direct SIP/WSS</div>
                      <div className="font-mono-custom text-xs text-on-surface-variant mt-1">Sub-second audio link</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team / Executive Summary */}
          <section className="w-full py-20 lg:py-28 bg-surface-container-lowest shadow-[0_1px_12px_rgba(0,0,0,0.02)]">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="p-10 lg:p-14 rounded-2xl bg-surface-container-low relative shadow-sm overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary-container/10 rounded-full blur-2xl pointer-events-none" />
                <span className="font-mono-custom text-xs uppercase tracking-widest text-primary font-bold mb-4 block">
                  IN BRIEF
                </span>
                <p className="font-space text-2xl sm:text-3xl text-on-surface font-semibold leading-relaxed tracking-tight">
                  "That's the short version: work built around you, real attention to detail, fast answers, and a platform that's actually fast under the hood."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-space font-bold text-on-primary text-sm shadow-sm">
                    ED
                  </div>
                  <div>
                    <div className="font-space font-semibold text-sm text-on-surface">The Estanza Engineering Team</div>
                    <div className="font-mono-custom text-xs text-on-surface-variant">Virginia · San Francisco</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-24 lg:py-32 bg-surface relative">
            <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
              <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-[1.2] mb-6">
                Ready to close the gap between submitted and contacted?
              </h2>
              <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10">
                Stop losing qualified inbound leads to response latency. Experience how sub-second voice AI changes your conversion economics.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                <Link
                  href="/#book-a-call"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary-container text-on-primary-container font-space font-semibold text-base shadow-[0_4px_20px_rgba(0,209,178,0.3)] hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  Book a Discovery Call
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <Link
                  href="/#capabilities"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-surface-container text-on-surface font-space font-semibold text-base hover:bg-surface-container-high transition-all"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">phone_in_talk</span>
                  See Live Telephony Demo
                </Link>
              </div>
              <div className="mt-12 flex items-center justify-center gap-8 font-mono-custom text-xs text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-sm">lock</span> Enterprise SOC2 Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-sm">bolt</span> Zero Setup Friction
                </span>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ScrollAnimations>
  );
}