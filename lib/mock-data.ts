export interface Scheme {
  id: number;
  title: string;
  url: string;
  source: string;
  publishDate: string;  // ISO string
  isLive: boolean;
}

// This mocks the data you’d fetch from DB / API
export const mockSchemes: Scheme[] = [
  {
    id: 103,
    title: "Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    url: "https://pib.gov.in/FactsheetDetails.aspx?Id=148485",
    source: "PIB",
    publishDate: "2025-10-09T10:00:00.000Z",
    isLive: true,  // PM-JAY is active / being expanded :contentReference[oaicite:0]{index=0}
  },
  {
    id: 102,
    title: "National Digital Health Mission (NDHM) / Ayushman Bharat Digital Mission",
    url: "https://mohfw.gov.in/",
    source: "MoHFW",
    publishDate: "2025-09-22T14:30:00.000Z",
    isLive: true,  // The digital health mission is being actively developed / implemented :contentReference[oaicite:1]{index=1}
  },
  {
    id: 101,
    title: "Ayushman Bharat Health Infrastructure Mission (AB-HIM)",
    url: "https://pib.gov.in/FactsheetDetails.aspx?Id=149254",
    source: "PIB",
    publishDate: "2025-09-15T11:00:00.000Z",
    isLive: true,  // This is part of government expansions in health infrastructure :contentReference[oaicite:2]{index=2}
  },
  {
    id: 104,
    title: "Central Government Health Scheme (CGHS)",
    url: "https://economictimes.indiatimes.com/wealth/save/cghs-beneficiaries-new-cghs-website-to-make-payments-as-government-has-shut-old-website/articleshow/121161436.cms",
    source: "Economic Times",
    publishDate: "2025-04-28T08:00:00.000Z",
    isLive: true,  // CGHS continues, with a new portal launched in 2025 :contentReference[oaicite:3]{index=3}
  },
  {
    id: 105,
    title: "Rashtriya Swasthya Bima Yojana (RSBY)",
    url: "https://en.wikipedia.org/wiki/Rashtriya_Swasthya_Bima_Yojana",
    source: "Wikipedia",
    publishDate: "2025-01-01T00:00:00.000Z",
    isLive: true,  // It is still listed as active in public resources :contentReference[oaicite:4]{index=4}
  },
  {
    id: 106,
    title: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    url: "https://en.wikipedia.org/wiki/Pradhan_Matri_Suraksha_Bima_Yojana",
    source: "Wikipedia",
    publishDate: "2025-01-01T00:00:00.000Z",
    isLive: true,  // This accident-insurance scheme is ongoing :contentReference[oaicite:5]{index=5}
  },
  {
    id: 107,
    title: "Mission Indradhanush (Immunization)",
    url: "https://en.wikipedia.org/wiki/Mission_Indradhanush",
    source: "Wikipedia",
    publishDate: "2025-01-01T00:00:00.000Z",
    isLive: true,  // This immunization mission is considered active :contentReference[oaicite:6]{index=6}
  },
  {
    id: 108,
    title: "Ayushman Vay Vandana Card (Senior Citizen Health Cover)",
    url: "https://www.mohfw.gov.in/?q=%2Fpress-info%2F7914",
    source: "MoHFW",
    publishDate: "2024-10-29T00:00:00.000Z",
    isLive: true,  // This recent expansion to senior citizens is active :contentReference[oaicite:7]{index=7}
  },
  {
    id: 109,
    title: "Health & Wellness Centres under Ayushman Bharat (HWCs)",
    url: "https://pib.gov.in/FactsheetDetails.aspx?Id=149254",
    source: "PIB",
    publishDate: "2025-08-15T00:00:00.000Z",
    isLive: true,  // As part of AB-HIM expansion, new HWCs are being approved and rolled out :contentReference[oaicite:8]{index=8}
  },
  {
    id: 110,
    title: "Some Old/Inactive Scheme Example (IGMSY / MSY)",
    url: "https://pib.gov.in/newsite/PrintRelease.aspx?relid=71055",
    source: "PIB",
    publishDate: "2023-05-20T00:00:00.000Z",
    isLive: false,  // This scheme is largely replaced / not actively maintained
  },
  
];
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  availability: string[];
  distance?: string; 
}


export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Prandip Kumar Panda',
    specialty: 'Gynecologist / Obstetrician',
    image: 'https://placehold.co/100x100?text=PP',
    rating: 4.9, // approx from listing
    reviews: 10,
    location: 'Gunupur, Odisha',
    availability: ['09:30 AM', '11:00 AM', '03:00 PM'] // you may need to verify
  },
  {
    id: 2,
    name: 'Dr. Ch. Vasanth Kumar',
    specialty: 'Pediatrician',
    image: 'https://placehold.co/100x100?text=VK',
    rating: 5.0,
    reviews: 3,
    location: 'Gunupur, Odisha',
    availability: ['10:00 AM', '01:00 PM', '04:00 PM']
  },
  {
    id: 3,
    name: 'Dr. Durga Prasad Tripathy',
    specialty: 'Pediatrician',
    image: 'https://placehold.co/100x100?text=DT',
    rating: 5.0,
    reviews: 3,
    location: 'Rayagada / Gunupur region',
    availability: ['09:30 AM', '12:00 PM', '03:00 PM']
  },
  {
    id: 4,
    name: 'Dr. Benudhar Nayak',
    specialty: 'Pediatrician',
    image: 'https://placehold.co/100x100?text=BN',
    rating: 3.8,
    reviews: 2,
    location: 'Rayagada / Gunupur region',
    availability: ['10:00 AM', '02:00 PM']
  },
  {
    id: 5,
    name: 'Dr. M Suman (Maddi Suman Clinic)',
    specialty: 'Pediatrician',
    image: 'https://placehold.co/100x100?text=MS',
    rating: 5.0,
    reviews: 1,
    location: 'Nehru Nagar, Rayagada (serving Gunupur)',
    availability: ['10:00 AM', '03:00 PM']
  },
  {
    id: 6,
    name: 'Dr. Harpreet Kaur',
    specialty: 'Gynecologist / Obstetrician',
    image: 'https://placehold.co/100x100?text=HK',
    rating: 4.8, // approximate
    reviews: 10,
    location: 'Gunupur / Rayagada region',
    availability: ['11:00 AM', '05:00 PM']
  },
  {
    id: 7,
    name: 'Dr. Shibani Devi',
    specialty: 'Gynecologist / Obstetrician',
    image: 'https://placehold.co/100x100?text=SD',
    rating: 4.8,
    reviews: 9,
    location: 'Gunupur / Rayagada region',
    availability: ['10:00 AM', '04:00 PM']
  },
];

export interface WellnessContent {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video';
  category: 'Nutrition' | 'Sleep' | 'Health & Safety' | 'Development';
  ageGroup: 'Newborn (0-3m)' | 'Infant (4-12m)' | 'Toddler (1-3y)';
  content: string; // For articles: full HTML content. For videos: YouTube embed URL.
  thumbnail: string; // URL to a representative image
}

export const wellnessContentData: WellnessContent[] = [
  {
    id: 1,
    title: 'Safe Sleep Practices for Newborns',
    description: 'Learn the ABCs of safe sleep to reduce the risk of SIDS and ensure your baby rests safely.',
    type: 'article',
    category: 'Sleep',
    ageGroup: 'Newborn (0-3m)',
    thumbnail: 'https://d2ck7jf0m7gpxq.cloudfront.net/MomsBeyond-302/mb_17219376231753.jpg',
    content: `
      <h2 class="text-2xl font-bold mb-4">The ABCs of Safe Sleep</h2>
      <p class="mb-4"><strong>A - Alone:</strong> Your baby should sleep alone in their own safe sleep space, without parents, siblings, or pets.</p>
      <p class="mb-4"><strong>B - Back:</strong> Always place your baby on their back to sleep for every sleep, including naps. This is the single most effective action you can take to lower your baby's risk of SIDS.</p>
      <p class="mb-4"><strong>C - Crib:</strong> Use a safety-approved crib, bassinet, or play yard with a firm, flat mattress and a fitted sheet. Keep the crib free of blankets, pillows, bumper pads, stuffed animals, and other soft items.</p>
      <p>Following these guidelines is the most effective way to provide a safe sleep environment for your baby and reduce the risk of Sudden Infant Death Syndrome (SIDS).</p>
    `,
  },
  {
    id: 2,
    title: 'Starting Solid Foods: A Guide for 6 Months+',
    description: 'When and how to introduce solid foods to your infant. A video guide to first purees and baby-led weaning.',
    type: 'video',
    category: 'Nutrition',
    ageGroup: 'Infant (4-12m)',
    thumbnail: 'https://www.premiercereal.com/image/data/theme/blog/introducing-solid-foods-at-6-months--a-guide-for-parents_040724090808.jpg',
    content: 'https://www.youtube.com/embed/6EFIxwO53T0', 
  },
  {
    id: 3,
    title: 'Understanding Your Toddler\'s Tantrums',
    description: 'Tantrums are a normal part of development. Learn why they happen and how to respond effectively and with empathy.',
    type: 'article',
    category: 'Development',
    ageGroup: 'Toddler (1-3y)',
    thumbnail: 'https://drdad.in/wp-content/uploads/2025/08/e2rfqerwerewreqw.jpg',
    content: `
      <h2 class="text-2xl font-bold mb-4">Why Do Toddlers Have Tantrums?</h2>
      <p class="mb-4">Tantrums are often a sign that your child is overwhelmed by big emotions. Their language skills are still developing, so they can't always express feelings like frustration, anger, or disappointment with words. This frustration can boil over into a tantrum.</p>
      <h3 class="text-xl font-semibold mb-2">How to Respond:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Stay Calm:</strong> Your calm presence is reassuring, even if they don't show it.</li>
        <li><strong>Acknowledge their Feelings:</strong> Use simple words. "I know you're very upset because you wanted that toy."</li>
        <li><strong>Ensure Safety:</strong> If they are hitting or kicking, move them to a safe space away from anything that could harm them.</li>
        <li><strong>Don't Reason During the Storm:</strong> Keep it brief. Don't try to reason or lecture during the tantrum.</li>
        <li><strong>Connect After:</strong> Once they've calmed down, offer a hug and talk simply about what happened.</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: 'How to Baby-Proof Your Home',
    description: 'A comprehensive video checklist for ensuring your home is safe for a crawling baby and curious toddler.',
    type: 'video',
    category: 'Health & Safety',
    ageGroup: 'Infant (4-12m)',
    thumbnail: 'https://www.myfivestarhomeservices.com/wp-content/uploads/2024/05/How-to-Babyproof-Your-Home.png',
    content: 'https://www.youtube.com/embed/48BH4EuWTl4', // Example YouTube embed URL
  },
  {
    id: 5,
    title: 'Tummy Time Essentials',
    description: 'Why tummy time is crucial for your baby\'s development and how to make it fun for both of you.',
    type: 'article',
    category: 'Development',
    ageGroup: 'Newborn (0-3m)',
    thumbnail: 'https://www.littlecedars.co.uk/wp-content/uploads/2022/03/Tummy-Time-Guide.jpg',
    content: `
      <h2 class="text-2xl font-bold mb-4">The Importance of Tummy Time</h2>
      <p class="mb-4">Tummy time is supervised playtime that your baby spends on their stomach while awake. It's essential for helping them build strength in their neck, shoulder, and back muscles. This strength is the foundation for motor skills like rolling over, sitting up, and crawling.</p>
      <h3 class="text-xl font-semibold mb-2">How to Get Started:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>Start Early:</strong> You can begin tummy time the day you bring your baby home from the hospital.</li>
        <li><strong>Keep it Short:</strong> Start with just 2-3 minutes at a time, a few times a day. Gradually increase the duration as your baby gets stronger.</li>
        <li><strong>Make it Fun:</strong> Get down on their level, talk to them, sing songs, or use colorful toys to keep them engaged.</li>
        <li><strong>Try Different Positions:</strong> You can also do tummy time by laying your baby on your chest or lap.</li>
      </ul>
    `,
  },
  {
    id: 6,
    title: 'Key Government Schemes for Mother & Child in India',
    description: 'Learn about Pradhan Mantri Matru Vandana Yojana (PMMVY) and Janani Suraksha Yojana (JSY) to get financial support.',
    type: 'article',
    category: 'Health & Safety',
    ageGroup: 'Newborn (0-3m)',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75RkaH4C_SabCR5UJFT_YAnWNdm-Hc_Dz9g&s',
    content: `
      <h2 class="text-2xl font-bold mb-4">Supporting Your Journey: Key Government Schemes</h2>
      <p class="mb-4">The Government of India offers several schemes to ensure the well-being of mothers and children. Here are two of the most important ones:</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">1. Pradhan Mantri Matru Vandana Yojana (PMMVY)</h3>
      <p class="mb-4">PMMVY is a maternity benefit program. Eligible pregnant and lactating mothers receive a cash incentive of <strong>₹5,000</strong> in three installments for the first live birth. This is to provide partial wage compensation and ensure proper nutrition.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-2">2. Janani Suraksha Yojana (JSY)</h3>
      <p class="mb-4">JSY is a safe motherhood intervention aimed at reducing maternal and neonatal mortality by promoting institutional delivery (giving birth in a hospital or health centre). Under JSY, eligible pregnant women are entitled to cash assistance and transport support for delivering in a government or accredited private health facility.</p>
      
      <p class="mt-6 font-semibold">To avail these benefits, you must register your pregnancy at the nearest Anganwadi Centre (AWC) or an approved Health facility.</p>
    `,
  },
  {
    id: 7,
    title: 'Introducing First Foods: Indian Weaning Recipes',
    description: 'A video guide to preparing nutritious and easy first foods for your baby, like dal soup (dal ka paani), rice kanji, and ragi porridge.',
    type: 'video',
    category: 'Nutrition',
    ageGroup: 'Infant (4-12m)',
    thumbnail: 'https://blwindia.co.in/wp-content/uploads/2024/11/Baby-Led-Weaning-Starter-Foods-1024x585.webp',
    content: 'https://www.youtube.com/embed/0iraq5I0vco', // Video on Indian baby food recipes
  },
  {
    id: 8,
    title: 'Baby\'s Vaccination Chart (Indian Schedule)',
    description: 'A simple guide to the essential vaccines your baby needs in their first year, as per the National Immunization Schedule.',
    type: 'article',
    category: 'Health & Safety',
    ageGroup: 'Infant (4-12m)',
    thumbnail: 'https://imback.pi7.org/downloadimage/resized/CusRM_80621agebyageguidetokidsimmunizations-web-1200x800-72_8.png',
    content: `
      <h2 class="text-2xl font-bold mb-4">National Immunization Schedule (Key Vaccines)</h2>
      <p class="mb-4">Vaccinations protect your child from serious diseases. Here are some of the key vaccines given for free at government hospitals. Always consult your pediatrician for the complete and updated schedule.</p>
      <ul class="list-disc list-inside space-y-3">
        <li><strong>At Birth:</strong> BCG, Oral Polio Vaccine (OPV-0), Hepatitis B</li>
        <li><strong>At 6 Weeks:</strong> OPV-1, Pentavalent-1, Rotavirus-1</li>
        <li><strong>At 10 Weeks:</strong> OPV-2, Pentavalent-2, Rotavirus-2</li>
        <li><strong>At 14 Weeks:</strong> OPV-3, Pentavalent-3, Rotavirus-3</li>
        <li><strong>At 9 Months:</strong> Measles-Rubella (MR-1), Vitamin A (1st dose)</li>
        <li><strong>At 1.5 Years (16-24 Months):</strong> DPT booster-1, OPV Booster, MR-2</li>
      </ul>
      <p class="mt-6 text-sm text-gray-500"><strong>Disclaimer:</strong> This is a simplified guide. Please follow the vaccination card and advice provided by your doctor or local health centre.</p>
    `,
  },
  {
    id: 9,
    title: 'Keeping Your Baby Safe During Monsoon',
    description: 'Practical tips to protect your baby from common monsoon-related illnesses like cold, flu, and mosquito-borne diseases.',
    type: 'article',
    category: 'Health & Safety',
    ageGroup: 'Infant (4-12m)',
    thumbnail: 'https://1ststep.com/cdn/shop/articles/baby-care-tips-during-monsoon-season_1200x.png?v=1662097753',
    content: `
      <h2 class="text-2xl font-bold mb-4">Monsoon Care for Your Baby</h2>
      <p class="mb-4">The rainy season brings relief from the heat but also increases the risk of infections. Here’s how to keep your little one safe:</p>
      <ul class="list-disc list-inside space-y-3">
        <li><strong>Use Mosquito Nets:</strong> Protect your baby from mosquito bites, which can cause dengue, malaria, and chikungunya. Use a net on their crib or stroller.</li>
        <li><strong>Ensure Safe Drinking Water:</strong> Always give your baby boiled and cooled water.</li>
        <li><strong>Keep Surroundings Clean:</strong> Prevent water from stagnating in and around your house to stop mosquitoes from breeding.</li>
        <li><strong>Dress them Right:</strong> Choose full-sleeved but lightweight cotton clothing to protect from mosquitoes while keeping them comfortable.</li>
        <li><strong>Maintain Hygiene:</strong> Wash your hands thoroughly before handling the baby or their food. Keep the baby's clothes, toys, and utensils clean and dry.</li>
      </ul>
    `,
  },
  {
    id: 10,
    title: 'Traditional Indian Baby Massage (Maalish)',
    description: 'Learn the benefits and techniques of traditional baby massage, a cherished practice in India for strengthening bones and bonding.',
    type: 'video',
    category: 'Development',
    ageGroup: 'Newborn (0-3m)',
    thumbnail: 'https://www.shutterstock.com/image-photo/indian-mother-massaging-her-lovely-260nw-1831935661.jpg',
    content: 'https://www.youtube.com/embed/Zonwfl7Npno', // Video on Indian baby massage
  },
];

// Add this content to your existing lib/mock-data.ts file.

export const pregnancyCareContent = [
  {
    id: 1,
    category: "Nutrition",
    trimester: "First Trimester",
    type: "video",
    title: "Nutrition Essentials for the First Trimester",
    description: "Learn about the crucial nutrients you and your baby need during the early stages of pregnancy.",
    source: "https://www.youtube.com/embed/xzKA6qOE89E", 
  },
  {
    id: 2,
    category: "Fitness",
    trimester: "First Trimester",
    type: "article",
    title: "Safe Exercises for Early Pregnancy",
    content: "Staying active is important. Focus on gentle exercises like walking, swimming, and prenatal yoga. Avoid any high-impact activities or exercises that involve lying flat on your back for extended periods. Always listen to your body and consult your doctor before starting any new fitness routine.",
  },
  {
    id: 3,
    category: "Well-being",
    trimester: "All",
    type: "article",
    title: "Managing Morning Sickness",
    content: "Morning sickness can be challenging. Try eating small, frequent meals throughout the day. Ginger tea or candies can help soothe your stomach. Avoid strong smells that trigger nausea. Stay hydrated by sipping water regularly. If symptoms are severe, speak with your healthcare provider.",
  },
  {
    id: 4,
    category: "Nutrition",
    trimester: "Second Trimester",
    type: "article",
    title: "Foods to Fuel Your Second Trimester",
    content: "Your energy levels might be higher now. Focus on a balanced diet rich in iron, calcium, vitamin D, and omega-3 fatty acids. Include lean proteins, leafy greens, dairy products, and fatty fish like salmon. Proper nutrition supports your baby's rapid growth during this phase.",
  },
  {
    id: 5,
    category: "Fitness",
    trimester: "Second Trimester",
    type: "video",
    title: "Prenatal Yoga for a Healthy Body and Mind",
    description: "A guided prenatal yoga session to help you stay flexible, strong, and relaxed during your second trimester.",
    source: "https://www.youtube.com/embed/Km0CsOjF_Fw",
  },
  {
    id: 6,
    category: "Tutorials",
    trimester: "All",
    type: "video",
    title: "How to Prepare a Hospital Bag",
    description: "A step-by-step guide on what to pack in your hospital bag for a comfortable delivery and postpartum experience.",
    source: "https://www.youtube.com/embed/_SFR_FFA9ok",
  },
  {
    id: 7,
    category: "Well-being",
    trimester: "Third Trimester",
    type: "article",
    title: "Getting Comfortable and Sleeping Better",
    content: "As your belly grows, finding a comfortable sleeping position can be difficult. Try sleeping on your left side with pillows supporting your back and between your knees. A regular sleep schedule and a relaxing bedtime routine can also improve sleep quality.",
  },
  {
    id: 8,
    category: "Tutorials",
    trimester: "Third Trimester",
    type: "article",
    title: "Understanding Labor Signs",
    content: "Learn to recognize the early signs of labor, such as contractions becoming regular and stronger, your water breaking, and the loss of the mucus plug. Knowing what to expect can help you feel more prepared and less anxious.",
  },
];

export const pregnancyDosAndDonts = {
  dos: [
    "Take a prenatal vitamin daily as prescribed by your doctor.",
    "Stay hydrated by drinking plenty of water.",
    "Eat a balanced diet with plenty of fruits, vegetables, lean protein, and whole grains.",
    "Get regular, moderate exercise approved by your doctor.",
    "Get plenty of rest and sleep.",
    "Attend all your prenatal checkups.",
    "Practice good hygiene to avoid infections.",
  ],
  donts: [
    "Do not smoke, drink alcohol, or use illicit drugs.",
    "Avoid raw or undercooked meat, fish (like sushi), and eggs.",
    "Avoid unpasteurized dairy products and soft cheeses.",
    "Limit caffeine intake as recommended by your doctor.",
    "Avoid cleaning cat litter boxes to prevent toxoplasmosis.",
    "Avoid hot tubs, saunas, and overheating.",
    "Do not take any medication (even over-the-counter) without consulting your doctor.",
  ],
};


