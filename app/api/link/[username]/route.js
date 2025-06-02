import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function GET(req, {params}) {
    try {
        await connectDB();
        const { username } = params;
        
        
        if (!username) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const links = user.links;
        return NextResponse.json( links , { status: 200 });
    } catch (error) {
        console.error("Error fetching user links:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });   
    }

}