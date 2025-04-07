import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";
connectDB();

export async function POST(request: NextRequest) {
    const { token } = await request.json();
    try {
        const user = await User.findOne({ verifyToken: token ,verifyTokenExpiry: {$gt: Date.now()}});
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(user._id,{
            $unset: {
                verifyToken: 1,
                verifyTokenExpiry: 1
            },
            isVerified: true
        });      
        await updatedUser.save();
        
        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}