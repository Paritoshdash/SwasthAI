// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';

const prisma = new PrismaClient();

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-default-super-secret-key-that-is-long');
const COOKIE_NAME = 'session_token';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    const token = cookieHeader
      ?.split('; ')
      .find(row => row.startsWith(`${COOKIE_NAME}=`))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { email: payload.email as string },
      select: {
        id: true,
        email: true,
        name: true,
        gender: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}