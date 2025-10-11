"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/50">
      <div className={`container mx-auto px-4 sm:px-6 py-8 sm:py-12 grid gap-8 md:grid-cols-3 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Brand Section */}
        <div className="space-y-4 group">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-lg">🏥</span>
            </div>
            <p className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              SwasthAI
            </p>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed transition-all duration-300 group-hover:text-foreground/80 cursor-default">
            Accessible AI-driven care for families. Not a substitute for professional medical advice.
          </p>
          
          {/* Social Links */}
          {/* <div className="flex gap-3 pt-2">
            {[
              { icon: "📘", label: "Facebook", href: "#" },
              { icon: "📷", label: "Instagram", href: "#" },
              { icon: "🐦", label: "Twitter", href: "#" },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center text-lg hover:bg-primary/20 hover:scale-110 hover:text-primary transition-all duration-300 cursor-pointer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div> */}
        </div>

        {/* Company Links */}
        <div className="space-y-4 group">
          <p className="font-medium text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Company
          </p>
          <nav className="flex flex-col gap-3">
            {[
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ].map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 hover:font-medium group/link"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover/link:opacity-100 transition-all duration-300" />
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Resources & Emergency */}
        <div className="space-y-6">
          <div className="space-y-4 group">
            <p className="font-medium text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Resources
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "tel:112", label: "Emergency: 112", icon: "🚨" },
                { href: "https://www.mohfw.gov.in/", label: "MoHFW", icon: "🇮🇳" },
                { href: "https://www.who.int/", label: "WHO", icon: "🌍" },
                { href: "/schemes", label: "Health Schemes", icon: "📋" },
              ].map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-2 group/link flex items-center gap-2"
                >
                  <span className="text-base">{link.icon}</span>
                  <span className="flex-1">{link.label}</span>
                  {link.href.startsWith("http") && (
                    <span className="text-xs opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">
                      ↗
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Emergency Banner */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🆘</span>
              <p className="font-semibold text-red-800 text-sm">Emergency Help</p>
            </div>
            <p className="text-red-700 text-xs leading-relaxed group-hover:text-red-800 transition-colors duration-300">
              In case of medical emergency, contact local emergency services immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} SwasthAI. All rights reserved.
            </div>
            
            {/* Additional Links */}
            <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors duration-300 hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors duration-300 hover:underline">
                Terms
              </Link>
              <Link href="/sitemap" className="hover:text-foreground transition-colors duration-300 hover:underline">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground/70 max-w-2xl mx-auto leading-relaxed">
              This AI health companion provides guidance and information only. Always consult healthcare professionals for medical advice and emergencies.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Link href="/emergency">
          <button className="w-14 h-14 bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center text-xl font-bold">
            🆘
          </button>
        </Link>
      </div>
    </footer>
  )
}