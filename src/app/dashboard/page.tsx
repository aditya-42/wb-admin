import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <section id="unverified" className="space-y-4">
        <h2 className="text-xl font-semibold">Unverified Reports</h2>
        <div className="space-y-2">
          {unapproved.map((r) => (
            <Card key={`${r.id}-${r.type}`}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/reports/${r.type}/${r.id}`} className="hover:underline">
                    {r.title}
                  </Link>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="verified" className="space-y-4">
        <h2 className="text-xl font-semibold">Verified Reports</h2>
        <div className="space-y-2">
          {approved.map((r) => (
            <Card key={`${r.id}-${r.type}`}>
              <CardHeader>
                <CardTitle>{r.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
