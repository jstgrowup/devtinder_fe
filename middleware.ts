import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "@/config/routes";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(path);
  const token = request.cookies.get("token")?.value || "";
  // If trying to access private paths without a token, redirect to signin
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL(routes.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/"],
};
