"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

type Recommendation = {
  title: string;
  recommendations: string[];
};

type ResultsDisplayProps = {
  results: Recommendation[];
  title: string;
  description: string;
};

export default function ResultsDisplay({ results, title, description }: ResultsDisplayProps) {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
        {results.map((result, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-lg font-semibold">{result.title}</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3 pl-4">
                {result.recommendations.map((rec, recIndex) => (
                  <li key={recIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-8 text-center bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/50 p-6 rounded-lg">
          <strong className="font-semibold">Disclaimer:</strong>
          <p className="text-muted-foreground text-sm mt-1">
            This information is for your only and is not a substitute for professional medical advice. Always consult with a qualified doctors for any health concerns or before making any decisions related to your health or treatment. Your can go through the below link to consult a doctor.
          </p>
          <Button asChild className="mt-4">
            <Link href="/consult">Consult a Doctor Now</Link>
          </Button>
      </div>
    </div>
  );
}