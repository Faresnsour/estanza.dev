import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | estanza.dev',
  description: 'Terms of Service for the estanza.dev website and AI voice agent platform.',
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-on-surface-variant">
          <strong>Effective Date:</strong> September 18, 2026
        </p>

        <div className="mt-10 space-y-8 text-base leading-7 text-on-surface-variant">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of estanza.dev
            and the estanza AI voice agent platform (the &quot;Service&quot;), operated by estanza.dev
            (&quot;estanza,&quot; &quot;we,&quot; or &quot;us&quot;). By creating an account or using the
            Service, you agree to these Terms.
          </p>

          <TermsSection title="1. The Service">
            <p>
              estanza provides an AI voice agent that automatically calls leads submitted through
              your forms or campaigns, answers questions, qualifies leads, and books appointments
              through integrations such as Google Calendar, Calendly, HubSpot, and GoHighLevel.
            </p>
          </TermsSection>

          <TermsSection title="2. Eligibility & Accounts">
            <p>
              You must be at least 18 years old and able to form a binding contract to use the
              Service. You are responsible for maintaining the confidentiality of your account
              credentials and for all activity under your account.
            </p>
          </TermsSection>

          <TermsSection title="3. Plans, Billing & Minutes">
            <ul>
              <li><strong>Growth</strong> — $299/month, including 300 minutes/month of outbound talk time.</li>
              <li><strong>Pro Scale</strong> — $599/month, including 750 minutes/month of outbound talk time and the additional features described on our Pricing page.</li>
              <li>Plans renew automatically each billing period unless canceled. Overage, upgrade, downgrade, and cancellation terms are described at checkout or in your account dashboard.</li>
              <li>Fees are non-refundable except where required by law.</li>
            </ul>
          </TermsSection>

          <TermsSection title="4. Your Responsibilities & Acceptable Use">
            <p>You agree that you will:</p>
            <ul>
              <li>Only submit contacts who have given appropriate consent to be contacted, in compliance with TCPA and other applicable telemarketing laws.</li>
              <li>Not use the Service for spam, illegal telemarketing, harassment, fraud, or to contact individuals on do-not-call lists.</li>
              <li>Not attempt to reverse-engineer, resell, or misuse the AI voice agent technology outside the scope of your subscription.</li>
              <li>Ensure information added to the agent&apos;s knowledge base is accurate and that you have the right to use it.</li>
            </ul>
            <p>
              We may suspend or terminate accounts that violate this section, with or without
              notice, to protect the Service and other users.
            </p>
          </TermsSection>

          <TermsSection title="5. Call Recording & Disclosures">
            <p>
              You are responsible for configuring your agent to provide legally required
              disclosures, including recording notices, and for complying with recording-consent
              laws in the jurisdictions where your leads are located.
            </p>
          </TermsSection>

          <TermsSection title="6. Third-Party Integrations">
            <p>
              The Service integrates with third-party platforms such as Google Calendar, Calendly,
              HubSpot, GoHighLevel, and telephony carriers. Your use of those platforms is subject
              to their own terms. We are not responsible for outages, data loss, or errors caused
              by third-party services.
            </p>
          </TermsSection>

          <TermsSection title="7. Intellectual Property">
            <p>
              The Service, including its software, voice models, and branding, is owned by
              estanza.dev and protected by intellectual property laws. You retain ownership of the
              data you submit, including lead information and knowledge base content, and grant us
              a license to process it solely to provide the Service.
            </p>
          </TermsSection>

          <TermsSection title="8. Disclaimers">
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available.&quot; We do not guarantee that
              calls will always connect, leads will convert, or the Service will be error-free or
              uninterrupted. Latency, conversion, and uptime figures referenced on our website are
              typical or estimated performance and are not guaranteed for every use case.
            </p>
          </TermsSection>

          <TermsSection title="9. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, estanza.dev will not be liable for indirect,
              incidental, special, or consequential damages, or for lost profits or lost leads,
              arising from your use of the Service. Our total liability for any claim will not
              exceed the amount you paid us in the three months preceding the claim.
            </p>
          </TermsSection>

          <TermsSection title="10. Indemnification">
            <p>
              You agree to indemnify and hold us harmless from claims arising out of your misuse of
              the Service, your violation of these Terms, or your violation of applicable
              telemarketing or privacy laws.
            </p>
          </TermsSection>

          <TermsSection title="11. Termination">
            <p>
              Either party may terminate the agreement as described in your plan terms. Upon
              termination, your access to the Service will end, and we may delete your data after a
              reasonable retention period, except where retention is required by law.
            </p>
          </TermsSection>

          <TermsSection title="12. Governing Law">
            <p>
              These Terms are governed by the laws of the applicable jurisdiction where estanza.dev
              is legally established, without regard to conflict-of-law principles.
            </p>
          </TermsSection>

          <TermsSection title="13. Changes to These Terms">
            <p>
              We may update these Terms from time to time. Continued use of the Service after
              changes take effect constitutes acceptance of the updated Terms.
            </p>
          </TermsSection>

          <TermsSection title="14. Contact Us">
            <p>
              <strong className="text-on-surface">estanza.dev</strong>
              <br />
              Online business
              <br />
              <a className="text-primary underline underline-offset-4" href="mailto:privacy@estanza.dev">
                privacy@estanza.dev
              </a>
            </p>
          </TermsSection>

          <p className="border-t border-outline-variant/20 pt-6 text-sm italic">
            This document is a template and does not constitute legal advice. Because this Service
            places automated or AI outbound calls, we recommend having a lawyer review these Terms
            for TCPA and telemarketing-law compliance before publishing, especially the liability
            and indemnification sections.
          </p>
        </div>
      </article>
    </main>
  );
}

function TermsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-space text-2xl font-bold text-on-surface">{title}</h2>
      <div className="mt-3 space-y-3 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">{children}</div>
    </section>
  );
}
