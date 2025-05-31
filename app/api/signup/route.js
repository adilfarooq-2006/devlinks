import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function POST(request) {
    await connectDB();
    console.log('connect to db') 
    const body = await request.json();
    const { username, fullname, email, password } = body;
    try {
        const user = await User.create({
            username,
            fullname,
            email,
            password
        })
        console.log('user', user)
        return NextResponse.json({
            success: true,
            message: "User created successfully",
            error: false,
            user
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        
        return NextResponse.json({
            success: false,
            message: "User not created",
            error: true
        }, { status: 201 });
    }
}