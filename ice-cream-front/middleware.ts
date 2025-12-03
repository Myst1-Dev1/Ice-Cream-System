import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  const isLoginPage = req.nextUrl.pathname === '/';
  const isProtectedPage = ['/home', '/reports'].includes(req.nextUrl.pathname);

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/home', '/reports'],
};