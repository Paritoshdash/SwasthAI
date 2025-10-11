"use client";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const symptoms = [
  { id: 'missed_period', label: 'Missed Period' },
  { id: 'nausea', label: 'Nausea or Vomiting' },
  { id: 'fatigue', label: 'Unusual Fatigue' },
  { id: 'tender_breasts', label: 'Tender or Swollen Breasts' },
  { id: 'frequent_urination', label: 'Frequent Urination' },
];

const formSchema = z.object({
  symptoms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one symptom.',
  }),
});

type PregnancyCheckerFormProps = {
  onComplete: (probability: number) => void;
};

export default function PregnancyCheckerForm({ onComplete }: PregnancyCheckerFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { symptoms: [] },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Simple logic: 20% base chance + 16% for each symptom
    let probability = 20;
    if (data.symptoms.includes('missed_period')) {
      probability += 30; // Weight missed period more heavily
    }
    probability += data.symptoms.filter(s => s !== 'missed_period').length * 10;
    
    onComplete(Math.min(probability, 95)); // Cap at 95%
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="symptoms"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Select Your Symptoms</FormLabel>
              </div>
              {symptoms.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="symptoms"
                  render={({ field }) => (
                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(field.value?.filter((value) => value !== item.id));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Check Probability</Button>
      </form>
    </Form>
  );
}