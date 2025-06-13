import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await loginAdmin(email, password);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error("Login Error:", message);
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
