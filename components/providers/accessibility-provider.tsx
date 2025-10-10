"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type AccessibilityContextValue = {
  largeText: boolean
  setLargeText: (v: boolean) => void
  speaking: boolean
  speak: (text: string) => void
  stop: () => void
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [largeText, setLargeText] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("he-large-text")
    if (saved) setLargeText(saved === "true")
  }, [])
  useEffect(() => {
    localStorage.setItem("he-large-text", String(largeText))
    document.documentElement.classList.toggle("access-large-font", largeText)
  }, [largeText])

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.onend = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utter)
  }
  const stop = () => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  return (
    <AccessibilityContext.Provider value={{ largeText, setLargeText, speaking, speak, stop }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useA11y() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error("useA11y must be used within AccessibilityProvider")
  return ctx
}
