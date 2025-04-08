import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
connectDB();

export async function POST(request: NextRequest) {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

 
    try {
        await sendEmail({ email: user.email, emailType: "reset-password", userId: user._id });
        return NextResponse.json({ message: "Reset link sent to email" }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}
