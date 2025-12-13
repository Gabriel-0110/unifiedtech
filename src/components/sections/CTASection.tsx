"use client";

const benefits = [
  "Free consultation & project assessment",
  "Transparent pricing with no hidden fees",
  "Dedicated project manager assigned",
  "Agile development methodology",
  "Regular progress updates & demos",
  "30-day post-launch support included",
];

interface ContactMethod {
  title: string;
  description: string;
  action: string;
  onClick?: () => void;
  href?: string;
}

const handleLiveChatClick = () => {
  // Try to trigger Microsoft Omnichannel chat widget
  if (typeof window !== "undefined") {
    try {
      // Check if Microsoft Omnichannel is available
      const microsoftOmnichannel = (window as any).Microsoft?.Omnichannel;
      if (microsoftOmnichannel) {
        microsoftOmnichannel.LiveChatWidget?.open();
      } else {
        // Fallback - scroll to contact form if chat widget isn't loaded
        window.location.href = "/contact";
      }
    } catch (error) {
      // Fallback to contact page
      window.location.href = "/contact";
    }
  }
};

const contactMethods: ContactMethod[] = [
  {
    title: "Live Chat",
    description: "Get instant answers to your questions",
    action: "Start Chat",
    onClick: handleLiveChatClick,
  },
  {
    title: "Schedule Call",
    description: "Book a free 30-minute consultation",
    action: "Book Now",
    href: "/contact",
  },
  {
    title: "Call Direct",
    description: "Speak with our team immediately",
    action: "Call Now",
    href: "tel:+18556403636",
  },
];

export const CTASection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="mb-16 text-center">
            <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-12 shadow-2xl">
              <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2">
                <span className="mr-2 h-4 w-4 text-blue-600">⚡</span>
                <span className="text-sm font-medium text-blue-700">
                  Ready to get started?
                </span>
              </div>
              <h2 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
                Let's Build Something Amazing Together
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
                Ready to transform your business with cutting-edge technology?
                Our team of experts is here to turn your vision into reality.
              </p>
              <div className="mx-auto mb-8 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center space-x-3 text-left"
                  >
                    <span className="h-5 w-5 flex-shrink-0 text-blue-500">
                      ✓
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/contact"
                  className="rounded-lg bg-blue-600 px-8 py-4 text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
                >
                  Start Your Project
                </a>
                <a
                  href="/case-studies"
                  className="rounded-lg border border-gray-300 dark:border-gray-600 px-8 py-4 text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  View Our Portfolio
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>No Long-term Contracts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span>100% Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold dark:text-white">
                Choose Your Preferred Way to Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're here to help in whatever way works best for you
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {contactMethods.map((method) => {
                const handleClick = () => {
                  if (method.onClick) {
                    method.onClick();
                  } else if (method.href) {
                    window.location.href = method.href;
                  }
                };

                return (
                  <div
                    key={method.title}
                    className="group cursor-pointer"
                    onClick={handleClick}
                  >
                    <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg">
                      <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-4 transition-transform duration-300 group-hover:scale-110">
                        <span className="h-8 w-8 text-white">💬</span>
                      </div>
                      <h4 className="mb-2 text-xl font-bold dark:text-white">
                        {method.title}
                      </h4>
                      <p className="mb-6 text-gray-600 dark:text-gray-400">
                        {method.description}
                      </p>
                      <button className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 transition-colors group-hover:border-blue-500 group-hover:text-blue-500 dark:group-hover:border-blue-400 dark:group-hover:text-blue-400">
                        {method.action}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-white">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Limited Time: Free Project Assessment
              </h3>
              <p className="mb-6 text-blue-100">
                Get a comprehensive analysis of your project requirements,
                technology recommendations, and estimated timeline—completely
                free.
              </p>
              <div className="mb-6 flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">24</div>
                  <div className="text-sm text-blue-200">Hours</div>
                </div>
                <div className="text-xl text-blue-200">:</div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">FREE</div>
                  <div className="text-sm text-blue-200">Assessment</div>
                </div>
                <div className="text-xl text-blue-200">:</div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">NO</div>
                  <div className="text-sm text-blue-200">Commitment</div>
                </div>
              </div>
              <a
                href="/contact?offer=free-assessment"
                className="rounded-lg border border-white px-6 py-3 text-white shadow-lg transition-colors hover:bg-white hover:text-blue-600"
              >
                Claim Your Free Assessment
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
