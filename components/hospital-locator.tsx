"use client"

import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { useI18n } from "./providers/language-provider"

export function HospitalLocator() {
  const { t } = useI18n()

  const openMaps = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          const url = `https://www.google.com/maps/search/hospital/@${latitude},${longitude},14z`
          window.open(url, "_blank", "noopener,noreferrer")
        },
        () => {
          window.open("https://www.google.com/maps/search/hospital+near+me", "_blank", "noopener,noreferrer")
        },
      )
    } else {
      window.open("https://www.google.com/maps/search/hospital+near+me", "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section id="locator" className="container mx-auto px-4 py-12" aria-labelledby="locatorTitle">
      <h2 id="locatorTitle" className="text-2xl md:text-3xl font-semibold mb-4">
        {t("hospitalLocator")}
      </h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-muted-foreground max-w-2xl">
          Quickly find nearby hospitals and open the route in Google Maps. For emergencies, dial 112.
        </p>
        <Button onClick={openMaps} className="bg-accent text-accent-foreground hover:opacity-90">
          <MapPin className="size-4 mr-2" />
          {t("hospitalLocator")}
        </Button>
      </div>
    </section>
  )
}
