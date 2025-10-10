"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dummy data for health schemes
const healthSchemes = [
  {
    title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    description:
      "A flagship scheme of the Indian government's National Health Policy which aims to provide free access to healthcare for low-income earners in the country.",
    eligibility: [
      "Families identified as poor and vulnerable based on SECC 2011 data.",
      "No cap on family size or age of members.",
    ],
    link: "https://www.pmjay.gov.in/",
  },
  {
    title: "Janani Shishu Suraksha Karyakram (JSSK)",
    description:
      "This scheme is to assure free and cashless services to pregnant women including normal deliveries and caesarean operations and sick new born (up to 30 days after birth) in Government health institutions in both rural & urban areas.",
    eligibility: [
      "All pregnant women delivering in public health institutions.",
      "All sick newborns accessing public health institutions.",
    ],
    link: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=841&lid=221",
  },
  {
    title: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    description:
      "An initiative aiming to screen and manage children from birth to 18 years for 4 ‘D’s - Defects at birth, Deficiencies, Diseases, Development delays including disability.",
    eligibility: [
      "Children aged 0-6 years in rural areas and urban slums.",
      "Children enrolled in classes 1st to 12th in Government and Government aided schools.",
    ],
    link: "https://rbsk.gov.in/",
  },
  {
    title: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
    description:
      "Aims to provide assured, comprehensive and quality antenatal care, free of cost, universally to all pregnant women on the 9th of every month.",
    eligibility: ["All pregnant women in their second and third trimesters."],
    link: "https://pmsma.nhp.gov.in/",
  },
];

export function SchemeHub() {
  return (
    <section id="schemes" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Explore Health Schemes
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover various government health schemes available for mothers
              and children to support their well-being.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {healthSchemes.map((scheme, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{scheme.title}</CardTitle>
                <CardDescription>{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-semibold mb-2">Eligibility:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {scheme.eligibility.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
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
      </div>
    </section>
  );
}
