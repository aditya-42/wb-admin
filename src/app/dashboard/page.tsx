import ReportsTabs from "./ReportsTabs";
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

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const { approved, unapproved } = await fetchReports();
  const tab = searchParams?.tab === "verified" ? "verified" : "unverified";

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ReportsTabs
        approved={approved}
        unapproved={unapproved}
        initialTab={tab as "verified" | "unverified"}
      />
    </div>
  );
}
