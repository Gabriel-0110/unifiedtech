"use client";

const stats: { value: string; label: string; description: string }[] = [
  { value: "500+", label: "Projects Completed", description: "Successful projects delivered across various industries" },
  { value: "100+", label: "Happy Clients", description: "Businesses we've helped transform and grow" },
  { value: "10+", label: "Years Experience", description: "Decade of expertise in cutting-edge technology" },
  { value: "24/7", label: "Support Available", description: "Round-the-clock technical support and maintenance" },
  { value: "98%", label: "Client Retention", description: "Long-term partnerships built on trust and results" },
  { value: "25+", label: "Team Members", description: "Skilled professionals ready to tackle any challenge" },
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">These numbers represent more than statistics—they represent successful partnerships and transformative solutions.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{stat.label}</h3>
              <p className="text-blue-100 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Recognized Excellence</h3>
            <p className="text-blue-100">Awards and certifications that validate our commitment to quality</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[{ name: "AWS Partner", level: "Advanced" }, { name: "Google Cloud", level: "Certified" }, { name: "ISO 27001", level: "Compliant" }, { name: "Industry Leader", level: "2024" }].map((cert) => (
              <div key={cert.name} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto"><span className="text-2xl">🏆</span></div>
                <p className="text-sm font-semibold text-white mb-1">{cert.name}</p>
                <p className="text-xs text-blue-100">{cert.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
