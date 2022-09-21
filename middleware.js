import { NextResponse } from "next/server";

export function middleware(req) {
  const users = req.cookies.get("users");

  if (
    !users &&
    req.nextUrl.pathname != "/login" &&
    req.nextUrl.pathname != "/signup"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (users && req.nextUrl.pathname == "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};
