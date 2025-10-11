"use client";

import { useState, useEffect } from "react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Main Header Section */}
      <div
        className={`max-w-4xl transition-all duration-700 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          About SwasthAI Companion
        </h1>
        <p className="text-muted-foreground mt-4 sm:mt-6 max-w-3xl text-pretty leading-relaxed text-base sm:text-lg lg:text-xl transition-all duration-500 hover:text-foreground/80 cursor-default">
          Our mission is to make healthcare guidance more accessible for every family with a focus on maternal and child
          wellness. We combine trusted medical references with modern AI to provide instant, easy-to-understand guidance.
          We prioritize data privacy and never share your information without consent.
        </p>
      </div>

      {/* AI Section */}
      <div
        className={`mt-8 sm:mt-12 lg:mt-16 transition-all duration-700 delay-200 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 mb-4 sm:mb-6 group cursor-default">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            How our AI works
          </h2>
        </div>

        <ul className="space-y-3 sm:space-y-4 pl-2 sm:pl-4">
          {[
            "Generates evidence-informed advice and reminders",
            "Always includes a safety disclaimer",
            "Encourages professional consultation when needed",
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-muted-foreground leading-relaxed text-base sm:text-lg group hover:text-foreground transition-all duration-300 cursor-default"
            >
              <div className="w-2 h-2 bg-primary rounded-full mt-2 sm:mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
              <span className="flex-1 group-hover:translate-x-2 transition-transform duration-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sources Section */}
      <div
        className={`mt-8 sm:mt-12 lg:mt-16 transition-all duration-700 delay-400 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
    
      </div>

      {/* 🧠 SwasthAI Project Section */}
      <div
        className={`mt-12 sm:mt-16 lg:mt-20 transition-all duration-700 delay-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-lg transition-shadow duration-500">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
            About Our Project — <span className="font-bold">SwasthAI</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
            <strong>SwasthAI</strong> is a smart healthcare assistant built to revolutionize how people access medical guidance 
            and wellness support. It empowers users with AI-driven insights, predictive health recommendations, 
            and emergency assistance — all designed with inclusivity and accessibility in mind.  
            <br /><br />
            From early disease detection to emergency resource mapping, our system integrates modern AI algorithms, 
            cloud-based analytics, and interactive visualizations to help individuals make informed health decisions instantly.
          </p>

          <div className="border-t border-blue-200 dark:border-blue-800 my-4"></div>

          <h3 className="text-xl sm:text-2xl font-medium text-blue-600 dark:text-blue-300 mb-3">
            Meet Our Team — <span className="font-semibold">Team SwasthAI</span>
          </h3>
          <ul className="space-y-2 text-muted-foreground text-base sm:text-lg">
            <li><strong>Paritosh Dash</strong></li>
            <li><strong>Manish Narayan Sahoo</strong></li>
            <li><strong>Chandi Prasad Mishra</strong></li>
            
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className={`mt-12 sm:mt-16 lg:mt-20 text-center transition-all duration-700 delay-800 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/20 hover:border-primary/40 transition-all duration-500">
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg mb-4 max-w-2xl mx-auto">
            Join thousands of families who trust HealthEase Companion powered by <strong>SwasthAI</strong> for smarter,
            safer, and more personalized healthcare support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 active:scale-95 transition-transform duration-300">
              Start Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
