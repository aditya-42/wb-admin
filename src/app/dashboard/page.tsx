import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { getCurrentAdmin } from "@/lib/auth";

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

  const combine = <T extends { verified: boolean }>(items: T[]) => ({
    approved: items.filter((r) => r.verified === true),
    unapproved: items.filter((r) => r.verified === false),
  });

  return {
    all: combine([...taggedBusiness, ...taggedIndividual]),
    business: combine(taggedBusiness),
    individual: combine(taggedIndividual),
  };
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const tab = searchParams?.tab ?? "all";

  if (tab === "profile") {
    const admin = await getCurrentAdmin();
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>Email: {admin?.email}</p>
      </div>
    );
  }

  const { all, business, individual } = await fetchReports();
  const data =
    tab === "business" ? business : tab === "individual" ? individual : all;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4 capitalize">{tab} Reports</h1>

      <section id="unverified" className="space-y-4">
        <h2 className="text-xl font-semibold">Unverified</h2>
        <div className="space-y-2">
          {data.unapproved.map((r) => (
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
        <h2 className="text-xl font-semibold">Verified</h2>
        <div className="space-y-2">
          {data.approved.map((r) => (
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
