import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { GetStartedProvider } from "@/components/ui/GetStartedProvider";
import "./globals.css";


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
      </head>
      <body className="min-h-full flex flex-col bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
        <GetStartedProvider>{children}</GetStartedProvider>
      </body>
    </html>
  );
}
