"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Assuming useI18n hook is defined as in your original code
const useI18n = () => ({
  t: (key: string) => {
    const translations: { [key: string]: string } = {
      tagline: "Personal Health Companion for Mother and Child Care",
      startConsultation: "➡️Check Pregnancy First",
      checkSchemes: "Check Schemes",
    };
    return translations[key] || key;
  },
});

export function Hero() {
  const { t } = useI18n()
  const copy = t("tagline")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    // MODIFICATION: Removed the 'hero-bg' class as the video will be the background
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] overflow-hidden">

      {/* --- MODIFICATION START --- */}
      {/* 1. Added the video element for the background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        poster="../public/images/hospital-hero.jpg" // Optional: A fallback image
      >
        {/* 2. Set the source to the video file in your 'public' folder */}
        <source src="/AI_Healthcare_Accessibility_Video_Creation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* --- MODIFICATION END --- */}

      {/* Enhanced gradient overlay (remains on top of the video for text readability) */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30 
                   lg:bg-gradient-to-r lg:from-background/95 lg:via-background/70 lg:to-background/30
                   md:bg-gradient-to-r md:from-background/90 md:via-background/60 md:to-background/20
                   sm:bg-gradient-to-r sm:from-background/85 sm:via-background/50 sm:to-background/10
                   transition-all duration-1000" 
        aria-hidden 
      />
      
      {/* Main content container (no changes here) */}
      <div className="relative container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center px-4 sm:px-6 py-16 md:py-20 lg:py-28 lg:px-8">
        
        {/* Text content section */}
        <div className={`flex flex-col gap-4 sm:gap-6 md:gap-8 items-center text-center lg:items-start lg:text-left transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Main heading */}
          <h1 className="text-balance text-3xl xs:text-4xl font-bold tracking-tight text-foreground 
                         sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl
                         transition-all duration-500 hover:scale-[1.02] cursor-default">
            {copy}
          </h1>
          
          {/* Subtitle */}
          <p className={`max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed 
                         transition-all duration-700 delay-200 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Trusted AI guidance, telemedicine, and health scheme awareness to support mothers and children on their health journey.
          </p>
          
          {/* Button group */}
          <div className={`flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start 
                           transition-all duration-700 delay-400 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <a href="/maternal-care" className="w-full xs:w-auto group">
              <Button 
                size="lg" 
                className="w-full xs:w-auto bg-primary text-primary-foreground 
                           transition-all duration-300 hover:scale-105 hover:shadow-lg 
                           active:scale-95 group-hover:shadow-xl
                           text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                <span className="flex items-center gap-2">
                  {t("startConsultation")}
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
                  </svg>
                </span>
              </Button>
            </a>
            
            <a href="/schemes" className="w-full xs:w-auto group">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full xs:w-auto border-2 transition-all duration-300 
                           hover:scale-105 hover:shadow-md active:scale-95 
                           group-hover:border-primary/50 group-hover:bg-primary/5
                           text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                <span className="flex items-center gap-2">
                  {t("checkSchemes")}
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </a>
          </div>
        </div>

        {/* The rest of your component remains unchanged */}
        {/* Enhanced Health Illustration */}
        <div className={`hidden lg:flex items-center justify-center transition-all duration-1000 delay-500 transform ${
          isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95'
        }`}>
            {/* ... your illustration code here ... */}
        </div>
      </div>
      
      {/* The rest of your component remains unchanged */}
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          {/* ... your scroll indicator code here ... */}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
          {/* ... your background pattern code here ... */}
      </div>
    </section>
  )
}