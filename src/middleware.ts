import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/verifypassword" ||
    path === "/forgot-password";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// matching paths

export const config = {
  matcher: [
    "/",
    "/signup",
    "/login",
    "/profile/:path*",
    "/verifyemail",
    "/verifypassword",
    "/forgot-password",
  ],
};

// login and signup are public rest are protected
