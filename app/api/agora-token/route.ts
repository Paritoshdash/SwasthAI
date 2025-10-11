// health-companion/app/api/agora-token/route.ts

import { RtcTokenBuilder, RtcRole } from 'agora-token';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { channelName } = body;

  // --- IMPORTANT ---
  // It's recommended to use environment variables for your credentials
  // For this example, we'll place them here, but move them to .env.local for production
  const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "YOUR_APP_ID"; // Replace with your App ID
  const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || "YOUR_APP_CERTIFICATE"; // Replace with your App Certificate

  if (!channelName) {
    return NextResponse.json({ error: 'channelName is required' }, { status: 400 });
  }

  // Set the expiration time for the token (e.g., 1 hour)
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // A user ID of 0 allows any user to join
  const uid = 0; 
  const role = RtcRole.PUBLISHER;

  // Generate the token
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  return NextResponse.json({ token });
}