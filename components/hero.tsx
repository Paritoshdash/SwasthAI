"use client"

import { Button } from "@/components/ui/button"
// import { AccessibilityControls } from "./accessibility-controls"
// Assuming you have a language provider like this
// import { useI18n } from "./providers/language-provider" 

// Mock implementation for demonstration if language provider is not set up
const useI18n = () => ({
  t: (key: string) => {
    const translations: { [key: string]: string } = {
      tagline: "Your Personal Health Companion for Mother and Child Care",
      startConsultation: "Start Consultation",
      checkSchemes: "Check Schemes",
    };
    return translations[key] || key;
  },
});


export function Hero() {
  const { t } = useI18n()
  const copy = t("tagline")

  return (
    <section className="hero-bg relative">
      <div className="absolute inset-0 bg-background/70 dark:bg-background/60" aria-hidden />
      <div className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-start gap-6">
        <h1 className="text-balance text-3xl md:text-5xl font-bold fade-in-up">{copy}</h1>
        <p className="max-w-2xl text-pretty text-muted-foreground fade-in-up">
          Trusted AI guidance, telemedicine, and health scheme awareness to support mothers and children.
        </p>
        <div className="flex flex-wrap gap-3 fade-in-up">
          <a href="/consult">
            <Button className="bg-primary text-primary-foreground">{t("startConsultation")}</Button>
          </a>
          <a href="/schemes">
            <Button variant="outline">{t("checkSchemes")}</Button>
          </a>
        </div>
        {/* The AccessibilityControls component is assumed to exist */}
        {/* <AccessibilityControls sampleText={copy} /> */}
      </div>
    </section>
  )
}