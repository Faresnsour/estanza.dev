'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import ValueProp from '@/components/ValueProp/ValueProp';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import DemoVideo from '@/components/DemoVideo/DemoVideo';
import Pricing from '@/components/Pricing/Pricing';
import Footer from '@/components/Footer/Footer';
import ScrollAnimations from '@/components/ui/ScrollAnimations';
import TryItLiveClient from '@/components/demo/TryItLive.client';

export default function LandingPage() {
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);

  const handleWatchDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    setIsDemoPlaying(true);
  };

  return (
    <ScrollAnimations>
      <div className="flex min-h-screen flex-col bg-surface text-on-surface">
        <Header />
        <main className="w-full flex-1 pt-16 lg:pt-20">
          <Hero onWatchDemo={handleWatchDemo} />
          <ValueProp />
          <HowItWorks />
          <TryItLiveClient
            id="demo"
            sampleCallSlot={
              <DemoVideo
                isPlaying={isDemoPlaying}
                onPlayingChange={setIsDemoPlaying}
              />
            }
          />
          <Pricing />
          <section id="faq" className="w-full bg-surface-container-low py-16 lg:py-24">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <span className="rounded bg-surface-container px-3 py-1 font-mono-custom text-xs font-semibold uppercase tracking-widest text-primary">
                  FAQ
                </span>
                <h2 className="mt-3 font-space text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
                  Common questions about Estanza.
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  {
                    question: 'How fast does Estanza call new leads?',
                    answer:
                      'Estanza calls new leads within 10 seconds of form submission, with an average telephony latency under 280ms.',
                  },
                  {
                    question: 'What tools does Estanza integrate with?',
                    answer:
                      'Estanza integrates with Google Calendar, Calendly, GoHighLevel, and HubSpot to sync lead data and book appointments automatically.',
                  },
                  {
                    question: 'How much does Estanza cost?',
                    answer:
                      'Estanza offers two plans: Growth at $299/month with 300 minutes of outbound talk time, and Pro Scale at $599/month with 750 minutes plus native GoHighLevel and HubSpot integrations, custom agent personality, and a custom knowledge base.',
                  },
                  {
                    question: 'Does Estanza qualify leads before booking a meeting?',
                    answer:
                      "Yes. The AI voice agent asks qualifying questions such as budget, decision timeline, and team size before booking a meeting on the sales team's calendar.",
                  },
                ].map((item) => (
                  <details
                    key={item.question}
                    className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-5"
                  >
                    <summary className="cursor-pointer font-space font-bold text-on-surface">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ScrollAnimations>
  );
}