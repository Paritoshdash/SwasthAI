'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Scheme {
  id: number;
  title: string;
  url: string;
}

export function SchemeNotifier() {
  const [latestSchemeId, setLatestSchemeId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the initial latest scheme ID on component mount without showing a toast
    const getInitialLatestId = async () => {
      try {
        const response = await fetch('/api/schemes?latest=true');
        if (response.ok) {
          const scheme: Scheme = await response.json();
          if (scheme) {
            setLatestSchemeId(scheme.id);
          }
        }
      } catch (error) {
        console.error("Couldn't fetch initial scheme ID:", error);
      }
    };
    
    getInitialLatestId();

    // Set up polling to check for new schemes every 5 minutes
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/schemes?latest=true');
        if (response.ok) {
          const scheme: Scheme = await response.json();
          // If a scheme exists and its ID is different from the last one we saw, it's new!
          if (scheme && scheme.id !== latestSchemeId) {
            toast.info(`New Scheme Announced: ${scheme.title}`, {
              description: 'Click here to see the latest government schemes.',
              duration: 10000, // 10 seconds
              onMouseDown: () => router.push('/schemes'),
              style: { cursor: 'pointer' },
            });
            setLatestSchemeId(scheme.id); // Update the latest ID
          }
        }
      } catch (error) {
        console.error('Error polling for new schemes:', error);
      }
    }, 300000); // 300000 ms = 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [latestSchemeId, router]);

  return null; // This component does not render anything itself
}