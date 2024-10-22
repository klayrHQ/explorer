import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get('host')!;
  const subdomain = hostname.split('.')[0];
  const pathname = req.nextUrl.pathname;
  const basePath = pathname.split('/')[1];

  //console.log({ basePath });
  // Avoid infinite redirect loops by checking if "network" is already set in search params
  if (url.searchParams.has('network')) {
    //console.log('Network param already exists:', url.searchParams.get('network'));
    return NextResponse.next(); // Skip the redirect and continue normally
  }

  // console.log({ pathname });
  if (subdomain === 'testnet-explorer') {
    //console.log('testnet');
    url.searchParams.set('network', 'testnet');
  } else if (subdomain === 'explorer') {
    //console.log('mainnet');
    url.searchParams.set('network', 'mainnet');
  }

  if (pathname === '/') {
    url.searchParams.set('app', 'klayr');
    url.pathname = '/klayr';
    return NextResponse.redirect(url);
  }

  url.searchParams.set('app', basePath);
  //console.log('url', url.toString());
  //console.log('searchParams', url.searchParams);
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