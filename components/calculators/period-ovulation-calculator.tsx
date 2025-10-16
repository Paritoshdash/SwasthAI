'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function PeriodOvulationCalculator() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [nextPeriod, setNextPeriod] = useState<string | null>(null);
  const [fertileWindow, setFertileWindow] = useState<string | null>(null);

  const calculate = () => {
    if (lastPeriod && cycleLength) {
      const lastPeriodDate = new Date(lastPeriod);
      const cycle = parseInt(cycleLength, 10);
      
      // Calculate next period
      const nextPeriodDate = new Date(lastPeriodDate);
      nextPeriodDate.setDate(nextPeriodDate.getDate() + cycle);
      setNextPeriod(nextPeriodDate.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' }));

      // Calculate fertile window (approx. 14 days before next period)
      const ovulationDay = new Date(nextPeriodDate);
      ovulationDay.setDate(ovulationDay.getDate() - 14);
      const fertileStart = new Date(ovulationDay);
      fertileStart.setDate(fertileStart.getDate() - 5);
      
      setFertileWindow(
        `${fertileStart.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} - ${ovulationDay.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Period & Ovulation Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="last-period">First Day of Your Last Period</Label>
          <Input id="last-period" type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>
          <Input id="cycle-length" type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} placeholder="e.g., 28" />
        </div>
        <Button onClick={calculate}>Calculate</Button>
        {nextPeriod && fertileWindow && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <p>Your next period is likely around: <span className="font-bold">{nextPeriod}</span></p>
            <p>Your most fertile window is approximately: <span className="font-bold">{fertileWindow}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}