import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { error } = await supabase.auth.admin.updateUserById(id, {
    ban_duration: "8760h",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
