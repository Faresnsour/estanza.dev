import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { GetStartedProvider } from "@/components/ui/GetStartedProvider";
import "./globals.css";

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://estanza.dev/#organization',
      name: 'Estanza',
      url: 'https://estanza.dev/',
      email: 'hello@estanza.dev',
      logo: 'https://estanza.dev/og-image.png',
      description:
        'Estanza provides AI voice agents that automatically call new inbound leads within 10 seconds of form submission, answer their questions, qualify them, and book appointments on the sales team calendar.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://estanza.dev/#product',
      name: 'Estanza',
      url: 'https://estanza.dev/',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'AI voice agent platform that calls new leads within 10 seconds of form submission, answers questions from a custom knowledge base, qualifies leads, and books appointments via Google Calendar or Calendly.',
      provider: { '@id': 'https://estanza.dev/#organization' },
      offers: [
        {
          '@type': 'Offer',
          name: 'Growth',
          price: '299',
          priceCurrency: 'USD',
          url: 'https://estanza.dev/#pricing',
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
          url: 'https://estanza.dev/#pricing',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '599',
            priceCurrency: 'USD',
            unitText: 'MONTH',
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://estanza.dev/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How fast does Estanza call new leads?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Estanza calls new leads within 10 seconds of form submission, with an average telephony latency under 280ms.',
          },
        },
        {
          '@type': 'Question',
          name: 'What tools does Estanza integrate with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Estanza integrates with Google Calendar, Calendly, GoHighLevel, and HubSpot to sync lead data and book appointments automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Estanza cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Estanza offers two plans: Growth at $299/month with 300 minutes of outbound talk time, and Pro Scale at $599/month with 750 minutes plus native GoHighLevel and HubSpot integrations, custom agent personality, and a custom knowledge base.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Estanza qualify leads before booking a meeting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. The AI voice agent asks qualifying questions such as budget, decision timeline, and team size before booking a meeting on the sales team's calendar.",
          },
        },
      ],
    },
  ],
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estanza.dev"),
  title: {
    default: "Estanza | AI Voice Agents That Call Leads in 10 Seconds",
    template: "%s | Estanza",
  },
  description:
    "Estanza AI voice agents call new leads in 10 seconds, answer questions, qualify prospects, and book appointments automatically.",
  applicationName: "Estanza",
  keywords: [
    "AI voice agents",
    "AI lead follow-up",
    "automated lead calling",
    "appointment booking",
    "sales automation",
  ],
  authors: [{ name: "Estanza", url: "https://estanza.dev" }],
  creator: "Estanza",
  publisher: "Estanza",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://estanza.dev/",
    siteName: "Estanza",
    title: "Estanza | AI Voice Agents That Call Leads in 10 Seconds",
    description:
      "Call new leads while they are still interested. Estanza answers, qualifies, and books appointments automatically.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1468,
        height: 768,
        alt: "Estanza AI voice agents call new leads in 10 seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estanza | AI Voice Agents That Call Leads in 10 Seconds",
    description:
      "AI voice agents for faster lead response, qualification, and automatic booking.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
        <GetStartedProvider>{children}</GetStartedProvider>
      </body>
    </html>
  );
}
