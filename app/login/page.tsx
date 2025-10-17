"use client";

// app/login/page.tsx
import { LoginForm } from "@/components/forms/login-form";
import Link from "next/link";
import { useUser } from "@/components/providers/user-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  // Show loading state while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is authenticated, don't show login form
  if (user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}