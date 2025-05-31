"user server"
import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import z from "zod";
import { redirect } from "next/navigation";