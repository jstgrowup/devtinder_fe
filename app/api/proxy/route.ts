import { HEADERS } from "@/lib/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.cookies.get("token")?.value;
    const res = await axios.post(`${process.env.BACKEND_URL}/api`, body, {
      headers: {
        ...HEADERS,
        ...(token && { Cookie: `token=${token}` }),
      },
    });
    const data = res.data;

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
  } catch (error) {
    throw new Error("Error in proxy route");
  }
}
