"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PregnancyCheckerForm from '@/components/forms/pregnancy-checker-form';
import MaternalDetailsForm from '@/components/forms/maternal-details-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export type MaternalAnalysisResult = {
  title: string;
  recommendations: string[];
};

export default function MaternalCarePage() {
  const [step, setStep] = useState(1);
  const [showProbability, setShowProbability] = useState(false);
  const [probability, setProbability] = useState(0);
  const router = useRouter();

  const handleProbabilityCheck = (calculatedProbability: number) => {
    setProbability(calculatedProbability);
    setShowProbability(true);
    // Automatically move to the next step if pregnancy is likely
    if (calculatedProbability > 50) {
      setTimeout(() => {
        setStep(2);
      }, 3000); // Wait 3 seconds before showing the next form
    }
  };

  const handleDetailsSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/maternal-care', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      // Store result in sessionStorage to pass it to the results page
      sessionStorage.setItem('maternalCareResult', JSON.stringify(result));
      router.push('/maternal-care/results');

    } catch (error) {
      console.error("Failed to get recommendations:", error);
      // Handle error with a toast notification
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            {step === 1 ? 'Pregnancy Probability Checker' : 'Maternal Wellness Plan'}
          </CardTitle>
          <CardDescription className="text-center">
             {step === 1 ? 'Answer a few questions to understand the likelihood.' : 'Provide details for a personalized care plan.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && <PregnancyCheckerForm onComplete={handleProbabilityCheck} />}
          
          {showProbability && step === 1 && (
            <div className="mt-6 text-center p-4 bg-secondary rounded-lg">
              <p className="font-bold text-lg">Based on your symptoms, the probability of pregnancy is:</p>
              <p className="text-4xl font-extrabold text-primary">{probability}%</p>
              {probability <= 50 && <p className="mt-2 text-muted-foreground">It's recommended to consult a doctor for a definitive test.</p>}
            </div>
          )}

          {step === 2 && <MaternalDetailsForm onSubmit={handleDetailsSubmit} />}
        </CardContent>
      </Card>
    </div>
  );
}