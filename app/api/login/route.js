"use server"
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";



// const schema = z.object({
//   email: z.string().email({ message: "Invalid email address" }).trim(),
//   password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
// });

export async function POST(req) {
    await connectDB();
    console.log('connected to db');
    const body = await req.json();
    const { email, password } = body;
    console.log('email', email);
    console.log('password', password);

    const user = await User.findOne({ email, password })
    if (!user) {
      return NextResponse.json({ message: "Invaild email or password", success: false, error: true } , { status: 400 });    
    }

    await createSession(email);
    return NextResponse.json({ message: "Login successful", success: true, error: false }, { status: 200 });  
}

export async function GET(req) {
  await deleteSession();
  redirect('/')
}
  
