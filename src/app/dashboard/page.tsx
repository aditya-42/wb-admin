import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

async function fetchReports() {
  const { data: business } = await supabase
    .from("business_reports")
    .select("*")
    .eq("is_draft", false);

  const { data: individual } = await supabase
    .from("individual_reports")
    .select("*")
    .eq("is_draft", false);

  const taggedBusiness = (business ?? []).map((r) => ({
    ...r,
    type: "business",
    id: r.business_report_id,
    title: r.report_header,
  }));

  const taggedIndividual = (individual ?? []).map((r) => ({
    ...r,
    type: "individual",
    id: r.individual_report_id,
    title: r.report_header,
  }));

  const all = [...taggedBusiness, ...taggedIndividual];

  return {
    approved: all.filter((r) => r.verified === true),
    unapproved: all.filter((r) => r.verified === false),
  };
}

export default async function DashboardPage() {
  const { approved, unapproved } = await fetchReports();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Unapproved Reports</h2>
        <ul className="space-y-2">
          {unapproved.map((r) => (
            <li key={`${r.id}-${r.type}`}>
              <Link
                href={`/reports/${r.type}/${r.id}`}
                className="text-blue-600 underline"
              >
                {r.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Approved Reports</h2>
        <ul className="space-y-2">
          {approved.map((r) => (
            <li key={`${r.id}-${r.type}`}>{r.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
