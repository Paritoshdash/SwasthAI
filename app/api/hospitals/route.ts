// app/api/hospitals/route.ts

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensures the route is not cached

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:10000,${lat},${lon});
      way["amenity"="hospital"](around:10000,${lat},${lon});
      relation["amenity"="hospital"](around:10000,${lat},${lon});
      node["healthcare"="hospital"](around:10000,${lat},${lon});
      way["healthcare"="hospital"](around:10000,${lat},${lon});
      relation["healthcare"="hospital"](around:10000,${lat},${lon});
    );
    out center;
  `;

  const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  // --- NEW: AbortController for Timeout ---
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second timeout

  try {
    const response = await fetch(overpassUrl, {
      signal: controller.signal, // Pass the signal to fetch
    });
    
    // --- IMPORTANT: Clear the timeout if the fetch completes ---
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Overpass API error: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error("Error Body:", errorBody);
      throw new Error(`Overpass API returned an error: ${response.status}`);
    }
    
    const data = await response.json();

    const hospitals = data.elements.map((element: any) => ({
      id: element.id,
      name: element.tags?.name || 'Unnamed Hospital',
      lat: element.lat || element.center?.lat,
      lon: element.lon || element.center?.lon,
      phone: element.tags?.phone || element.tags?.['contact:phone'] || null,
    }));

    return NextResponse.json(hospitals);
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Fetch aborted: The request to Overpass API timed out.');
      return NextResponse.json(
        { error: 'The hospital data service took too long to respond. Please try again.' },
        { status: 504 } // 504 Gateway Timeout
      );
    }
    console.error('Failed to fetch hospital data:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while fetching hospital data.' },
      { status: 500 }
    );
  }
}

// Add a POST handler to prevent build errors
export async function POST() {
  return NextResponse.json({ message: 'Hospitals API endpoint' });
}