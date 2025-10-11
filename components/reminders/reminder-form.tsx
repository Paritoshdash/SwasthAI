"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface ReminderFormProps {
  category: 'mother' | 'child';
  onReminderAdded: () => void;
}

export function ReminderForm({ category, onReminderAdded }: ReminderFormProps) {
  const [name, setName] = useState("");
  const [hour, setHour] = useState("08"); // Default hour
  const [minute, setMinute] = useState("30"); // Default minute
  const [ampm, setAmPm] = useState("AM"); // Default AM/PM
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !hour || !minute || !ampm) {
      toast({ title: "Missing Information", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    // Convert the 12-hour AM/PM time to 24-hour format for the backend
    let hour24 = parseInt(hour, 10);
    if (ampm === "PM" && hour24 < 12) {
      hour24 += 12; // e.g., 1 PM becomes 13
    }
    if (ampm === "AM" && hour24 === 12) {
      hour24 = 0; // 12 AM (Midnight) becomes 00
    }
    
    // Format to "HH:mm"
    const time = `${hour24.toString().padStart(2, '0')}:${minute}`;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, name, time }),
      });
      if (!response.ok) throw new Error("Server error");

      toast({ title: "Success! 🎉", description: `Reminder for "${name}" has been set.` });
      setName(""); // Clear the name field after submission
      onReminderAdded();
    } catch (error) {
      toast({ title: "Uh oh! Something went wrong.", description: "Could not save the reminder.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`medicine-name-${category}`}>Medicine Name</Label>
        <Input id={`medicine-name-${category}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Folic Acid" disabled={isSubmitting} />
      </div>
      <div className="space-y-2">
        <Label>Time</Label>
        <div className="flex gap-2">
          {/* Hour Dropdown */}
          <Select value={hour} onValueChange={setHour} disabled={isSubmitting}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(h => 
                <SelectItem key={h} value={h}>{h}</SelectItem>
              )}
            </SelectContent>
          </Select>
          
          {/* Minute Dropdown */}
          <Select value={minute} onValueChange={setMinute} disabled={isSubmitting}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => 
                <SelectItem key={m} value={m}>{m}</SelectItem>
              )}
            </SelectContent>
          </Select>
          
          {/* AM/PM Dropdown */}
          <Select value={ampm} onValueChange={setAmPm} disabled={isSubmitting}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Reminder"}</Button>
    </form>
  );
}