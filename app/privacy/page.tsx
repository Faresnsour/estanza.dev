import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | estanza.dev',
  description: 'Privacy Policy for the estanza.dev website and AI voice agent platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-surface px-6 py-24 text-on-surface lg:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="font-mono-custom text-sm text-primary underline underline-offset-4"
        >
          Back to estanza.dev
        </Link>

        <h1 className="mt-8 font-space text-4xl font-bold tracking-tight lg:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-on-surface-variant">
          <strong>Effective Date:</strong> September 18, 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-7 text-on-surface-variant">
          <p>
            estanza.dev (&quot;estanza,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            operates the estanza.dev website and AI voice agent platform (the
            &quot;Service&quot;). This Privacy Policy explains what information we collect, how
            we use it, and the choices you have.
          </p>

          <PolicySection title="1. Information We Collect">
            <h3 className="font-semibold text-on-surface">Information you provide directly</h3>
            <ul>
              <li>Name, phone number, email address, and company details submitted through our web forms or by your customers or leads.</li>
              <li>Billing information when you subscribe to a plan.</li>
              <li>Information you add to our knowledge base for your AI voice agent to use.</li>
            </ul>
            <h3 className="mt-5 font-semibold text-on-surface">Information collected automatically</h3>
            <p>Usage data, device and browser information, IP address, and cookies (see Section 6).</p>
            <h3 className="mt-5 font-semibold text-on-surface">Call data</h3>
            <p>
              When our AI voice agent places or receives a call on your behalf, we process call
              audio, transcripts, and metadata such as duration, outcome, and timestamps to
              deliver the Service. Calls may be recorded and/or transcribed for quality, training,
              and service-improvement purposes. Where required by law, the applicable party is
              responsible for obtaining consent before recording.
            </p>
          </PolicySection>

          <PolicySection title="2. How We Use Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and improve the Service.</li>
              <li>Sync data with third-party tools you choose to connect.</li>
              <li>Send account, billing, and service-related communications.</li>
              <li>Monitor performance, detect abuse, and maintain security.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Third-Party Integrations">
            <p>
              The Service can connect to third-party platforms that you choose to link, including
              Google Calendar, Calendly, GoHighLevel, and HubSpot. Data shared with these platforms
              is governed by their own privacy policies in addition to this one. We only access the
              data required to perform the functions you enable.
            </p>
          </PolicySection>

          <PolicySection title="4. Legal Basis & Consent for Calling">
            <p>
              By using the Service, you represent that you have obtained all consents required
              under applicable law, including where applicable the U.S. Telephone Consumer
              Protection Act (TCPA) and similar telemarketing regulations, before submitting a
              contact for our AI agent to call. You will not use the Service to contact individuals
              who have not agreed to be contacted or who are on a do-not-call list.
            </p>
          </PolicySection>

          <PolicySection title="5. Data Retention">
            <p>
              We retain call recordings, transcripts, and lead data for as long as your account is
              active, or as needed to provide the Service, comply with legal obligations, resolve
              disputes, and enforce our agreements. You may request deletion as described in
              Section 8.
            </p>
          </PolicySection>

          <PolicySection title="6. Cookies & Tracking">
            <p>
              We use cookies and similar technologies to operate the website, remember preferences,
              and understand usage. You can control cookies through your browser settings;
              disabling them may limit some site functionality.
            </p>
          </PolicySection>

          <PolicySection title="7. Call Recording Disclosure">
            <p>
              Where legally required, an automated notice will inform call participants that the
              call may be recorded or handled by an AI agent. Recording laws vary by state and
              country. Customers are responsible for configuring their agent&apos;s disclosure
              script to comply with applicable laws.
            </p>
          </PolicySection>

          <PolicySection title="8. Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access, correct, or delete personal information we hold about you.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Request a copy of your data in a portable format.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
            <p>
              To exercise these rights, contact us at{' '}
              <a className="text-primary underline underline-offset-4" href="mailto:hello@estanza.dev">
                hello@estanza.dev
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection title="9. Security">
            <p>
              We use industry-standard technical and organizational measures to protect information
              from unauthorized access, loss, or misuse. No system is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection title="10. Children&apos;s Privacy">
            <p>
              The Service is not directed to individuals under 18, and we do not knowingly collect
              personal information from children.
            </p>
          </PolicySection>

          <PolicySection title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Material changes will be posted
              on this page with a new effective date.
            </p>
          </PolicySection>

          <PolicySection title="12. Contact Us">
            <p>Questions about this Privacy Policy can be sent to:</p>
            <p>
              <strong className="text-on-surface">estanza.dev</strong>
              <br />
              Online business
              <br />
              <a className="text-primary underline underline-offset-4" href="mailto:hello@estanza.dev">
                hello@estanza.dev
              </a>
            </p>
          </PolicySection>

          <p className="border-t border-outline-variant/20 pt-6 text-sm italic">
            This document is a template and does not constitute legal advice. We recommend having
            a lawyer review this policy for TCPA, call-recording, and GDPR/CCPA compliance before
            publishing.
          </p>
        </div>
      </article>
    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-space text-2xl font-bold text-on-surface">{title}</h2>
      <div className="mt-3 space-y-3 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">{children}</div>
    </section>
  );
}
