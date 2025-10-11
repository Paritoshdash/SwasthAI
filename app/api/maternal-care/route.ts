import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { trimester, age, preExistingConditions } = body;

  let dietPlan = [];
  let wellnessTips = [];

  // Logic based on trimester
  if (trimester === '1') {
    dietPlan.push(
        'Focus on folate-rich foods: Lentils, beans, leafy greens.',
        'Include lean proteins: chicken, fish, tofu.',
        'Stay hydrated. Drink plenty of water.',
        'Eat small, frequent meals to combat nausea.'
    );
    wellnessTips.push(
        'Get plenty of rest. Naps are your friend!',
        'Avoid heavy lifting and strenuous exercise.',
        'Schedule your first prenatal check-up.'
    );
  } else if (trimester === '2') {
    dietPlan.push(
        'Increase iron and calcium intake: Spinach, dairy products, fortified cereals.',
        'Incorporate healthy fats: Avocados, nuts, seeds.',
        'Ensure adequate protein for baby\'s growth.'
    );
    wellnessTips.push(
        'Engage in moderate exercise like walking or prenatal yoga.',
        'Start doing Kegel exercises.',
        'Moisturize your belly to help with stretch marks.'
    );
  } else {
    dietPlan.push(
        'Eat fiber-rich foods to prevent constipation: fruits, vegetables, whole grains.',
        'Continue with iron and calcium-rich foods.',
        'Omega-3 fatty acids are crucial for brain development: Salmon, walnuts.'
    );
    wellnessTips.push(
        'Get comfortable for sleep. Use pillows for support.',
        'Pack your hospital bag.',
        'Learn the signs of labor.'
    );
  }
  
  // Logic for pre-existing conditions
  if (preExistingConditions?.toLowerCase().includes('diabetes')) {
    dietPlan.push('Monitor blood sugar levels. Choose complex carbohydrates over simple sugars.');
  }

  const response = [
    { title: "Personalized Diet Plan", recommendations: dietPlan },
    { title: "Wellness & Health Tips", recommendations: wellnessTips },
    { title: "Important Reminders", recommendations: ["Always consult your doctor before making any changes to your diet or exercise routine.", "Take your prenatal vitamins daily."] },
  ];

  return NextResponse.json(response);
}