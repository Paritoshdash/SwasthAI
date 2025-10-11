import { NextResponse } from 'next/server';
import { doctors } from '@/lib/mock-data';

// This is a simulated API route.
// In a real application, you would replace this with a call to a database
// or a third-party service like Google Places API to find actual nearby doctors.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { message: 'Latitude and longitude are required.' },
      { status: 400 }
    );
  }

  // Simulate fetching data and adding a random distance to each doctor.
  // We also shuffle the array to make it seem more dynamic on each request.
  const nearbyDoctors = doctors
    .map(doctor => ({
      ...doctor,
      // distance in kilometers
      distance: (Math.random() * 15 + 1).toFixed(1), 
    }))
    .sort(() => 0.5 - Math.random()); // Shuffle the array

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(nearbyDoctors);
}