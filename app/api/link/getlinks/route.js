import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req, res) {
    try {
        await connectDB();
        const email = await getUserFromToken();

        if (!email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await User.findOne({ email });

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