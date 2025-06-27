import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { getCurrentAdmin } from "@/lib/auth";
import DashboardClient from "@/components/DashboardClient";
import ProfileView from "@/components/ProfileView";

async function fetchReports() {
  const { data: business } = await supabase
    .from("business_reports")
    .select("*, userdetails(username), created_at")
    .eq("is_draft", false);

  const { data: individual } = await supabase
    .from("individual_reports")
    .select("*, userdetails(username), created_at")
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
  const admin = await getCurrentAdmin();
  if (!admin) {
    return (
      <p className="text-center text-red-500">
        Access denied. Admin login required.
      </p>
    );
  }

  const tab = searchParams?.tab ?? "all";
  if (tab === "profile") {
    return <ProfileView admin={admin} />;
  }

  const { all, business, individual } = await fetchReports();
  const data =
    tab === "business" ? business : tab === "individual" ? individual : all;

  return <DashboardClient data={data} tab={tab} />;
}
