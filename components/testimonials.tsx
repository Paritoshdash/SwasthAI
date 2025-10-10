import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useI18n } from "./providers/language-provider"

const items = [
  { quote: "The AI tips helped me manage morning sickness better.", author: "Anita, New Mom" },
  { quote: "Booking a pediatric teleconsult was quick and easy.", author: "Rohit, Father" },
  { quote: "Great tool to guide families and triage common doubts.", author: "Dr. Meera, Pediatrician" },
]

export function Testimonials() {
  const { t } = useI18n()
  return (
    <section className="container mx-auto px-4 py-12" aria-labelledby="testimonials">
      <h2 id="testimonials" className="text-2xl md:text-3xl font-semibold mb-6">
        {t("testimonials")}
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <Card key={i} className="hover:shadow-sm transition-shadow">
            <CardHeader>
              <blockquote className="text-pretty">“{it.quote}”</blockquote>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">— {it.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
