import { NextRequest, NextResponse } from "next/server";
const API_BASE_URL = "http://localhost:4000";
export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  // const NODE_ENV = env.NODE_ENV;
  const cookieName = "token";
  const token = req.cookies.get(cookieName)?.value || null;
  if (!token && !pathname.includes("login") && !pathname.includes("register")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const res = await fetch(`${API_BASE_URL}/user/check-token`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  const resJson = await res.json();
  if (
    token &&
    resJson.status != 200 &&
    !pathname.includes("login") &&
    !pathname.includes("register")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  console.log({ token, resJson });
  return NextResponse.next();
};
export const config = {
  matcher: ["/", "/login", "/register"],
};
