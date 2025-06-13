import { supabase } from "@/lib/supabaseClient";

interface ReportDetailProps {
  params: {
    type: string;
    id: string;
  };
}

export default async function ReportDetail({ params }: ReportDetailProps) {
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
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Report Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(([key, value]) => (
          <div key={key}>
            <strong className="capitalize">{key.replace(/_/g, " ")}:</strong>
            <p className="text-gray-800">{value?.toString() || "N/A"}</p>
          </div>
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
