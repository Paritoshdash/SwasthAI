"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  trimester: z.string({ required_error: 'Please select your trimester.' }),
  age: z.coerce.number().min(15, "Age must be at least 15.").max(50, "Please consult a specialist."),
  preExistingConditions: z.string().optional(),
});

type MaternalDetailsFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
};

export default function MaternalDetailsForm({ onSubmit }: MaternalDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in duration-500">
        <FormField
          control={form.control}
          name="trimester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Trimester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select a trimester" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">First Trimester (Week 1-12)</SelectItem>
                  <SelectItem value="2">Second Trimester (Week 13-28)</SelectItem>
                  <SelectItem value="3">Third Trimester (Week 29-40)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Your Age</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 28" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="preExistingConditions"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Pre-existing Conditions (optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Diabetes, Hypertension" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" className="w-full">Get My Wellness Plan</Button>
      </form>
    </Form>
  );
}