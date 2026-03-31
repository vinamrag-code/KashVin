import { NextResponse } from 'next/server';

export function middleware(request) {
    const auth = request.headers.get('authorization');

    const USER = 'KashVin';
    const PASS = 'kashivinni1810';

    if (!auth) {
        return new Response('Auth required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            },
        });
    }

    const encoded = auth.split(' ')[1];
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(':');

    if (user === USER && pass === PASS) {
        return NextResponse.next();
    }

    return new Response('Access denied', { status: 403 });
}