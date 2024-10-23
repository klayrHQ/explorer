import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host')!;
  const subdomain = hostname.split('.')[0];
  const pathname = req.nextUrl.pathname;
  const basePath = pathname.split('/')[1];

  // Avoid infinite redirect loops by checking if "network" is already set in search params
  if (url.searchParams.has('network') && url.searchParams.has('app')) {
    return NextResponse.next(); // Skip the redirect and continue normally
  }

  // Don't add params on 404 pages and don't redirect
  if (pathname.split('/')[2] === '404') {
    return NextResponse.next(); // Skip the redirect and continue normally
  }

  // Set the network param based on the subdomain
  if (subdomain === 'testnet-explorer') {
    url.searchParams.set('network', 'testnet');
  } else if (subdomain === 'explorer') {
    url.searchParams.set('network', 'mainnet');
  }

  // Set the default searchParams if the subdomain is not explorer or testnet-explorer (mainly for localhost & previews)
  if (subdomain !== 'explorer' && subdomain !== 'testnet-explorer') {
    url.searchParams.set('network', 'mainnet');
    url.searchParams.set('app', 'klayr_mainchain');
    url.pathname = '/klayr_mainchain';
    return NextResponse.redirect(url);
  }

  // If no app is specified, redirect to the mainchain app
  if (pathname === '/') {
    url.searchParams.set('app', 'klayr_mainchain');
    url.pathname = '/klayr_mainchain';
    return NextResponse.redirect(url);
  }

  // Set the app param based on the base path
  url.searchParams.set('app', basePath);

  // Redirect to the new URL with the updated search params
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
}