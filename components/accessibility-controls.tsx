"use client"

import { useA11y } from "./providers/accessibility-provider"
import { useI18n } from "./providers/language-provider"
import { Button } from "@/components/ui/button"
import { Type, Volume2, Square } from "lucide-react"

export function AccessibilityControls({ sampleText }: { sampleText?: string }) {
  const { largeText, setLargeText, speaking, speak, stop } = useA11y()
  const { t } = useI18n()
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={largeText ? "default" : "outline"}
        onClick={() => setLargeText(!largeText)}
        aria-pressed={largeText}
        aria-label={t("largeText")}
      >
        <Type className="size-4 mr-2" />
        {t("largeText")}
      </Button>
      {speaking ? (
        <Button variant="destructive" onClick={stop} aria-label={t("stop")}>
          <Square className="size-4 mr-2" />
          {t("stop")}
        </Button>
      ) : (
        <Button variant="outline" onClick={() => speak(sampleText || "")} aria-label={t("tts")}>
          <Volume2 className="size-4 mr-2" />
          {t("listen")}
        </Button>
      )}
    </div>
  )
}
