export type Lang = "en" | "hi" | "bn";

export const enDict = {
  // --- Existing Keys ---
  appName: "Health Companion",
  tagline: "Your AI-powered partner for maternal and child wellness.",
  startConsultation: "Start Consultation",
  // ... (keep all your other app-wide keys)

  // --- NEW Pregnancy Checker Keys ---
  symptomCheckerTitle: "Pregnancy Symptom Checker",
  symptomCheckerDescription: "Select the symptoms you are experiencing.",
  calculateProbability: "Calculate Probability",
  missed_period: "Missed Period",
  nausea: "Nausea or Morning Sickness",
  tender_breasts: "Tender or Swollen Breasts",
  fatigue: "Unusual Fatigue or Tiredness",
  frequent_urination: "Frequent Urination",
  cravings: "Food Cravings or Aversions",
  light_spotting: "Light Spotting",
  resultAnalysis: "Result Analysis",
  basedOnSymptoms: "Based on the symptoms you provided.",
  calculatedProbability: "Calculated Probability",
  meaning: "Meaning",
  interpretation: "Interpretation",
  unlikely: "Unlikely",
  unlikely_interp: "Pregnancy is unlikely based on these symptoms.",
  possible: "Possible",
  possible_interp: "Pregnancy is possible. Retest in a few days or after your missed period.",
  probable: "Probable",
  probable_interp: "Show this result to your local ASHA worker or at the nearest Anganwadi center for confirmation.",
  very_likely: "Very Likely",
  very_likely_interp: "It is highly recommended to show this result to your local ASHA worker or doctor for next steps.",
  disclaimer: "This tool is for informational purposes only and is not a medical diagnosis. Please consult a healthcare professional.",
  checkAgain: "Check Again",
  findASHADescription: "Get help from a local community health worker.",
  findASHAButton: "Find Nearest ASHA/Health Centre"
};

export type DictionaryKey = keyof typeof enDict;

export const dict: Record<Lang, typeof enDict> = {
  en: enDict,
  hi: {
    appName: "हेल्थईज़ कम्पैनियन",
    tagline: "मातृ एवं शिशु स्वास्थ्य के लिए आपका AI-संचालित साथी।",
    startConsultation: "परामर्श शुरू करें",
    // ... (rest of your hi translations)
    symptomCheckerTitle: "गर्भावस्था लक्षण जांचकर्ता",
    symptomCheckerDescription: "आप जो लक्षण अनुभव कर रही हैं, उनका चयन करें।",
    calculateProbability: "संभावना की गणना करें",
    missed_period: "मासिक धर्म का न आना",
    nausea: "जी मिचलाना या सुबह की कमजोरी",
    tender_breasts: "स्तनों में कोमलता या सूजन",
    fatigue: "असामान्य थकान",
    frequent_urination: "बार-बार पेशाब आना",
    cravings: "भोजन की लालसा",
    light_spotting: "हल्के धब्बे",
    resultAnalysis: "परिणाम विश्लेषण",
    basedOnSymptoms: "आपके द्वारा प्रदान किए गए लक्षणों के आधार पर।",
    calculatedProbability: "गणित संभावना",
    meaning: "अर्थ",
    interpretation: "व्याख्या",
    unlikely: "असंभावित",
    unlikely_interp: "इन लक्षणों के आधार पर गर्भावस्था की संभावना नहीं है।",
    possible: "संभव है",
    possible_interp: "गर्भावस्था संभव है। कुछ दिनों में या अपने मासिक धर्म के बाद फिर से जांच करें।",
    probable: "संभावित",
    probable_interp: "पुष्टि के लिए यह परिणाम अपनी स्थानीय आशा कार्यकर्ता को या नजदीकी आंगनवाड़ी केंद्र पर दिखाएं।",
    very_likely: "बहुत संभावित",
    very_likely_interp: "अगले कदमों के लिए यह परिणाम अपनी स्थानीय आशा कार्यकर्ता या डॉक्टर को दिखाने की पुरजोर सलाह दी जाती है।",
    disclaimer: "यह उपकरण केवल सूचना के उद्देश्यों के लिए है और यह एक चिकित्सा निदान नहीं है। कृपया एक स्वास्थ्य पेशेवर से परामर्श करें।",
    checkAgain: "फिर से जांचें",
    findASHADescription: "एक स्थानीय सामुदायिक स्वास्थ्य कार्यकर्ता से सहायता प्राप्त करें।",
    findASHAButton: "नजदीकी आशा/स्वास्थ्य केंद्र ढूंढें"
  },
  bn: {
    appName: "হেলথইজ কম্প্যানিয়ন",
    tagline: "মা ও শিশুর সুস্থতার জন্য আপনার এআই-চালিত সঙ্গী।",
    startConsultation: "পরামর্শ শুরু করুন",
    // ... (rest of your bn translations)
  },
};

