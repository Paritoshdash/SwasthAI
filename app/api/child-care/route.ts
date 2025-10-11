import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { ageInMonths } = body;

  let nutritionPlan: string[] = [];
  let healthTips: string[] = [];
  let vaccineSchedule: string[] = [];

  if (ageInMonths <= 6) {
    nutritionPlan.push('Exclusive breastfeeding is recommended.', 'If formula-feeding, ensure proper preparation and hygiene.');
    healthTips.push('Ensure baby gets enough tummy time when awake.', 'Keep baby on their back to sleep.');
    vaccineSchedule.push('BCG, OPV 0, Hep-B 1 at birth.', 'DTwP 1, IPV 1, Hep-B 2, Hib 1, Rotavirus 1, PCV 1 at 6 weeks.');
  } else if (ageInMonths > 6 && ageInMonths <= 12) {
    nutritionPlan.push('Introduce semi-solid foods like pureed fruits, vegetables, and cereals.', 'Continue breastfeeding or formula feeding as the main source of nutrition.', 'Introduce one new food at a time to check for allergies.');
    healthTips.push('Baby-proof your home as they will start crawling/moving around.', 'Start dental hygiene by wiping gums with a clean cloth.');
    vaccineSchedule.push('OPV 1, DTwP 2, IPV 2, Hib 2, Rotavirus 2, PCV 2 at 10 weeks.', 'OPV 2, DTwP 3, IPV 3, Hib 3, Rotavirus 3, PCV 3 at 14 weeks.', 'MMR-1, Typhoid Conjugate Vaccine at 9-12 months.');
  } else {
    nutritionPlan.push('Introduce a variety of family foods with different textures.', 'Encourage self-feeding.', 'Ensure a balanced diet with iron, calcium, and vitamins.');
    healthTips.push('Encourage active play.', 'Start reading to your child to aid cognitive development.');
    vaccineSchedule.push('Check with your pediatrician for booster shots and annual flu vaccines.');
  }

  const response = [
    { title: "Nutrition Guide", recommendations: nutritionPlan },
    { title: "Development & Health Tips", recommendations: healthTips },
    { title: "Vaccination Schedule (As per Indian Academy of Pediatrics)", recommendations: vaccineSchedule },
  ];

  return NextResponse.json(response);
}