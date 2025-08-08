import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";


export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase.rpc("admin_unban_user", { user_id: params.id });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
