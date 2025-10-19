"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CustomLanguageSwitcher } from "@/components/custom-language-switcher";
import { useUser } from "@/components/providers/user-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export function Navbar() {
  const { user, logout, loading } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything different on the server vs client to prevent hydration errors
  const showLoading = loading || !isClient;

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
          {/* ✨ ADDED LINK TO NEW TOOLS PAGE */}
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
          {showLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-24 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-muted-foreground text-xs">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
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