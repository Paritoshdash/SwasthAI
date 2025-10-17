// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-default-super-secret-key-that-is-long');
const COOKIE_NAME = 'session_token';

// Public paths that don't require authentication
const PUBLIC_PATHS = [
  '/',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/schemes',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/me',
  '/_next',
  '/favicon.ico',
  '/static',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for API routes and static assets
  if (path.startsWith('/api') || path.startsWith('/_next') || path.includes('.')) {
    return NextResponse.next();
  }
  
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isPublicPath = PUBLIC_PATHS.some(publicPath => 
    path === publicPath || path.startsWith(publicPath + '/')
  );

  // If no token and trying to access a protected route, redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow all users to access auth pages (login/register)
  // This lets users visit these pages even when logged in
  if (path === '/login' || path === '/register') {
    return NextResponse.next();
  }

  // If token exists, verify it for protected routes
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      // Token is invalid, clear it and redirect to login for protected routes
      if (!isPublicPath) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete(COOKIE_NAME);
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};