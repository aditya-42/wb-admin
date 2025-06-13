import { getCurrentAdmin } from "@/lib/auth";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await getCurrentAdmin();

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 px-6 py-4 flex justify-between items-center">
          <span>{admin?.email ?? "Admin"}</span>
          <Link href="/logout" className="underline">
            Log out
          </Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
