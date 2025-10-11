"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Health Schemes Data (with category + isLive)
const healthSchemes = [
  {
    title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    description:
      "A flagship scheme providing free access to healthcare for low-income earners.",
    category: "General Healthcare",
    eligibility: ["Families identified as poor based on SECC 2011 data."],
    link: "https://www.pmjay.gov.in/",
    isLive: true,
  },
  {
    title: "Janani Shishu Suraksha Karyakram (JSSK)",
    description:
      "Free and cashless services to pregnant women and sick newborns in government health institutions.",
    category: "Maternal Care",
    eligibility: [
      "All pregnant women delivering in public institutions.",
      "All sick newborns.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=841&lid=221",
    isLive: true,
  },
  {
    title: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    description:
      "Screens and manages children from birth to 18 years for defects, deficiencies, diseases, and delays.",
    category: "Child Care",
    eligibility: [
      "Children aged 0–18 years in rural areas, slums, and government-aided schools.",
    ],
    link: "https://rbsk.gov.in/",
    isLive: true,
  },
  {
    title: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
    description:
      "Provides free, comprehensive antenatal care to all pregnant women on the 9th of every month.",
    category: "Maternal Care",
    eligibility: ["All pregnant women in their second and third trimesters."],
    link: "https://pmsma.nhp.gov.in/",
    isLive: true,
  },
  {
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    description:
      "A maternity benefit program offering cash incentives for the first living child.",
    category: "Maternal Care",
    eligibility: ["Pregnant and lactating women for their first live birth."],
    link: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
    isLive: true,
  },
  {
    title: "Integrated Child Development Services (ICDS)",
    description:
      "Provides food, preschool education, and primary healthcare to children under 6 and their mothers.",
    category: "Child Care",
    eligibility: ["Children under 6 years.", "Pregnant and lactating mothers."],
    link: "https://wcd.nic.in/schemes/integrated-child-development-services-icds",
    isLive: true,
  },
  {
    title: "Matritva Sahyog Yojana (MSY) / Indira Gandhi Matritva Sahyog Yojana (IGMSY)",
    description:
      "Earlier conditional cash transfer scheme for pregnant and lactating women — largely succeeded by PMMVY.",
    category: "Maternal Care",
    eligibility: ["Women aged 19+; scheme specifics varied when active."],
    link: "https://pib.gov.in/newsite/PrintRelease.aspx?relid=71055",
    isLive: false,
  },
  {
    title: "National Iron Plus Initiative (NIPI)",
    description:
      "Programme to prevent and treat anaemia by supplying iron and folic acid to pregnant & lactating women and children.",
    category: "General Healthcare",
    eligibility: [
      "Pregnant women and lactating mothers (up to 6 months postpartum).",
      "Children aged 6 months to 19 years.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1021&lid=222",
    isLive: true,
  },
];

// Helper component: renders a grid of scheme cards
const SchemeGrid = ({ schemes }: { schemes: typeof healthSchemes }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
    {schemes.map((scheme) => (
      <Card key={scheme.title} className="flex flex-col relative">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <div>
              <CardTitle>{scheme.title}</CardTitle>
              <CardDescription>{scheme.description}</CardDescription>
            </div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                scheme.isLive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {scheme.isLive ? "Live" : "Inactive"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <h4 className="font-semibold mb-2">Eligibility:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {scheme.eligibility.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <a
            href={scheme.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full">Learn More</Button>
          </a>
        </CardFooter>
      </Card>
    ))}
  </div>
);

export function SchemeHub() {
  const categories = ["All", "Maternal Care", "Child Care", "General Healthcare"];
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const getSchemesByCategory = (category: string) => {
    let filtered =
      category === "All"
        ? healthSchemes
        : healthSchemes.filter((s) => s.category === category);
    if (showLiveOnly) filtered = filtered.filter((s) => s.isLive);
    return filtered;
  };

  return (
    <section
      id="schemes"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
    >
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Explore Health Schemes
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover government health schemes available for mothers and
              children to support their well-being.
            </p>
          </div>

          {/* Live Toggle */}
          <div className="mt-4 flex items-center gap-3 justify-center">
            <Button
              variant={showLiveOnly ? undefined : "ghost"}
              onClick={() => setShowLiveOnly(true)}
            >
              Show Live Only
            </Button>
            <Button
              variant={!showLiveOnly ? undefined : "ghost"}
              onClick={() => setShowLiveOnly(false)}
            >
              Show All
            </Button>
          </div>
        </div>

        {/* Tabs Layout */}
        <Tabs defaultValue="All" className="w-full max-w-5xl mx-auto mt-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <SchemeGrid schemes={getSchemesByCategory(category)} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
