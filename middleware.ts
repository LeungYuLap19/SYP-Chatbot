import { NextRequest, NextResponse } from "next/server";
import { getFromCookies } from "./lib/actions/cookies/cookies.action";
import { COOKIES_KEY_USERDATA } from "./constants";

export async function middleware(request: NextRequest) {
  const cookiesResult = await getFromCookies<UserData>({ key: COOKIES_KEY_USERDATA });

  const publicPaths = ['/sign-in', '/sign-up', '/_next', '/static', '/favicon.ico', '/icons', '/auth', '/root'];

  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));
  
  if (cookiesResult.data && (request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/chatroom', request.url));
  }
  else if (!cookiesResult.data && !isPublicPath) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/_next',
    '/static',
    '/favicon.ico',
    '/icons',
    '/auth',
    '/root',
    '/((?!sign-in|sign-up|_next|static|favicon.ico|icons|auth|root).*)',
  ],
};