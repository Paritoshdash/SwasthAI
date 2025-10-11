import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder for a real API key, which should be stored in environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

// UPDATED: System instruction for a more formal and professional tone
const systemInstruction = {
  parts: [{
    text: "You are 'SwasthAI', a professional AI health assistant from the 'Health Companion' platform. Your primary role is to provide structured, informative, and evidence-based guidance on maternal and child health topics in a formal and clinical tone. You must answer questions about pregnancy, newborn care, nutrition, common childhood illnesses, and developmental milestones. Always provide safe, medically-aligned information and conclude by strongly advising users to consult with a qualified healthcare professional for any personal medical advice. Avoid conversational language or expressions of empathy. Maintain a professional demeanor at all times."
  }]
};

export async function POST(req: NextRequest) {
  try {
    const { history, message } = await req.json();

    const contents = [...history, { role: "user", parts: [{ text: message }] }];

    const payload = {
      contents: contents,
      systemInstruction: systemInstruction,
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({ error: `API Error: ${response.statusText}`, details: errorText }, { status: response.status });
    }

    const data = await response.json();
    
    const candidate = data.candidates?.[0];
    if (candidate && candidate.content?.parts?.[0]?.text) {
      return NextResponse.json({ reply: candidate.content.parts[0].text });
    } else {
       console.error("Invalid response structure from Gemini API:", data);
       return NextResponse.json({ error: 'Invalid response from AI service', details: data }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in chatbot API:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}