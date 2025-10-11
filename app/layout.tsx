import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguagePrompt } from '@/components/language-prompt'; // Your existing import


import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/providers/language-provider"
import { AccessibilityProvider } from "@/components/providers/accessibility-provider"
import { ConditionalLayout } from "@/components/conditional-layout"
import { Toaster } from "@/components/ui/sonner"
import { SchemeNotifier } from "@/components/scheme-notifier"
import GoogleTranslate from '@/components/google-translate'; 

export const metadata: Metadata = {
  title: "SwasthAI",
  description: "Created by Team SwasthAI",
  generator: "SwasthAI.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        
        {/* Google Translate Widget positioned at the top-right */}
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
          <GoogleTranslate />
        </div>

        {/* This component will show the one-time language prompt */}
        <LanguagePrompt />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <AccessibilityProvider>
              <Suspense fallback={null}>
                <ConditionalLayout>{children}</ConditionalLayout>
              </Suspense>
            </AccessibilityProvider>
          </LanguageProvider>
        </ThemeProvider>

        <Analytics />
        
        <Toaster position="bottom-right" richColors />
        <SchemeNotifier />
      </body>
    </html>
  )
}