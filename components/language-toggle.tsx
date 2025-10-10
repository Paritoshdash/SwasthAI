"use client"

import { useI18n } from "./providers/language-provider"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label={t("language")}>
          <Globe className="size-4 mr-2" />
          {lang.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("hi")}>हिंदी</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("bn")}>বাংলা</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
