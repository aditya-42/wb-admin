import { getCurrentAdmin } from "@/lib/auth";
import DashboardClientWrapper from "@/components/DashboardClientWrapper";
import { supabase } from "@/lib/supabaseClient";

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

async function fetchUsers() {
  const { data } = await supabase.from("userdetails").select("*");
  return data ?? [];
}

export default async function DashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return (
      <p className="text-center text-red-500">
        Access denied. Admin login required.
      </p>
    );
  }

  const [data, users] = await Promise.all([fetchReports(), fetchUsers()]);

  return <DashboardClientWrapper data={data} users={users} admin={admin} />;
}
