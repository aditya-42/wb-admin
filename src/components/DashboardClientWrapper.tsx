"use client";

import { useSearchParams } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";

export default function DashboardClientWrapper({
  data,
}: {
  data: {
    all: { approved: any[]; unapproved: any[] };
    business: { approved: any[]; unapproved: any[] };
    individual: { approved: any[]; unapproved: any[] };
  };
}) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "all";

  const filteredData =
    tab === "business"
      ? data.business
      : tab === "individual"
      ? data.individual
      : data.all;

  return <DashboardClient data={filteredData} tab={tab} />;
}
