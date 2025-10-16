'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function DueDateCalculator() {
  const [lmp, setLmp] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [gestationalAge, setGestationalAge] = useState<string | null>(null);

  const calculate = () => {
    if (lmp) {
      const lmpDate = new Date(lmp);
      // Calculate due date (Naegele's rule)
      const dueDateCalc = new Date(lmpDate);
      dueDateCalc.setDate(dueDateCalc.getDate() + 280); // 40 weeks
      setDueDate(dueDateCalc.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

      // Calculate gestational age (how far along)
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      setGestationalAge(`${weeks} weeks and ${days} days`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Due Date & Pregnancy Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lmp">First Day of Your Last Menstrual Period</Label>
          <Input id="lmp" type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} />
        </div>
        <Button onClick={calculate}>Calculate</Button>
        {dueDate && gestationalAge && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <p>You are approximately <span className="font-bold">{gestationalAge}</span> pregnant.</p>
            <p>Your estimated due date is: <span className="font-bold">{dueDate}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}