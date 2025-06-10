import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";

export async function POST() {
    cookies().delete("session");
    return redirect('/');
    return NextResponse.json({ message: "Logged out successfully" });
}