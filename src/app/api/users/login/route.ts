import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 400 });
    }
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

    const res = NextResponse.json({ message: "Login successful", user, token }, { status: 200 });
    res.cookies.set("token", token, {
        httpOnly: true,
    });
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: "Login failed", error: error.message }, { status: 500 });
  }
}
