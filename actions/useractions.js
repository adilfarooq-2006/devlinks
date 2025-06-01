"use server"
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const getUser = async (email) => {
  await connectDB();
  const u = await User.findOne({ email: email });
  console.log(u);
  if(!u) return null;
  let user = u.toObject({flattenObjectIds: true});
  return user;
}
