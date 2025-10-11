"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReminderForm } from "@/components/reminders/reminder-form";
import { InjectionInfo } from "@/components/reminders/injection-info";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import { useReminderNotifications } from "@/hooks/use-reminder-notifications";
import { formatTimeToAMPM } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/reminders/countdown";
import { useToast } from "@/components/ui/use-toast";

interface Reminder {
  id: number;
  name: string;
  time: string;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<{ mother: Reminder[], child: Reminder[] }>({ mother: [], child: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // 1. Destructure the unlockAudio function from the hook
  const { unlockAudio } = useReminderNotifications(reminders);

  const fetchReminders = async () => {
    try {
      const response = await fetch('/api/reminders', { cache: 'no-store' });
      
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      toast({
        title: "Could not load reminders",
        description: "There was an issue fetching the latest data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleReset = async (category: 'mother' | 'child') => {
    if (!confirm(`Are you sure you want to delete all reminders for ${category}?`)) return;

    await fetch('/api/reminders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category }),
    });
    
    toast({ title: "Success", description: `${category.charAt(0).toUpperCase() + category.slice(1)} reminders have been cleared.` });
    fetchReminders();
  };

  // 2. Create a handler that unlocks audio and then fetches reminders
  const handleReminderAdded = () => {
    unlockAudio(); // This "unlocks" the audio so the alarm can play
    fetchReminders(); // This refreshes the list of reminders
  };
  
  const renderReminderList = (reminderList: Reminder[], category: 'mother' | 'child') => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
        </div>
      );
    }
    if (reminderList.length === 0) {
      return <p className="text-sm text-muted-foreground">No reminders set yet.</p>;
    }

    return reminderList.map(r => (
      <div key={r.id} className="p-3 bg-secondary rounded-md space-y-1">
        <div className="flex justify-between items-center">
          <p className="font-medium">{r.name}</p>
          <p className="text-lg font-bold">{formatTimeToAMPM(r.time)}</p>
        </div>
        <Countdown targetTime={r.time} />
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Health & Medicine Reminders</h1>
      <Tabs defaultValue="mother" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mother">🤰 For Mother</TabsTrigger>
          <TabsTrigger value="child">👶 For Child</TabsTrigger>
        </TabsList>

        {/* Maternal Care Tab */}
        <TabsContent value="mother">
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Set New Reminder</CardTitle>
                <CardDescription>Add a new medicine schedule below.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 3. Pass the new handler to the form */}
                <ReminderForm category="mother" onReminderAdded={handleReminderAdded} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Reminders</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleReset('mother')}>Reset</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {renderReminderList(reminders.mother, 'mother')}
              </CardContent>
            </Card>
            <div className="md:col-span-2"><InjectionInfo category="mother" /></div>
          </div>
        </TabsContent>

        {/* Child Care Tab */}
        <TabsContent value="child">
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Set New Reminder</CardTitle>
                <CardDescription>Add a new medicine schedule below.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 3. Pass the new handler to the form */}
                <ReminderForm category="child" onReminderAdded={handleReminderAdded} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Reminders</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleReset('child')}>Reset</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {renderReminderList(reminders.child, 'child')}
              </CardContent>
            </Card>
            <div className="md:col-span-2"><InjectionInfo category="child" /></div>
          </div>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}