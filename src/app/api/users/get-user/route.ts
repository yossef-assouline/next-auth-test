import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";
connectDB();

export async function GET(request: NextRequest) {
 try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "User fetched successfully", user });
 } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "User fetching failed", error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "User fetching failed", error: "An unknown error occurred" }, { status: 500 });
    }
 }
}
