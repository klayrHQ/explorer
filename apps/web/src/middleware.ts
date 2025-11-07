import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultApp } from './utils/constants';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host')!;
  const subdomain = hostname.split('.')[0];
  const pathname = req.nextUrl.pathname;

  // If accessing specific route with explorer subdomain, don't redirect
  if (pathname !== '/' && subdomain.endsWith('explorer')) {
    return NextResponse.next();
  }

  // Don't add params on 404 pages and don't redirect
  if (pathname.split('/')[2] === '404') {
    return NextResponse.next();
  }

  // TODO: add permanent fix for vercel previews
  // Temporarily skip the redirect for Vercel previews
  if (hostname.split('.')[1] === 'vercel') {
    return NextResponse.next();
  }

  // Set the default subdomain if the subdomain is not explorer or testnet-explorer (mainly for localhost)
  if (!subdomain.endsWith('explorer')) {
    let hostnameParts = hostname.split('.');
    hostnameParts.unshift('explorer');
    url.host = hostnameParts.join('.');
  }

  // Default to NEXT_PUBLIC_DEFAULT_APP
  if (pathname === '/') url.pathname = `/${defaultApp}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
