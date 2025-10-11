"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CustomLanguageSwitcher } from "@/components/custom-language-switcher"; // ✨ Import the new component

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-semibold">SwasthAI</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/schemes">
            <Button variant="ghost">Schemes</Button>
          </Link>
          <Link href="/chatbot">
            <Button variant="ghost">AI Chat</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
          <Link href="/emergency">
            <Button variant="ghost">Emergency🆘</Button>
          </Link>
          <Link href="/wellness-hub">
            <Button variant='ghost'>Wellness Hub</Button>
          </Link>
          <Link href="/pregnancy-care">
            <Button variant="ghost">Pregnancy Care</Button>
          </Link>
          <Link href="/reminders">
            <Button variant="ghost">Reminders</Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* ✨ Replaced the old toggle with the new custom switcher */}
          <CustomLanguageSwitcher />
          <ThemeToggle />
          <Link href="/consult">
            <Button className="bg-primary text-primary-foreground hover:opacity-90">
              Start Consultation
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}