"use client";

import { useRouter } from 'next/navigation';
import ChildDetailsForm from '@/components/forms/child-details-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ChildCarePage() {
  const router = useRouter();

  const handleDetailsSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/child-care', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      sessionStorage.setItem('childCareResult', JSON.stringify(result));
      router.push('/child-care/results');

    } catch (error) {
      console.error("Failed to get recommendations:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Child Wellness Tracker</CardTitle>
          <CardDescription className="text-center">
            Provide your child's details for personalized nutrition and health recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChildDetailsForm onSubmit={handleDetailsSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}