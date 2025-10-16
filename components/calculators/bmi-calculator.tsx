'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBmi = () => {
    const h = parseFloat(height) / 100; // Convert cm to meters
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(bmiValue);
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 24.9) setCategory('Normal weight');
      else if (bmiValue < 29.9) setCategory('Overweight');
      else setCategory('Obesity');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator For Women</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 165" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 60" />
        </div>
        <Button onClick={calculateBmi}>Calculate BMI</Button>
        {bmi && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-bold text-lg">Your BMI is: {bmi.toFixed(2)}</p>
            <p>Category: {category}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}