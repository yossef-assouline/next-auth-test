import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";
  console.log(token);
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/", "/login", "/signup", "/verifyemail"],
};
