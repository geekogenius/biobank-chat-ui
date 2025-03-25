import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');

  const USER = process.env.BASIC_AUTH_USER || 'admin';
  const PASS = process.env.BASIC_AUTH_PASS || 'Bi0b@nkingAI123';

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pass] = atob(authValue).split(':');
    if (user === USER && pass === PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}
