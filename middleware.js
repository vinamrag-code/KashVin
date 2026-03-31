const DEFAULT_USER = 'KashVin';
const DEFAULT_PASS = 'kashivinni1810';

function getCredentials() {
    const user = typeof process !== 'undefined' && process.env?.BASIC_AUTH_USER
        ? process.env.BASIC_AUTH_USER
        : DEFAULT_USER;
    const pass = typeof process !== 'undefined' && process.env?.BASIC_AUTH_PASS
        ? process.env.BASIC_AUTH_PASS
        : DEFAULT_PASS;

    return { user, pass };
}

function unauthorized(message, status = 401) {
    const headers = status === 401
        ? { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
        : {};

    return new Response(message, { status, headers });
}

export default async function middleware(request) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return unauthorized('Auth required');
    }

    let decoded;
    try {
        decoded = atob(authHeader.slice(6));
    } catch {
        return unauthorized('Invalid authorization header');
    }

    const separatorIndex = decoded.indexOf(':');
    const username = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : decoded;
    const password = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : '';
    const credentials = getCredentials();

    if (username !== credentials.user || password !== credentials.pass) {
        return unauthorized('Invalid credentials');
    }

    return fetch(request);
}

export const config = {
    matcher: '/:path*',
};
