import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
export async function middleware(req) {

    const path = req.nextUrl.pathname;
    const session = cookies().get('session')?.value;

    const protectedRoutes = ['/dashboard'];
    const publicRoutes = ['/login', '/signup'];

    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    if (!session && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (session) {
        try {
            await jwtVerify(session, secret, {
                algorithms: ['HS256'],
            });
            if (isPublicRoute) {
                return NextResponse.redirect(new URL('/dashboard', req.url));
              }
        }
        catch (error) {
            console.log('Failed to verify session');
            return NextResponse.redirect(new URL('/login', req.url));
        }


        return NextResponse.next();

    }
}

export const config = {
    matcher: ['/dashboard', '/login', '/signup'], // Optimize for only relevant routes
}