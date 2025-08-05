import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { type: string; id: string; mediaId: string } }
) {
  const { error } = await supabase
    .from("report_media")
    .update({ media_verify: true })
    .eq("report_media_id", params.mediaId);

  if (error) {
    return new Response("Failed to verify media", { status: 500 });
  }

  redirect(`/reports/${params.type}/${params.id}`);
}
