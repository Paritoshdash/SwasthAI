"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CustomLanguageSwitcher } from "@/components/custom-language-switcher";
import { useState, useEffect } from "react";

// Special navbar without login/signup buttons
function EmergencyContactNavbar() {
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
          <Link href="/reminders">
            <Button variant="ghost">Reminders</Button>
          </Link>
          <Link href="/tools">
            <Button variant="ghost">Tools</Button>
          </Link>
          <Link href="/wellness-hub">
            <Button variant='ghost'>Baby Care</Button>
          </Link>
          <Link href="/pregnancy-care">
            <Button variant="ghost">Pregnancy Care</Button>
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
        </div>
        <div className="flex items-center gap-2">
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

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define routes where ONLY the Footer should be hidden
  const noFooterRoutes = ["/chatbot"];
  
  // Define routes where we should use the special navbar without login/signup
  const specialNavbarRoutes = ["/emergency", "/contact"];

  const shouldHideFooter = isClient && noFooterRoutes.includes(pathname);
  const shouldUseSpecialNavbar = isClient && specialNavbarRoutes.includes(pathname);

  // On the server, always render the regular navbar to avoid hydration mismatch
  const navbar = isClient && shouldUseSpecialNavbar ? <EmergencyContactNavbar /> : <Navbar />;

  return (
    <>
      {navbar}
      <main className="min-h-dvh">{children}</main>

      {/* The Footer will now only render if the route is NOT '/chatbot' */}
      {isClient && !shouldHideFooter && <Footer />}
    </>
  );
}