import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  const table =
    params.type === "business" ? "business_reports" : "individual_reports";
  const idColumn =
    params.type === "business" ? "business_report_id" : "individual_report_id";

  const { searchParams } = new URL(request.url);
  const current = searchParams.get("state") === "true";

  const { error } = await supabase
    .from(table)
    .update({ media_verified: !current })
    .eq(idColumn, params.id);

  if (error) {
    return new Response("Failed to update media verification", { status: 500 });
  }

  redirect(`/reports/${params.type}/${params.id}`);
}
