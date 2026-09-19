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

export default function LandingPage() {
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);

  const handleWatchDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    setIsDemoPlaying(true);
  };

  return (
    <ScrollAnimations>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://estanza.dev/#organization',
                name: 'Estanza',
                url: 'https://estanza.dev/',
                logo: 'https://estanza.dev/estanza-logo.png',
              },
              {
                '@type': 'WebSite',
                '@id': 'https://estanza.dev/#website',
                url: 'https://estanza.dev/',
                name: 'Estanza',
                publisher: { '@id': 'https://estanza.dev/#organization' },
              },
              {
                '@type': 'SoftwareApplication',
                name: 'Estanza AI Voice Agents',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                url: 'https://estanza.dev/',
                description:
                  'AI voice agents that call new leads in 10 seconds, qualify prospects, and book appointments automatically.',
                offers: [
                  {
                    '@type': 'Offer',
                    name: 'Growth',
                    price: '299',
                    priceCurrency: 'USD',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '299',
                      priceCurrency: 'USD',
                      unitText: 'MONTH',
                    },
                  },
                  {
                    '@type': 'Offer',
                    name: 'Pro Scale',
                    price: '599',
                    priceCurrency: 'USD',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '599',
                      priceCurrency: 'USD',
                      unitText: 'MONTH',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
      <div className="flex min-h-screen flex-col bg-surface text-on-surface">
        <Header />
        <main className="w-full flex-1 pt-16 lg:pt-20">
          <Hero onWatchDemo={handleWatchDemo} />
          <ValueProp />
          <HowItWorks />
          <DemoVideo isPlaying={isDemoPlaying} onPlayingChange={setIsDemoPlaying} />
          <Pricing />
        </main>
        <Footer />
      </div>
    </ScrollAnimations>
  );
}
