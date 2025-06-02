import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req) {
    try {
        console.log("Connecting to MongoDB");
        await connectDB();
        console.log("Connected to MongoDB");
        const email = await getUserFromToken();
        console.log("User email:", email);
        
        if (!email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        
        const body = await req.json();
        const { linkName, url } = body;
        
        // Find user by email instead of ID
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        user.links.push({ linkName, url });
        await user.save();
        
        return NextResponse.json({ message: "Link added", success: true, error: false }, { status: 200 });
    } catch (error) {
        console.error("Error adding link:", error);
        return NextResponse.json({ message: "Link Not Added", success: false, error: true }, { status: 500 });
    }
}