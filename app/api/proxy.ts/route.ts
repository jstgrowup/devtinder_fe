import { HEADERS } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(`${process.env.BACKEND_URL}/api`, {
    method: "POST",
    headers: { ...HEADERS },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  const response = NextResponse.json(data);

  if (data?.data?.token) {
    response.cookies.set("token", data.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 8 * 3600000),
      path: "/",
    });
  }

  if (data?.data?.clearCookie) {
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
  }

  return response;
}
