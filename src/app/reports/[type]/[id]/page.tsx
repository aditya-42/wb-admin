import { supabase } from "@/lib/supabaseClient";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ReportDetail({ params }: any) {
  const { type, id } = params;

  const table = type === "business" ? "business_reports" : "individual_reports";
  const idColumn =
    type === "business" ? "business_report_id" : "individual_report_id";

  const { data: report, error } = await supabase
    .from(table)
    .select("*")
    .eq(idColumn, id)
    .single();

  if (!report || error) return <p>Report not found or failed to load.</p>;

  const filtered = Object.entries(report).filter(
    ([key]) => !["id", "verified", "is_draft"].includes(key)
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Report Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(([key, value]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="capitalize">
                {key.replace(/_/g, " ")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{value?.toString() || "N/A"}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!report.verified && (
        <form
          action={`/reports/${type}/${id}/approve`}
          method="POST"
          className="mt-6"
        >
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Approve Report
          </button>
        </form>
      )}
    </div>
  );
}
