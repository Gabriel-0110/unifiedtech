import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Terms of Service | UnifiedTech Solutions by G&G",
  description:
    "Understand the conditions that govern UnifiedTech Solutions by G&G SMS communications, including consent, message frequency, and legal rights.",
};

const contactDetails = [
  { label: "Business Address", value: "Albany, NY" },
  { label: "Email", value: "info@ggunifiedtech.com" },
  { label: "Phone", value: "+1 (855) 640-3636" },
  { label: "Website", value: "https://ggunifiedtech.com" },
  { label: "Support Hours", value: "Monday-Friday, 9 AM-6 PM EST" },
];

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="space-y-12">
        <header className="space-y-6 border-b border-gray-200 pb-8 dark:border-gray-800">
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              UnifiedTech Solutions by G&G
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              SMS/Text Messaging Terms of Service
            </h1>
            <p className="text-muted-foreground">
              ALVES &amp; ARAUJO TOURISM SERVICES, LLC (DBA UnifiedTech
              Solutions by G&amp;G)
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">
                  Effective Date:
                </span>{" "}
                December 13, 2025
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Last Updated:
                </span>{" "}
                December 13, 2025
              </p>
            </div>
            <ul className="grid gap-2 text-sm sm:grid-cols-2">
              {contactDetails.map((item) => (
                <li key={item.label} className="space-x-2">
                  <span className="font-semibold text-foreground">
                    {item.label}:
                  </span>
                  <span className="text-muted-foreground">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            By opting in to our SMS communications you agree to these Terms,
            which explain program eligibility, message frequency, data usage,
            and your rights.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            Opting in to receive SMS text messages from UnifiedTech Solutions by
            G&amp;G constitutes acceptance of these Terms. Do not enroll in the
            SMS program if you do not agree.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Description of Service</h2>
          <p>
            Our SMS program is intended for service-related, 1-to-1
            conversational messaging only. Messages may include:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Appointment reminders and scheduling confirmations</li>
            <li>Account-related notifications and service updates</li>
            <li>Customer support responses and troubleshooting follow-ups</li>
          </ul>
          <p className="mt-2 text-sm text-muted-foreground">
            Note: This program does not include marketing or promotional
            content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Opt-In Consent</h2>
          <p>We require express consent before sending SMS messages.</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Opt in by submitting your mobile phone number through our website
              contact form at https://ggunifiedtech.com/contact and providing
              explicit consent via an unchecked opt-in checkbox
            </li>
            <li>
              Participants must be 18 or older and authorized to use the mobile
              number
            </li>
            <li>Consent is not a condition of purchasing our services</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Message Frequency and Timing
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Message frequency varies based on service activity</li>
            <li>
              Standard delivery window: 8 AM to 9 PM EST, Monday through Friday
            </li>
            <li>
              Critical service notifications may be sent outside standard hours
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Message and Data Rates</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Standard message and data rates from your mobile carrier may apply
            </li>
            <li>
              UnifiedTech Solutions does not charge additional fees for SMS
              participation
            </li>
            <li>
              You are responsible for any carrier charges tied to SMS delivery
            </li>
            <li>Contact your carrier for plan-specific information</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Opt-Out Instructions</h2>
          <p>You can opt out at any time using any of the methods below:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Reply STOP, UNSUBSCRIBE, or QUIT to any SMS</li>
            <li>Email info@ggunifiedtech.com with your opt-out request</li>
            <li>Call +1 (855) 640-3636 to speak with support</li>
          </ul>
          <p>
            Opt-out requests are processed immediately. A confirmation message
            is sent, and you may receive messages for up to 24 hours while
            processing completes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            7. Help and Customer Support
          </h2>
          <p>Need help with the SMS program?</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Reply HELP to any SMS for automated instructions</li>
            <li>Email info@ggunifiedtech.com or call +1 (855) 640-3636</li>
            <li>Support hours: Monday-Friday, 9 AM-6 PM EST</li>
            <li>
              HELP auto-response: &quot;UnifiedTech SMS Help: Reply STOP to
              opt-out. Msg&amp;Data rates may apply. Support:
              info@ggunifiedtech.com or +1 (855) 640-3636&quot;
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            8. Carrier and Device Requirements
          </h2>
          <p>
            Our SMS program supports major U.S. carriers and standard mobile
            devices.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Carriers: Verizon Wireless, AT&amp;T, T-Mobile, Sprint (now part
              of T-Mobile), US Cellular, and other participating carriers
            </li>
            <li>
              Requirements: SMS-capable device, active plan, and U.S. mobile
              number
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            9. Privacy and Data Protection
          </h2>
          <p>
            We respect your privacy and comply with applicable data protection
            laws. Review our SMS Privacy Policy for details about the
            information we collect and how it is used. We never sell or share
            your mobile number for third-party marketing.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Prohibited Uses</h2>
          <p>
            You agree not to misuse the SMS program. Prohibited activities
            include:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Using the service for unlawful, abusive, or harassing
              communications
            </li>
            <li>
              Attempting to compromise the security or integrity of our systems
            </li>
            <li>
              Leveraging automation or bots to interact with the SMS program
            </li>
            <li>Sharing credentials or unauthorized access methods</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Service Availability</h2>
          <p>
            SMS delivery depends on carrier networks and geographic coverage.
            UnifiedTech Solutions is not responsible for carrier delays,
            interruptions, or message delivery failures.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            12. Disclaimers and Limitations
          </h2>
          <p>The SMS service is provided on an &quot;as is&quot; basis.</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>No guarantee of message delivery timing or availability</li>
            <li>
              Service interruptions may occur for maintenance or technical
              issues
            </li>
            <li>Liability is limited to the maximum extent permitted by law</li>
            <li>We are not responsible for carrier-imposed fees or charges</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Legal Compliance</h2>
          <p>Our SMS program complies with the following requirements:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Telephone Consumer Protection Act (TCPA), including express
              written consent
            </li>
            <li>A2P 10DLC registration standards and campaign approval</li>
            <li>Federal Communications Commission regulations</li>
            <li>Carrier-specific content and throughput guidelines</li>
          </ul>
          <p>
            Your legal rights may include statutory damages (500 to 1,500
            dollars per violation) and the ability to file complaints with
            regulators such as the FCC.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">14. Changes to Terms</h2>
          <p>
            We may modify these Terms from time to time. Material updates will
            be communicated via SMS or email, and continued participation after
            notice constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">15. Termination</h2>
          <p>Participation may end in the following ways:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>You opt out of the SMS program</li>
            <li>We discontinue the program with at least 30 days notice</li>
            <li>
              We suspend or terminate your access immediately for policy
              violations
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">16. Contact Information</h2>
          <p>Questions about these Terms? Contact us:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              ALVES &amp; ARAUJO TOURISM SERVICES, LLC — UnifiedTech Solutions
              by G&amp;G
            </li>
            <li>Business Address: Albany, NY</li>
            <li>Email: info@ggunifiedtech.com</li>
            <li>Phone: +1 (855) 640-3636</li>
            <li>Website: https://ggunifiedtech.com</li>
            <li>Support Hours: Monday-Friday, 9 AM-6 PM EST</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">17. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of New York and
            applicable federal law, without regard to conflict of law
            principles.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">18. Severability</h2>
          <p>
            If any portion of these Terms is deemed unenforceable, the remaining
            provisions will continue in full force and effect.
          </p>
        </section>
      </article>
    </main>
  );
}
