"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ConsultationForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section id="consult" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Book a Consultation 🩺</CardTitle>
            <CardDescription>
              Fill out the form below to schedule an appointment with one of our
              healthcare professionals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-name">Patient's Name</Label>
                  <Input
                    id="patient-name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="child-name">Child's Name (Optional)</Label>
                  <Input
                    id="child-name"
                    placeholder="Enter your child's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Patient's Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 28"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 12345 67890"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <div className="flex justify-center p-1 border rounded-md min-h-[300px] items-center">
                  {hasMounted ? (
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Loading Calendar...
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Consultation</Label>
                <Textarea
                  id="reason"
                  placeholder="Briefly describe the health concern..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Request Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
