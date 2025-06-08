import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function POST(request) {
    await connectDB();
    console.log('connect to db') 
    const body = await request.json();
    const { username, fullname, email, password } = body;
    try {
       
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "Username already taken. Please choose a different username.",
                error: true
            }, { status: 409 }); 
        }

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
        }, { status: 500 }); // Changed status to 500 for internal server errors
    }
}