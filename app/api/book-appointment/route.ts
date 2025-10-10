import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // Mock persistence; in production, store securely with validation
  const data = await req.json()
  console.log("[v0] Appointment:", data)
  return NextResponse.json({ ok: true })
}
