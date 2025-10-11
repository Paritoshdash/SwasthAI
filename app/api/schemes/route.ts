import { NextResponse } from 'next/server';
// Import the mock data we just created
import { mockSchemes } from '@/lib/mock-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const latest = searchParams.get('latest');

    // The mockSchemes array is already sorted with the newest first
    if (latest === 'true') {
      // Return the first (most recent) scheme from our mock data
      const latestScheme = mockSchemes[0];
      return NextResponse.json(latestScheme);
    }

    // Return all schemes from our mock data
    const allSchemes = mockSchemes;
    return NextResponse.json(allSchemes);

  } catch (error) {
    console.error('API Error fetching schemes:', error);
    return NextResponse.json({ error: 'Failed to fetch schemes' }, { status: 500 });
  }
}