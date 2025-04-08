import { NextResponse } from "next/server";

export async function GET() {
  try { 
    const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });
    res.cookies.delete("token");
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Logout failed", error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Logout failed", error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
