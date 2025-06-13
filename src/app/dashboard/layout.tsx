import { getCurrentAdmin } from "@/lib/auth";
import Link from "next/link";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await getCurrentAdmin();

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <aside className="w-56 bg-gray-900 p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Reports</h2>
        <nav className="space-y-2">
          <Link className="block hover:underline" href="/dashboard?tab=unverified">
            Unverified Reports
          </Link>
          <Link className="block hover:underline" href="/dashboard?tab=verified">
            Verified Reports
          </Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 px-6 py-4 flex justify-between items-center">
          <span>{admin?.email ?? "Admin"}</span>
          <Link href="/logout" className="underline">Log out</Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
