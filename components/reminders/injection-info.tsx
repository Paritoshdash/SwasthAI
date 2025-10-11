import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Data for maternal injections
const maternalInjections = [
    { name: "Tetanus, Diphtheria, & Pertussis (Tdap)", info: "Crucial for protecting the newborn from whooping cough. Recommended during each pregnancy, ideally between 27 and 36 weeks." },
    { name: "Influenza (Flu Shot)", info: "Protects both mother and baby from the flu. It's safe and recommended during any trimester of pregnancy during flu season." },
];

// Data for child injections based on a standard schedule
const childInjections = [
    { name: "At Birth", info: "BCG (Tuberculosis), OPV 0 (Oral Polio), Hepatitis B - Dose 1" },
    { name: "At 6 Weeks", info: "DTwP 1 (Diphtheria, Tetanus, Pertussis), IPV 1 (Inactivated Polio), Hepatitis B - Dose 2, Hib 1, Rotavirus 1, PCV 1" },
    { name: "At 10 Weeks", info: "DTwP 2, IPV 2, Hib 2, Rotavirus 2, PCV 2" },
    { name: "At 14 Weeks", info: "DTwP 3, IPV 3, Hib 3, Rotavirus 3, PCV 3" },
    { name: "At 9-12 Months", info: "MMR 1 (Mumps, Measles, Rubella), Typhoid Conjugate Vaccine, PCV Booster" },
];

interface InjectionInfoProps {
  category: 'mother' | 'child';
}

export function InjectionInfo({ category }: InjectionInfoProps) {
  const isMother = category === 'mother';
  const data = isMother ? maternalInjections : childInjections;
  const title = isMother ? "Key Maternal Injections" : "Childhood Immunization Schedule";
  const description = isMother 
    ? "Recommended vaccinations during pregnancy to protect you and your baby." 
    : "A general guide to essential vaccines for your child's health.";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {data.map((injection) => (
            <AccordionItem value={injection.name} key={injection.name}>
              <AccordionTrigger>{injection.name}</AccordionTrigger>
              <AccordionContent>{injection.info}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}