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
  if (!data) return [];

  const interestIds = new Set<string>();
  const languageIds = new Set<string>();
  data.forEach((u) => {
    (u.interests ?? []).forEach((id: string) => interestIds.add(id));
    (u.language_interest ?? []).forEach((id: string) => languageIds.add(id));
  });

  const interestNames: Record<string, string> = {};
  if (interestIds.size) {
    const { data: interests } = await supabase
      .from("interests")
      .select("id, name")
      .in("id", Array.from(interestIds));
    interests?.forEach((i) => {
      interestNames[i.id] = i.name;
    });
  }

  const languageNames: Record<string, string> = {};
  if (languageIds.size) {
    const { data: languages } = await supabase
      .from("languages")
      .select("id, name")
      .in("id", Array.from(languageIds));
    languages?.forEach((l) => {
      languageNames[l.id] = l.name;
    });
  }

  return data.map((u) => ({
    ...u,
    interests: (u.interests ?? []).map((id: string) => interestNames[id] ?? id),
    language_interest: (u.language_interest ?? []).map(
      (id: string) => languageNames[id] ?? id
    ),
  }));
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
