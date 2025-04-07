import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    console.log(username, email, password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    //SEND EMAIL
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({ message: "User created successfully", savedUser });
  } catch (error: any) {
    return NextResponse.json(
      { message: "User creation failed", error: error.message },
      { status: 500 }
    );
  }
}
