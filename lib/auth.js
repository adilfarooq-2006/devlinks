import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
export async function getUserFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload.email;
        
    } catch (error) {
        return null;
    }
}