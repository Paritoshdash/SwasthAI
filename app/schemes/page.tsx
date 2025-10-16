'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface Scheme {
  id: number;
  title: string;
  url: string;
  source: string;
  publishDate: string;
  isLive?: boolean;
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('/api/schemes');
        const data = await response.json();
        setSchemes(data);
      } catch (error) {
        console.error("Failed to fetch schemes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-100">
        Government Health Schemes
      </h1>

      <div className="space-y-3 sm:space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="w-full animate-pulse">
              <CardHeader className="space-y-3 p-4 sm:p-6">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 sm:h-6 w-full max-w-2xl" />
                    <Skeleton className="h-3 sm:h-4 w-3/4 max-w-md" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </CardHeader>
            </Card>
          ))
        ) : schemes.length > 0 ? (
          schemes.map((scheme) => (
            <Card
              key={scheme.id}
              className="w-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-[1.01] border-2 hover:border-primary/30 cursor-pointer group"
            >
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                      {scheme.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 flex flex-wrap items-center gap-1 sm:gap-2">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs">
                        Source: {scheme.source}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs">
                        {new Date(scheme.publishDate).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>

                  <Badge
                    variant={scheme.isLive ? "default" : "secondary"}
                    className={`text-xs sm:text-sm px-3 py-1.5 sm:px-3 sm:py-1 whitespace-nowrap transition-all ${
                      scheme.isLive
                        ? "bg-green-500 hover:bg-green-600 shadow-sm"
                        : "bg-gray-400 hover:bg-gray-500 shadow-sm"
                    } group-hover:scale-105`}
                  >
                    {scheme.isLive ? "🟢 Live" : "⚫ Inactive"}
                  </Badge>
                </div>

                <CardContent className="p-0 pt-3 sm:pt-4">
                  <a
                    href={scheme.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm sm:text-base transition-all group-hover:gap-3 group-hover:font-semibold"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Read More</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </CardContent>
              </CardHeader>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📄</div>
            <p className="text-muted-foreground text-base sm:text-lg">
              No schemes found at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}