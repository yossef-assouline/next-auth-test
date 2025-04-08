import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

import bcrypt from "bcryptjs";
connectDB();

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();
        
        // Find user by resetPasswordToken
        const user = await User.findOne({ 
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ 
                error: "Invalid or expired token" 
            }, { status: 400 });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user's password and remove reset token fields
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ 
            message: "Password reset successfully" 
        }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ 
                error: error.message || "Error resetting password" 
            }, { status: 500 });
        } else {
            return NextResponse.json({ 
                error: "An unknown error occurred" 
            }, { status: 500 });
        }
    }
}