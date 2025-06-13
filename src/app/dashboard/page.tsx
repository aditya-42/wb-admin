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

  return {
    all: [...taggedBusiness, ...taggedIndividual],
    business: taggedBusiness,
    individual: taggedIndividual,
  };
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { tab?: string; category?: string };
}) {
  const { all, business, individual } = await fetchReports();
  const category =
    searchParams?.category === "business"
      ? "business"
      : searchParams?.category === "individual"
        ? "individual"
        : "all";
  const reports =
    category === "business"
      ? business
      : category === "individual"
        ? individual
        : all;
  const approved = reports.filter((r) => r.verified === true);
  const unapproved = reports.filter((r) => r.verified === false);
  const tab = searchParams?.tab === "verified" ? "verified" : "unverified";

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} Reports</h1>
      <ReportsTabs
        approved={approved}
        unapproved={unapproved}
        initialTab={tab as "verified" | "unverified"}
      />
    </div>
  );
}
