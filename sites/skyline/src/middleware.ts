import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

function getSecret() {
  const raw = process.env.AUTH_SECRET || 'dev-secret-change-me';
  return new TextEncoder().encode(raw);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isProtectedApi =
    pathname.startsWith('/api/admin') ||
    (pathname === '/api/leads' && req.method === 'GET') ||
    pathname.startsWith('/api/leads/');

  if (!isAdminRoute && !isProtectedApi) {
    return NextResponse.next();
  }

  const token = req.cookies.get('rp_session')?.value;
  if (!token) {
    if (isAdminRoute) return NextResponse.redirect(new URL('/admin/login', req.url));
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    if (isAdminRoute) return NextResponse.redirect(new URL('/admin/login', req.url));
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/leads', '/api/leads/:path*'],
};
