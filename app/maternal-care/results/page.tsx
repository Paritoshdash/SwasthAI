"use client";

import { useEffect, useState } from 'react';
import ResultsDisplay from '@/components/results-display';
import { Skeleton } from '@/components/ui/skeleton';

export default function MaternalResultsPage() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('maternalCareResult');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 space-y-4">
            <Skeleton className="h-12 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
    )
  }

  if (!results) {
    return <div className="text-center py-20">No results found. Please go back and fill out the form.</div>;
  }

  return (
    <ResultsDisplay
      results={results}
      title="Your Personalized Wellness Plan"
      description="Based on the information you provided, here are some recommendations for a healthy pregnancy."
    />
  );
}