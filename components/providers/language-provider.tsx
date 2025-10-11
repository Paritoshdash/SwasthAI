"use client";

import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dict, type Lang, type DictionaryKey } from "@/lib/translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictionaryKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("he-lang") as Lang | null;
    if (saved && dict[saved]) return saved;
    
    const browserLang = navigator.language.split("-")[0] as Lang;
    if (dict[browserLang]) return browserLang;
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    localStorage.setItem("he-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => {
    return (key: DictionaryKey) => {
      return dict[lang][key] ?? dict.en[key] ?? key;
    };
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}