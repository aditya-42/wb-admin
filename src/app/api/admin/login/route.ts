import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await loginAdmin(email, password);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Login Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
