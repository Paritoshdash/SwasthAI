"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/components/providers/language-provider";

export function Navbar() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/placeholder-logo.svg"
            alt="HealthEase Companion logo"
            width={28}
            height={28}
          />
          <span className="font-semibold">{t("appName")}</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/features">
            <Button variant="ghost">{t("features")}</Button>
          </Link>
          {/* New links merged from previous version */}
          <Link href="/schemes">
            <Button variant="ghost">{t("schemes") || "Schemes"}</Button>
          </Link>
          <Link href="/chatbot">
            <Button variant="ghost">{t("aiChat") || "AI Chat"}</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">{t("about")}</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">{t("contact")}</Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {/* Updated link to point to the /consult page */}
          <Link href="/consult">
            <Button className="bg-primary text-primary-foreground hover:opacity-90">
              {t("startConsultation")}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

