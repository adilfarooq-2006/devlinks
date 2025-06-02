"use server"
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import connectDB from './mongodb';
import User from '@/models/User';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// Add this function that's missing but used in createSession
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  }
  catch (error) {
    console.log('Failed to verify session');
  }
}

export async function createSession(email) {
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000)
  const session = await encrypt({ email, expiresAt });
  const cookieStore = await cookies();
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
  
}

export async function deleteSession() {
  const cookieStore = cookies();
  cookieStore.delete('session');
}