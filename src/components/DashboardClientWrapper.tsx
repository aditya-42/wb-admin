"use client";

import { useSearchParams } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";
import ProfileView from "./ProfileView";
import UsersClient from "./UsersClient";

interface ReportGroup {
  approved: unknown[];
  unapproved: unknown[];
}

interface Data {
  all: ReportGroup;
  business: ReportGroup;
  individual: ReportGroup;
}

export default function DashboardClientWrapper({
  data,
  users,
  admin,
}: {
  data: Data;
  users: Record<string, unknown>[];
  admin: unknown;
}) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "all";

  if (tab === "profile") {
    return <ProfileView admin={admin} />;
  }
  if (tab === "users") {
    return <UsersClient users={users} />;
  }
  const filteredData =
    tab === "business"
      ? data.business
      : tab === "individual"
      ? data.individual
      : data.all;

  return <DashboardClient data={filteredData} tab={tab} />;
}
