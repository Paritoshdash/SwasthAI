'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Stethoscope, ClipboardList, Baby, ShieldCheck, PhoneCall } from "lucide-react"
import { useI18n } from "./providers/language-provider"

const items = (t: (k: string) => string) => [
  { icon: Brain, title: t("aiAssistant"), desc: "Instant answers to common health questions." },
  { icon: ClipboardList, title: t("symptomChecker"), desc: "Get preliminary guidance and wellness tips." },
  { icon: Stethoscope, title: t("teleconsult"), desc: "Book teleconsults with certified doctors." },
  { icon: Baby, title: t("tracker"), desc: "Vaccination reminders, diet, growth monitoring." },
  { icon: ShieldCheck, title: t("awareness"), desc: "Discover benefits and eligibility." },
  { icon: PhoneCall, title: t("emergency"), desc: "Find helplines and nearby hospitals." },
]

export function FeatureCards() {
  const { t } = useI18n()
  return (
    <section className="container mx-auto px-4 py-12" aria-labelledby="features">
      <h2 id="features" className="text-2xl md:text-3xl font-semibold mb-6">
        {t("features")}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items(t).map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="hover:shadow-sm transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="size-5 text-primary" aria-hidden />
                <span>{title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
