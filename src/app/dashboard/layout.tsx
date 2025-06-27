import { getCurrentAdmin } from "@/lib/auth";
import Link from "next/link";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import SidebarNav from "@/components/SidebarNav";
import MobileNav from "@/components/MobileNav";
import { Button } from "@radix-ui/themes";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await getCurrentAdmin();

  // const links = [
  //   { label: "All Reports", href: "/dashboard?tab=all", tab: "all" },
  //   {
  //     label: "Business Reports",
  //     href: "/dashboard?tab=business",
  //     tab: "business",
  //   },
  //   {
  //     label: "Individual Reports",
  //     href: "/dashboard?tab=individual",
  //     tab: "individual",
  //   },
  //   { label: "Profile", href: "/dashboard?tab=profile", tab: "profile" },
  // ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 md:flex-row">
      <aside className="hidden w-64 bg-gray-900 p-6 space-y-6 md:block border-r border-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-white">Dashboard</h2>
        <SidebarNav />
      </aside>

      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        <header className="bg-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-sm text-gray-300">
            {admin?.email ?? "Admin"}
          </span>
          <Button color="red">
            <Link href="/logout" className="text-sm">
              Log out
            </Link>
          </Button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
