"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes where ONLY the Footer should be hidden
  const noFooterRoutes = ["/chatbot"];

  const shouldHideFooter = noFooterRoutes.includes(pathname);

  return (
    <>
      {/* The Navbar and main content will always be rendered */}
      <Navbar />
      <main className="min-h-dvh">{children}</main>

      {/* The Footer will now only render if the route is NOT '/chatbot' */}
      {!shouldHideFooter && <Footer />}
    </>
  );
}