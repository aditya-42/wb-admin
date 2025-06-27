"use client";

import { useSearchParams } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";
import ProfileView from "./ProfileView";

export default function DashboardClientWrapper({
  data,
  admin,
}: {
  data: {
    all: { approved: any[]; unapproved: any[] };
    business: { approved: any[]; unapproved: any[] };
    individual: { approved: any[]; unapproved: any[] };
  };
  admin: any;
}) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "all";

  if (tab === "profile") {
    return <ProfileView admin={admin} />;
  }
  const filteredData =
    tab === "business"
      ? data.business
      : tab === "individual"
      ? data.individual
      : data.all;

  return <DashboardClient data={filteredData} tab={tab} />;
}
