import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old routes to new routes
  const redirects: Record<string, string> = {
    '/giaotiep-1-1': '/landing/giaotiep-1-1',
    '/giaotiep-1-1/assessment': '/giaotiep-1-1/assessment',
  };

  for (const [oldPath, newPath] of Object.entries(redirects)) {
    if (pathname === oldPath || pathname.startsWith(oldPath + '/')) {
      return NextResponse.redirect(new URL(newPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/giaotiep-1-1/:path*'],
};