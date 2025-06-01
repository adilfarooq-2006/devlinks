import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
    await connectDB();
    const email = await getUserFromToken();
    if (!email) {
        return NextResponse.json({ message: 'User not found', success: false, error: false }, { status: 404 });
    }

    const user = await User.findOne({ email: email });
    return NextResponse.json({ message: 'User found', success: true, error: false, user }, { status: 200 });

}