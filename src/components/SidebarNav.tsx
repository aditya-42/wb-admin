"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const links = [
  { label: "All Reports", href: "/dashboard?tab=all", tab: "all" },
  {
    label: "Business Reports",
    href: "/dashboard?tab=business",
    tab: "business",
  },
  {
    label: "Individual Reports",
    href: "/dashboard?tab=individual",
    tab: "individual",
  },
  { label: "Users", href: "/dashboard?tab=users", tab: "users" },
  { label: "Profile", href: "/dashboard?tab=profile", tab: "profile" },
];

export default function SidebarNav() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "all";

  return (
    <nav className="space-y-2 text-sm">
      {links.map((link) => (
        <Link
          key={link.tab}
          href={link.href}
          className={`block px-3 py-2 rounded transition ${
            currentTab === link.tab
              ? "bg-gray-800 text-white font-semibold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
