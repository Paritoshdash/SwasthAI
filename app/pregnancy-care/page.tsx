import { PregnancyGuide } from "@/components/pregnancy-guide";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Care Guide | Health Companion",
  description: "A comprehensive guide for expectant mothers with tutorials, tips, and resources for a healthy pregnancy.",
};

/**
 * Renders the Pregnancy Care page, which serves as a central hub for the PregnancyGuide component.
 */
export default function PregnancyCarePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PregnancyGuide />
    </main>
  );
}
