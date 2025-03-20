import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";
import prisma from "./lib/prisma";

export async function middleware(request: NextRequest) {
  // Check if the setup page is being accessed
  const isSetupPath = request.nextUrl.pathname === "/setup";

  // If it's the setup page, check if any users exist
  if (isSetupPath) {
    try {
      const userCount = await prisma.user.count();

      // If users already exist, redirect to login
      if (userCount > 0) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Otherwise allow access to setup page
      return NextResponse.next();
    } catch (error) {
      console.error("Error checking user count:", error);
      // If there's an error, still allow access to setup page
      return NextResponse.next();
    }
  }

  const session = await auth();

  // List of paths that don't require authentication
  const publicPaths = ["/login", "/register", "/forgot-password"];

  // Check if the requested path is in the public paths list
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // If the user is not logged in and trying to access a protected route
  if (!session && !isPublicPath) {
    // Check if any users exist in the system
    try {
      const userCount = await prisma.user.count();

      // If no users exist, redirect to setup page
      if (userCount === 0) {
        return NextResponse.redirect(new URL("/setup", request.url));
      }

      // Otherwise redirect to login
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    } catch (error) {
      console.error("Error checking user count:", error);
      // If there's an error, redirect to login
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  // If the user is logged in and trying to access login/register pages
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Apply to all routes except api, _next, static, and public files
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
