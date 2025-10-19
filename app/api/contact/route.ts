import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Re-use the same schema for validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(req: NextRequest) {
  const webAppUrl = process.env.GOOGLE_SHEET_WEB_APP_URL;

  if (!webAppUrl) {
    console.error("Error: GOOGLE_SHEET_WEB_APP_URL is not defined in .env.local");
    return NextResponse.json(
      { message: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input.", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const formData = parsed.data;

    // Send the data to the Google Apps Script Web App
    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      // It's good practice to avoid caching POST requests
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Script execution error:", errorText);
      throw new Error("Failed to submit to Google Sheet.");
    }

    const result = await response.json();

    if (result.result !== 'success') {
      console.error("Google Script returned an error:", result.message);
      throw new Error("An error occurred within the Google Script.");
    }

    return NextResponse.json(
      { message: "Form submitted to sheet successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

// Add a GET handler to prevent build errors
export async function GET() {
  return NextResponse.json({ message: 'Contact API endpoint' });
}