import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Privacy Policy | UnifiedTech Solutions by G&G",
  description:
    "Learn how UnifiedTech Solutions by G&G collects, uses, and protects personal information when delivering SMS communications.",
};

const contactDetails = [
  { label: "Email", value: "info@ggunifiedtech.com" },
  { label: "Phone", value: "+1 (855) 640-3636" },
  { label: "Address", value: "Albany, NY" },
  { label: "Website", value: "https://ggunifiedtech.com" },
  { label: "Support Hours", value: "Monday-Friday, 9 AM-6 PM EST" },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="space-y-12">
        <header className="space-y-6 border-b border-gray-200 pb-8 dark:border-gray-800">
          <div className="space-y-2 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              UnifiedTech Solutions by G&G
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              SMS Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              ALVES & ARAUJO TOURISM SERVICES, LLC (DBA UnifiedTech Solutions by
              G&G)
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
            This policy explains how we collect, use, retain, and protect
            personal information when you participate in our SMS text messaging
            program.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            ALVES & ARAUJO TOURISM SERVICES, LLC, doing business as UnifiedTech
            Solutions by G&G, collects and processes limited personal
            information to power our SMS communications. This policy outlines
            the scope of that processing and the safeguards we maintain.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Legal Entity: ALVES & ARAUJO TOURISM SERVICES, LLC</li>
            <li>DBA: UnifiedTech Solutions by G&G</li>
            <li>Contact: info@ggunifiedtech.com | +1 (855) 640-3636</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. SMS Program Overview</h2>
          <p>
            Our SMS program is intended for service-related, 1-to-1
            conversational messaging only. Messages may include:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Appointment reminders for scheduled consultations</li>
            <li>Account-related notifications and service updates</li>
            <li>Customer support follow-ups and troubleshooting</li>
          </ul>
          <p className="mt-2 text-sm text-muted-foreground">
            Note: This program does not include marketing or promotional
            content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Information We Collect</h2>
          <p>
            We collect only the information needed to deliver and document SMS
            communications:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Mobile phone number used for message delivery</li>
            <li>Consent records confirming your opt-in preferences</li>
            <li>Communication history for audit and support purposes</li>
            <li>
              Basic device and carrier information to ensure deliverability
            </li>
            <li>General location routing data (no precise tracking)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. Legal Basis for Processing
          </h2>
          <p>We process SMS data under the following legal bases:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Express consent for receiving service-related SMS messages</li>
            <li>Legitimate interest for service-related updates and support</li>
            <li>Contractual necessity to fulfill service agreements</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. How We Use SMS Information
          </h2>
          <p>
            Your details are used to deliver relevant service communications and
            maintain compliance records.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Service updates, appointment reminders, and customer support
            </li>
            <li>Account-related notifications</li>
            <li>Regulatory compliance and record keeping</li>
            <li>Improving message quality, accuracy, and timing</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Message Frequency and Types
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Message frequency varies based on service activity</li>
            <li>
              Service notifications sent as needed for appointments and account
              updates
            </li>
            <li>
              Standard delivery between 8 AM and 9 PM EST, Monday through Friday
            </li>
            <li>Emergency notices may be delivered outside normal hours</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            7. Consent and Opt-In Process
          </h2>
          <p>
            We require express written consent before sending service-related
            SMS messages.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Opt in by submitting your mobile phone number through our website
              contact form at https://ggunifiedtech.com/contact and providing
              explicit consent via an unchecked opt-in checkbox
            </li>
            <li>
              Participants must be 18 or older and authorized to use the number
            </li>
            <li>Consent is never a condition for purchasing services</li>
            <li>You can withdraw consent at any time without penalty</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            8. Opt-Out and Unsubscribe Options
          </h2>
          <p>You can stop messages whenever you choose.</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Reply STOP, UNSUBSCRIBE, or QUIT to any SMS</li>
            <li>Email info@ggunifiedtech.com or call +1 (855) 640-3636</li>
            <li>Submit a request via our website contact form</li>
            <li>
              Opt-out requests take effect immediately, with a possible 24-hour
              delay for processing
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            9. Help and Customer Support
          </h2>
          <p>
            Support is available if you need assistance with SMS communications.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Reply HELP to any message for automated instructions</li>
            <li>Contact info@ggunifiedtech.com or +1 (855) 640-3636</li>
            <li>Support hours: Monday-Friday, 9 AM-6 PM EST</li>
            <li>
              Automated response: &quot;UnifiedTech SMS Help: Reply STOP to
              opt-out. Msg&amp;Data rates may apply. Support:
              info@ggunifiedtech.com or +1 (855) 640-3636&quot;
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Message and Data Rates</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Standard carrier message and data rates apply</li>
            <li>No additional fees are charged by UnifiedTech Solutions</li>
            <li>You are responsible for any charges from your carrier</li>
            <li>Contact your carrier to review your messaging plan</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            11. Supported Carriers and Device Requirements
          </h2>
          <p>
            Our SMS program supports major U.S. carriers and standard devices.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Supported carriers: Verizon Wireless, AT&amp;T, T-Mobile, Sprint
              (T-Mobile), US Cellular, and other participating carriers
            </li>
            <li>
              Requirements: SMS-capable device, U.S. mobile number, active
              carrier plan
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            12. Data Sharing and Third-Party Disclosure
          </h2>
          <p>
            We do not sell or rent your mobile number for third-party marketing.
          </p>
          <p>
            <strong>
              mobile opt-in information won't be shared with third parties for
              marketing purposes.
            </strong>
          </p>
          <p>
            Mobile phone numbers collected for SMS communications are used
            solely for service-related messaging and are not shared with third
            parties for marketing or promotional purposes.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Service providers who enable SMS delivery and compliance</li>
            <li>Legal disclosures when required by law or regulation</li>
            <li>Business transfers such as mergers or acquisitions</li>
            <li>Instances where you give additional explicit consent</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            13. Data Security and Protection
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Encryption in transit and at rest for SMS records</li>
            <li>Access controls restricting data to authorized personnel</li>
            <li>Continuous monitoring for threats and vulnerabilities</li>
            <li>Adherence to industry security standards and best practices</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">14. Data Retention</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Active subscribers: data retained while you remain opted in</li>
            <li>
              Consent records: retained for at least four years for TCPA
              compliance
            </li>
            <li>
              Communication history: stored up to two years for support and
              quality review
            </li>
            <li>Legal obligations: longer retention if required by law</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">15. International Users</h2>
          <p>
            SMS delivery is designed for U.S. mobile numbers. International
            delivery may be limited or unavailable and can incur additional
            carrier charges.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            16. Minors and Age Restrictions
          </h2>
          <p>
            Our SMS program is intended for individuals 18 and older. We do not
            knowingly collect information from minors; if you believe a minor
            has provided consent, please contact us so we can remove their data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            17. TCPA and Regulatory Compliance
          </h2>
          <p>
            We comply with federal, state, and carrier regulations governing SMS
            communications.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Telephone Consumer Protection Act (TCPA) requirements, including
              opt-in, identification, and opt-out workflows
            </li>
            <li>
              Application-to-Person (A2P) 10DLC registration and campaign
              compliance
            </li>
            <li>FCC rules, carrier guidelines, and applicable privacy laws</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">18. Policy Updates</h2>
          <p>
            We may revise this policy periodically. Material changes will be
            announced via SMS to active subscribers, email updates, and a
            prominent notice on our website. Continued participation after
            updates constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">19. Contact Information</h2>
          <p>
            Reach out with any questions about this policy or our data
            practices.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              ALVES &amp; ARAUJO TOURISM SERVICES, LLC — UnifiedTech Solutions
              by G&amp;G
            </li>
            <li>Email: info@ggunifiedtech.com</li>
            <li>Phone: +1 (855) 640-3636</li>
            <li>Address: Albany, NY</li>
            <li>Website: https://ggunifiedtech.com</li>
            <li>Support Hours: Monday-Friday, 9 AM-6 PM EST</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">20. Your Rights</h2>
          <p>
            You are entitled to transparency and control over your SMS data.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Request access to your SMS data and consent records</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion, subject to legal retention requirements</li>
            <li>
              File complaints with regulators or seek legal remedies for
              violations
            </li>
          </ul>
          <p>
            Under the TCPA, you may pursue statutory damages (500 to 1,500
            dollars per violation) and injunctive relief to stop unwanted
            messaging.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            21. Effective Date and Governing Law
          </h2>
          <p>
            This SMS Privacy Policy took effect on December 13, 2025 and is
            governed by the laws of the State of New York and applicable federal
            regulations.
          </p>
        </section>

        <footer className="rounded-lg bg-muted px-6 py-4 text-sm text-muted-foreground">
          <p>
            Document Version: 1.1 | Last Review: December 13, 2025 | Next
            Review: June 13, 2026
          </p>
        </footer>
      </article>
    </main>
  );
}
