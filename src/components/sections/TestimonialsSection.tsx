"use client";

import { useState } from "react";

interface Testimonial { id: number; name: string; role: string; company: string; rating: number; text: string; project: string; results: string }
const testimonials: Testimonial[] = [
  { id: 1, name: "Sarah Chen", role: "CTO", company: "TechFlow Solutions", rating: 5, text: "UnifiedTech transformed our entire digital infrastructure. Their expertise in cloud solutions and AI integration helped us scale from 10K to 1M users seamlessly.", project: "Cloud Migration & AI Integration", results: "900% user growth, 60% cost reduction" },
  { id: 2, name: "Marcus Rodriguez", role: "Founder & CEO", company: "HealthTech Innovations", rating: 5, text: "Working with UnifiedTech was game-changing. They delivered a HIPAA-compliant telemedicine platform that exceeded our expectations.", project: "Healthcare Platform Development", results: "HIPAA compliance, 50K+ patient registrations" },
  { id: 3, name: "Emily Watson", role: "VP of Operations", company: "RetailMax Corp", rating: 5, text: "The e-commerce platform UnifiedTech built for us increased our online sales by 300%. Their team understood our business needs perfectly.", project: "E-commerce Platform", results: "300% sales increase, 95% customer satisfaction" },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];
  const nextTestimonial = () => setCurrentIndex((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Don't just take our word for it. Here's what industry leaders have to say about working with UnifiedTech Solutions.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-8 relative">
              <div className="absolute top-6 right-6 text-4xl text-blue-300">"</div>
              <div className="flex items-center space-x-1 mb-6">{Array.from({ length: currentTestimonial.rating }).map((_, i) => (<span key={i} className="text-yellow-400 text-xl">★</span>))}</div>
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">"{currentTestimonial.text}"</p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"><span className="text-white font-bold text-lg">{currentTestimonial.name.charAt(0)}</span></div>
                <div><h4 className="text-lg font-semibold text-gray-900 dark:text-white">{currentTestimonial.name}</h4><p className="text-sm text-gray-600 dark:text-gray-400">{currentTestimonial.role} at {currentTestimonial.company}</p></div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium text-blue-600 mb-1">Project</p><p className="text-sm text-gray-600 dark:text-gray-300">{currentTestimonial.project}</p></div>
                  <div><p className="text-sm font-medium text-blue-600 mb-1">Results</p><p className="text-sm text-gray-600 dark:text-gray-300">{currentTestimonial.results}</p></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-8">
                <div className="flex space-x-2">{testimonials.map((_, index) => (<button key={index} onClick={() => setCurrentIndex(index)} aria-label={`Show testimonial ${index + 1}`} className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${index === currentIndex ? "bg-blue-500 scale-125" : "bg-gray-300 hover:bg-blue-300 dark:bg-gray-600 dark:hover:bg-blue-500"}`} />))}</div>
                <div className="flex space-x-2">
                  <button onClick={prevTestimonial} aria-label="Previous testimonial" className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">←</button>
                  <button onClick={nextTestimonial} aria-label="Next testimonial" className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">→</button>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">Trusted by Industry Leaders</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center"><p className="text-2xl font-bold text-blue-600">100+</p><p className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</p></div>
                <div className="text-center"><p className="text-2xl font-bold text-blue-600">4.9/5</p><p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p></div>
                <div className="text-center"><p className="text-2xl font-bold text-blue-600">98%</p><p className="text-sm text-gray-600 dark:text-gray-400">Retention Rate</p></div>
                <div className="text-center"><p className="text-2xl font-bold text-blue-600">24/7</p><p className="text-sm text-gray-600 dark:text-gray-400">Support</p></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-semibold mb-4">Join Our Success Stories</h3>
              <p className="mb-6 text-blue-100">Ready to see similar results for your business?</p>
              <a href="/contact" className="inline-block px-6 py-3 border border-white text-white hover:bg-white hover:text-blue-600 rounded-lg transition-colors">Start Your Project</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
