import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from("userdetails")
    .select("is_banned")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return new Response("User not found", { status: 404 });
  }

  const { error: updateError } = await supabase
    .from("userdetails")
    .update({ is_banned: !data.is_banned })
    .eq("id", params.id);

  if (updateError) {
    return new Response("Failed to update", { status: 500 });
  }

  redirect(`/profile/${params.id}`);
}
