import { NextResponse } from "next/server";

export async function GET() {
  try { 
    const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });
    res.cookies.delete("token");
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: "Logout failed", error: error.message }, { status: 500 });
  }
}
