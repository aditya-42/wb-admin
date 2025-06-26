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
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 md:flex-row">
      <aside className="hidden w-56 bg-gray-900 p-4 space-y-4 md:block">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <nav className="space-y-2">
          <Link className="block hover:underline" href="/dashboard?tab=all">
            All Reports
          </Link>
          <Link className="block hover:underline" href="/dashboard?tab=business">
            Business Reports
          </Link>
          <Link className="block hover:underline" href="/dashboard?tab=individual">
            Individual Reports
          </Link>
          <Link className="block hover:underline" href="/dashboard?tab=profile">
            Profile
          </Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <header className="bg-gray-800 px-6 py-4 flex justify-between items-center">
          <span>{admin?.email ?? "Admin"}</span>
          <Link href="/logout" className="underline">Log out</Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-gray-900 py-2 md:hidden">
        <Link href="/dashboard?tab=all" className="px-2">All</Link>
        <Link href="/dashboard?tab=business" className="px-2">Business</Link>
        <Link href="/dashboard?tab=individual" className="px-2">Individual</Link>
        <Link href="/dashboard?tab=profile" className="px-2">Profile</Link>
      </nav>
    </div>
  );
}
