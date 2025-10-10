"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Lang = "en" | "hi" | "bn"

type Dictionary = Record<Lang, Record<string, string>>

const dict: Dictionary = {
  en: {
    appName: "HealthEase Companion",
    tagline: "Your AI-powered partner for maternal and child wellness.",
    startConsultation: "Start Consultation",
    checkSchemes: "Check Health Schemes",
    features: "Features",
    aiAssistant: "AI Health Chat Assistant",
    symptomChecker: "Symptom checker & wellness tips",
    teleconsult: "Teleconsultation with certified doctors",
    tracker: "Maternal & Child Health tracker",
    awareness: "Government health schemes awareness",
    emergency: "Emergency contacts & nearby hospitals",
    testimonials: "Testimonials",
    about: "About",
    contact: "Contact",
    dashboard: "Dashboard",
    language: "Language",
    accessibility: "Accessibility",
    tts: "Text-to-Speech",
    largeText: "Large Text",
    schemesHub: "Health Schemes Hub",
    hospitalLocator: "Nearby Hospital Locator",
    listen: "Listen",
    stop: "Stop",
  },
  hi: {
    appName: "हेल्थईज़ कम्पैनियन",
    tagline: "मातृ एवं शिशु स्वास्थ्य के लिए आपका AI-संचालित साथी।",
    startConsultation: "परामर्श शुरू करें",
    checkSchemes: "स्वास्थ्य योजनाएँ देखें",
    features: "विशेषताएँ",
    aiAssistant: "एआई स्वास्थ्य चैट सहायक",
    symptomChecker: "लक्षण जाँच और वेलनेस सुझाव",
    teleconsult: "प्रमाणित डॉक्टरों से टेली-परामर्श",
    tracker: "मातृ और शिशु स्वास्थ्य ट्रैकर",
    awareness: "सरकारी स्वास्थ्य योजनाओं की जानकारी",
    emergency: "आपातकालीन संपर्क और नज़दीकी अस्पताल",
    testimonials: "प्रशंसापत्र",
    about: "हमारे बारे में",
    contact: "संपर्क",
    dashboard: "डैशबोर्ड",
    language: "भाषा",
    accessibility: "सुगम्यता",
    tts: "टेक्स्ट-टू-स्पीच",
    largeText: "बड़ा टेक्स्ट",
    schemesHub: "स्वास्थ्य योजनाएँ केंद्र",
    hospitalLocator: "नज़दीकी अस्पताल ढूँढें",
    listen: "सुनें",
    stop: "रोकें",
  },
  bn: {
    appName: "হেলথইজ কম্প্যানিয়ন",
    tagline: "মা ও শিশুর সুস্থতার জন্য আপনার এআই-চালিত সঙ্গী।",
    startConsultation: "পরামর্শ শুরু করুন",
    checkSchemes: "স্বাস্থ্য স্কিম দেখুন",
    features: "বৈশিষ্ট্য",
    aiAssistant: "এআই হেলথ চ্যাট সহকারী",
    symptomChecker: "লক্ষণ পরীক্ষা ও সুস্থতার টিপস",
    teleconsult: "সার্টিফায়েড ডাক্তারদের সাথে টেলিকনসাল্টেশন",
    tracker: "মা ও শিশুর স্বাস্থ্য ট্র্যাকার",
    awareness: "সরকারি স্বাস্থ্য স্কিম সচেতনতা",
    emergency: "জরুরি যোগাযোগ ও নিকটস্থ হাসপাতাল",
    testimonials: "প্রশংসাপত্র",
    about: "আমাদের সম্পর্কে",
    contact: "যোগাযোগ",
    dashboard: "ড্যাশবোর্ড",
    language: "ভাষা",
    accessibility: "অ্যাক্সেসিবিলিটি",
    tts: "টেক্সট-টু-স্পিচ",
    largeText: "বড় টেক্সট",
    schemesHub: "স্বাস্থ্য স্কিম হাব",
    hospitalLocator: "নিকটস্থ হাসপাতাল খুঁজুন",
    listen: "শুনুন",
    stop: "বন্ধ",
  },
}

type LanguageContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    const saved = localStorage.getItem("he-lang") as Lang | null
    if (saved) setLang(saved)
  }, [])
  useEffect(() => {
    localStorage.setItem("he-lang", lang)
  }, [lang])

  const t = useMemo(() => {
    return (key: string) => dict[lang][key] ?? key
  }, [lang])

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider")
  return ctx
}
