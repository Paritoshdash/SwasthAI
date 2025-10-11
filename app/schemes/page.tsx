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
  description: string;
  isLive?: boolean;
}

// ✅ Added short informative descriptions for each scheme
async function getSchemesFromApi(): Promise<Scheme[]> {
  return [
    {
      id: 201,
      title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      url: 'https://pmmvy.wcd.gov.in/',
      source: 'Ministry of Women and Child Development',
      publishDate: '2025-05-20T10:00:00.000Z',
      description:
        'Provides financial assistance to pregnant and lactating women for the first live birth to promote safe delivery and proper nutrition.',
      isLive: true,
    },
    {
      id: 202,
      title: 'Janani Shishu Suraksha Karyakram (JSSK)',
      url: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=841&lid=221',
      source: 'National Health Mission (NHM)',
      publishDate: '2025-04-15T11:00:00.000Z',
      description:
        'Ensures free and cashless services to pregnant women and sick newborns, including delivery, drugs, diagnostics, and transport within government facilities.',
      isLive: true,
    },
    {
      id: 203,
      title: 'Janani Suraksha Yojana (JSY)',
      url: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309',
      source: 'National Health Mission (NHM)',
      publishDate: '2025-03-10T14:30:00.000Z',
      description:
        'A safe motherhood intervention that promotes institutional delivery among poor pregnant women by providing financial incentives.',
      isLive: true,
    },
    {
      id: 204,
      title: 'LaQshya - Labour Room Quality Improvement Initiative',
      url: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=1051&lid=696',
      source: 'Ministry of Health and Family Welfare (MoHFW)',
      publishDate: '2025-02-01T09:00:00.000Z',
      description:
        'Aims to improve the quality of care in labour rooms and maternity operation theatres to ensure respectful and safe childbirth for all women.',
      isLive: true,
    },
    {
      id: 205,
      title: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
      url: 'https://pmsma.nhp.gov.in/',
      source: 'Ministry of Health and Family Welfare',
      publishDate: '2025-01-05T09:00:00.000Z',
      description:
        'Provides free and quality antenatal care to all pregnant women on the 9th of every month by qualified doctors at government health facilities.',
      isLive: true,
    },
    {
      id: 206,
      title: 'Rashtriya Bal Swasthya Karyakram (RBSK)',
      url: 'https://rbsk.gov.in/',
      source: 'Ministry of Health and Family Welfare',
      publishDate: '2024-12-15T10:30:00.000Z',
      description:
        'Focuses on early detection and treatment of health conditions in children aged 0–18 years, covering defects, deficiencies, and developmental delays.',
      isLive: true,
    },
    {
      id: 207,
      title: 'Integrated Child Development Services (ICDS)',
      url: 'https://wcd.nic.in/schemes/integrated-child-development-services-icds',
      source: 'Ministry of Women and Child Development',
      publishDate: '2024-12-01T09:00:00.000Z',
      description:
        'One of the world’s largest community-based outreach programmes offering nutrition, health, and early education services to children under six and mothers.',
      isLive: true,
    },
  ];
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const data = await getSchemesFromApi();
        setSchemes(data);
      } catch (error) {
        console.error('Failed to fetch schemes:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      
    >
      <div className="min-h-screen bg-black/40">
        <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold mb-3 text-white drop-shadow-lg">
              Government Health Schemes
            </h1>
            <p className="text-lg sm:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
              A comprehensive guide to maternal and child health initiatives across India
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="w-full animate-pulse bg-black/20 border border-white/20">
                  <CardHeader className="space-y-3 p-4 sm:p-6">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 sm:h-6 w-full max-w-2xl bg-white/30" />
                        <Skeleton className="h-3 sm:h-4 w-3/4 max-w-md bg-white/30" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full bg-white/30" />
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : schemes.length > 0 ? (
              schemes.map((scheme) => (
                <Card
                  key={scheme.id}
                  className="w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[1.01] border hover:border-white/50 cursor-pointer group bg-black/20 backdrop-blur-md border-white/20"
                  onClick={() => window.open(scheme.url, '_blank')}
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl font-semibold text-white group-hover:text-white/80 transition-colors line-clamp-2">
                          {scheme.title}
                        </CardTitle>
                        <CardDescription className="mt-2 text-sm sm:text-base text-white/80 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="bg-black/20 px-2 py-1 rounded-md text-xs">
                            Source: {scheme.source}
                          </span>
                          <span className="hidden sm:inline text-white/50">•</span>
                          <span className="bg-black/20 px-2 py-1 rounded-md text-xs">
                            {new Date(scheme.publishDate).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>

                      <Badge
                        variant={scheme.isLive ? 'default' : 'secondary'}
                        className={`text-xs sm:text-sm px-3 py-1.5 sm:px-3 sm:py-1 whitespace-nowrap transition-all ${
                          scheme.isLive
                            ? 'bg-green-500 hover:bg-green-600 shadow-sm text-white'
                            : 'bg-gray-400 hover:bg-gray-500 shadow-sm text-white'
                        } group-hover:scale-105`}
                      >
                        {scheme.isLive ? '🟢 Live' : '⚫ Inactive'}
                      </Badge>
                    </div>

                    {/* ✅ Added short description here */}
                    <p className="mt-3 sm:mt-4 text-white/90 text-sm sm:text-base leading-relaxed">
                      {scheme.description}
                    </p>

                    <CardContent className="p-0 pt-3 sm:pt-4">
                      <div className="inline-flex items-center gap-1 sm:gap-2 text-sky-300 hover:text-sky-200 font-medium text-sm sm:text-base transition-all group-hover:gap-3 group-hover:font-semibold">
                        <span>Read More</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <Card className="bg-black/20 backdrop-blur-md border border-white/20">
                <div className="text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📄</div>
                  <p className="text-white/80 text-base sm:text-lg">
                    No schemes found at the moment.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
