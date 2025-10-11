"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  ageInMonths: z.coerce.number().min(0, "Age cannot be negative.").max(120, "For children over 10, please consult a pediatrician directly."),
  weight: z.coerce.number().min(1, "Enter a valid weight in kg."),
  allergies: z.string().optional(),
});

type ChildDetailsFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
};

export default function ChildDetailsForm({ onSubmit }: ChildDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
            control={form.control}
            name="ageInMonths"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Child's Age (in months)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 6" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
         <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Child's Weight (in kg)</FormLabel>
                <FormControl>
                    <Input type="number" step="0.1" placeholder="e.g., 7.5" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Known Allergies (optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Peanuts, Lactose" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" className="w-full">Get Child Wellness Plan</Button>
      </form>
    </Form>
  );
}